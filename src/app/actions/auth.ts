'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { createClient as createServiceClient } from '@supabase/supabase-js'
import { sendProfileNotification } from '@/lib/email'
import { resolveSelectOther, resolveCheckboxOther } from '@/lib/profileOptions'

export async function login(
  _prev: string | null,
  formData: FormData
): Promise<string | null> {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const next = (formData.get('next') as string) || '/mypage'

  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    if (error.message.includes('Invalid login credentials')) {
      return 'メールアドレスまたはパスワードが正しくありません。'
    }
    return 'ログインに失敗しました。しばらくしてから再度お試しください。'
  }

  redirect(next)
}

export async function register(
  _prev: string | null,
  formData: FormData
): Promise<string | null> {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const supabase = await createClient()
  const { error } = await supabase.auth.signUp({ email, password })

  if (error) {
    if (error.message.includes('already registered')) {
      return 'このメールアドレスはすでに登録されています。'
    }
    if (error.message.includes('Password should be')) {
      return 'パスワードは6文字以上で入力してください。'
    }
    return '登録に失敗しました。しばらくしてから再度お試しください。'
  }

  redirect('/register/confirm')
}

export async function registerWithProfile(
  _prev: string | null,
  formData: FormData
): Promise<string | null> {
  const email    = formData.get('email') as string
  const password = formData.get('password') as string

  // 0. Validate "select at least one" groups before creating the account,
  //    since native `required` can't enforce this on checkbox groups.
  const qualifications  = resolveCheckboxOther(formData, 'qualifications')
  const experienceTypes = resolveCheckboxOther(formData, 'experience_types')
  if (qualifications.length === 0)  return '保有資格を1つ以上選択してください。'
  if (experienceTypes.length === 0) return '経験職種を1つ以上選択してください。'

  // 1. Sign up the user
  const supabase = await createClient()
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({ email, password })

  if (signUpError) {
    if (signUpError.message.includes('already registered')) return 'このメールアドレスはすでに登録されています。'
    if (signUpError.message.includes('Password should be')) return 'パスワードは6文字以上で入力してください。'
    return '登録に失敗しました。しばらくしてから再度お試しください。'
  }

  const userId = signUpData.user?.id
  if (!userId) return '登録に失敗しました。しばらくしてから再度お試しください。'

  // 2. Save profile using service role (user not yet confirmed, bypasses RLS)
  const serviceClient = createServiceClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const birthYearRaw = formData.get('birth_year') as string
  const profile = {
    id:                userId,
    full_name:         (formData.get('full_name') as string)?.trim() || null,
    phone:             (formData.get('phone') as string)?.trim() || null,
    birth_year:        birthYearRaw ? parseInt(birthYearRaw, 10) : null,
    prefecture:        (formData.get('prefecture') as string) || null,
    city:              (formData.get('city') as string)?.trim() || null,
    employment_status: (formData.get('employment_status') as string) || null,
    current_employer:  (formData.get('current_employer') as string)?.trim() || null,
    recent_job_type:   resolveSelectOther(formData, 'recent_job_type'),
    experience_years:  (formData.get('experience_years') as string) || null,
    current_salary:    (formData.get('current_salary') as string) || null,
    experience_types:  experienceTypes,
    desired_job_type:  resolveSelectOther(formData, 'desired_job_type'),
    desired_prefecture:resolveSelectOther(formData, 'desired_prefecture'),
    relocation:        (formData.get('relocation') as string) || null,
    other_requirements:(formData.get('other_requirements') as string)?.trim() || null,
    desired_salary:    (formData.get('desired_salary') as string) || null,
    qualifications,
  }

  await serviceClient.from('profiles').upsert(profile)

  // 3. Send notification — non-blocking
  sendProfileNotification({
    email,
    fullName:          profile.full_name,
    phone:             profile.phone,
    prefecture:        profile.prefecture,
    recentJobType:     profile.recent_job_type,
    experienceYears:   profile.experience_years,
    qualifications:    profile.qualifications,
    experienceTypes:   profile.experience_types,
    desiredJobType:    profile.desired_job_type,
    desiredPrefecture: profile.desired_prefecture,
    desiredSalary:     profile.desired_salary,
    relocation:        profile.relocation,
    otherRequirements: profile.other_requirements,
  }).catch((err) => console.error('[email] profile notification failed:', err))

  redirect('/register/confirm')
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/')
}
