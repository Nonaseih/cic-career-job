'use server'

import { createClient } from '@/lib/supabase/server'
import { sendInquiryNotification } from '@/lib/email'

type InquiryResult = { success: true } | { success: false; error: string }

export async function submitInquiry(
  _prev: InquiryResult | null,
  formData: FormData
): Promise<InquiryResult> {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { success: false, error: 'ログインが必要です。' }

  const jobId = formData.get('job_id')
  const jobIdNum = jobId ? Number(jobId) : null

  // Logged-in members don't re-enter their details — pull them from the profile.
  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, phone')
    .eq('id', user.id)
    .single()

  const name = profile?.full_name?.trim() || user.email || '会員'
  const email = user.email ?? ''
  const phone = profile?.phone?.trim() || null
  const message = '求人詳細について詳しく聞きたい（会員からの詳細希望）'

  // Fetch job details for the notification email
  let jobTitle: string | null = null
  let companyName: string | null = null
  if (jobIdNum) {
    const { data: job } = await supabase
      .from('jobs')
      .select('title, company_name')
      .eq('id', jobIdNum)
      .single()
    jobTitle = job?.title ?? null
    companyName = job?.company_name ?? null
  }

  const { error } = await supabase.from('inquiries').insert({
    job_id: jobIdNum,
    user_id: user.id,
    name,
    email,
    phone,
    message,
  })

  if (error) {
    return { success: false, error: '送信に失敗しました。しばらくしてから再度お試しください。' }
  }

  // Fire email notification — non-blocking, don't fail the response if it errors
  sendInquiryNotification({ jobTitle, companyName, applicantName: name, applicantEmail: email, applicantPhone: phone, message })
    .catch((err) => console.error('[email] inquiry notification failed:', err))

  return { success: true }
}
