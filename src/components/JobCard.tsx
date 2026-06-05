import Link from 'next/link'
import { HoverCard } from '@/components/Animate'
import type { Job } from '@/lib/types'

function formatSalary(min: number | null, max: number | null) {
  if (!min && !max) return null
  if (min && max) return `${(min / 10000).toFixed(0)}万〜${(max / 10000).toFixed(0)}万円`
  if (min) return `${(min / 10000).toFixed(0)}万〜`
  return `〜${(max! / 10000).toFixed(0)}万円`
}

export default function JobCard({ job }: { job: Job }) {
  const salary = formatSalary(job.salary_min, job.salary_max)

  return (
    <HoverCard>
      <Link href={`/jobs/${job.id}`}
        className="group flex flex-col h-full bg-white border border-[var(--color-line)] rounded-2xl overflow-hidden hover:border-[var(--color-line-dark)] hover:shadow-[0_8px_32px_rgba(20,16,8,0.10)] transition-all duration-300">

        {/* Top accent */}
        <div className="h-[3px] bg-[var(--color-line)] group-hover:bg-[var(--color-red)] transition-colors duration-300" />

        <div className="p-6 flex flex-col flex-1">
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="min-w-0">
              <p className="text-xs text-[var(--color-muted)] mb-1.5 truncate">{job.company_name}</p>
              <h3 className="font-display font-bold text-base text-[var(--color-text)] leading-snug line-clamp-2 group-hover:text-[var(--color-dark)] transition-colors">
                {job.title}
              </h3>
            </div>
            {job.employment_type && (
              <span className="shrink-0 text-xs border border-[var(--color-line-dark)] text-[var(--color-muted)] rounded-full px-2.5 py-0.5 whitespace-nowrap">
                {job.employment_type}
              </span>
            )}
          </div>

          {/* Areas */}
          {job.areas && job.areas.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {job.areas.slice(0, 3).map((area) => (
                <span key={area} className="text-xs bg-[var(--color-bg-warm)] text-[var(--color-muted)] px-2.5 py-0.5 rounded-full">
                  {area}
                </span>
              ))}
              {job.areas.length > 3 && (
                <span className="text-xs text-[var(--color-subtle)]">+{job.areas.length - 3}</span>
              )}
            </div>
          )}

          {/* Footer */}
          <div className="mt-auto pt-4 border-t border-[var(--color-line)] flex items-center justify-between">
            {salary ? (
              <p className="text-xs text-[var(--color-muted)]">
                年収 <span className="font-latin font-bold text-base text-[var(--color-text)] ml-1">{salary}</span>
              </p>
            ) : (
              <p className="text-xs text-[var(--color-subtle)]">年収応相談</p>
            )}
            <span className="flex items-center gap-1.5 text-xs text-[var(--color-muted)] group-hover:text-[var(--color-red)] transition-colors">
              詳細
              <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-[10px] group-hover:bg-[var(--color-red)] group-hover:border-[var(--color-red)] group-hover:text-white transition-all">›</span>
            </span>
          </div>
        </div>
      </Link>
    </HoverCard>
  )
}
