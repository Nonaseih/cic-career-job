'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import type { Job } from '@/lib/types'

function formatSalary(min: number | null, max: number | null) {
  if (!min && !max) return null
  if (min && max) return `${(min / 10000).toFixed(0)}万〜${(max / 10000).toFixed(0)}万円`
  if (min) return `${(min / 10000).toFixed(0)}万円〜`
  return `〜${(max! / 10000).toFixed(0)}万円`
}

export default function PickupSlider({ jobs }: { jobs: Job[] }) {
  const trackRef = useRef<HTMLUListElement>(null)
  const [paused, setPaused] = useState(false)

  // Scroll by roughly one card (incl. gap); loop back to start at the end.
  const advance = useCallback((dir: 1 | -1) => {
    const track = trackRef.current
    if (!track) return
    const first = track.firstElementChild as HTMLElement | null
    const step = first ? first.offsetWidth + 16 /* gap-4 */ : track.clientWidth
    const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 8
    if (dir === 1 && atEnd) {
      track.scrollTo({ left: 0, behavior: 'smooth' })
    } else if (dir === -1 && track.scrollLeft <= 8) {
      track.scrollTo({ left: track.scrollWidth, behavior: 'smooth' })
    } else {
      track.scrollBy({ left: step * dir, behavior: 'smooth' })
    }
  }, [])

  // Autoplay — pauses on hover/focus and when the tab is hidden or the user
  // prefers reduced motion.
  useEffect(() => {
    if (jobs.length <= 1) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    let timer: ReturnType<typeof setInterval> | null = null
    const start = () => { timer = setInterval(() => advance(1), 3800) }
    const stop = () => { if (timer) { clearInterval(timer); timer = null } }

    if (!paused && !document.hidden) start()
    const onVisibility = () => { stop(); if (!paused && !document.hidden) start() }
    document.addEventListener('visibilitychange', onVisibility)
    return () => { stop(); document.removeEventListener('visibilitychange', onVisibility) }
  }, [advance, paused, jobs.length])

  if (jobs.length === 0) return null

  return (
    <section
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="flex items-end justify-between mb-4">
        <div>
          <p className="flex items-center gap-2 text-xs font-latin tracking-[.18em] uppercase text-[var(--color-muted)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-red)] inline-block" />
            Pickup
          </p>
          <h2 className="mt-1.5 font-display font-bold text-lg text-[var(--color-ink)]">注目の求人</h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => advance(-1)}
            aria-label="前の求人へ"
            className="w-9 h-9 rounded-full border border-[var(--color-line)] bg-white flex items-center justify-center text-[var(--color-muted)] hover:border-[var(--color-red)] hover:text-[var(--color-red)] transition-colors"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={() => advance(1)}
            aria-label="次の求人へ"
            className="w-9 h-9 rounded-full border border-[var(--color-line)] bg-white flex items-center justify-center text-[var(--color-muted)] hover:border-[var(--color-red)] hover:text-[var(--color-red)] transition-colors"
          >
            ›
          </button>
        </div>
      </div>

      <ul
        ref={trackRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {jobs.map((job) => {
          const salary = formatSalary(job.salary_min, job.salary_max)
          const category = job.tags?.[0]
          return (
            <li key={job.id} className="snap-start shrink-0 w-[250px] sm:w-[270px]">
              <Link
                href={`/jobs/${job.id}`}
                className="group flex flex-col h-full bg-white border border-[var(--color-line)] rounded-2xl overflow-hidden hover:border-[var(--color-line-dark)] hover:shadow-[0_8px_28px_rgba(20,16,8,0.10)] transition-all duration-300"
              >
                <div className="h-[3px] bg-[var(--color-line)] group-hover:bg-[var(--color-red)] transition-colors duration-300" />
                <div className="p-5 flex flex-col flex-1">
                  {category && (
                    <span className="self-start text-xs bg-[var(--color-bg-warm)] text-[var(--color-muted)] px-2.5 py-0.5 rounded-full mb-3">
                      {category}
                    </span>
                  )}
                  <h3 className="font-display font-bold text-base text-[var(--color-text)] leading-snug line-clamp-2 min-h-[2.8em] group-hover:text-[var(--color-dark)] transition-colors">
                    {job.title}
                  </h3>

                  {job.areas && job.areas.length > 0 && (
                    <p className="mt-3 text-xs text-[var(--color-muted)] flex items-center gap-1">
                      <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {job.areas.slice(0, 2).join('・')}
                      {job.areas.length > 2 && ` +${job.areas.length - 2}`}
                    </p>
                  )}

                  <div className="mt-auto pt-4 flex items-center justify-between">
                    {salary ? (
                      <p className="text-xs text-[var(--color-muted)]">
                        年収<span className="font-latin font-bold text-sm text-[var(--color-text)] ml-1">{salary}</span>
                      </p>
                    ) : (
                      <p className="text-xs text-[var(--color-subtle)]">年収応相談</p>
                    )}
                    <span className="w-6 h-6 rounded-full border border-[var(--color-line-dark)] flex items-center justify-center text-[10px] text-[var(--color-muted)] group-hover:bg-[var(--color-red)] group-hover:border-[var(--color-red)] group-hover:text-white transition-all">
                      ›
                    </span>
                  </div>
                </div>
              </Link>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
