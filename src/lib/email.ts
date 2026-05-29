import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const CA_EMAIL = process.env.CA_NOTIFICATION_EMAIL!

type InquiryEmailParams = {
  jobTitle: string | null
  companyName: string | null
  applicantName: string
  applicantEmail: string
  applicantPhone: string | null
  message: string
}

export async function sendInquiryNotification(params: InquiryEmailParams) {
  const { jobTitle, companyName, applicantName, applicantEmail, applicantPhone, message } = params

  await resend.emails.send({
    from: 'CIC Career <onboarding@resend.dev>',
    to: CA_EMAIL,
    subject: `【建設キャリア転職】新しいお問い合わせ｜${applicantName}様`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a1a;">
        <div style="background: #c8000a; padding: 20px 24px;">
          <p style="color: white; margin: 0; font-size: 14px; font-weight: bold;">建設キャリア転職 — 新規お問い合わせ</p>
        </div>

        <div style="padding: 24px; border: 1px solid #e0d8d4; border-top: none;">
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0ebe8; width: 120px; color: #5c3317; font-weight: bold; vertical-align: top;">求人名</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0ebe8;">${jobTitle ?? '—'}${companyName ? `<br><span style="color:#777; font-size:12px;">${companyName}</span>` : ''}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0ebe8; color: #5c3317; font-weight: bold; vertical-align: top;">お名前</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0ebe8;">${applicantName}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0ebe8; color: #5c3317; font-weight: bold; vertical-align: top;">メール</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0ebe8;"><a href="mailto:${applicantEmail}" style="color: #c8000a;">${applicantEmail}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0ebe8; color: #5c3317; font-weight: bold; vertical-align: top;">電話番号</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0ebe8;">${applicantPhone ?? '—'}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #5c3317; font-weight: bold; vertical-align: top;">メッセージ</td>
              <td style="padding: 10px 0; white-space: pre-wrap;">${message}</td>
            </tr>
          </table>

          <div style="margin-top: 24px; padding: 12px 16px; background: #fff8f5; border-radius: 6px; font-size: 12px; color: #777;">
            このメールは建設キャリア転職のシステムから自動送信されています。
          </div>
        </div>
      </div>
    `,
  })
}
