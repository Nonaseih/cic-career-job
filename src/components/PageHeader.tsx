import Link from 'next/link'

type Crumb = { label: string; href?: string }

export default function PageHeader({ title, subtitle, crumbs }: { title: string; subtitle?: string; crumbs?: Crumb[] }) {
  return (
    <div className="bg-[var(--color-bg-dark)]">
      <div className="max-w-7xl mx-auto px-8 py-14">
        {crumbs && crumbs.length > 0 && (
          <nav className="flex items-center gap-2 text-xs text-white/30 mb-4">
            {crumbs.map((c, i) => (
              <span key={i} className="flex items-center gap-2">
                {i > 0 && <span className="text-white/20">›</span>}
                {c.href
                  ? <Link href={c.href} className="hover:text-white/60 transition-colors">{c.label}</Link>
                  : <span className="text-white/50">{c.label}</span>}
              </span>
            ))}
          </nav>
        )}
        <h1 className="font-display font-black text-4xl text-white tracking-tight">{title}</h1>
        {subtitle && <p className="mt-2 text-sm text-white/45 leading-relaxed max-w-lg">{subtitle}</p>}
      </div>
    </div>
  )
}
