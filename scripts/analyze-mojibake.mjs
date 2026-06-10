import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'

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
const WAVE_DASH = /(?<=[0-9０-９,，万円])\s*\?\s*(?=[0-9０-９])/gu

const { data, error } = await supabase
  .from('jobs')
  .select('id, title, description, experience')

if (error) { console.error(error); process.exit(1) }

const summary = []

for (const job of data) {
  let before = 0
  let after = 0
  for (const field of TEXT_FIELDS) {
    const val = job[field]
    if (typeof val === 'string' && val.includes('?')) {
      before += (val.match(/\?/g) || []).length
      const fixed = val.replace(WAVE_DASH, '～')
      after += (fixed.match(/\?/g) || []).length
    }
  }
  if (before > 0) {
    summary.push({ id: job.id, title: job.title, before, after, fixed: before - after })
  }
}

summary.sort((a, b) => b.before - a.before)

console.log('ID    before  after  fixed   title')
for (const s of summary) {
  console.log(`${String(s.id).padEnd(6)}${String(s.before).padEnd(8)}${String(s.after).padEnd(7)}${String(s.fixed).padEnd(8)}${s.title}`)
}

const totalBefore = summary.reduce((a, s) => a + s.before, 0)
const totalAfter = summary.reduce((a, s) => a + s.after, 0)
const fullyClean = summary.filter((s) => s.after === 0).length
const heavy = summary.filter((s) => s.after >= 5).length

console.log(`\nJobs affected: ${summary.length}`)
console.log(`Total '?' before: ${totalBefore}`)
console.log(`Total '?' after wave-dash fix: ${totalAfter}`)
console.log(`Jobs fully clean after fix: ${fullyClean}`)
console.log(`Jobs still heavily affected (>=5 remaining '?'): ${heavy}`)
