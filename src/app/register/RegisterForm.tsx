'use client'

import { useActionState, useState } from 'react'
import { register } from '@/app/actions/auth'
import Link from 'next/link'

export default function RegisterForm() {
  const [error, action, pending] = useActionState(register, null)
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const mismatch = confirm.length > 0 && password !== confirm

  return (
    <form action={action} className="space-y-4">
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
          <span className="ml-1 font-normal text-gray-400">（6文字以上）</span>
        </label>
        <input
          type="password"
          name="password"
          required
          minLength={6}
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-[var(--color-cic-border)] rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[var(--color-cic-red)]"
          placeholder="パスワード"
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-[var(--color-cic-brown)] mb-1">
          パスワード（確認）
        </label>
        <input
          type="password"
          required
          autoComplete="new-password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          className={`w-full border rounded px-3 py-2.5 text-sm focus:outline-none transition-colors ${
            mismatch
              ? 'border-[var(--color-cic-red)] focus:border-[var(--color-cic-red)]'
              : 'border-[var(--color-cic-border)] focus:border-[var(--color-cic-red)]'
          }`}
          placeholder="パスワードを再入力"
        />
        {mismatch && (
          <p className="mt-1 text-xs text-[var(--color-cic-red)]">パスワードが一致しません</p>
        )}
      </div>

      <button
        type="submit"
        disabled={pending || mismatch}
        className="w-full py-3 bg-[var(--color-cic-red)] text-white font-bold rounded text-sm hover:bg-[var(--color-cic-red-dark)] transition-colors disabled:opacity-60"
      >
        {pending ? '登録中...' : '無料会員登録'}
      </button>

      <p className="text-center text-xs text-gray-400 leading-relaxed">
        登録することで
        <a
          href="https://www.cic-ct.co.jp/career-job/entry/kiyaku/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--color-cic-red)] hover:underline mx-0.5"
        >
          利用規約
        </a>
        および
        <Link href="/privacy" className="text-[var(--color-cic-red)] hover:underline mx-0.5">
          プライバシーポリシー
        </Link>
        に同意したものとみなします。
      </p>

      <p className="text-center text-xs text-gray-500">
        すでにアカウントをお持ちの方は{' '}
        <Link href="/login" className="text-[var(--color-cic-red)] hover:underline font-medium">
          ログイン
        </Link>
      </p>
    </form>
  )
}
