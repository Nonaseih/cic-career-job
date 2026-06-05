import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/server'
import JobCard from '@/components/JobCard'
import { FadeUp, FadeInView, StaggerList, StaggerItem } from '@/components/Animate'
import type { Job } from '@/lib/types'

// ─── Section heading pattern ─────────────────────────────────────────
function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="text-center mb-12">
      <p className="font-latin tracking-[.22em] uppercase text-[var(--color-cic-red)] text-xs flex items-center justify-center gap-3">
        <span className="inline-block w-[26px] h-px bg-[var(--color-cic-red)]" />
        {eyebrow}
        <span className="inline-block w-[26px] h-px bg-[var(--color-cic-red)]" />
      </p>
      <h2 className="mt-3 font-display font-extrabold text-[34px] leading-tight text-[var(--color-navy)] relative inline-block
        after:block after:content-[''] after:w-16 after:h-1 after:bg-[var(--color-navy)] after:mt-2 after:mx-auto">
        {title}
      </h2>
    </div>
  )
}

// ─── 職種・資格カテゴリ ────────────────────────────────────────────────
const SKILL_CATEGORIES = [
  {
    id: 'license',
    title: '施工管理技士から探す',
    cols: [
      { heading: '建築・土木', items: ['1級建築施工管理技士', '2級建築施工管理技士', '1級土木施工管理技士', '2級土木施工管理技士'] },
      { heading: '設備・電気', items: ['1級管工事施工管理技士', '2級管工事施工管理技士', '1級電気工事施工管理技士', '2級電気工事施工管理技士'] },
      { heading: '機械・造園', items: ['1級建設機械施工管理技士', '2級建設機械施工管理技士', '1級造園施工管理技士', '2級造園施工管理技士'] },
    ],
  },
  {
    id: 'job',
    title: '職種から探す',
    cols: [
      { heading: '施工管理', items: ['建築施工管理', '土木施工管理', '設備施工管理（空調）'] },
      { heading: '設備・電気', items: ['設備施工管理（給排水）', '設備施工管理（電気）', '積算'] },
      { heading: '設計・その他', items: ['設計（建築）', '設計（土木）', 'その他'] },
    ],
  },
]

// ─── 転職の流れ ───────────────────────────────────────────────────────
const FLOW_STEPS = [
  { n: '01', title: '無料登録', caption: 'メールアドレスだけで1分で完了' },
  { n: '02', title: 'CA面談', caption: '専任アドバイザーが希望を丁寧にヒアリング' },
  { n: '03', title: '求人紹介', caption: '非公開求人を含む厳選求人をご提案' },
  { n: '04', title: '応募・面接対策', caption: '書類添削・面接練習まで徹底サポート' },
  { n: '05', title: '内定・入社後フォロー', caption: '入社後3ヶ月まで継続的にフォロー' },
]

export default async function TopPage() {
  const supabase = await createClient()

  const [{ data: jobs }, { count }] = await Promise.all([
    supabase.from('jobs').select('*').eq('is_published', true).order('created_at', { ascending: false }).limit(6),
    supabase.from('jobs').select('*', { count: 'exact', head: true }).eq('is_published', true),
  ])

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="grid grid-cols-1 lg:grid-cols-[1.04fr_0.96fr] min-h-[600px]">

        {/* Left: navy panel */}
        <div className="bg-[var(--color-navy)] text-white flex flex-col justify-center px-8 py-16 lg:pr-16 lg:py-20">
          <div className="max-w-[560px] mx-auto lg:mx-0 lg:ml-auto">
            <FadeUp>
              <p className="font-serif text-[#ffd0c8] flex items-center gap-3 text-sm mb-5">
                <span className="inline-block w-6 h-px bg-[var(--color-cic-red)]" />
                建設業専門のキャリア支援
              </p>
            </FadeUp>

            <FadeUp delay={0.1}>
              <h1 className="font-display font-black text-4xl sm:text-5xl leading-[1.3] mb-6">
                あなたの
                <span className="relative inline-block">
                  <span className="relative z-10">経験</span>
                  <span className="absolute bottom-1 left-0 right-0 h-[6px] bg-[var(--color-cic-red)]/40 -z-0 rounded" />
                </span>
                を、次の現場へ。
                <br />
                <span className="text-[#ff7b6b]">建設業専門</span>の転職支援。
              </h1>
            </FadeUp>

            <FadeUp delay={0.2}>
              <p className="text-white/85 max-w-[480px] text-sm leading-relaxed mb-8">
                施工管理技士・建設技術者専門のキャリアアドバイザーが、
                求人紹介から入社後フォローまで完全無料でサポートします。
              </p>
            </FadeUp>

            <FadeUp delay={0.25}>
              <div className="flex flex-wrap gap-3 mb-12">
                <Link
                  href="/register"
                  className="px-6 py-3 bg-[var(--color-cic-red)] text-white font-display font-bold rounded-lg hover:bg-[var(--color-cic-red-dark)] transition-colors text-sm"
                >
                  無料会員登録
                </Link>
                <Link
                  href="/jobs"
                  className="px-6 py-3 bg-white text-[var(--color-navy)] font-display font-bold rounded-lg hover:bg-[var(--color-sky-50)] transition-colors text-sm"
                >
                  求人を探す
                </Link>
              </div>
            </FadeUp>

            {/* Trust row */}
            <FadeUp delay={0.35}>
              <div className="flex items-stretch divide-x divide-white/20">
                <div className="pr-6">
                  <p className="font-latin font-extrabold text-3xl text-white leading-none">
                    {count?.toLocaleString() ?? '0'}
                    <span className="text-sm font-normal text-white/70 ml-1">件</span>
                  </p>
                  <p className="text-white/60 text-xs mt-1">掲載求人数</p>
                </div>
                <div className="px-6">
                  <p className="font-latin font-extrabold text-3xl text-white leading-none">
                    98<span className="text-sm font-normal text-white/70">%</span>
                  </p>
                  <p className="text-white/60 text-xs mt-1">サポート満足度</p>
                </div>
                <div className="pl-6">
                  <p className="font-latin font-extrabold text-3xl text-white leading-none">
                    0<span className="text-sm font-normal text-white/70 ml-1">円</span>
                  </p>
                  <p className="text-white/60 text-xs mt-1">登録・相談</p>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>

        {/* Right: photo */}
        <div className="relative min-h-[320px] lg:min-h-full">
          <Image
            src="/staff/ca-staff-4.jpg"
            alt="キャリアアドバイザー"
            fill
            className="object-cover object-top"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy-900)]/40 to-transparent" />
          <div className="absolute bottom-4 left-4 bg-[var(--color-navy)]/90 backdrop-blur-sm text-white text-xs px-3 py-2 rounded-lg">
            建設業専門のキャリアアドバイザーが徹底サポート
          </div>
        </div>
      </section>

      {/* ── 選ばれる理由 ──────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 px-6 sm:px-10">
        <div className="max-w-6xl mx-auto">
          <FadeInView>
            <SectionHeading eyebrow="WHY CHOOSE US" title="選ばれる理由" />
          </FadeInView>

          <StaggerList className="grid grid-cols-1 sm:grid-cols-3 gap-6" stagger={0.1}>
            {[
              { n: '01', title: '専任CAが無料サポート', body: '施工管理に特化したキャリアアドバイザーが応募〜入社まで一貫して伴走します。', icon: '👷' },
              { n: '02', title: '非公開求人も多数', body: '一般公開されていない建設会社の求人を優先的にご紹介。好条件の案件が揃っています。', icon: '🏗️' },
              { n: '03', title: '入社後フォローあり', body: '入社後3ヶ月まで定期的にフォロー。長期的なキャリア形成を全力でサポートします。', icon: '🤝' },
            ].map((item) => (
              <StaggerItem key={item.n}>
                <div className="h-full bg-white rounded-2xl border border-[var(--color-line)] p-8 relative overflow-hidden hover:shadow-[0_6px_20px_rgba(12,44,90,0.10)] hover:-translate-y-0.5 transition-all">
                  {/* Top gradient bar */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--color-navy)] to-[var(--color-blue)]" />

                  <p className="font-latin font-extrabold text-4xl text-[var(--color-cic-red)]/15 leading-none mb-4">
                    POINT <span className="text-[var(--color-cic-red)]">{item.n}</span>
                  </p>
                  <div className="w-14 h-14 bg-[var(--color-sky-50)] rounded-xl flex items-center justify-center text-2xl mb-4">
                    {item.icon}
                  </div>
                  <h3 className="font-display font-extrabold text-xl text-[var(--color-navy)] mb-2">{item.title}</h3>
                  <p className="text-sm text-[var(--color-slate)] leading-relaxed">{item.body}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerList>
        </div>
      </section>

      {/* ── 職種・資格から探す ────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-[var(--color-cic-cream)] px-6 sm:px-10">
        <div className="max-w-6xl mx-auto">
          <FadeInView>
            <SectionHeading eyebrow="FIND YOUR ROLE" title="職種・資格から探す" />
          </FadeInView>

          <div className="space-y-10">
            {SKILL_CATEGORIES.map((cat) => (
              <FadeInView key={cat.id}>
                <div>
                  <h3 className="font-display font-extrabold text-2xl text-[var(--color-navy)] flex items-center gap-3 mb-5">
                    <span className="inline-block w-[5px] h-7 bg-[var(--color-navy)] rounded-full shrink-0" />
                    {cat.title}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {cat.cols.map((col) => (
                      <div key={col.heading}>
                        <h4 className="bg-[var(--color-sky-100)] text-[var(--color-navy)] font-display font-bold text-sm px-4 py-2 rounded-lg mb-2">
                          {col.heading}
                        </h4>
                        <ul className="divide-y divide-[var(--color-line)]">
                          {col.items.map((item) => (
                            <li key={item}>
                              <Link
                                href={`/jobs?q=${encodeURIComponent(item)}`}
                                className="flex items-center gap-2 py-2 text-sm text-[var(--color-slate)] hover:text-[var(--color-blue)] hover:pl-1 transition-all group"
                              >
                                <span className="text-[var(--color-blue)] text-xs group-hover:translate-x-0.5 transition-transform">›</span>
                                {item}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeInView>
            ))}
          </div>
        </div>
      </section>

      {/* ── 新着求人 ──────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 px-6 sm:px-10">
        <div className="max-w-6xl mx-auto">
          <FadeInView>
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="font-latin tracking-[.22em] uppercase text-[var(--color-cic-red)] text-xs flex items-center gap-3">
                  <span className="inline-block w-[26px] h-px bg-[var(--color-cic-red)]" />
                  NEW ARRIVALS
                </p>
                <h2 className="mt-2 font-display font-extrabold text-[34px] text-[var(--color-navy)]">新着求人</h2>
              </div>
              <Link href="/jobs" className="text-sm text-[var(--color-blue)] hover:underline font-medium">
                すべて見る →
              </Link>
            </div>
          </FadeInView>

          {jobs && jobs.length > 0 ? (
            <StaggerList className="grid grid-cols-1 sm:grid-cols-2 gap-[18px]" stagger={0.07}>
              {(jobs as Job[]).map((job) => (
                <StaggerItem key={job.id}>
                  <JobCard job={job} />
                </StaggerItem>
              ))}
            </StaggerList>
          ) : (
            <div className="bg-white border border-[var(--color-line)] rounded-xl p-10 text-center text-sm text-[var(--color-muted)]">
              求人情報を準備中です。しばらくお待ちください。
            </div>
          )}

          <FadeInView>
            <div className="mt-10 text-center">
              <Link
                href="/jobs"
                className="inline-block px-8 py-3 bg-[var(--color-navy)] text-white font-display font-bold rounded-lg hover:bg-[var(--color-navy-700)] transition-colors text-sm"
              >
                求人一覧を見る
              </Link>
            </div>
          </FadeInView>
        </div>
      </section>

      {/* ── 転職の流れ ────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-[var(--color-cic-cream)] px-6 sm:px-10">
        <div className="max-w-6xl mx-auto">
          <FadeInView>
            <SectionHeading eyebrow="HOW IT WORKS" title="転職の流れ" />
          </FadeInView>

          <StaggerList
            className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-4"
            stagger={0.09}
          >
            {FLOW_STEPS.map((step, i) => (
              <StaggerItem key={step.n}>
                <div className="relative flex flex-col items-center text-center">
                  {/* Connector line (desktop only) */}
                  {i < FLOW_STEPS.length - 1 && (
                    <div className="hidden lg:block absolute top-[34px] left-[calc(50%+34px)] right-[-calc(50%-34px)] h-px bg-[var(--color-line)] z-0" style={{ width: 'calc(100% - 68px)', left: 'calc(50% + 34px)' }} />
                  )}
                  {/* Circle */}
                  <div className="relative z-10 w-[68px] h-[68px] bg-white border-2 border-[var(--color-sky-200)] rounded-full flex items-center justify-center mb-4 shadow-sm">
                    <span className="font-latin font-extrabold text-xl text-[var(--color-blue)]">{step.n}</span>
                    {/* Red badge */}
                    {i < FLOW_STEPS.length - 1 && (
                      <span className="absolute -right-1 -top-1 w-4 h-4 bg-[var(--color-cic-red)] rounded-full text-white text-[8px] flex items-center justify-center">›</span>
                    )}
                  </div>
                  <h4 className="font-display font-extrabold text-sm text-[var(--color-navy)] mb-1.5">{step.title}</h4>
                  <p className="text-xs text-[var(--color-slate)] leading-relaxed">{step.caption}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerList>
        </div>
      </section>

      {/* ── CTA band ──────────────────────────────────────────────────── */}
      <section
        className="py-16 sm:py-20 px-6 sm:px-10 bg-[var(--color-navy)] text-white relative overflow-hidden"
        style={{ background: 'radial-gradient(ellipse at 60% 50%, rgba(31,99,184,.55) 0%, transparent 70%), var(--color-navy)' }}
      >
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <FadeInView>
            <p className="font-serif text-[#ffd0c8] text-sm mb-3">登録は無料・1分で完了</p>
            <h2 className="font-display font-black text-4xl leading-tight mb-6">
              <span className="text-[#ff7b6b]">次のキャリア</span>を、<br className="sm:hidden" />
              私たちと一緒に。
            </h2>
            <p className="text-white/75 text-sm mb-8 max-w-md mx-auto leading-relaxed">
              専任のキャリアアドバイザーが無料でサポート。
              まずはお気軽にご登録ください。
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/register"
                className="px-8 py-3.5 bg-[var(--color-cic-red)] text-white font-display font-bold rounded-lg hover:bg-[var(--color-cic-red-dark)] transition-colors text-sm"
              >
                無料会員登録（1分で完了）
              </Link>
              <Link
                href="/jobs"
                className="px-8 py-3.5 bg-white/10 border border-white/30 text-white font-display font-bold rounded-lg hover:bg-white/20 transition-colors text-sm"
              >
                求人を探す
              </Link>
            </div>
          </FadeInView>
        </div>
      </section>
    </>
  )
}
