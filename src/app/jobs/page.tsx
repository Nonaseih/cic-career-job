import { Suspense } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import JobCard from '@/components/JobCard'
import JobFilters from './JobFilters'
import { FadeUp, FadeInView, StaggerList, StaggerItem } from '@/components/Animate'
import type { Job } from '@/lib/types'

export const metadata: Metadata = {
  title: '求人一覧',
  description: '施工管理技士・建設技術者向けの求人一覧です。',
}

const PAGE_SIZE = 20

type SearchParams = {
  q?: string
  area?: string
  type?: string
  page?: string
}

export default async function JobsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const params = await searchParams
  const keyword = params.q ?? ''
  const area = params.area ?? ''
  const employmentType = params.type ?? ''
  const page = Math.max(1, parseInt(params.page ?? '1', 10))
  const from = (page - 1) * PAGE_SIZE
  const to = from + PAGE_SIZE - 1

  const supabase = await createClient()

  let query = supabase
    .from('jobs')
    .select('*', { count: 'exact' })
    .eq('is_published', true)
    .order('created_at', { ascending: false })
    .range(from, to)

  if (keyword) {
    query = query.or(`title.ilike.%${keyword}%,company_name.ilike.%${keyword}%`)
  }
  if (area) {
    query = query.contains('areas', [area])
  }
  if (employmentType) {
    query = query.eq('employment_type', employmentType)
  }

  const { data: jobs, count } = await query
  const totalPages = Math.ceil((count ?? 0) / PAGE_SIZE)

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <FadeUp>
        <h1 className="text-lg font-bold text-[var(--color-cic-brown)] mb-4">
          求人一覧
          {count != null && (
            <span className="ml-2 text-sm font-normal text-gray-500">
              {count.toLocaleString()}件
            </span>
          )}
        </h1>
      </FadeUp>

      <div className="flex flex-col lg:flex-row gap-4">
        {/* Filters — sidebar on desktop, top on mobile */}
        <FadeUp delay={0.1} className="lg:w-56 shrink-0">
          <aside>
            <Suspense>
              <JobFilters
                keyword={keyword}
                area={area}
                employmentType={employmentType}
              />
            </Suspense>
          </aside>
        </FadeUp>

        {/* Results */}
        <div className="flex-1 min-w-0">
          {jobs && jobs.length > 0 ? (
            <>
              <StaggerList className="grid grid-cols-1 sm:grid-cols-2 gap-3" delay={0.15}>
                {(jobs as Job[]).map((job) => (
                  <StaggerItem key={job.id}>
                    <JobCard job={job} />
                  </StaggerItem>
                ))}
              </StaggerList>

              {/* Pagination */}
              {totalPages > 1 && (
                <FadeInView delay={0.1}>
                  <div className="mt-6 flex items-center justify-center gap-1 flex-wrap">
                    {page > 1 && (
                      <PaginationLink page={page - 1} params={params} label="←" />
                    )}
                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                      .filter((p) => Math.abs(p - page) <= 2 || p === 1 || p === totalPages)
                      .reduce<(number | '...')[]>((acc, p, i, arr) => {
                        if (i > 0 && (p as number) - (arr[i - 1] as number) > 1) acc.push('...')
                        acc.push(p)
                        return acc
                      }, [])
                      .map((p, i) =>
                        p === '...' ? (
                          <span key={`ellipsis-${i}`} className="px-2 text-gray-400 text-sm">…</span>
                        ) : (
                          <PaginationLink key={p} page={p as number} params={params} label={String(p)} current={p === page} />
                        )
                      )}
                    {page < totalPages && (
                      <PaginationLink page={page + 1} params={params} label="→" />
                    )}
                  </div>
                </FadeInView>
              )}
            </>
          ) : (
            <FadeInView>
              <div className="bg-white border border-[var(--color-cic-border)] rounded-lg p-10 text-center text-sm text-gray-400">
                条件に一致する求人が見つかりませんでした。
              </div>
            </FadeInView>
          )}
        </div>
      </div>
    </div>
  )
}

function PaginationLink({
  page,
  params,
  label,
  current,
}: {
  page: number
  params: SearchParams
  label: string
  current?: boolean
}) {
  const sp = new URLSearchParams()
  if (params.q) sp.set('q', params.q)
  if (params.area) sp.set('area', params.area)
  if (params.type) sp.set('type', params.type)
  if (page > 1) sp.set('page', String(page))
  const href = `/jobs${sp.toString() ? `?${sp.toString()}` : ''}`

  return (
    <Link
      href={href}
      className={`px-3 py-1.5 rounded text-sm border transition-colors ${
        current
          ? 'bg-[var(--color-cic-red)] text-white border-[var(--color-cic-red)]'
          : 'border-[var(--color-cic-border)] text-[var(--color-cic-brown)] hover:border-[var(--color-cic-red)]'
      }`}
    >
      {label}
    </Link>
  )
}
