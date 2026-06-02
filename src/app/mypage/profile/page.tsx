import type { Metadata } from 'next'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import ProfileForm from './ProfileForm'
import { FadeUp } from '@/components/Animate'

export const metadata: Metadata = { title: 'プロフィール編集' }

export default async function ProfilePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user!.id)
    .single()

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <FadeUp>
        <div className="mb-6">
          <Link href="/mypage" className="text-xs text-[var(--color-cic-red)] hover:underline">
            ← マイページへ戻る
          </Link>
          <h1 className="mt-2 text-lg font-bold text-[var(--color-cic-brown)]">プロフィール編集</h1>
          <p className="text-xs text-gray-400 mt-1">
            入力内容はCAとの面談時に活用されます。できる限りご記入ください。
          </p>
        </div>
      </FadeUp>
      <FadeUp delay={0.1}>
        <ProfileForm profile={profile} />
      </FadeUp>
    </div>
  )
}
