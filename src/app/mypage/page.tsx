import type { Metadata } from 'next'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { logout } from '@/app/actions/auth'

export const metadata: Metadata = { title: 'マイページ' }

export default async function MyPage() {
  const supabase = await createClient()

  const [{ data: { user } }, { data: inquiries }] = await Promise.all([
    supabase.auth.getUser(),
    supabase
      .from('inquiries')
      .select('id, created_at, message, job_id, jobs(id, title, company_name)')
      .order('created_at', { ascending: false }),
  ])

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Header */}
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

      {/* Account info */}
      <section className="bg-white border border-[var(--color-cic-border)] rounded-lg p-5 mb-5">
        <h2 className="text-xs font-bold text-[var(--color-cic-brown)] mb-3">アカウント情報</h2>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[var(--color-cic-red)]/10 flex items-center justify-center shrink-0">
            <span className="text-[var(--color-cic-red)] font-bold text-sm">
              {user?.email?.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <p className="text-sm font-medium">{user?.email}</p>
            <p className="text-xs text-gray-400 mt-0.5">
              登録日: {user?.created_at ? new Date(user.created_at).toLocaleDateString('ja-JP') : '—'}
            </p>
          </div>
        </div>
      </section>

      {/* Inquiry history */}
      <section className="bg-white border border-[var(--color-cic-border)] rounded-lg p-5">
        <h2 className="text-xs font-bold text-[var(--color-cic-brown)] mb-4">
          お問い合わせ履歴
          {inquiries && inquiries.length > 0 && (
            <span className="ml-2 font-normal text-gray-400">{inquiries.length}件</span>
          )}
        </h2>

        {inquiries && inquiries.length > 0 ? (
          <ul className="space-y-3">
            {inquiries.map((inq) => {
              const jobRow = inq.jobs as { id: number; title: string; company_name: string }[] | null
              const job = Array.isArray(jobRow) ? jobRow[0] ?? null : jobRow
              return (
                <li
                  key={inq.id}
                  className="border border-[var(--color-cic-border)] rounded-lg p-4"
                >
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
                </li>
              )
            })}
          </ul>
        ) : (
          <div className="text-center py-8 text-sm text-gray-400">
            <p>まだお問い合わせ履歴がありません。</p>
            <Link
              href="/jobs"
              className="mt-3 inline-block text-[var(--color-cic-red)] hover:underline text-xs"
            >
              求人を探す →
            </Link>
          </div>
        )}
      </section>
    </div>
  )
}
