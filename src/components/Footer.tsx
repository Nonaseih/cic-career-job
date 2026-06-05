import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-[var(--color-bg-dark)] text-white mt-auto">
      <div className="max-w-7xl mx-auto px-8 pt-16 pb-10">

        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-12 pb-12 border-b border-white/10">
          <div>
            <p className="font-display font-black text-2xl tracking-tight">建設キャリア転職</p>
            <p className="mt-2 text-sm text-white/45 max-w-xs leading-relaxed">
              施工管理技士・建設技術者専門の転職支援。キャリアアドバイザーが無料でサポートします。
            </p>
            <div className="mt-6 text-xs text-white/30 space-y-1 leading-relaxed">
              <p className="text-white/45">株式会社日本建設情報センター</p>
              <p>〒105-0003 東京都港区西新橋3-24-10 ハリファックス御成門ビル5F/6F</p>
              <p>TEL: 03-5843-7102（人材紹介事業部）</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-16 gap-y-3 text-sm text-white/45 self-start">
            <Link href="/jobs" className="hover:text-white transition-colors">求人一覧</Link>
            <Link href="/register" className="hover:text-white transition-colors">無料会員登録</Link>
            <Link href="/contact" className="hover:text-white transition-colors">お問い合わせ</Link>
            <Link href="/login" className="hover:text-white transition-colors">ログイン</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">プライバシーポリシー</Link>
            <a href="https://www.cic-ct.co.jp/career-job/entry/kiyaku/" target="_blank" rel="noopener noreferrer"
              className="hover:text-white transition-colors">利用規約</a>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/25">
          <p>© {new Date().getFullYear()} 株式会社日本建設情報センター. All rights reserved.</p>
          <a href="https://www.cic-ct.co.jp/" target="_blank" rel="noopener noreferrer"
            className="hover:text-white/50 transition-colors">cic-ct.co.jp ↗</a>
        </div>
      </div>
    </footer>
  )
}
