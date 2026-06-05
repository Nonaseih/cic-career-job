import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/server'
import JobCard from '@/components/JobCard'
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
  { n: '01', title: '無料登録', sub: '1分で完了' },
  { n: '02', title: 'CA面談', sub: '希望をヒアリング' },
  { n: '03', title: '求人紹介', sub: '非公開求人も' },
  { n: '04', title: '応募・面接', sub: '書類・面接サポート' },
  { n: '05', title: '入社後フォロー', sub: '3ヶ月継続対応' },
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

  const [{ data: jobs }, { count }] = await Promise.all([
    supabase.from('jobs').select('*').eq('is_published', true).order('created_at', { ascending: false }).limit(6),
    supabase.from('jobs').select('*', { count: 'exact', head: true }).eq('is_published', true),
  ])

  return (
    <div className="bg-[var(--color-bg)]">

      {/* ── HERO — full-bleed dark photo ──────────────────────────────── */}
      <section className="relative min-h-[92vh] flex flex-col justify-end overflow-hidden">
        <Image
          src="/staff/ca-staff-4.jpg"
          alt="建設キャリアアドバイザー"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Multi-layer overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0c08] via-[#0f0c08]/60 to-[#0f0c08]/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f0c08]/70 to-transparent" />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-8 pb-20 w-full">
          <div className="max-w-2xl">
            <FadeUp>
              <p className="flex items-center gap-2 text-xs font-latin tracking-[.2em] uppercase text-white/50 mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-red)] inline-block" />
                建設業専門のキャリア支援
              </p>
            </FadeUp>

            <FadeUp delay={0.1}>
              <h1 className="leading-[1.1] mb-6">
                <span className="block font-display font-black text-[clamp(2.8rem,6vw,5rem)] text-white">
                  あなたの経験を、
                </span>
                <em className="block font-serif text-[clamp(2.8rem,6vw,5rem)] text-white/90 not-italic" style={{ fontStyle: 'italic' }}>
                  次の現場へ。
                </em>
              </h1>
            </FadeUp>

            <FadeUp delay={0.2}>
              <p className="text-white/65 text-base leading-relaxed max-w-lg mb-10">
                施工管理技士・建設技術者に特化した転職支援サービス。
                専任のキャリアアドバイザーが求人紹介から入社後まで、完全無料でサポートします。
              </p>
            </FadeUp>

            <FadeUp delay={0.28}>
              <div className="flex flex-wrap gap-3">
                <Link href="/register"
                  className="inline-flex items-center gap-3 rounded-full bg-white text-[var(--color-dark)] text-sm font-medium pl-6 pr-1.5 py-1.5 hover:bg-white/90 transition-colors">
                  無料会員登録
                  <span className="w-8 h-8 rounded-full bg-[var(--color-dark)] text-white flex items-center justify-center text-xs">›</span>
                </Link>
                <Link href="/jobs"
                  className="inline-flex items-center gap-3 rounded-full border border-white/30 text-white text-sm font-medium pl-6 pr-1.5 py-1.5 hover:bg-white/10 transition-colors">
                  求人を探す
                  <span className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center text-xs">›</span>
                </Link>
              </div>
            </FadeUp>
          </div>

          {/* Trust stats — bottom strip */}
          <FadeUp delay={0.38}>
            <div className="mt-16 flex items-center gap-8 sm:gap-12 flex-wrap">
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
                  <em className="font-serif not-italic" style={{ fontStyle: 'italic' }}>施工管理技士専門の転職支援。</em>
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
              選ばれる<em className="font-serif not-italic" style={{ fontStyle: 'italic' }}>3つの理由</em>
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
                  新着<em className="font-serif not-italic" style={{ fontStyle: 'italic' }}>求人</em>
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
                  <JobCard job={job} />
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
              職種・資格から<em className="font-serif not-italic text-white/70" style={{ fontStyle: 'italic' }}>探す</em>
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
              転職の<em className="font-serif not-italic" style={{ fontStyle: 'italic' }}>流れ</em>
            </h2>
          </FadeInView>

          <StaggerList className="grid grid-cols-1 sm:grid-cols-5 gap-px bg-[var(--color-line)]" stagger={0.08}>
            {FLOW.map((step, i) => (
              <StaggerItem key={step.n}>
                <div className="bg-[var(--color-bg-warm)] p-8 relative">
                  {i < FLOW.length - 1 && (
                    <span className="hidden sm:block absolute -right-px top-1/2 -translate-y-1/2 z-10 text-[var(--color-line-dark)] text-lg">›</span>
                  )}
                  <p className="font-latin font-black text-5xl text-[var(--color-red)] mb-4 leading-none">{step.n}</p>
                  <p className="font-display font-bold text-sm text-[var(--color-text)]">{step.title}</p>
                  <p className="text-xs text-[var(--color-muted)] mt-1">{step.sub}</p>
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
                担当キャリア<em className="font-serif not-italic" style={{ fontStyle: 'italic' }}>アドバイザー</em>
              </h2>
            </div>
          </FadeInView>

          <StaggerList className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3" stagger={0.06}>
            {[1, 2, 3, 4, 5, 6, 7].map((n) => (
              <StaggerItem key={n}>
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-[var(--color-bg-warm)]">
                  <Image
                    src={`/staff/ca-staff-${n}.jpg`}
                    alt={`キャリアアドバイザー ${n}`}
                    fill
                    className="object-cover object-top"
                  />
                </div>
              </StaggerItem>
            ))}
          </StaggerList>
        </div>
      </section>

      {/* ── CTA BAND ────────────────────────────────────────────────────── */}
      <section className="relative py-28 px-8 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/staff/ca-staff-1.jpg" alt="" fill className="object-cover object-center" />
          <div className="absolute inset-0 bg-[#0f0c08]/88" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <FadeInView>
            <p className="flex items-center justify-center gap-2 text-xs font-latin tracking-[.2em] uppercase text-white/40 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-red)] inline-block" />
              登録無料・1分で完了
            </p>
            <h2 className="font-display font-black text-[clamp(2rem,4vw,3.5rem)] text-white leading-tight mb-4">
              次のキャリアを、
            </h2>
            <em className="block font-serif text-[clamp(2rem,4vw,3.5rem)] text-white/80 mb-8" style={{ fontStyle: 'italic' }}>
              私たちと一緒に。
            </em>
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
