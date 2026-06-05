'use client'

import { useActionState } from 'react'
import { login } from '@/app/actions/auth'
import Link from 'next/link'

const INPUT = 'w-full border border-[var(--color-line)] rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:border-[var(--color-red)] transition-colors'

export default function LoginForm({ next }: { next: string }) {
  const [error, action, pending] = useActionState(login, null)

  return (
    <form action={action} className="space-y-4">
      <input type="hidden" name="next" value={next} />

      {error && (
        <p className="text-sm text-[var(--color-red)] bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          {error}
        </p>
      )}

      <div>
        <label className="block text-xs font-bold text-[var(--color-ink)] mb-1.5">メールアドレス</label>
        <input type="email" name="email" required autoComplete="email" className={INPUT} placeholder="example@email.com" />
      </div>

      <div>
        <label className="block text-xs font-bold text-[var(--color-ink)] mb-1.5">パスワード</label>
        <input type="password" name="password" required autoComplete="current-password" className={INPUT} placeholder="パスワード" />
      </div>

      <button type="submit" disabled={pending}
        className="w-full py-3 bg-[var(--color-red)] text-white font-display font-bold rounded-lg text-sm hover:bg-[var(--color-red-dark)] transition-colors disabled:opacity-60">
        {pending ? 'ログイン中...' : 'ログイン'}
      </button>

      <p className="text-center text-xs text-[var(--color-muted)]">
        アカウントをお持ちでない方は{' '}
        <Link href="/register" className="text-[var(--color-red)] hover:underline font-medium">無料会員登録</Link>
      </p>
    </form>
  )
}
