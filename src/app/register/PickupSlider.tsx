'use client'

import type { Job } from '@/lib/types'

function formatSalary(min: number | null, max: number | null): string {
  if (min && max) return `${(min / 10000).toFixed(0)}〜${(max / 10000).toFixed(0)}万円`
  if (min) return `${(min / 10000).toFixed(0)}万円〜`
  if (max) return `〜${(max / 10000).toFixed(0)}万円`
  return '応相談'
}

/**
 * Non-clickable, auto-scrolling "pickup jobs" marquee shown above the form as
 * a registration hook. Salary is the most prominent element. Purely decorative
 * — no links — per the client's spec (a dummy/teaser strip is fine).
 */
export default function PickupSlider({ jobs }: { jobs: Job[] }) {
  if (jobs.length === 0) return null

  // Duplicate the list so the marquee loops seamlessly.
  const loop = [...jobs, ...jobs]

  return (
    <section
      aria-label="注目の求人"
      className="relative overflow-hidden bg-[var(--color-bg-warm)] border-b border-[var(--color-line)] py-3"
    >
      {/* edge fades */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 z-10 bg-gradient-to-r from-[var(--color-bg-warm)] to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 z-10 bg-gradient-to-l from-[var(--color-bg-warm)] to-transparent" />

      <ul className="flex w-max gap-3 animate-[marquee_50s_linear_infinite] hover:[animation-play-state:paused] motion-reduce:animate-none">
        {loop.map((job, i) => {
          const category = job.tags?.[0]
          const area = job.areas?.[0]
          return (
            <li
              key={`${job.id}-${i}`}
              aria-hidden={i >= jobs.length}
              className="shrink-0 w-[230px] bg-white border border-[var(--color-line)] rounded-xl px-4 py-3"
            >
              <div className="flex items-center gap-2 mb-1.5">
                {category && (
                  <span className="text-[11px] bg-[var(--color-bg-warm)] text-[var(--color-muted)] px-2 py-0.5 rounded-full">
                    {category}
                  </span>
                )}
                {area && <span className="text-[11px] text-[var(--color-subtle)]">{area}</span>}
              </div>
              <p className="text-xs text-[var(--color-muted)] line-clamp-1 mb-1">{job.title}</p>
              <p className="leading-none">
                <span className="text-[11px] text-[var(--color-muted)] mr-1">年収</span>
                <span className="font-latin font-black text-xl text-[var(--color-red)]">
                  {formatSalary(job.salary_min, job.salary_max)}
                </span>
              </p>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
