'use server'

import iconv from 'iconv-lite'
import Papa from 'papaparse'
import { headers } from 'next/headers'
import { revalidateTag } from 'next/cache'
import { createAdminClient } from '@/lib/supabase/admin'
import { isValidAdminAuth } from '@/lib/adminAuth'

// Defense in depth: the proxy gates the /admin page, but Server Actions are
// POSTed directly and must verify the same Basic Auth credential themselves.
async function assertAdmin(): Promise<boolean> {
  const h = await headers()
  return isValidAdminAuth(h.get('authorization'))
}

const UNPUBLISHED_STATUSES = ['終了', '充足']

// kintone column(s) that flag a job as a "pickup" (featured) listing on the
// registration page slider. A cell counts as featured unless it's blank or an
// explicit negative value — so a checkbox, "1", "○", "はい" etc. all work.
const PICKUP_COLUMNS = ['ピックアップ', 'おすすめ']
const PICKUP_FALSEY = new Set(['', '0', 'いいえ', 'false', 'no', 'off', '×', 'ー', '-', 'なし'])

function isPickup(row: Record<string, string>): boolean {
  for (const col of PICKUP_COLUMNS) {
    if (col in row) {
      return !PICKUP_FALSEY.has((row[col] ?? '').trim().toLowerCase())
    }
  }
  return false
}

type ParsedJob = {
  title: string
  company_name: string
  description: string | null
  salary_min: number | null
  salary_max: number | null
  employment_type: string | null
  experience: string | null
  areas: string[]
  tags: string[]
  is_published: boolean
  is_pickup: boolean
}

type ParseResult =
  | { success: false; error: string }
  | { success: true; preview: ParsedJob[]; total: number; encoded: string }

type ImportResult =
  | { success: false; error: string }
  | { success: true; inserted: number; skipped: number }

function parseRow(row: Record<string, string>): ParsedJob | null {
  const title = row['求人名【法人名×職種】']?.trim()
  const company = row['法人名']?.trim()
  if (!title || !company) return null

  const salaryMinRaw = parseInt(row['年収（下限）'] ?? '', 10)
  const salaryMaxRaw = parseInt(row['年収（上限）'] ?? '', 10)

  const areas = Object.keys(row)
    .filter((k) => k.startsWith('★配属先エリア[') && row[k] === '1')
    .map((k) => k.match(/\[(.+?)\]/)?.[1] ?? '')
    .filter(Boolean)

  const jobType = row['★職種']?.trim()
  const status = row['★ステータス']?.trim() ?? ''

  return {
    title,
    company_name: company,
    description: row['具体的な業務内容']?.trim() || null,
    salary_min: isNaN(salaryMinRaw) ? null : salaryMinRaw * 10000,
    salary_max: isNaN(salaryMaxRaw) ? null : salaryMaxRaw * 10000,
    employment_type: null,
    experience: row['最低限明示しなければならない労働条件12　※詳細は求人票参照（不明点は先方に確認）']?.trim() || null,
    areas,
    tags: jobType ? [jobType] : [],
    is_published: !UNPUBLISHED_STATUSES.includes(status),
    is_pickup: isPickup(row),
  }
}

export async function parseCSV(
  _prev: ParseResult | null,
  formData: FormData
): Promise<ParseResult> {
  if (!(await assertAdmin())) {
    return { success: false, error: '認証が必要です。再度ログインしてください。' }
  }

  const file = formData.get('file') as File | null
  if (!file || file.size === 0) {
    return { success: false, error: 'CSVファイルを選択してください。' }
  }

  try {
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const text = iconv.decode(buffer, 'cp932')

    const { data } = Papa.parse<Record<string, string>>(text, {
      header: true,
      skipEmptyLines: true,
    })

    const jobs = data.map(parseRow).filter((j): j is ParsedJob => j !== null)
    if (jobs.length === 0) {
      return { success: false, error: '有効な求人データが見つかりませんでした。' }
    }

    const encoded = Buffer.from(JSON.stringify(jobs)).toString('base64')
    return { success: true, preview: jobs.slice(0, 10), total: jobs.length, encoded }
  } catch {
    return { success: false, error: 'ファイルの解析に失敗しました。CP932形式のCSVか確認してください。' }
  }
}

export async function importJobs(
  _prev: ImportResult | null,
  formData: FormData
): Promise<ImportResult> {
  if (!(await assertAdmin())) {
    return { success: false, error: '認証が必要です。再度ログインしてください。' }
  }

  const encoded = formData.get('encoded') as string | null
  const clearFirst = formData.get('clear_first') === 'true'
  if (!encoded) return { success: false, error: 'データが見つかりません。再度アップロードしてください。' }

  try {
    const jobs: ParsedJob[] = JSON.parse(Buffer.from(encoded, 'base64').toString())
    const supabase = createAdminClient()

    if (clearFirst) {
      await supabase.from('jobs').delete().neq('id', 0)
    }

    let inserted = 0
    let skipped = 0
    const batchSize = 100

    for (let i = 0; i < jobs.length; i += batchSize) {
      const batch = jobs.slice(i, i + batchSize)
      const { error, count } = await supabase
        .from('jobs')
        .insert(batch, { count: 'exact' })

      if (error) {
        skipped += batch.length
      } else {
        inserted += count ?? batch.length
      }
    }

    // Bust the cached job lists (home / register marquee) so the new data shows.
    revalidateTag('jobs')

    return { success: true, inserted, skipped }
  } catch {
    return { success: false, error: 'インポートに失敗しました。' }
  }
}
