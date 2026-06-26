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

  // Prefer jobs flagged as "pickup" in kintone; fall back to the newest
  // published jobs when none are flagged (or before the column is populated).
  let { data: pickupJobs } = await supabase
    .from('jobs')
    .select('*')
    .eq('is_published', true)
    .eq('is_pickup', true)
    .order('created_at', { ascending: false })
    .limit(12)

  if (!pickupJobs || pickupJobs.length === 0) {
    ;({ data: pickupJobs } = await supabase
      .from('jobs')
      .select('*')
      .eq('is_published', true)
      .order('created_at', { ascending: false })
      .limit(12))
  }

  return (
    <div className="bg-[var(--color-bg)]">
      <RegisterHero />

      {pickupJobs && pickupJobs.length > 0 && (
        <PickupSlider jobs={pickupJobs as Job[]} />
      )}

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
