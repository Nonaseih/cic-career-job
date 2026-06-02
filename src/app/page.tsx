import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import JobCard from '@/components/JobCard'
import { FadeUp, FadeInView, StaggerList, StaggerItem } from '@/components/Animate'
import type { Job } from '@/lib/types'

export default async function TopPage() {
  const supabase = await createClient()

  const { data: jobs } = await supabase
    .from('jobs')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false })
    .limit(6)

  const { count } = await supabase
    .from('jobs')
    .select('*', { count: 'exact', head: true })
    .eq('is_published', true)

  return (
    <>
      {/* Hero */}
      <section className="bg-[var(--color-cic-red)] text-white">
        <div className="max-w-5xl mx-auto px-4 py-10 sm:py-14">
          <FadeUp delay={0}>
            <p className="text-sm font-medium text-white/80 mb-2">施工管理技士・建設技術者専門</p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1 className="text-2xl sm:text-3xl font-bold leading-tight">
              あなたの経験を活かせる<br />
              建設会社への転職を、<br className="sm:hidden" />
              全力サポート。
            </h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="mt-3 text-sm text-white/80 leading-relaxed max-w-md">
              専任のキャリアアドバイザーが無料で求人紹介から面接対策まで対応。
              まずは気軽にご登録ください。
            </p>
          </FadeUp>
          <FadeUp delay={0.35}>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link
                href="/register"
                className="inline-block text-center px-6 py-3 bg-white text-[var(--color-cic-red)] font-bold rounded hover:bg-[var(--color-cic-cream)] transition-colors text-sm"
              >
                無料会員登録
              </Link>
              <Link
                href="/jobs"
                className="inline-block text-center px-6 py-3 border border-white text-white font-bold rounded hover:bg-white/10 transition-colors text-sm"
              >
                求人を探す
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-[var(--color-cic-brown)] text-white">
        <FadeInView delay={0.1}>
          <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-2 text-sm">
            <span className="text-white/70">掲載求人数</span>
            <span className="font-bold text-lg">
              {count?.toLocaleString() ?? 0}
              <span className="text-sm font-normal ml-0.5">件</span>
            </span>
          </div>
        </FadeInView>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-4 py-8">
        <FadeInView>
          <h2 className="text-base font-bold text-[var(--color-cic-brown)] mb-4">選ばれる3つの理由</h2>
        </FadeInView>
        <StaggerList className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { num: '01', title: '専任CAが無料サポート', body: '施工管理に特化したキャリアアドバイザーが応募〜入社まで伴走します。' },
            { num: '02', title: '非公開求人も多数', body: '一般公開されていない建設会社の求人情報を優先的にご紹介します。' },
            { num: '03', title: '入社後フォローあり', body: '入社後3ヶ月まで定期的にフォロー。ミスマッチを防ぎます。' },
          ].map((item) => (
            <StaggerItem key={item.num}>
              <div className="bg-white border border-[var(--color-cic-border)] rounded-lg p-4">
                <span className="text-2xl font-black text-[var(--color-cic-red)]/20">{item.num}</span>
                <p className="mt-1 font-bold text-sm">{item.title}</p>
                <p className="mt-1 text-xs text-gray-500 leading-relaxed">{item.body}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerList>
      </section>

      {/* Latest jobs */}
      <section className="max-w-5xl mx-auto px-4 pb-10">
        <FadeInView>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-[var(--color-cic-brown)]">新着求人</h2>
            <Link href="/jobs" className="text-xs text-[var(--color-cic-red)] hover:underline">
              すべて見る →
            </Link>
          </div>
        </FadeInView>

        {jobs && jobs.length > 0 ? (
          <StaggerList className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {(jobs as Job[]).map((job) => (
              <StaggerItem key={job.id}>
                <JobCard job={job} />
              </StaggerItem>
            ))}
          </StaggerList>
        ) : (
          <FadeInView>
            <div className="bg-white border border-[var(--color-cic-border)] rounded-lg p-8 text-center text-sm text-gray-400">
              求人情報を準備中です。しばらくお待ちください。
            </div>
          </FadeInView>
        )}

        <FadeInView delay={0.1}>
          <div className="mt-6 text-center">
            <Link
              href="/jobs"
              className="inline-block px-8 py-3 bg-[var(--color-cic-red)] text-white font-bold rounded hover:bg-[var(--color-cic-red-dark)] transition-colors text-sm"
            >
              求人一覧を見る
            </Link>
          </div>
        </FadeInView>
      </section>

      {/* CTA banner */}
      <section className="bg-[var(--color-cic-cream)] border-t border-[var(--color-cic-border)]">
        <FadeInView>
          <div className="max-w-5xl mx-auto px-4 py-10 text-center">
            <p className="text-sm text-[var(--color-cic-brown)]">まずは無料で登録して、</p>
            <p className="mt-1 text-lg font-bold">キャリアアドバイザーに相談してみる</p>
            <Link
              href="/register"
              className="mt-4 inline-block px-8 py-3 bg-[var(--color-cic-red)] text-white font-bold rounded hover:bg-[var(--color-cic-red-dark)] transition-colors text-sm"
            >
              無料会員登録（1分で完了）
            </Link>
          </div>
        </FadeInView>
      </section>
    </>
  )
}
