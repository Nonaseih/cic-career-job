import Link from 'next/link'

type Crumb = { label: string; href?: string }

export default function PageHeader({
  title,
  subtitle,
  crumbs,
}: {
  title: string
  subtitle?: string
  crumbs?: Crumb[]
}) {
  return (
    <div className="bg-[var(--color-ink)] text-white">
      <div className="max-w-6xl mx-auto px-6 sm:px-10 py-10">
        {crumbs && crumbs.length > 0 && (
          <nav className="flex items-center gap-1.5 text-xs text-white/50 mb-3">
            {crumbs.map((c, i) => (
              <span key={i} className="flex items-center gap-1.5">
                {i > 0 && <span>›</span>}
                {c.href ? (
                  <Link href={c.href} className="hover:text-white/80 transition-colors">{c.label}</Link>
                ) : (
                  <span className="text-white/70">{c.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
        <h1 className="font-display font-black text-3xl text-white">{title}</h1>
        {subtitle && <p className="mt-2 text-white/65 text-sm leading-relaxed">{subtitle}</p>}
      </div>
    </div>
  )
}
