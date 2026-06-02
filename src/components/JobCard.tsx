'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
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
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 320, damping: 22 }}
    >
      <Link
        href={`/jobs/${job.id}`}
        className="block bg-white border border-[var(--color-cic-border)] rounded-lg p-4 hover:border-[var(--color-cic-red)] hover:shadow-md transition-all"
      >
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-xs text-[var(--color-cic-brown)] font-medium truncate">{job.company_name}</p>
            <h3 className="mt-0.5 text-sm font-bold text-[var(--color-foreground)] leading-snug line-clamp-2">
              {job.title}
            </h3>
          </div>
          {job.employment_type && (
            <span className="shrink-0 text-xs border border-[var(--color-cic-red)] text-[var(--color-cic-red)] rounded px-1.5 py-0.5">
              {job.employment_type}
            </span>
          )}
        </div>

        <div className="mt-2 flex flex-wrap gap-1">
          {job.areas?.slice(0, 3).map((area) => (
            <span key={area} className="text-xs bg-[var(--color-cic-gray)] text-[var(--color-cic-brown)] px-2 py-0.5 rounded">
              {area}
            </span>
          ))}
          {(job.areas?.length ?? 0) > 3 && (
            <span className="text-xs text-[var(--color-cic-brown)]/60">+{job.areas!.length - 3}</span>
          )}
        </div>

        {salary && (
          <p className="mt-2 text-sm font-bold text-[var(--color-cic-red)]">
            年収 {salary}
          </p>
        )}
      </Link>
    </motion.div>
  )
}
