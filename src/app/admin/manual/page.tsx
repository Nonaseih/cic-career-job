import type { Metadata } from 'next'
import Link from 'next/link'
import { FadeUp, FadeInView } from '@/components/Animate'

export const metadata: Metadata = { title: '操作マニュアル' }

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="bg-white border border-[var(--color-cic-border)] rounded-lg p-6 scroll-mt-6">
      <h2 className="text-base font-bold text-[var(--color-cic-brown)] mb-4 pb-3 border-b border-[var(--color-cic-border)]">
        {title}
      </h2>
      {children}
    </section>
  )
}

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-3 mb-4 last:mb-0">
      <div className="shrink-0 w-6 h-6 rounded-full bg-[var(--color-cic-red)] text-white text-xs font-bold flex items-center justify-center mt-0.5">
        {n}
      </div>
      <div>
        <p className="text-sm font-bold text-[var(--color-foreground)]">{title}</p>
        <div className="mt-1 text-sm text-gray-600 leading-relaxed">{children}</div>
      </div>
    </div>
  )
}

function Note({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-3 bg-amber-50 border border-amber-200 rounded px-3 py-2.5 text-xs text-amber-800 leading-relaxed">
      ⚠️ {children}
    </div>
  )
}

function Tip({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-3 bg-blue-50 border border-blue-200 rounded px-3 py-2.5 text-xs text-blue-800 leading-relaxed">
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
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Header */}
      <FadeUp>
        <div className="mb-6">
          <Link href="/admin" className="text-xs text-[var(--color-cic-red)] hover:underline">
            ← 管理画面へ戻る
          </Link>
          <h1 className="mt-2 text-lg font-bold text-[var(--color-cic-brown)]">操作マニュアル</h1>
          <p className="text-xs text-gray-400 mt-1">建設キャリア転職 — キャリアアドバイザー向け</p>
        </div>
      </FadeUp>

      {/* TOC */}
      <FadeUp delay={0.1}>
        <nav className="bg-white border border-[var(--color-cic-border)] rounded-lg p-4 mb-6">
          <p className="text-xs font-bold text-[var(--color-cic-brown)] mb-2">目次</p>
          <ul className="space-y-1">
            {TOC.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="text-sm text-[var(--color-cic-red)] hover:underline"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </FadeUp>

      <div className="space-y-5">

        {/* 1. Login */}
        <FadeInView>
        <Section id="login" title="1. ログイン方法">
          <Step n={1} title="サイトにアクセスする">
            ブラウザで <span className="font-mono text-xs bg-gray-100 px-1 py-0.5 rounded">https://cic-career-job.vercel.app</span> を開きます。
          </Step>
          <Step n={2} title="「ログイン」をタップする">
            画面右上の「ログイン」ボタンをタップします。
          </Step>
          <Step n={3} title="メールアドレスとパスワードを入力する">
            登録済みのメールアドレスとパスワードを入力し、「ログイン」を押します。
          </Step>
          <Step n={4} title="マイページが表示されれば完了">
            ログイン後は自動的にマイページへ移動します。
          </Step>
          <Tip>管理画面（求人インポート）へは <span className="font-mono text-xs bg-blue-100 px-1 rounded">/admin</span> と入力するか、URLの末尾に <span className="font-mono text-xs bg-blue-100 px-1 rounded">/admin</span> を追加してください。</Tip>
        </Section>
        </FadeInView>

        {/* 2. CSV Import */}
        <FadeInView>
        <Section id="import" title="2. 求人データのインポート（週次更新）">
          <p className="text-sm text-gray-600 mb-4">kintoneのデータをエクスポートしてサイトに反映する手順です。週1〜2回を目安に実施してください。</p>

          <div className="mb-5">
            <p className="text-xs font-bold text-[var(--color-cic-brown)] mb-2">■ kintoneからCSVを書き出す</p>
            <Step n={1} title="kintoneの求人アプリを開く">
              ブラウザでkintoneにログインし、求人管理アプリを開きます。
            </Step>
            <Step n={2} title="「レコードの書き出し」を選択する">
              画面右上の歯車アイコン → 「レコードの書き出し」をクリックします。
            </Step>
            <Step n={3} title="CSVファイルをダウンロードする">
              すべての項目を選択した状態で「書き出す」を押し、CSVファイルをダウンロードします。
            </Step>
          </div>

          <div className="border-t border-[var(--color-cic-border)] pt-4">
            <p className="text-xs font-bold text-[var(--color-cic-brown)] mb-2">■ サイトにインポートする</p>
            <Step n={4} title="管理画面を開く">
              <span className="font-mono text-xs bg-gray-100 px-1 rounded">https://cic-career-job.vercel.app/admin</span> にアクセスします。
            </Step>
            <Step n={5} title="CSVファイルを選択する">
              「ファイルを選択」ボタンを押して、ダウンロードしたCSVファイルを選択します。
            </Step>
            <Step n={6} title="「解析する」を押す">
              ボタンを押すとデータが読み込まれ、プレビューが表示されます（数秒かかります）。
            </Step>
            <Step n={7} title="内容を確認してインポートする">
              プレビューで件数と内容を確認します。問題なければ「〇〇件をインポートする」ボタンを押します。
            </Step>
          </div>

          <Note>
            インポート前に「<strong>既存の求人をすべて削除してからインポート</strong>」にチェックが入っていることを確認してください。これがONの場合、古いデータが削除されてから新しいデータが登録されます。週次更新ではONのまま使用してください。
          </Note>
          <Tip>インポート完了後、求人一覧ページ（/jobs）を開いて更新されているか確認することをおすすめします。</Tip>
        </Section>
        </FadeInView>

        {/* 3. Inquiries */}
        <FadeInView>
        <Section id="inquiry" title="3. お問い合わせ通知の確認">
          <p className="text-sm text-gray-600 mb-4">
            会員が求人詳細ページの「詳細を聞きたい・応募する」ボタンから問い合わせを送信すると、自動的にCAのメールアドレスへ通知が届きます。
          </p>

          <div className="bg-[var(--color-cic-gray)] rounded-lg p-4 text-sm space-y-2">
            <p className="font-bold text-xs text-[var(--color-cic-brown)]">通知メールに含まれる情報</p>
            <ul className="space-y-1 text-xs text-gray-600">
              <li>📋 対象求人名・会社名</li>
              <li>👤 応募者の氏名</li>
              <li>✉️ メールアドレス</li>
              <li>📞 電話番号（入力された場合）</li>
              <li>💬 メッセージ内容</li>
            </ul>
          </div>

          <Step n={1} title="メールを確認する" >
            通知メールが届いたら、記載された連絡先へ架電またはメールにてご連絡ください。
          </Step>
          <Step n={2} title="3営業日以内に対応する">
            会員には「3営業日以内にご連絡いたします」と案内されています。
          </Step>
          <Note>通知メールが届かない場合は、迷惑メールフォルダをご確認ください。</Note>
        </Section>
        </FadeInView>

        {/* 4. Member view */}
        <FadeInView>
        <Section id="member-view" title="4. 会員が見ている画面の概要">
          <p className="text-sm text-gray-600 mb-4">会員（求職者）がサイトでできることの概要です。案内・サポート時の参考にしてください。</p>

          <div className="space-y-3">
            {[
              {
                page: '求人一覧（/jobs）',
                access: '未ログインでも閲覧可',
                desc: 'キーワード・都道府県・雇用形態で検索できます。',
              },
              {
                page: '求人詳細（/jobs/〇〇）',
                access: 'ログイン必須',
                desc: '求人の詳細情報と「詳細を聞きたい」ボタンがあります。',
              },
              {
                page: '会員登録（/register）',
                access: '誰でも登録可',
                desc: 'メールアドレスとパスワードで登録できます。',
              },
              {
                page: 'マイページ（/mypage）',
                access: 'ログイン必須',
                desc: '過去のお問い合わせ履歴が確認できます。',
              },
            ].map((item) => (
              <div key={item.page} className="border border-[var(--color-cic-border)] rounded-lg p-3">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-bold">{item.page}</p>
                  <span className={`shrink-0 text-xs px-2 py-0.5 rounded ${
                    item.access.includes('必須')
                      ? 'bg-red-50 text-red-600 border border-red-200'
                      : 'bg-green-50 text-green-700 border border-green-200'
                  }`}>
                    {item.access}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </Section>
        </FadeInView>

        {/* 5. FAQ */}
        <FadeInView>
        <Section id="troubleshoot" title="5. よくある質問">
          <div className="space-y-4">
            {[
              {
                q: 'ログインできません',
                a: 'メールアドレスとパスワードをご確認ください。パスワードを忘れた場合は管理者にお問い合わせください。',
              },
              {
                q: 'CSVをアップロードしてもエラーになります',
                a: 'kintoneからエクスポートしたCP932（Shift-JIS）形式のCSVファイルのみ対応しています。Excelで保存し直したファイルは文字コードが変わる場合があります。kintoneから直接ダウンロードしたファイルをそのまま使用してください。',
              },
              {
                q: 'インポートしたのに求人一覧に反映されません',
                a: 'ブラウザのキャッシュが残っている場合があります。Ctrl+Shift+R（Mac: Cmd+Shift+R）で強制リロードしてください。',
              },
              {
                q: 'お問い合わせのメールが届きません',
                a: '迷惑メールフォルダをご確認ください。それでも届かない場合は開発担当者にお知らせください。',
              },
              {
                q: '求人数が増えず古いデータのままです',
                a: 'インポート時に「既存の求人をすべて削除してからインポート」のチェックがOFFになっている場合、データが追加されません。チェックをONにして再度インポートしてください。',
              },
            ].map((item) => (
              <div key={item.q} className="border-l-2 border-[var(--color-cic-red)] pl-4">
                <p className="text-sm font-bold">Q. {item.q}</p>
                <p className="text-sm text-gray-600 mt-1 leading-relaxed">A. {item.a}</p>
              </div>
            ))}
          </div>
        </Section>
        </FadeInView>

      </div>

      {/* Footer note */}
      <p className="mt-8 text-center text-xs text-gray-400">
        ご不明な点は開発担当者までお問い合わせください。
      </p>
    </div>
  )
}
