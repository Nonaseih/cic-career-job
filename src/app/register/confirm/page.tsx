import type { Metadata } from 'next'
import Link from 'next/link'
import { FadeUp } from '@/components/Animate'

export const metadata: Metadata = { title: '登録確認メールを送信しました' }

export default function RegisterConfirmPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <FadeUp className="w-full max-w-sm text-center">
        <div className="bg-white border border-[var(--color-cic-border)] rounded-lg p-8 shadow-sm">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-base font-bold text-[var(--color-cic-brown)] mb-2">
            確認メールを送信しました
          </h1>
          <p className="text-sm text-gray-500 leading-relaxed mb-6">
            ご登録いただいたメールアドレスに確認メールをお送りしました。
            メール内のリンクをクリックして登録を完了してください。
          </p>
          <Link
            href="/"
            className="text-sm text-[var(--color-cic-red)] hover:underline"
          >
            トップページへ戻る
          </Link>
        </div>
      </FadeUp>
    </div>
  )
}
