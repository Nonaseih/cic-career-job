import type { Metadata } from 'next'
import Link from 'next/link'
import RegisterForm from './RegisterForm'

export const metadata: Metadata = { title: '無料会員登録' }

export default function RegisterPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="font-display font-black text-2xl text-[var(--color-ink)]">無料会員登録</h1>
          <p className="text-sm text-[var(--color-muted)] mt-2">登録無料・1分で完了</p>
        </div>
        <div className="bg-white border border-[var(--color-line)] rounded-2xl p-8 shadow-sm">
          <RegisterForm />
        </div>
        <p className="mt-6 text-center text-xs text-[var(--color-subtle)]">
          <Link href="/" className="hover:text-[var(--color-red)] transition-colors">← トップページへ戻る</Link>
        </p>
      </div>
    </div>
  )
}
