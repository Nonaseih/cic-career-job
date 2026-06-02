import type { Metadata } from 'next'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { logout } from '@/app/actions/auth'
import { FadeUp, FadeInView, StaggerList, StaggerItem } from '@/components/Animate'

export const metadata: Metadata = { title: 'マイページ' }

export default async function MyPage({
  searchParams,
}: {
  searchParams: Promise<{ profile?: string }>
}) {
  const { profile: profileSaved } = await searchParams
  const supabase = await createClient()

  const [{ data: { user } }, { data: inquiries }, { data: profile }] = await Promise.all([
    supabase.auth.getUser(),
    supabase
      .from('inquiries')
      .select('id, created_at, message, job_id, jobs(id, title, company_name)')
      .order('created_at', { ascending: false }),
    supabase.from('profiles').select('full_name, desired_job_type, desired_prefecture, qualifications').single(),
  ])

  const hasProfile = !!profile?.full_name

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Header */}
      <FadeUp>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-lg font-bold text-[var(--color-cic-brown)]">マイページ</h1>
          <form action={logout}>
            <button
              type="submit"
              className="text-xs text-gray-400 hover:text-[var(--color-cic-red)] transition-colors border border-[var(--color-cic-border)] rounded px-3 py-1.5"
            >
              ログアウト
            </button>
          </form>
        </div>
      </FadeUp>

      {/* Profile saved toast */}
      {profileSaved === 'saved' && (
        <FadeUp className="mb-4">
          <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-3 text-sm text-green-700 flex items-center gap-2">
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            プロフィールを保存しました。
          </div>
        </FadeUp>
      )}

      {/* Profile incomplete banner */}
      {!hasProfile && (
        <FadeUp delay={0.1} className="mb-4">
          <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-4">
            <p className="text-sm font-bold text-amber-800">プロフィールが未入力です</p>
            <p className="text-xs text-amber-700 mt-1 leading-relaxed">
              資格・希望条件を入力することで、CAがより適切な求人をご提案できます。
            </p>
            <Link
              href="/mypage/profile"
              className="mt-3 inline-block px-4 py-2 bg-amber-600 text-white text-xs font-bold rounded hover:bg-amber-700 transition-colors"
            >
              プロフィールを入力する →
            </Link>
          </div>
        </FadeUp>
      )}

      {/* Account info */}
      <FadeUp delay={0.15}>
        <section className="bg-white border border-[var(--color-cic-border)] rounded-lg p-5 mb-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs font-bold text-[var(--color-cic-brown)]">アカウント情報</h2>
            <Link href="/mypage/profile" className="text-xs text-[var(--color-cic-red)] hover:underline">
              {hasProfile ? 'プロフィールを編集' : 'プロフィールを入力'}
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[var(--color-cic-red)]/10 flex items-center justify-center shrink-0">
              <span className="text-[var(--color-cic-red)] font-bold text-sm">
                {profile?.full_name?.charAt(0) ?? user?.email?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium">{profile?.full_name ?? user?.email}</p>
              {profile?.full_name && (
                <p className="text-xs text-gray-400">{user?.email}</p>
              )}
              <p className="text-xs text-gray-400 mt-0.5">
                登録日: {user?.created_at ? new Date(user.created_at).toLocaleDateString('ja-JP') : '—'}
              </p>
            </div>
          </div>

          {/* Profile summary */}
          {hasProfile && (
            <div className="mt-4 pt-4 border-t border-[var(--color-cic-border)] grid grid-cols-1 sm:grid-cols-3 gap-3">
              {profile.desired_job_type && (
                <div>
                  <p className="text-xs text-gray-400">希望職種</p>
                  <p className="text-xs font-medium mt-0.5">{profile.desired_job_type}</p>
                </div>
              )}
              {profile.desired_prefecture && (
                <div>
                  <p className="text-xs text-gray-400">希望勤務地</p>
                  <p className="text-xs font-medium mt-0.5">{profile.desired_prefecture}</p>
                </div>
              )}
              {profile.qualifications && profile.qualifications.length > 0 && (
                <div>
                  <p className="text-xs text-gray-400">保有資格</p>
                  <p className="text-xs font-medium mt-0.5">{profile.qualifications.slice(0, 2).join('・')}{profile.qualifications.length > 2 ? ` 他${profile.qualifications.length - 2}件` : ''}</p>
                </div>
              )}
            </div>
          )}
        </section>
      </FadeUp>

      {/* Inquiry history */}
      <FadeInView>
        <section className="bg-white border border-[var(--color-cic-border)] rounded-lg p-5">
          <h2 className="text-xs font-bold text-[var(--color-cic-brown)] mb-4">
            お問い合わせ履歴
            {inquiries && inquiries.length > 0 && (
              <span className="ml-2 font-normal text-gray-400">{inquiries.length}件</span>
            )}
          </h2>

          {inquiries && inquiries.length > 0 ? (
            <StaggerList className="space-y-3" stagger={0.07}>
              {inquiries.map((inq) => {
                const jobRow = inq.jobs as { id: number; title: string; company_name: string }[] | null
                const job = Array.isArray(jobRow) ? jobRow[0] ?? null : jobRow
                return (
                  <StaggerItem key={inq.id}>
                    <div className="border border-[var(--color-cic-border)] rounded-lg p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          {job ? (
                            <Link
                              href={`/jobs/${job.id}`}
                              className="text-sm font-bold hover:text-[var(--color-cic-red)] transition-colors line-clamp-1"
                            >
                              {job.title}
                            </Link>
                          ) : (
                            <p className="text-sm font-bold text-gray-400">（求人情報なし）</p>
                          )}
                          {job && (
                            <p className="text-xs text-[var(--color-cic-brown)] mt-0.5">{job.company_name}</p>
                          )}
                        </div>
                        <span className="shrink-0 text-xs text-gray-400 whitespace-nowrap">
                          {new Date(inq.created_at).toLocaleDateString('ja-JP')}
                        </span>
                      </div>
                      <p className="mt-2 text-xs text-gray-500 line-clamp-2 leading-relaxed">{inq.message}</p>
                      <div className="mt-2">
                        <span className="text-xs bg-green-50 text-green-700 border border-green-200 rounded px-2 py-0.5">
                          受付済み
                        </span>
                      </div>
                    </div>
                  </StaggerItem>
                )
              })}
            </StaggerList>
          ) : (
            <div className="text-center py-8 text-sm text-gray-400">
              <p>まだお問い合わせ履歴がありません。</p>
              <Link href="/jobs" className="mt-3 inline-block text-[var(--color-cic-red)] hover:underline text-xs">
                求人を探す →
              </Link>
            </div>
          )}
        </section>
      </FadeInView>
    </div>
  )
}
