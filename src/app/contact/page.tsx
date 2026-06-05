import type { Metadata } from 'next'
import PageHeader from '@/components/PageHeader'

export const metadata: Metadata = { title: 'お問い合わせ' }

const INPUT = 'w-full border border-[var(--color-line)] rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:border-[var(--color-red)] transition-colors'

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="お問い合わせ"
        subtitle="サービスに関するご質問・ご意見はこちらからお送りください。"
        crumbs={[{ label: 'TOP', href: '/' }, { label: 'お問い合わせ' }]}
      />

      <div className="max-w-2xl mx-auto px-6 py-12">
        <div className="bg-white border border-[var(--color-line)] rounded-2xl p-8 shadow-sm">
          <form
            action="https://formsubmit.co/fortunestephen720@gmail.com"
            method="POST"
            className="space-y-5"
          >
            <input type="hidden" name="_subject" value="【建設キャリア転職】お問い合わせ" />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_next" value="/contact/thanks" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-[var(--color-ink)] mb-1.5">
                  お名前 <span className="text-[var(--color-red)]">*</span>
                </label>
                <input type="text" name="name" required className={INPUT} placeholder="山田 太郎" />
              </div>
              <div>
                <label className="block text-xs font-bold text-[var(--color-ink)] mb-1.5">
                  メールアドレス <span className="text-[var(--color-red)]">*</span>
                </label>
                <input type="email" name="email" required className={INPUT} placeholder="example@email.com" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[var(--color-ink)] mb-1.5">お問い合わせ種別</label>
              <select name="category" className={INPUT}>
                <option value="サービスについて">サービスについて</option>
                <option value="求人について">求人について</option>
                <option value="会員登録・ログインについて">会員登録・ログインについて</option>
                <option value="その他">その他</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[var(--color-ink)] mb-1.5">
                お問い合わせ内容 <span className="text-[var(--color-red)]">*</span>
              </label>
              <textarea name="message" required rows={5}
                className={`${INPUT} resize-none`}
                placeholder="お問い合わせ内容をご記入ください" />
            </div>

            <button type="submit"
              className="w-full py-3 bg-[var(--color-red)] text-white font-display font-bold rounded-lg text-sm hover:bg-[var(--color-red-dark)] transition-colors">
              送信する
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
