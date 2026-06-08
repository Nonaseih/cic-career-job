import { Suspense } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import JobCard from '@/components/JobCard'
import JobFilters from './JobFilters'
import PageHeader from '@/components/PageHeader'
import { FadeInView, StaggerList, StaggerItem } from '@/components/Animate'
import type { Job } from '@/lib/types'

export const metadata: Metadata = {
  title: '求人一覧',
  description: '施工管理技士・建設技術者向けの求人一覧です。',
}

const PAGE_SIZE = 20

type SearchParams = { q?: string; area?: string; type?: string; page?: string }

export default async function JobsPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const params = await searchParams
  const keyword = params.q ?? ''
  const area = params.area ?? ''
  const employmentType = params.type ?? ''
  const page = Math.max(1, parseInt(params.page ?? '1', 10))
  const from = (page - 1) * PAGE_SIZE
  const to = from + PAGE_SIZE - 1

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  let query = supabase
    .from('jobs')
    .select('*', { count: 'exact' })
    .eq('is_published', true)
    .order('created_at', { ascending: false })
    .range(from, to)

  if (keyword) query = query.or(`title.ilike.%${keyword}%,company_name.ilike.%${keyword}%`)
  if (area) query = query.contains('areas', [area])
  if (employmentType) query = query.eq('employment_type', employmentType)

  const { data: jobs, count } = await query
  const totalPages = Math.ceil((count ?? 0) / PAGE_SIZE)

  return (
    <>
      <PageHeader
        title="求人一覧"
        subtitle="施工管理技士・建設技術者向けの求人情報です。"
        crumbs={[{ label: 'TOP', href: '/' }, { label: '求人一覧' }]}
      />

      <div className="px-6 sm:px-10 py-8">
        <div className="max-w-6xl mx-auto">

          {count != null && (
            <FadeInView>
              <p className="text-sm text-[var(--color-muted)] mb-5">
                <span className="font-latin font-extrabold text-xl text-[var(--color-ink)]">{count.toLocaleString()}</span>
                <span className="ml-1">件の求人</span>
                {(keyword || area || employmentType) && <span className="text-[var(--color-red)] ml-1">（絞り込み中）</span>}
              </p>
            </FadeInView>
          )}

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Filters sidebar */}
            <aside className="lg:w-60 shrink-0">
              <Suspense>
                <JobFilters keyword={keyword} area={area} employmentType={employmentType} />
              </Suspense>
            </aside>

            {/* Results */}
            <div className="flex-1 min-w-0">
              {jobs && jobs.length > 0 ? (
                <>
                  <StaggerList key={page} className="grid grid-cols-1 sm:grid-cols-2 gap-4" delay={0.05}>
                    {(jobs as Job[]).map((job) => (
                      <StaggerItem key={job.id}>
                        <JobCard job={job} isLoggedIn={!!user} />
                      </StaggerItem>
                    ))}
                  </StaggerList>

                  {totalPages > 1 && (
                    <div className="mt-8 flex items-center justify-center gap-1.5 flex-wrap">
                      {page > 1 && <PaginationLink page={page - 1} params={params} label="←" />}
                      {Array.from({ length: totalPages }, (_, i) => i + 1)
                        .filter((p) => Math.abs(p - page) <= 2 || p === 1 || p === totalPages)
                        .reduce<(number | '...')[]>((acc, p, i, arr) => {
                          if (i > 0 && (p as number) - (arr[i - 1] as number) > 1) acc.push('...')
                          acc.push(p)
                          return acc
                        }, [])
                        .map((p, i) =>
                          p === '...' ? (
                            <span key={`e-${i}`} className="px-2 text-[var(--color-muted)] text-sm">…</span>
                          ) : (
                            <PaginationLink key={p} page={p as number} params={params} label={String(p)} current={p === page} />
                          )
                        )}
                      {page < totalPages && <PaginationLink page={page + 1} params={params} label="→" />}
                    </div>
                  )}
                </>
              ) : (
                <FadeInView>
                  <div className="bg-white border border-[var(--color-line)] rounded-xl p-12 text-center">
                    <p className="text-[var(--color-muted)] text-sm">条件に一致する求人が見つかりませんでした。</p>
                    <Link href="/jobs" className="mt-4 inline-block text-sm text-[var(--color-red)] hover:underline">
                      条件をリセット
                    </Link>
                  </div>
                </FadeInView>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function PaginationLink({ page, params, label, current }: { page: number; params: SearchParams; label: string; current?: boolean }) {
  const sp = new URLSearchParams()
  if (params.q) sp.set('q', params.q)
  if (params.area) sp.set('area', params.area)
  if (params.type) sp.set('type', params.type)
  if (page > 1) sp.set('page', String(page))
  const href = `/jobs${sp.toString() ? `?${sp.toString()}` : ''}`

  return (
    <Link href={href} className={`min-w-[36px] h-9 flex items-center justify-center rounded-lg text-sm border transition-colors ${
      current
        ? 'bg-[var(--color-red)] text-white border-[var(--color-red)]'
        : 'border-[var(--color-line)] text-[var(--color-body)] hover:border-[var(--color-red)] hover:text-[var(--color-red)]'
    }`}>
      {label}
    </Link>
  )
}
