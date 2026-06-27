import type { Metadata } from 'next'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { getCurrentUser } from '@/lib/supabase/queries'
import ProfileForm from './ProfileForm'

export const metadata: Metadata = { title: 'プロフィール編集' }

export default async function ProfilePage() {
  const supabase = await createClient()
  const user = await getCurrentUser()

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user!.id)
    .single()

  return (
    <>
      <div className="bg-[var(--color-bg-dark)] text-white">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 py-10">
          <Link href="/mypage" className="text-xs text-white/50 hover:text-white/80 transition-colors inline-flex items-center gap-1 mb-3">
            ← マイページへ戻る
          </Link>
          <h1 className="font-display font-black text-3xl">プロフィール編集</h1>
          <p className="mt-1 text-white/60 text-sm">入力内容はCAとの面談時に活用されます。できる限りご記入ください。</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 sm:px-10 py-8">
        <ProfileForm profile={profile} />
      </div>
    </>
  )
}
