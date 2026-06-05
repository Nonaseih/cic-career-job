import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import InquiryModal from './InquiryModal'
import { FadeUp, FadeInView } from '@/components/Animate'
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

function InfoRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4 py-3.5 border-b border-[var(--color-line)] text-sm last:border-0">
      <span className="w-24 shrink-0 text-xs font-bold text-[var(--color-ink)] pt-0.5">{label}</span>
      <div className="flex-1 text-[var(--color-body)]">{children}</div>
    </div>
  )
}

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
    <>
      {/* Breadcrumb strip */}
      <div className="bg-[var(--color-warm-100)] border-b border-[var(--color-line)]">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 py-3">
          <nav className="text-xs text-[var(--color-muted)] flex items-center gap-1.5 flex-wrap">
            <Link href="/" className="hover:text-[var(--color-red)] transition-colors">TOP</Link>
            <span>›</span>
            <Link href="/jobs" className="hover:text-[var(--color-red)] transition-colors">求人一覧</Link>
            <span>›</span>
            <span className="text-[var(--color-body)] truncate max-w-[200px]">{j.title}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 sm:px-10 py-8">
        <div className="flex flex-col lg:flex-row gap-6">

          {/* Main content */}
          <article className="flex-1 min-w-0">

            {/* Title card */}
            <FadeUp>
              <div className="bg-white border border-[var(--color-line)] rounded-xl p-6">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    {j.employment_type && (
                      <span className="inline-block text-xs border border-[var(--color-red)] text-[var(--color-red)] rounded-full px-2.5 py-0.5 mb-2">
                        {j.employment_type}
                      </span>
                    )}
                    <h1 className="font-display font-black text-2xl text-[var(--color-ink)] leading-snug">{j.title}</h1>
                    <p className="mt-1.5 text-sm font-medium text-[var(--color-muted)]">{j.company_name}</p>
                  </div>
                </div>

                {j.tags && j.tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {j.tags.map((tag) => (
                      <span key={tag} className="text-xs bg-[var(--color-warm-100)] text-[var(--color-ink)] border border-[var(--color-line)] px-3 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </FadeUp>

            {/* Key info */}
            <FadeInView>
              <div className="mt-4 bg-white border border-[var(--color-line)] rounded-xl px-6 py-1">
                <InfoRow label="想定年収">
                  <span className="font-latin font-extrabold text-xl text-[var(--color-red)]">
                    {formatSalary(j.salary_min, j.salary_max)}
                  </span>
                </InfoRow>
                {j.employment_type && <InfoRow label="雇用形態">{j.employment_type}</InfoRow>}
                {j.areas && j.areas.length > 0 && (
                  <InfoRow label="勤務地">
                    <div className="flex flex-wrap gap-1.5">
                      {j.areas.map((area) => (
                        <span key={area} className="bg-[var(--color-warm-100)] border border-[var(--color-line)] text-[var(--color-ink)] px-2.5 py-0.5 rounded-full text-xs">
                          {area}
                        </span>
                      ))}
                    </div>
                  </InfoRow>
                )}
                {j.experience && (
                  <InfoRow label="応募資格">
                    <p className="leading-relaxed whitespace-pre-wrap text-sm">{j.experience}</p>
                  </InfoRow>
                )}
              </div>
            </FadeInView>

            {/* Description */}
            {j.description && (
              <FadeInView>
                <div className="mt-4 bg-white border border-[var(--color-line)] rounded-xl p-6">
                  <h2 className="font-display font-bold text-[var(--color-ink)] mb-4 flex items-center gap-2">
                    <span className="inline-block w-1 h-5 bg-[var(--color-red)] rounded-full" />
                    仕事内容
                  </h2>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap text-[var(--color-body)]">{j.description}</p>
                </div>
              </FadeInView>
            )}

            {/* Mobile CTA */}
            <FadeInView className="mt-5 lg:hidden">
              <InquiryModal jobId={j.id} jobTitle={j.title} userEmail={user?.email ?? ''} />
            </FadeInView>
          </article>

          {/* Sidebar — desktop */}
          <FadeUp delay={0.15} className="hidden lg:block w-64 shrink-0">
            <aside>
              <div className="bg-white border border-[var(--color-line)] rounded-xl p-5 sticky top-24">
                <p className="text-xs font-bold text-[var(--color-ink)] mb-1">キャリアアドバイザーに相談</p>
                <p className="text-xs text-[var(--color-muted)] mb-4 leading-relaxed">
                  求人の詳細・応募についてCAに直接お聞きいただけます。
                </p>
                <InquiryModal jobId={j.id} jobTitle={j.title} userEmail={user?.email ?? ''} />
                <p className="mt-3 text-xs text-center text-[var(--color-subtle)]">無料・秘密厳守</p>
              </div>
            </aside>
          </FadeUp>

        </div>
      </div>
    </>
  )
}
