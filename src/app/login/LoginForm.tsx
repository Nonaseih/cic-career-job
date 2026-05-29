'use client'

import { useActionState } from 'react'
import { login } from '@/app/actions/auth'
import Link from 'next/link'

export default function LoginForm({ next }: { next: string }) {
  const [error, action, pending] = useActionState(login, null)

  return (
    <form action={action} className="space-y-4">
      <input type="hidden" name="next" value={next} />

      {error && (
        <p className="text-sm text-[var(--color-cic-red)] bg-red-50 border border-red-200 rounded px-3 py-2">
          {error}
        </p>
      )}

      <div>
        <label className="block text-xs font-bold text-[var(--color-cic-brown)] mb-1">
          メールアドレス
        </label>
        <input
          type="email"
          name="email"
          required
          autoComplete="email"
          className="w-full border border-[var(--color-cic-border)] rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[var(--color-cic-red)]"
          placeholder="example@email.com"
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-[var(--color-cic-brown)] mb-1">
          パスワード
        </label>
        <input
          type="password"
          name="password"
          required
          autoComplete="current-password"
          className="w-full border border-[var(--color-cic-border)] rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[var(--color-cic-red)]"
          placeholder="パスワード"
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full py-3 bg-[var(--color-cic-red)] text-white font-bold rounded text-sm hover:bg-[var(--color-cic-red-dark)] transition-colors disabled:opacity-60"
      >
        {pending ? 'ログイン中...' : 'ログイン'}
      </button>

      <p className="text-center text-xs text-gray-500">
        アカウントをお持ちでない方は{' '}
        <Link href="/register" className="text-[var(--color-cic-red)] hover:underline font-medium">
          無料会員登録
        </Link>
      </p>
    </form>
  )
}
