'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { sendProfileNotification } from '@/lib/email'

export type ProfileResult = { success: false; error: string } | { success: true }

export async function saveProfile(
  _prev: ProfileResult | null,
  formData: FormData
): Promise<ProfileResult> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { success: false, error: 'ログインが必要です。' }

  const birthYearRaw = formData.get('birth_year') as string
  const canRelocateRaw = formData.get('can_relocate')

  const profile = {
    id: user.id,
    full_name:          (formData.get('full_name') as string)?.trim() || null,
    phone:              (formData.get('phone') as string)?.trim() || null,
    birth_year:         birthYearRaw ? parseInt(birthYearRaw, 10) : null,
    prefecture:         (formData.get('prefecture') as string) || null,
    city:               (formData.get('city') as string)?.trim() || null,
    employment_status:  (formData.get('employment_status') as string) || null,
    current_employer:   (formData.get('current_employer') as string)?.trim() || null,
    recent_job_type:    (formData.get('recent_job_type') as string) || null,
    experience_years:   (formData.get('experience_years') as string) || null,
    current_salary:     (formData.get('current_salary') as string) || null,
    experience_types:   formData.getAll('experience_types') as string[],
    desired_job_type:   (formData.get('desired_job_type') as string) || null,
    desired_prefecture: (formData.get('desired_prefecture') as string) || null,
    can_relocate:       canRelocateRaw === 'on',
    desired_salary:     (formData.get('desired_salary') as string) || null,
    qualifications:     formData.getAll('qualifications') as string[],
  }

  const { error } = await supabase.from('profiles').upsert(profile)

  if (error) {
    return { success: false, error: 'プロフィールの保存に失敗しました。もう一度お試しください。' }
  }

  // Send notification emails — non-blocking
  sendProfileNotification({
    email: user.email ?? '',
    fullName: profile.full_name,
    phone: profile.phone,
    prefecture: profile.prefecture,
    recentJobType: profile.recent_job_type,
    experienceYears: profile.experience_years,
  }).catch((err) => console.error('[email] profile notification failed:', err))

  redirect('/mypage?profile=saved')
}
