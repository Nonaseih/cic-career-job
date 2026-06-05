import type { Metadata } from 'next'
import PageHeader from '@/components/PageHeader'

export const metadata: Metadata = { title: 'プライバシーポリシー' }

const SECTIONS = [
  { title: '1. 個人情報の取得', body: '当サービスは、会員登録・ログイン・お問い合わせ・求人への応募などの際に、氏名、メールアドレス、電話番号等の個人情報を取得します。' },
  { title: '2. 個人情報の利用目的', body: '取得した個人情報は、以下の目的に限り利用します。\n・キャリアアドバイザーによる転職支援サービスの提供\n・求人情報・サービスに関するご案内\n・お問い合わせへの対応\n・サービスの改善・分析' },
  { title: '3. 第三者への提供', body: '当サービスは、法令に基づく場合または利用者の同意がある場合を除き、個人情報を第三者に提供しません。ただし、転職支援のためにご紹介先企業に情報を提供する場合は、事前に利用者の同意を得ます。' },
  { title: '4. 個人情報の管理', body: '当サービスは、個人情報への不正アクセス・紛失・破壊・改ざん・漏洩等を防ぐため、適切な安全管理措置を講じます。' },
  { title: '5. Cookieの利用', body: '当サービスは、ログイン状態の維持・サービス改善のためにCookieを使用します。ブラウザの設定によりCookieを無効にすることができますが、一部機能が利用できなくなる場合があります。' },
  { title: '6. 個人情報の開示・訂正・削除', body: '利用者は、当サービスが保有する自己の個人情報について、開示・訂正・削除を求めることができます。ご希望の場合はお問い合わせフォームよりご連絡ください。' },
  { title: '7. プライバシーポリシーの変更', body: '当サービスは、必要に応じて本ポリシーを変更する場合があります。変更後のポリシーは本ページに掲載した時点から効力を持ちます。' },
  { title: '8. お問い合わせ', body: '個人情報の取り扱いに関するご質問・ご要望は、サイト内のお問い合わせフォームよりご連絡ください。' },
]

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        title="プライバシーポリシー"
        subtitle="最終更新日: 2026年5月29日"
        crumbs={[{ label: 'TOP', href: '/' }, { label: 'プライバシーポリシー' }]}
      />

      <div className="max-w-2xl mx-auto px-6 py-12">
        <div className="bg-white border border-[var(--color-line)] rounded-2xl p-8 shadow-sm">
          <p className="text-sm text-[var(--color-body)] leading-relaxed mb-8">
            株式会社日本建設情報センター（以下「当社」）は、利用者の個人情報の保護を重要な責務と考え、以下のとおりプライバシーポリシーを定めます。
          </p>

          <div className="space-y-7">
            {SECTIONS.map((s) => (
              <div key={s.title}>
                <h2 className="font-display font-bold text-[var(--color-ink)] text-sm flex items-center gap-2 mb-2">
                  <span className="inline-block w-1 h-4 bg-[var(--color-red)] rounded-full shrink-0" />
                  {s.title}
                </h2>
                <p className="text-sm text-[var(--color-body)] leading-relaxed whitespace-pre-line pl-3">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
