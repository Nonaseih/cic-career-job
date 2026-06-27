import type { Metadata } from 'next'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { getCurrentUser } from '@/lib/supabase/queries'
import { logout } from '@/app/actions/auth'
import { FadeUp, FadeInView, StaggerList, StaggerItem, HoverCard } from '@/components/Animate'

export const metadata: Metadata = { title: 'マイページ' }

export default async function MyPage({ searchParams }: { searchParams: Promise<{ profile?: string }> }) {
  const { profile: profileSaved } = await searchParams
  const supabase = await createClient()

  const [user, { data: inquiries }, { data: profile }] = await Promise.all([
    getCurrentUser(),
    supabase.from('inquiries').select('id, created_at, message, job_id, jobs(id, title, company_name)').order('created_at', { ascending: false }),
    supabase.from('profiles').select('full_name, desired_job_type, desired_prefecture, qualifications').single(),
  ])

  const hasProfile = !!profile?.full_name

  return (
    <>
      {/* Page header */}
      <div className="bg-[var(--color-ink)] text-white">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 py-10 flex items-start justify-between">
          <div>
            <h1 className="font-display font-black text-3xl">マイページ</h1>
            <p className="mt-1 text-white/60 text-sm">{user?.email}</p>
          </div>
          <form action={logout}>
            <button type="submit"
              className="text-xs text-white/50 hover:text-white border border-white/20 rounded-lg px-3 py-1.5 transition-colors">
              ログアウト
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 sm:px-10 py-8 space-y-5">

        {/* Saved toast */}
        {profileSaved === 'saved' && (
          <FadeUp>
            <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 text-sm text-green-700 flex items-center gap-2">
              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              プロフィールを保存しました。
            </div>
          </FadeUp>
        )}

        {/* Profile incomplete banner */}
        {!hasProfile && (
          <FadeUp delay={0.05}>
            <div className="bg-[var(--color-amber-100)] border border-amber-200 rounded-xl px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <p className="text-sm font-bold text-[var(--color-amber)]">プロフィールが未入力です</p>
                <p className="text-xs text-amber-700/80 mt-0.5">資格・希望条件を入力することで、CAがより適切な求人をご提案できます。</p>
              </div>
              <Link href="/mypage/profile"
                className="shrink-0 px-4 py-2 bg-[var(--color-amber)] text-white text-xs font-bold rounded-lg hover:opacity-90 transition-opacity whitespace-nowrap">
                プロフィールを入力する →
              </Link>
            </div>
          </FadeUp>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

          {/* Account card */}
          <FadeUp delay={0.1} className="lg:col-span-1">
            <div className="bg-white border border-[var(--color-line)] rounded-2xl p-6 h-full">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xs font-bold text-[var(--color-ink)] uppercase tracking-wider">アカウント</h2>
                <Link href="/mypage/profile" className="text-xs text-[var(--color-red)] hover:underline">
                  {hasProfile ? 'プロフィール編集' : 'プロフィール入力'}
                </Link>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-[var(--color-red)]/10 border border-[var(--color-red)]/20 flex items-center justify-center shrink-0">
                  <span className="font-display font-bold text-[var(--color-red)] text-lg">
                    {profile?.full_name?.charAt(0) ?? user?.email?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-sm text-[var(--color-ink)] truncate">
                    {profile?.full_name ?? 'プロフィール未設定'}
                  </p>
                  <p className="text-xs text-[var(--color-muted)] truncate">{user?.email}</p>
                </div>
              </div>

              {hasProfile ? (
                <div className="space-y-2 pt-4 border-t border-[var(--color-line)]">
                  {profile.desired_job_type && (
                    <div className="flex justify-between text-xs">
                      <span className="text-[var(--color-muted)]">希望職種</span>
                      <span className="font-medium text-[var(--color-ink)]">{profile.desired_job_type}</span>
                    </div>
                  )}
                  {profile.desired_prefecture && (
                    <div className="flex justify-between text-xs">
                      <span className="text-[var(--color-muted)]">希望勤務地</span>
                      <span className="font-medium text-[var(--color-ink)]">{profile.desired_prefecture}</span>
                    </div>
                  )}
                  {profile.qualifications && profile.qualifications.length > 0 && (
                    <div className="flex justify-between text-xs">
                      <span className="text-[var(--color-muted)]">保有資格</span>
                      <span className="font-medium text-[var(--color-ink)] text-right max-w-[55%]">
                        {profile.qualifications.slice(0, 1).join('')}
                        {profile.qualifications.length > 1 && ` 他${profile.qualifications.length - 1}件`}
                      </span>
                    </div>
                  )}
                </div>
              ) : (
                <Link href="/mypage/profile"
                  className="block w-full text-center py-2 border border-dashed border-[var(--color-line-dark)] text-xs text-[var(--color-muted)] rounded-lg hover:border-[var(--color-red)] hover:text-[var(--color-red)] transition-colors mt-2">
                  プロフィールを入力して求人提案を受ける
                </Link>
              )}

              <p className="mt-4 text-xs text-[var(--color-subtle)]">
                登録日: {user?.created_at ? new Date(user.created_at).toLocaleDateString('ja-JP', { timeZone: 'Asia/Tokyo' }) : '—'}
              </p>
            </div>
          </FadeUp>

          {/* Inquiry history */}
          <FadeInView className="lg:col-span-2">
            <div className="bg-white border border-[var(--color-line)] rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xs font-bold text-[var(--color-ink)] uppercase tracking-wider">
                  お問い合わせ履歴
                  {inquiries && inquiries.length > 0 && (
                    <span className="ml-2 normal-case font-normal text-[var(--color-muted)]">{inquiries.length}件</span>
                  )}
                </h2>
              </div>

              {inquiries && inquiries.length > 0 ? (
                <StaggerList className="space-y-3" stagger={0.06}>
                  {inquiries.map((inq) => {
                    const jobRow = inq.jobs as { id: number; title: string; company_name: string }[] | null
                    const job = Array.isArray(jobRow) ? jobRow[0] ?? null : jobRow
                    return (
                      <StaggerItem key={inq.id}>
                        <HoverCard>
                          <div className="border border-[var(--color-line)] rounded-xl p-4">
                            <div className="flex items-start justify-between gap-3">
                              <div className="min-w-0">
                                {job ? (
                                  <Link href={`/jobs/${job.id}`}
                                    className="font-display font-bold text-sm text-[var(--color-ink)] hover:text-[var(--color-red)] transition-colors line-clamp-1">
                                    {job.title}
                                  </Link>
                                ) : (
                                  <p className="text-sm font-bold text-[var(--color-subtle)]">（求人情報なし）</p>
                                )}
                                {job && <p className="text-xs text-[var(--color-muted)] mt-0.5">{job.company_name}</p>}
                              </div>
                              <span className="shrink-0 text-xs text-[var(--color-subtle)] whitespace-nowrap">
                                {new Date(inq.created_at).toLocaleDateString('ja-JP')}
                              </span>
                            </div>
                            <p className="mt-2 text-xs text-[var(--color-muted)] line-clamp-2 leading-relaxed">{inq.message}</p>
                            <div className="mt-2">
                              <span className="text-xs bg-green-50 text-green-700 border border-green-200 rounded-full px-2.5 py-0.5">受付済み</span>
                            </div>
                          </div>
                        </HoverCard>
                      </StaggerItem>
                    )
                  })}
                </StaggerList>
              ) : (
                <div className="py-10 text-center">
                  <p className="text-sm text-[var(--color-muted)]">まだお問い合わせ履歴がありません。</p>
                  <Link href="/jobs" className="mt-3 inline-block text-sm text-[var(--color-red)] hover:underline">
                    求人を探す →
                  </Link>
                </div>
              )}
            </div>
          </FadeInView>

        </div>
      </div>
    </>
  )
}
