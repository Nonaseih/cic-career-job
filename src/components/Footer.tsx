import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-[var(--color-ink)] text-white mt-auto">
      <div className="max-w-6xl mx-auto px-6 sm:px-10 py-12">
        <div className="flex flex-col sm:flex-row justify-between gap-10">
          <div className="max-w-xs">
            <p className="font-display font-bold text-lg">建設キャリア転職</p>
            <p className="text-sm text-white/55 mt-1 leading-relaxed">
              建設業・施工管理技士専門の転職支援サービスです。
              経験豊富なキャリアアドバイザーが無料でサポートします。
            </p>
            <div className="mt-5 text-xs text-white/40 space-y-0.5 leading-relaxed">
              <p className="text-white/55 font-medium">株式会社日本建設情報センター</p>
              <p>〒105-0003 東京都港区西新橋3-24-10</p>
              <p>ハリファックス御成門ビル5F/6F</p>
              <p>TEL: 03-5843-7102（人材紹介事業部）</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-10 text-sm">
            <div>
              <p className="text-xs font-bold text-white/40 uppercase tracking-wider mb-3">求人・サービス</p>
              <div className="flex flex-col gap-2 text-white/65">
                <Link href="/jobs" className="hover:text-white transition-colors">求人一覧</Link>
                <Link href="/register" className="hover:text-white transition-colors">無料会員登録</Link>
                <Link href="/login" className="hover:text-white transition-colors">ログイン</Link>
              </div>
            </div>
            <div>
              <p className="text-xs font-bold text-white/40 uppercase tracking-wider mb-3">サポート</p>
              <div className="flex flex-col gap-2 text-white/65">
                <Link href="/contact" className="hover:text-white transition-colors">お問い合わせ</Link>
                <Link href="/privacy" className="hover:text-white transition-colors">プライバシーポリシー</Link>
                <a href="https://www.cic-ct.co.jp/career-job/entry/kiyaku/" target="_blank" rel="noopener noreferrer"
                  className="hover:text-white transition-colors">利用規約</a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/30">
          <p>© {new Date().getFullYear()} 株式会社日本建設情報センター. All rights reserved.</p>
          <a href="https://www.cic-ct.co.jp/" target="_blank" rel="noopener noreferrer"
            className="hover:text-white/60 transition-colors">cic-ct.co.jp ↗</a>
        </div>
      </div>
    </footer>
  )
}
