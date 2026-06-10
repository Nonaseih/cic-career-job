import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'

// Minimal .env.local loader
const envFile = readFileSync('.env.local', 'utf-8')
for (const line of envFile.split('\n')) {
  const trimmed = line.trim()
  if (!trimmed || trimmed.startsWith('#')) continue
  const idx = trimmed.indexOf('=')
  if (idx === -1) continue
  const key = trimmed.slice(0, idx).trim()
  const value = trimmed.slice(idx + 1).trim()
  if (!process.env[key]) process.env[key] = value
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } }
)

const TEXT_FIELDS = ['title', 'description', 'experience']

// A '?' sandwiched between digit/currency-ish tokens is almost certainly a
// mangled '～' (wave dash) used as a range separator, e.g.:
//   "300,000円?410,000円" -> "300,000円～410,000円"
//   "30万円 ? 38万円"      -> "30万円～38万円"
//   "8?00?17?00"          -> "8～00～17～00"
const WAVE_DASH = /(?<=[0-9０-９,，万円])\s*\?\s*(?=[0-9０-９])/gu

// High-confidence, manually-verified title corrections (1:1 kanji -> '?'
// substitutions confirmed against the job's `tags` field / standard
// construction-industry job-title conventions).
const TITLE_FIXES = {
  1858: {
    from: '【戸田道路株式会社×??施?管理】',
    to:   '【戸田道路株式会社×土木施工管理】', // confirmed via tags: ["土木施工管理"]
  },
  1859: {
    from: '【戸田道路株式会社×??施?管理】',
    to:   '【戸田道路株式会社×土木施工管理】', // confirmed via tags: ["土木施工管理"]
  },
  1378: {
    from: 'アルティジアP＆C株式会社×施工管理及び所?補佐',
    to:   'アルティジアP＆C株式会社×施工管理及び所長補佐', // "所長補佐" = standard job-title term
  },
}

const dryRun = !process.argv.includes('--apply')

const { data, error } = await supabase
  .from('jobs')
  .select('id, title, description, experience')

if (error) {
  console.error('Error fetching jobs:', error)
  process.exit(1)
}

let changedCount = 0
let remainingQuestionMarks = 0

for (const job of data) {
  const updates = {}

  for (const field of TEXT_FIELDS) {
    const val = job[field]
    if (typeof val === 'string' && val.includes('?')) {
      let fixed = val.replace(WAVE_DASH, '～')

      const titleFix = TITLE_FIXES[job.id]
      if (field === 'title' && titleFix && fixed === titleFix.from) {
        fixed = titleFix.to
      }

      if (fixed !== val) {
        updates[field] = fixed
      }
    }
  }

  if (Object.keys(updates).length > 0) {
    changedCount++
    console.log(`--- Job ${job.id} (${job.title}) ---`)
    for (const [field, newVal] of Object.entries(updates)) {
      console.log(`  [${field}]`)
      console.log(`    before: ${JSON.stringify(job[field])}`)
      console.log(`    after:  ${JSON.stringify(newVal)}`)
    }

    if (!dryRun) {
      const { error: updateError } = await supabase.from('jobs').update(updates).eq('id', job.id)
      if (updateError) console.error(`  ERROR updating job ${job.id}:`, updateError)
      else console.log(`  -> updated`)
    }
  }

  // Count remaining '?' after the fix (in the post-fix value if changed, else original)
  for (const field of TEXT_FIELDS) {
    const val = updates[field] ?? job[field]
    if (typeof val === 'string') {
      const matches = val.match(/\?/g)
      if (matches) remainingQuestionMarks += matches.length
    }
  }
}

console.log(`\n${dryRun ? '[DRY RUN] ' : ''}${changedCount} jobs ${dryRun ? 'would be' : 'were'} updated.`)
console.log(`Remaining '?' occurrences after this fix: ${remainingQuestionMarks}`)
if (dryRun) console.log('\nRun with --apply to write changes.')
