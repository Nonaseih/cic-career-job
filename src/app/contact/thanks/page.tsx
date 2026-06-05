import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = { title: 'お問い合わせ完了' }

export default function ContactThanksPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm text-center">
        <div className="bg-white border border-[var(--color-line)] rounded-2xl p-10 shadow-sm">
          <div className="w-14 h-14 bg-green-50 border border-green-200 rounded-full flex items-center justify-center mx-auto mb-5">
            <svg className="w-7 h-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="font-display font-bold text-[var(--color-ink)] text-lg mb-2">お問い合わせを受け付けました</h1>
          <p className="text-sm text-[var(--color-muted)] leading-relaxed mb-6">
            内容を確認のうえ、担当者より3営業日以内にご連絡いたします。
          </p>
          <Link href="/" className="text-sm text-[var(--color-red)] hover:underline">トップページへ戻る</Link>
        </div>
      </div>
    </div>
  )
}
