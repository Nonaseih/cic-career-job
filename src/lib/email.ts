import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const CA_EMAIL = process.env.CA_NOTIFICATION_EMAIL!

const PROFILE_NOTIFICATION_EMAILS = [
  'isaka@cic-ct.co.jp',
  's-matsushima@cic-ct.co.jp',
  'a-teramura@cic-ct.co.jp',
  'nakajima@cic-ct.co.jp',
  'sugawara@cic-ct.co.jp',
  'k-suzuki@cic-ct.co.jp',
  'takeuchi@cic-ct.co.jp',
  'r-nakamura@cic-ct.co.jp',
  'basshi.1208@gmail.com',
]

type InquiryEmailParams = {
  jobTitle: string | null
  companyName: string | null
  applicantName: string
  applicantEmail: string
  applicantPhone: string | null
  message: string
}

type ProfileEmailParams = {
  email: string
  fullName: string | null
  phone: string | null
  prefecture: string | null
  recentJobType: string | null
  experienceYears: string | null
  qualifications: string[]
  experienceTypes: string[]
  desiredJobType: string | null
  desiredPrefecture: string | null
  desiredSalary: string | null
  relocation: string | null
  otherRequirements: string | null
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

export async function sendProfileNotification(params: ProfileEmailParams) {
  const {
    email, fullName, phone, prefecture, recentJobType, experienceYears,
    qualifications, experienceTypes, desiredJobType, desiredPrefecture,
    desiredSalary, relocation, otherRequirements,
  } = params

  const row = (label: string, value: string, last = false) => `
            <tr>
              <td style="padding: 10px 0; ${last ? '' : 'border-bottom: 1px solid #f0ebe8; '}width: 130px; color: #5c3317; font-weight: bold; vertical-align: top;">${label}</td>
              <td style="padding: 10px 0; ${last ? '' : 'border-bottom: 1px solid #f0ebe8; '}white-space: pre-wrap;">${value}</td>
            </tr>`

  const qualificationsText = qualifications.length > 0 ? escapeHtml(qualifications.join('、')) : '—'
  const experienceTypesText = experienceTypes.length > 0 ? escapeHtml(experienceTypes.join('、')) : '—'

  await resend.emails.send({
    from: 'CIC Career <onboarding@resend.dev>',
    to: PROFILE_NOTIFICATION_EMAILS,
    subject: `【建設キャリア転職】新規プロフィール登録｜${fullName ?? email}様`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a1a;">
        <div style="background: #c8000a; padding: 20px 24px;">
          <p style="color: white; margin: 0; font-size: 14px; font-weight: bold;">建設キャリア転職 — 新規プロフィール登録</p>
        </div>
        <div style="padding: 24px; border: 1px solid #e0d8d4; border-top: none;">
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            ${row('お名前', escapeHtml(fullName ?? '—'))}
            ${row('メール', `<a href="mailto:${email}" style="color: #c8000a;">${escapeHtml(email)}</a>`)}
            ${row('電話番号', escapeHtml(phone ?? '—'))}
            ${row('都道府県', escapeHtml(prefecture ?? '—'))}
            ${row('保有資格', qualificationsText)}
            ${row('直近の職種', escapeHtml(recentJobType ?? '—'))}
            ${row('経験年数', escapeHtml(experienceYears ?? '—'))}
            ${row('経験職種', experienceTypesText)}
            ${row('希望職種', escapeHtml(desiredJobType ?? '—'))}
            ${row('希望勤務地', escapeHtml(desiredPrefecture ?? '—'))}
            ${row('希望年収', escapeHtml(desiredSalary ?? '—'))}
            ${row('転勤', escapeHtml(relocation ?? '—'))}
            ${row('その他希望条件', escapeHtml(otherRequirements ?? '—'), true)}
          </table>
          <div style="margin-top: 20px; padding: 12px 16px; background: #fff8f5; border-radius: 6px; font-size: 12px; color: #777;">
            このメールは建設キャリア転職のシステムから自動送信されています。
          </div>
        </div>
      </div>
    `,
  })
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
