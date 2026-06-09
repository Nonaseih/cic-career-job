import type { Metadata } from 'next'
import Link from 'next/link'
import RegisterForm from './RegisterForm'

export const metadata: Metadata = { title: '無料会員登録' }

export default function RegisterPage() {
  return (
    <div className="px-6 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="font-display font-black text-2xl text-[var(--color-ink)]">無料会員登録</h1>
          <p className="text-sm text-[var(--color-muted)] mt-2">登録無料・完全無料でご利用いただけます</p>
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
