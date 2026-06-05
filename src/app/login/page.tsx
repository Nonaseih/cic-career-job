import type { Metadata } from 'next'
import Link from 'next/link'
import LoginForm from './LoginForm'

export const metadata: Metadata = { title: 'ログイン' }

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const { next = '/mypage' } = await searchParams

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="font-display font-black text-2xl text-[var(--color-ink)]">ログイン</h1>
          <p className="text-sm text-[var(--color-muted)] mt-2">建設キャリア転職への会員ログイン</p>
        </div>
        <div className="bg-white border border-[var(--color-line)] rounded-2xl p-8 shadow-sm">
          <LoginForm next={next} />
        </div>
        <p className="mt-6 text-center text-xs text-[var(--color-subtle)]">
          <Link href="/" className="hover:text-[var(--color-red)] transition-colors">← トップページへ戻る</Link>
        </p>
      </div>
    </div>
  )
}
