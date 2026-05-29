import type { Metadata } from 'next'
import LoginForm from './LoginForm'

export const metadata: Metadata = { title: 'ログイン' }

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>
}) {
  const { next = '/mypage' } = await searchParams

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="bg-white border border-[var(--color-cic-border)] rounded-lg p-8 shadow-sm">
          <h1 className="text-lg font-bold text-[var(--color-cic-brown)] mb-6 text-center">
            ログイン
          </h1>
          <LoginForm next={next} />
        </div>
      </div>
    </div>
  )
}
