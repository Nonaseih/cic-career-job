'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { sendProfileNotification } from '@/lib/email'
import { resolveSelectOther, resolveCheckboxOther } from '@/lib/profileOptions'

export type ProfileResult = { success: false; error: string } | { success: true }

export async function saveProfile(
  _prev: ProfileResult | null,
  formData: FormData
): Promise<ProfileResult> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { success: false, error: 'ログインが必要です。' }

  // "Select at least one" groups can't be enforced via native `required`.
  const qualifications  = resolveCheckboxOther(formData, 'qualifications')
  const experienceTypes = resolveCheckboxOther(formData, 'experience_types')
  if (qualifications.length === 0)  return { success: false, error: '保有資格を1つ以上選択してください。' }
  if (experienceTypes.length === 0) return { success: false, error: '経験職種を1つ以上選択してください。' }

  const birthYearRaw = formData.get('birth_year') as string

  const profile = {
    id: user.id,
    full_name:          (formData.get('full_name') as string)?.trim() || null,
    phone:              (formData.get('phone') as string)?.trim() || null,
    birth_year:         birthYearRaw ? parseInt(birthYearRaw, 10) : null,
    prefecture:         (formData.get('prefecture') as string) || null,
    city:               (formData.get('city') as string)?.trim() || null,
    employment_status:  (formData.get('employment_status') as string) || null,
    current_employer:   (formData.get('current_employer') as string)?.trim() || null,
    recent_job_type:    resolveSelectOther(formData, 'recent_job_type'),
    experience_years:   (formData.get('experience_years') as string) || null,
    current_salary:     (formData.get('current_salary') as string) || null,
    experience_types:   experienceTypes,
    desired_job_type:   resolveSelectOther(formData, 'desired_job_type'),
    desired_prefecture: resolveSelectOther(formData, 'desired_prefecture'),
    relocation:         (formData.get('relocation') as string) || null,
    other_requirements: (formData.get('other_requirements') as string)?.trim() || null,
    desired_salary:     (formData.get('desired_salary') as string) || null,
    qualifications,
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
    qualifications: profile.qualifications,
    experienceTypes: profile.experience_types,
    desiredJobType: profile.desired_job_type,
    desiredPrefecture: profile.desired_prefecture,
    desiredSalary: profile.desired_salary,
    relocation: profile.relocation,
    otherRequirements: profile.other_requirements,
  }).catch((err) => console.error('[email] profile notification failed:', err))

  redirect('/mypage?profile=saved')
}
