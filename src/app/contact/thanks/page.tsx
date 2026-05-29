import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = { title: 'お問い合わせ完了' }

export default function ContactThanksPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm text-center">
        <div className="bg-white border border-[var(--color-cic-border)] rounded-lg p-8 shadow-sm">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-base font-bold text-[var(--color-cic-brown)] mb-2">
            お問い合わせを受け付けました
          </h1>
          <p className="text-sm text-gray-500 leading-relaxed mb-6">
            内容を確認のうえ、担当者より3営業日以内にご連絡いたします。
          </p>
          <Link href="/" className="text-sm text-[var(--color-cic-red)] hover:underline">
            トップページへ戻る
          </Link>
        </div>
      </div>
    </div>
  )
}
