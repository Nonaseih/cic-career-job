import type { Metadata } from 'next'
import Link from 'next/link'
import { FadeUp, FadeInView } from '@/components/Animate'

export const metadata: Metadata = { title: '操作マニュアル' }

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="bg-white border border-[var(--color-line)] rounded-2xl p-8 scroll-mt-8">
      <h2 className="font-display font-bold text-lg text-[var(--color-text)] mb-5 pb-4 border-b border-[var(--color-line)] flex items-center gap-3">
        <span className="w-1 h-5 bg-[var(--color-red)] rounded-full shrink-0" />
        {title}
      </h2>
      {children}
    </section>
  )
}

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4 mb-5 last:mb-0">
      <div className="shrink-0 w-7 h-7 rounded-full bg-[var(--color-dark)] text-white text-xs font-latin font-bold flex items-center justify-center mt-0.5">
        {n}
      </div>
      <div>
        <p className="text-sm font-bold text-[var(--color-text)]">{title}</p>
        <div className="mt-1.5 text-sm text-[var(--color-muted)] leading-relaxed">{children}</div>
      </div>
    </div>
  )
}

function Note({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-xs text-amber-800 leading-relaxed">
      ⚠️ {children}
    </div>
  )
}

function Tip({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-4 bg-[var(--color-bg-warm)] border border-[var(--color-line)] rounded-xl px-4 py-3 text-xs text-[var(--color-muted)] leading-relaxed">
      💡 {children}
    </div>
  )
}

const TOC = [
  { id: 'login', label: '1. ログイン方法' },
  { id: 'import', label: '2. 求人データのインポート（週次更新）' },
  { id: 'inquiry', label: '3. お問い合わせ通知の確認' },
  { id: 'member-view', label: '4. 会員が見ている画面の概要' },
  { id: 'troubleshoot', label: '5. よくある質問' },
]

export default function ManualPage() {
  return (
    <>
      <div className="bg-[var(--color-bg-dark)]">
        <div className="max-w-4xl mx-auto px-8 py-12">
          <FadeUp>
            <Link href="/admin" className="text-xs text-white/40 hover:text-white/70 transition-colors inline-flex items-center gap-1 mb-4">
              ← 管理画面へ戻る
            </Link>
            <h1 className="font-display font-black text-3xl text-white">操作マニュアル</h1>
            <p className="text-sm text-white/40 mt-2">建設キャリア転職 — キャリアアドバイザー向け</p>
          </FadeUp>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-8 py-10">
        {/* TOC */}
        <FadeUp>
          <nav className="bg-white border border-[var(--color-line)] rounded-2xl p-6 mb-8">
            <p className="text-xs font-latin tracking-[.18em] uppercase text-[var(--color-muted)] mb-4">目次</p>
            <ul className="space-y-2">
              {TOC.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="text-sm text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-[var(--color-line-dark)] inline-block" />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </FadeUp>

        <div className="space-y-5">
          <FadeInView>
            <Section id="login" title="1. ログイン方法">
              <Step n={1} title="サイトにアクセスする">
                ブラウザで <code className="text-xs bg-[var(--color-bg-warm)] px-2 py-0.5 rounded">https://cic-career-job.vercel.app</code> を開きます。
              </Step>
              <Step n={2} title="「ログイン」をタップする">画面右上の「ログイン」ボタンをタップします。</Step>
              <Step n={3} title="メールアドレスとパスワードを入力する">登録済みのメールアドレスとパスワードを入力し「ログイン」を押します。</Step>
              <Step n={4} title="マイページが表示されれば完了">ログイン後は自動的にマイページへ移動します。</Step>
              <Tip>管理画面へは <code className="text-xs bg-[var(--color-bg-warm)] px-2 py-0.5 rounded">/admin</code> をURLの末尾に追加してください。</Tip>
            </Section>
          </FadeInView>

          <FadeInView>
            <Section id="import" title="2. 求人データのインポート（週次更新）">
              <p className="text-sm text-[var(--color-muted)] mb-6">kintoneのデータをエクスポートしてサイトに反映する手順です。週1〜2回を目安に実施してください。</p>
              <p className="text-xs font-bold text-[var(--color-text)] mb-3">■ kintoneからCSVを書き出す</p>
              <Step n={1} title="kintoneの求人アプリを開く">ブラウザでkintoneにログインし、求人管理アプリを開きます。</Step>
              <Step n={2} title="「レコードの書き出し」を選択する">画面右上の歯車アイコン → 「レコードの書き出し」をクリックします。</Step>
              <Step n={3} title="CSVファイルをダウンロードする">すべての項目を選択した状態で「書き出す」を押しCSVをダウンロードします。</Step>
              <div className="border-t border-[var(--color-line)] my-6" />
              <p className="text-xs font-bold text-[var(--color-text)] mb-3">■ サイトにインポートする</p>
              <Step n={4} title="管理画面を開く"><code className="text-xs bg-[var(--color-bg-warm)] px-2 py-0.5 rounded">https://cic-career-job.vercel.app/admin</code> にアクセスします。</Step>
              <Step n={5} title="CSVファイルを選択する">「ファイルを選択」を押してダウンロードしたCSVファイルを選択します。</Step>
              <Step n={6} title="「解析する」を押す">ボタンを押すとデータが読み込まれプレビューが表示されます（数秒かかります）。</Step>
              <Step n={7} title="内容を確認してインポートする">プレビューで件数と内容を確認し「〇〇件をインポートする」ボタンを押します。</Step>
              <Note>インポート前に「<strong>既存の求人をすべて削除してからインポート</strong>」にチェックが入っていることを確認してください。週次更新ではONのまま使用してください。</Note>
              <Tip>インポート完了後、求人一覧ページ（/jobs）を開いて更新されているか確認することをおすすめします。</Tip>
            </Section>
          </FadeInView>

          <FadeInView>
            <Section id="inquiry" title="3. お問い合わせ通知の確認">
              <p className="text-sm text-[var(--color-muted)] mb-5">会員が「詳細を聞きたい・応募する」ボタンから問い合わせを送信すると、CAのメールアドレスへ自動で通知が届きます。</p>
              <div className="bg-[var(--color-bg-warm)] rounded-xl p-5 mb-5">
                <p className="text-xs font-bold text-[var(--color-text)] mb-3">通知メールに含まれる情報</p>
                <ul className="space-y-1.5 text-xs text-[var(--color-muted)]">
                  {['📋 対象求人名・会社名', '👤 応募者の氏名', '✉️ メールアドレス', '📞 電話番号（入力された場合）', '💬 メッセージ内容'].map(i => <li key={i}>{i}</li>)}
                </ul>
              </div>
              <Step n={1} title="メールを確認する">通知メールが届いたら、記載された連絡先へ架電またはメールにてご連絡ください。</Step>
              <Step n={2} title="3営業日以内に対応する">会員には「3営業日以内にご連絡いたします」と案内されています。</Step>
              <Note>通知メールが届かない場合は、迷惑メールフォルダをご確認ください。</Note>
            </Section>
          </FadeInView>

          <FadeInView>
            <Section id="member-view" title="4. 会員が見ている画面の概要">
              <p className="text-sm text-[var(--color-muted)] mb-5">会員（求職者）がサイトでできることの概要です。</p>
              <div className="space-y-3">
                {[
                  { page: '求人一覧（/jobs）', access: '未ログインでも閲覧可', desc: 'キーワード・都道府県・雇用形態で検索できます。' },
                  { page: '求人詳細（/jobs/〇〇）', access: 'ログイン必須', desc: '求人の詳細情報と「詳細を聞きたい」ボタンがあります。' },
                  { page: '会員登録（/register）', access: '誰でも登録可', desc: 'メールアドレスとパスワードで登録できます。' },
                  { page: 'マイページ（/mypage）', access: 'ログイン必須', desc: '過去のお問い合わせ履歴が確認できます。' },
                ].map((item) => (
                  <div key={item.page} className="border border-[var(--color-line)] rounded-xl p-4">
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-sm font-medium text-[var(--color-text)]">{item.page}</p>
                      <span className={`shrink-0 text-xs px-2.5 py-0.5 rounded-full border ${
                        item.access.includes('必須') ? 'border-red-200 text-red-600 bg-red-50' : 'border-green-200 text-green-700 bg-green-50'
                      }`}>{item.access}</span>
                    </div>
                    <p className="text-xs text-[var(--color-muted)] mt-1.5">{item.desc}</p>
                  </div>
                ))}
              </div>
            </Section>
          </FadeInView>

          <FadeInView>
            <Section id="troubleshoot" title="5. よくある質問">
              <div className="space-y-5">
                {[
                  { q: 'ログインできません', a: 'メールアドレスとパスワードをご確認ください。パスワードを忘れた場合は開発担当者にお問い合わせください。' },
                  { q: 'CSVをアップロードしてもエラーになります', a: 'kintoneからエクスポートしたCP932（Shift-JIS）形式のCSVのみ対応しています。Excelで保存し直したファイルは文字コードが変わる場合があります。kintoneから直接ダウンロードしたファイルをそのまま使用してください。' },
                  { q: 'インポートしたのに求人一覧に反映されません', a: 'ブラウザのキャッシュが残っている場合があります。Ctrl+Shift+R（Mac: Cmd+Shift+R）で強制リロードしてください。' },
                  { q: 'お問い合わせのメールが届きません', a: '迷惑メールフォルダをご確認ください。それでも届かない場合は開発担当者にお知らせください。' },
                  { q: '求人数が増えず古いデータのままです', a: 'インポート時に「既存の求人をすべて削除してからインポート」のチェックがOFFになっていると追加されません。チェックをONにして再度インポートしてください。' },
                ].map((item) => (
                  <div key={item.q} className="border-l-2 border-[var(--color-line-dark)] pl-5">
                    <p className="text-sm font-bold text-[var(--color-text)]">Q. {item.q}</p>
                    <p className="text-sm text-[var(--color-muted)] mt-1.5 leading-relaxed">A. {item.a}</p>
                  </div>
                ))}
              </div>
            </Section>
          </FadeInView>
        </div>

        <p className="mt-10 text-center text-xs text-[var(--color-subtle)]">ご不明な点は開発担当者までお問い合わせください。</p>
      </div>
    </>
  )
}
