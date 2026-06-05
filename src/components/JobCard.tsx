import Link from 'next/link'
import { HoverCard } from '@/components/Animate'
import type { Job } from '@/lib/types'

function formatSalary(min: number | null, max: number | null) {
  if (!min && !max) return null
  if (min && max) return `${(min / 10000).toFixed(0)}万〜${(max / 10000).toFixed(0)}万円`
  if (min) return `${(min / 10000).toFixed(0)}万円〜`
  return `〜${(max! / 10000).toFixed(0)}万円`
}

export default function JobCard({ job }: { job: Job }) {
  const salary = formatSalary(job.salary_min, job.salary_max)

  return (
    <HoverCard>
      <Link
        href={`/jobs/${job.id}`}
        className="flex flex-col h-full bg-white border border-[var(--color-line)] rounded-xl p-6 hover:border-[var(--color-sky-200)] hover:shadow-[0_6px_20px_rgba(12,44,90,0.10)] transition-all"
      >
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-xs text-[var(--color-blue-600)] font-medium truncate">{job.company_name}</p>
            <h3 className="mt-1 font-display font-extrabold text-base text-[var(--color-navy)] leading-snug line-clamp-2">
              {job.title}
            </h3>
          </div>
          {job.employment_type && (
            <span className="shrink-0 text-xs border border-[var(--color-cic-red)] text-[var(--color-cic-red)] rounded-full px-2.5 py-0.5 whitespace-nowrap">
              {job.employment_type}
            </span>
          )}
        </div>

        {/* Area tags */}
        {job.areas && job.areas.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {job.areas.slice(0, 3).map((area) => (
              <span key={area} className="text-xs bg-[var(--color-sky-50)] border border-[var(--color-sky-100)] text-[var(--color-navy)] rounded-full px-3 py-0.5">
                {area}
              </span>
            ))}
            {(job.areas.length ?? 0) > 3 && (
              <span className="text-xs text-[var(--color-muted)]">+{job.areas.length - 3}</span>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-dashed border-[var(--color-line)] flex items-center justify-between">
          {salary ? (
            <p className="text-xs text-[var(--color-muted)]">
              想定年収{' '}
              <span className="font-latin font-extrabold text-xl text-[var(--color-cic-red)]">
                {salary}
              </span>
            </p>
          ) : (
            <p className="text-xs text-[var(--color-muted)]">年収応相談</p>
          )}
          <span className="text-xs text-[var(--color-blue)] font-medium">詳細を見る ›</span>
        </div>
      </Link>
    </HoverCard>
  )
}
