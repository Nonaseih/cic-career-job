import type { Metadata } from 'next'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import type { Job } from '@/lib/types'
import RegisterForm from './RegisterForm'
import RegisterHero from './RegisterHero'
import PickupSlider from './PickupSlider'

export const metadata: Metadata = { title: '無料会員登録' }

export default async function RegisterPage() {
  const supabase = await createClient()
  const { data: pickupJobs } = await supabase
    .from('jobs')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false })
    .limit(12)

  return (
    <div className="bg-[var(--color-bg)]">
      <RegisterHero />

      {pickupJobs && pickupJobs.length > 0 && (
        <div className="max-w-5xl mx-auto px-6 sm:px-10 pt-10">
          <PickupSlider jobs={pickupJobs as Job[]} />
        </div>
      )}

      <div className="px-6 py-10 sm:py-12">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="font-display font-black text-2xl sm:text-3xl text-[var(--color-ink)]">無料会員登録</h2>
            <p className="text-sm sm:text-base text-[var(--color-muted)] mt-2">登録無料・完全無料でご利用いただけます</p>
          </div>
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
