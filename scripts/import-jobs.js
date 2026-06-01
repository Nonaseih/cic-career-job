const fs = require('fs')
const iconv = require('iconv-lite')
const Papa = require('papaparse')
const { createClient } = require('@supabase/supabase-js')

const SUPABASE_URL = 'https://svajiqotbporknsxeajz.supabase.co'
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN2YWppcW90YnBvcmtuc3hlYWp6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MDA1OTMyOSwiZXhwIjoyMDk1NjM1MzI5fQ.m32m4bfaNMWTOzKTGgxVjCjsSVR4Qc90e02JIccafSk'

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
})

const UNPUBLISHED_STATUSES = ['終了', '充足']

function parseRow(row) {
  const title = row['求人名【法人名×職種】']?.trim()
  const company = row['法人名']?.trim()
  if (!title || !company) return null

  const salaryMinRaw = parseInt(row['年収（下限）'] ?? '', 10)
  const salaryMaxRaw = parseInt(row['年収（上限）'] ?? '', 10)
  // Guard against data-entry errors (values > 99999万 are clearly wrong)
  const isValidSalary = (v) => !isNaN(v) && v > 0 && v <= 99999

  const areas = Object.keys(row)
    .filter((k) => k.startsWith('★配属先エリア[') && row[k] === '1')
    .map((k) => { const m = k.match(/\[(.+?)\]/); return m ? m[1] : '' })
    .filter(Boolean)

  const jobType = row['★職種']?.trim()
  const status = row['★ステータス']?.trim() ?? ''

  return {
    title,
    company_name: company,
    description: row['具体的な業務内容']?.trim() || null,
    salary_min: isValidSalary(salaryMinRaw) ? salaryMinRaw * 10000 : null,
    salary_max: isValidSalary(salaryMaxRaw) ? salaryMaxRaw * 10000 : null,
    employment_type: null,
    experience: row['最低限明示しなければならない労働条件12　※詳細は求人票参照（不明点は先方に確認）']?.trim() || null,
    areas,
    tags: jobType ? [jobType] : [],
    is_published: !UNPUBLISHED_STATUSES.includes(status),
  }
}

async function main() {
  console.log('Reading CSV...')
  const buf = fs.readFileSync('jobs.csv')
  const text = iconv.decode(buf, 'cp932')
  const { data } = Papa.parse(text, { header: true, skipEmptyLines: true })

  const jobs = data.map(parseRow).filter(Boolean)
  console.log(`Parsed ${jobs.length} valid jobs`)

  const BATCH = 100
  let inserted = 0, skipped = 0

  for (let i = 0; i < jobs.length; i += BATCH) {
    const batch = jobs.slice(i, i + BATCH)
    const { error, count } = await supabase.from('jobs').insert(batch, { count: 'exact' })
    if (error) {
      console.error(`Batch ${i / BATCH + 1} error:`, error.message)
      skipped += batch.length
    } else {
      inserted += count ?? batch.length
      process.stdout.write(`\rInserted ${inserted}/${jobs.length}...`)
    }
  }

  console.log(`\n✓ Done — ${inserted} inserted, ${skipped} skipped`)
}

main().catch(console.error)
