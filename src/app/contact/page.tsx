import type { Metadata } from 'next'
import { FadeUp } from '@/components/Animate'

export const metadata: Metadata = { title: 'お問い合わせ' }

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <FadeUp>
        <h1 className="text-lg font-bold text-[var(--color-cic-brown)] mb-1">お問い合わせ</h1>
        <p className="text-xs text-gray-400 mb-8">サービスに関するご質問・ご意見はこちらからお送りください。</p>
      </FadeUp>

      <FadeUp delay={0.1}>
      <div className="bg-white border border-[var(--color-cic-border)] rounded-lg p-6">
        <form
          action="https://formsubmit.co/fortunestephen720@gmail.com"
          method="POST"
          className="space-y-5"
        >
          <input type="hidden" name="_subject" value="【建設キャリア転職】お問い合わせ" />
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_next" value="/contact/thanks" />

          <div>
            <label className="block text-xs font-bold text-[var(--color-cic-brown)] mb-1">
              お名前 <span className="text-[var(--color-cic-red)]">*</span>
            </label>
            <input
              type="text"
              name="name"
              required
              className="w-full border border-[var(--color-cic-border)] rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[var(--color-cic-red)]"
              placeholder="山田 太郎"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[var(--color-cic-brown)] mb-1">
              メールアドレス <span className="text-[var(--color-cic-red)]">*</span>
            </label>
            <input
              type="email"
              name="email"
              required
              className="w-full border border-[var(--color-cic-border)] rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[var(--color-cic-red)]"
              placeholder="example@email.com"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[var(--color-cic-brown)] mb-1">
              お問い合わせ種別
            </label>
            <select
              name="category"
              className="w-full border border-[var(--color-cic-border)] rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[var(--color-cic-red)] bg-white"
            >
              <option value="サービスについて">サービスについて</option>
              <option value="求人について">求人について</option>
              <option value="会員登録・ログインについて">会員登録・ログインについて</option>
              <option value="その他">その他</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-[var(--color-cic-brown)] mb-1">
              お問い合わせ内容 <span className="text-[var(--color-cic-red)]">*</span>
            </label>
            <textarea
              name="message"
              required
              rows={5}
              className="w-full border border-[var(--color-cic-border)] rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[var(--color-cic-red)] resize-none"
              placeholder="お問い合わせ内容をご記入ください"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[var(--color-cic-red)] text-white font-bold rounded text-sm hover:bg-[var(--color-cic-red-dark)] transition-colors"
          >
            送信する
          </button>
        </form>
      </div>
      </FadeUp>
    </div>
  )
}
