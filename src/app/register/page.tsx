import type { Metadata } from 'next'
import RegisterForm from './RegisterForm'
import { FadeUp } from '@/components/Animate'

export const metadata: Metadata = { title: '無料会員登録' }

export default function RegisterPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <FadeUp className="w-full max-w-sm">
        <div className="bg-white border border-[var(--color-cic-border)] rounded-lg p-8 shadow-sm">
          <h1 className="text-lg font-bold text-[var(--color-cic-brown)] mb-1 text-center">
            無料会員登録
          </h1>
          <p className="text-xs text-gray-400 text-center mb-6">
            登録無料・1分で完了
          </p>
          <RegisterForm />
        </div>
      </FadeUp>
    </div>
  )
}
