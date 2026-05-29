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
  const name = (formData.get('name') as string).trim()
  const email = (formData.get('email') as string).trim()
  const phone = (formData.get('phone') as string | null)?.trim() || null
  const message = (formData.get('message') as string).trim()

  if (!name || !email || !message) {
    return { success: false, error: '必須項目を入力してください。' }
  }

  // Fetch job details for the notification email
  const jobIdNum = jobId ? Number(jobId) : null
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
