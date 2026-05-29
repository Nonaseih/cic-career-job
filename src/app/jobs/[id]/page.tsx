import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import InquiryModal from './InquiryModal'
import type { Job } from '@/lib/types'

type Props = { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const supabase = await createClient()
  const { data } = await supabase.from('jobs').select('title, company_name').eq('id', id).single()
  if (!data) return { title: '求人詳細' }
  return { title: `${data.title} | ${data.company_name}` }
}

function formatSalary(min: number | null, max: number | null) {
  if (!min && !max) return '応相談'
  if (min && max) return `${(min / 10000).toFixed(0)}万〜${(max / 10000).toFixed(0)}万円`
  if (min) return `${(min / 10000).toFixed(0)}万円〜`
  return `〜${(max! / 10000).toFixed(0)}万円`
}

const ROW = 'flex gap-3 py-3 border-b border-[var(--color-cic-border)] text-sm last:border-0'
const LABEL = 'w-24 shrink-0 text-xs font-bold text-[var(--color-cic-brown)] pt-0.5'

export default async function JobDetailPage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()

  const [{ data: job }, { data: { user } }] = await Promise.all([
    supabase.from('jobs').select('*').eq('id', id).single(),
    supabase.auth.getUser(),
  ])

  if (!job) notFound()

  const j = job as Job

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <nav className="text-xs text-gray-400 mb-4 flex items-center gap-1.5">
        <Link href="/" className="hover:text-[var(--color-cic-red)]">TOP</Link>
        <span>›</span>
        <Link href="/jobs" className="hover:text-[var(--color-cic-red)]">求人一覧</Link>
        <span>›</span>
        <span className="text-gray-600 truncate">{j.title}</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main */}
        <article className="flex-1 min-w-0">
          <div className="bg-white border border-[var(--color-cic-border)] rounded-lg p-6">
            {j.employment_type && (
              <span className="text-xs border border-[var(--color-cic-red)] text-[var(--color-cic-red)] rounded px-2 py-0.5">
                {j.employment_type}
              </span>
            )}
            <h1 className="mt-2 text-xl font-bold leading-snug">{j.title}</h1>
            <p className="mt-1 text-sm text-[var(--color-cic-brown)] font-medium">{j.company_name}</p>

            {j.tags && j.tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {j.tags.map((tag) => (
                  <span key={tag} className="text-xs bg-[var(--color-cic-gray)] text-[var(--color-cic-brown)] px-2 py-0.5 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Key info table */}
          <div className="mt-4 bg-white border border-[var(--color-cic-border)] rounded-lg px-6 py-2">
            <div className={ROW}>
              <span className={LABEL}>年収</span>
              <span className="font-bold text-[var(--color-cic-red)]">{formatSalary(j.salary_min, j.salary_max)}</span>
            </div>
            {j.employment_type && (
              <div className={ROW}>
                <span className={LABEL}>雇用形態</span>
                <span>{j.employment_type}</span>
              </div>
            )}
            {j.areas && j.areas.length > 0 && (
              <div className={ROW}>
                <span className={LABEL}>勤務地</span>
                <span className="flex flex-wrap gap-1">
                  {j.areas.map((area) => (
                    <span key={area} className="bg-[var(--color-cic-gray)] px-2 py-0.5 rounded text-xs">{area}</span>
                  ))}
                </span>
              </div>
            )}
            {j.experience && (
              <div className={ROW}>
                <span className={LABEL}>応募資格</span>
                <span className="leading-relaxed whitespace-pre-wrap">{j.experience}</span>
              </div>
            )}
          </div>

          {/* Description */}
          {j.description && (
            <div className="mt-4 bg-white border border-[var(--color-cic-border)] rounded-lg p-6">
              <h2 className="text-sm font-bold text-[var(--color-cic-brown)] mb-3">仕事内容</h2>
              <p className="text-sm leading-relaxed whitespace-pre-wrap text-gray-700">{j.description}</p>
            </div>
          )}

          {/* Mobile CTA */}
          <div className="mt-4 lg:hidden">
            <InquiryModal
              jobId={j.id}
              jobTitle={j.title}
              userEmail={user?.email ?? ''}
            />
          </div>
        </article>

        {/* Sidebar CTA — desktop */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="bg-white border border-[var(--color-cic-border)] rounded-lg p-5 sticky top-20">
            <p className="text-xs text-gray-500 mb-3 leading-relaxed">
              気になる点や応募の相談は、担当のキャリアアドバイザーに直接お聞きください。
            </p>
            <InquiryModal
              jobId={j.id}
              jobTitle={j.title}
              userEmail={user?.email ?? ''}
            />
            <p className="mt-3 text-xs text-center text-gray-400">無料・秘密厳守</p>
          </div>
        </aside>
      </div>
    </div>
  )
}
