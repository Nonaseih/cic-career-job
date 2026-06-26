import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import JobCard from '@/components/JobCard'
import HeroSearch from '@/components/HeroSearch'
import { FadeUp, FadeInView, StaggerList, StaggerItem } from '@/components/Animate'
import type { Job } from '@/lib/types'

// ── Reusable section label ────────────────────────────────────────────
function SectionLabel({ text }: { text: string }) {
  return (
    <p className="flex items-center gap-2 text-xs font-latin tracking-[.2em] uppercase text-[var(--color-muted)] mb-6">
      <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-red)] inline-block" />
      {text}
    </p>
  )
}

// ── Pill button ───────────────────────────────────────────────────────
function PillButton({ href, label, dark = false }: { href: string; label: string; dark?: boolean }) {
  return (
    <Link href={href}
      className={`inline-flex items-center gap-3 rounded-full px-6 py-2.5 text-sm font-medium transition-all border ${
        dark
          ? 'bg-[var(--color-dark)] text-white border-[var(--color-dark)] hover:bg-[var(--color-dark-2)]'
          : 'bg-white text-[var(--color-dark)] border-white/40 hover:bg-white/90'
      }`}>
      {label}
      <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs ${
        dark ? 'bg-white/15' : 'bg-[var(--color-dark)]/10'
      }`}>›</span>
    </Link>
  )
}

// ── 転職の流れ ────────────────────────────────────────────────────────
const FLOW = [
  {
    n: '01', title: '無料登録', sub: '1分で完了',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    n: '02', title: 'CA面談', sub: 'オンライン対応可',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
  {
    n: '03', title: '求人紹介', sub: '非公開求人も多数',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    n: '04', title: '応募・面接', sub: '書類・面接サポート',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    n: '05', title: '入社後フォロー', sub: '3ヶ月継続対応',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
]

// ── 資格・職種カテゴリ ─────────────────────────────────────────────────
const CATEGORIES = [
  { label: '建築施工管理技士', q: '建築施工管理' },
  { label: '土木施工管理技士', q: '土木施工管理' },
  { label: '管工事施工管理技士', q: '管工事施工管理' },
  { label: '電気工事施工管理技士', q: '電気工事施工管理' },
  { label: '設備施工管理（空調）', q: '設備施工管理' },
  { label: '積算・設計', q: '積算' },
]

export default async function TopPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: jobs } = await supabase
    .from('jobs')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false })
    .limit(6)

  return (
    <div className="bg-[var(--color-bg)]">

      {/* ── HERO — dark panel + search form ──────────────────────────── */}
      <section className="relative -mt-[68px] min-h-screen flex items-center overflow-hidden bg-[var(--color-bg-dark)]">

        {/* Subtle texture overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-dark-2)]/30 via-transparent to-black/40" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-8 py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Left: Text */}
            <div>
              <FadeUp>
                <p className="flex items-center gap-2 text-xs font-latin tracking-[.2em] uppercase text-white/50 mb-8">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-red)] inline-block" />
                  建設業専門のキャリア支援
                </p>
              </FadeUp>

              <FadeUp delay={0.1}>
                <h1 className="leading-[1.1] mb-6">
                  <span className="block font-display font-black text-[clamp(2.6rem,5vw,4.5rem)] text-white">
                    あなたの経験を、
                  </span>
                  <span className="block font-display font-black text-[clamp(2.6rem,5vw,4.5rem)] text-[var(--color-red)]">
                    次の現場へ。
                  </span>
                </h1>
              </FadeUp>

              <FadeUp delay={0.2}>
                <p className="text-white/60 text-base leading-relaxed max-w-md mb-10">
                  施工管理技士・建設技術者に特化した転職支援サービス。
                  専任のキャリアアドバイザーが求人紹介から入社後まで、完全無料でサポートします。
                </p>
              </FadeUp>

              {/* Trust stats */}
              <FadeUp delay={0.28}>
                <div className="flex items-center gap-8 flex-wrap">
                  {[
                    { value: count?.toLocaleString() ?? '0', unit: '件', label: '掲載求人数' },
                    { value: '98', unit: '%', label: 'サポート満足度' },
                    { value: '0', unit: '円', label: '完全無料' },
                  ].map((s) => (
                    <div key={s.label}>
                      <p className="font-latin font-black text-3xl text-white leading-none">
                        {s.value}<span className="text-base font-normal text-white/50 ml-1">{s.unit}</span>
                      </p>
                      <p className="text-xs text-white/40 mt-1">{s.label}</p>
                    </div>
                  ))}
                </div>
              </FadeUp>
            </div>

            {/* Right: Search form — no container, sits bare on the dark bg */}
            <FadeUp delay={0.18}>
              <p className="font-display font-bold text-white text-lg mb-1">求人を検索する</p>
              <p className="text-white/40 text-xs mb-6">条件を選んで、あなたに合った求人を探しましょう。</p>
              <HeroSearch />
              <div className="mt-5 pt-5 border-t border-white/10">
                <Link href="/register" className="text-xs text-white/40 hover:text-white transition-colors">
                  会員登録（無料）で非公開求人も閲覧 →
                </Link>
              </div>
            </FadeUp>

          </div>
        </div>
      </section>

      {/* ── ABOUT — editorial text block ──────────────────────────────── */}
      <section className="bg-[var(--color-bg)] py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <FadeInView>
            <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 items-start">
              <div className="pt-2">
                <SectionLabel text="About" />
              </div>
              <div>
                <h2 className="font-display font-black text-[clamp(1.6rem,3.5vw,2.8rem)] text-[var(--color-text)] leading-tight max-w-2xl">
                  建設業界27年の実績を持つ会社が手がける、
                  <span className="text-[var(--color-red)]">施工管理技士専門の転職支援。</span>
                </h2>
                <p className="mt-6 text-[var(--color-muted)] leading-relaxed max-w-xl">
                  株式会社日本建設情報センターは、施工管理技士の資格取得講座を27年運営してきた実績を基に、
                  建設業界特化の人材紹介事業を展開しています。業界を深く知る専任CAが、あなたのキャリアを全力でサポートします。
                </p>
                <div className="mt-8">
                  <PillButton href="/register" label="無料で相談する" dark />
                </div>
              </div>
            </div>
          </FadeInView>
        </div>
      </section>

      {/* ── WHY — 3 reasons ───────────────────────────────────────────── */}
      <section className="bg-[var(--color-bg-warm)] py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <FadeInView>
            <SectionLabel text="Why Choose Us" />
            <h2 className="font-display font-black text-[clamp(1.6rem,3.5vw,2.8rem)] text-[var(--color-text)] mb-14 leading-tight">
              選ばれる<span className="text-[var(--color-red)]">3つの理由</span>
            </h2>
          </FadeInView>

          <StaggerList className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--color-line)]" stagger={0.1}>
            {[
              { n: '01', title: '専任CAが無料サポート', body: '施工管理に特化したキャリアアドバイザーが、応募から入社後まで一貫して伴走します。' },
              { n: '02', title: '非公開求人も多数', body: '一般公開されていない建設会社の好条件求人を優先的にご紹介します。' },
              { n: '03', title: '入社後フォローあり', body: '入社後3ヶ月まで定期的にフォロー。長期的なキャリア形成を支援します。' },
            ].map((item) => (
              <StaggerItem key={item.n}>
                <div className="bg-[var(--color-bg-warm)] p-10 h-full">
                  <p className="font-latin font-black text-[80px] leading-none text-[var(--color-line)] mb-6 select-none">{item.n}</p>
                  <h3 className="font-display font-bold text-xl text-[var(--color-text)] mb-3">{item.title}</h3>
                  <p className="text-sm text-[var(--color-muted)] leading-relaxed">{item.body}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerList>
        </div>
      </section>

      {/* ── JOBS — new arrivals ────────────────────────────────────────── */}
      <section className="bg-[var(--color-bg)] py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <FadeInView>
            <div className="flex items-end justify-between mb-12">
              <div>
                <SectionLabel text="New Arrivals" />
                <h2 className="font-display font-black text-[clamp(1.6rem,3.5vw,2.8rem)] text-[var(--color-text)] leading-tight">
                  新着<span className="text-[var(--color-red)]">求人</span>
                </h2>
              </div>
              <Link href="/jobs" className="hidden sm:flex items-center gap-2 text-sm text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors">
                すべて見る
                <span className="w-7 h-7 rounded-full border border-[var(--color-line)] flex items-center justify-center text-xs hover:border-[var(--color-text)] transition-colors">›</span>
              </Link>
            </div>
          </FadeInView>

          {jobs && jobs.length > 0 ? (
            <StaggerList className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" stagger={0.07}>
              {(jobs as Job[]).map((job) => (
                <StaggerItem key={job.id}>
                  <JobCard job={job} isLoggedIn={!!user} />
                </StaggerItem>
              ))}
            </StaggerList>
          ) : (
            <div className="border border-[var(--color-line)] rounded-2xl p-14 text-center text-sm text-[var(--color-subtle)]">
              求人情報を準備中です。
            </div>
          )}

          <FadeInView>
            <div className="mt-10 text-center sm:hidden">
              <PillButton href="/jobs" label="すべての求人を見る" dark />
            </div>
          </FadeInView>
        </div>
      </section>

      {/* ── CATEGORIES — find by role ──────────────────────────────────── */}
      <section className="bg-[var(--color-bg-dark)] py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <FadeInView>
            <SectionLabel text="Find Your Role" />
            <h2 className="font-display font-black text-[clamp(1.6rem,3.5vw,2.8rem)] text-white mb-12 leading-tight">
              職種・資格から<span className="text-[var(--color-red)]">探す</span>
            </h2>
          </FadeInView>

          <StaggerList className="grid grid-cols-2 sm:grid-cols-3 gap-px bg-white/5" stagger={0.06}>
            {CATEGORIES.map((cat) => (
              <StaggerItem key={cat.label}>
                <Link href={`/jobs?q=${encodeURIComponent(cat.q)}`}
                  className="group bg-[var(--color-bg-dark)] p-8 flex items-center justify-between hover:bg-white/5 transition-colors">
                  <span className="text-sm text-white/70 group-hover:text-white transition-colors leading-snug">{cat.label}</span>
                  <span className="w-7 h-7 rounded-full border border-white/15 flex items-center justify-center text-xs text-white/40 group-hover:border-white/40 group-hover:text-white transition-all shrink-0 ml-3">›</span>
                </Link>
              </StaggerItem>
            ))}
          </StaggerList>
        </div>
      </section>

      {/* ── FLOW — how it works ────────────────────────────────────────── */}
      <section className="bg-[var(--color-bg-warm)] py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <FadeInView>
            <SectionLabel text="How It Works" />
            <h2 className="font-display font-black text-[clamp(1.6rem,3.5vw,2.8rem)] text-[var(--color-text)] mb-14 leading-tight">
              転職の<span className="text-[var(--color-red)]">流れ</span>
            </h2>
          </FadeInView>

          <StaggerList className="grid grid-cols-1 sm:grid-cols-5 gap-4" stagger={0.08}>
            {FLOW.map((step, i) => (
              <StaggerItem key={step.n}>
                <div className="relative flex flex-col items-center text-center bg-white border border-[var(--color-line)] rounded-2xl p-6 h-full shadow-sm">
                  {/* Step number */}
                  <p className="font-latin font-black text-xs text-[var(--color-red)] tracking-widest mb-3">STEP {step.n}</p>
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-full bg-[var(--color-red)]/8 flex items-center justify-center text-[var(--color-red)] mb-4">
                    {step.icon}
                  </div>
                  {/* Title */}
                  <p className="font-display font-bold text-sm text-[var(--color-text)] mb-1">{step.title}</p>
                  <p className="text-xs text-[var(--color-muted)]">{step.sub}</p>
                  {/* Arrow connector */}
                  {i < FLOW.length - 1 && (
                    <span className="hidden sm:block absolute -right-5 top-1/2 -translate-y-1/2 z-10 text-[var(--color-line-dark)] text-xl font-bold">›</span>
                  )}
                </div>
              </StaggerItem>
            ))}
          </StaggerList>
        </div>
      </section>

      {/* ── CA TEAM — staff photo strip ────────────────────────────────── */}
      <section className="bg-[var(--color-bg)] py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <FadeInView>
            <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 items-start mb-12">
              <SectionLabel text="Our Advisors" />
              <h2 className="font-display font-black text-[clamp(1.6rem,3vw,2.4rem)] text-[var(--color-text)] leading-tight">
                担当キャリア<span className="text-[var(--color-red)]">アドバイザー</span>
              </h2>
            </div>
          </FadeInView>

          <StaggerList className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3" stagger={0.06}>
            {[1, 2, 3, 4, 5, 6, 7].map((n) => (
              <StaggerItem key={n}>
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-[var(--color-bg-warm)]">
                  <img
                    src={`/staff/ca-staff-${n}.jpg`}
                    alt={`キャリアアドバイザー ${n}`}
                    className="absolute inset-0 w-full h-full object-cover object-top"
                  />
                </div>
              </StaggerItem>
            ))}
          </StaggerList>
        </div>
      </section>

      {/* ── CTA BAND ────────────────────────────────────────────────────── */}
      <section className="relative py-28 px-8 overflow-hidden">
        <div className="absolute inset-0 bg-[var(--color-bg-dark)]" />
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-dark-2)]/40 via-transparent to-black/30" />

        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <FadeInView>
            <p className="flex items-center justify-center gap-2 text-xs font-latin tracking-[.2em] uppercase text-white/40 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-red)] inline-block" />
              登録無料・1分で完了
            </p>
            <h2 className="font-display font-black text-[clamp(2rem,4vw,3.5rem)] text-white leading-tight mb-4">
              次のキャリアを、
            </h2>
            <p className="font-display font-black text-[clamp(2rem,4vw,3.5rem)] text-[var(--color-red)] mb-8">
              私たちと一緒に。
            </p>
            <p className="text-white/50 text-sm mb-10 max-w-md mx-auto leading-relaxed">
              専任のキャリアアドバイザーが、あなたの経験と希望に合った求人を無料でご紹介します。
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/register"
                className="inline-flex items-center gap-3 rounded-full bg-white text-[var(--color-dark)] text-sm font-medium pl-7 pr-1.5 py-1.5 hover:bg-white/90 transition-colors">
                無料会員登録（1分で完了）
                <span className="w-8 h-8 rounded-full bg-[var(--color-dark)] text-white flex items-center justify-center text-xs">›</span>
              </Link>
              <Link href="/jobs"
                className="inline-flex items-center gap-3 rounded-full border border-white/25 text-white text-sm font-medium pl-7 pr-1.5 py-1.5 hover:bg-white/10 transition-colors">
                求人を探す
                <span className="w-8 h-8 rounded-full border border-white/25 flex items-center justify-center text-xs">›</span>
              </Link>
            </div>
          </FadeInView>
        </div>
      </section>

    </div>
  )
}
