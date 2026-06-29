import type { Metadata } from 'next'
import Link from 'next/link'
import RegisterForm from './RegisterForm'
import RegisterHero from './RegisterHero'
import PickupSlider from './PickupSlider'

export const metadata: Metadata = { title: '無料会員登録' }

export default function RegisterPage() {
  return (
    <div className="bg-[var(--color-bg)]">
      <RegisterHero />
      <PickupSlider />

      <div className="px-6 py-6 sm:py-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white border border-[var(--color-line)] rounded-2xl p-6 sm:p-8 shadow-sm">
            <RegisterForm />
          </div>
          <p className="mt-6 text-center text-xs text-[var(--color-subtle)]">
            <Link href="/" className="hover:text-[var(--color-red)] transition-colors">← トップページへ戻る</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
