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

const TEXT_FIELDS = ['title', 'company_name', 'description', 'experience']
const ARRAY_FIELDS = ['areas', 'tags']

function findQuestionMarks(str) {
  if (!str) return []
  const matches = []
  // Match '?' that is surrounded by or near Japanese characters (likely mojibake, not legit punctuation)
  const re = /.{0,6}\?.{0,6}/g
  let m
  while ((m = re.exec(str)) !== null) {
    matches.push(m[0])
  }
  return matches
}

const { data, error, count } = await supabase
  .from('jobs')
  .select('id, title, company_name, description, experience, areas, tags', { count: 'exact' })

if (error) {
  console.error('Error fetching jobs:', error)
  process.exit(1)
}

console.log(`Total jobs scanned: ${count}\n`)

let affectedCount = 0
const rows = []

for (const job of data) {
  const hits = {}
  for (const field of TEXT_FIELDS) {
    const val = job[field]
    if (typeof val === 'string' && val.includes('?')) {
      hits[field] = findQuestionMarks(val)
    }
  }
  for (const field of ARRAY_FIELDS) {
    const val = job[field]
    if (Array.isArray(val)) {
      const flat = val.filter((v) => typeof v === 'string' && v.includes('?'))
      if (flat.length) hits[field] = flat
    }
  }
  if (Object.keys(hits).length > 0) {
    affectedCount++
    rows.push({ id: job.id, title: job.title, hits })
  }
}

console.log(`Jobs with '?' found: ${affectedCount}\n`)

for (const row of rows.slice(0, 50)) {
  console.log(`--- Job ID ${row.id} (${row.title}) ---`)
  for (const [field, hits] of Object.entries(row.hits)) {
    console.log(`  ${field}: ${JSON.stringify(hits)}`)
  }
}

if (rows.length > 50) {
  console.log(`\n...and ${rows.length - 50} more`)
}
