import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-[var(--color-navy-900)] text-white mt-auto">
      <div className="max-w-6xl mx-auto px-6 sm:px-10 py-10">
        <div className="flex flex-col sm:flex-row justify-between gap-8">

          {/* Brand + company */}
          <div>
            <p className="font-display font-bold text-lg text-white">建設キャリア転職</p>
            <p className="text-sm text-white/66 mt-1">施工管理技士の転職支援サイト</p>
            <div className="mt-4 text-xs text-white/50 space-y-0.5 leading-relaxed">
              <p>株式会社日本建設情報センター</p>
              <p>〒105-0003 東京都港区西新橋3-24-10</p>
              <p>ハリファックス御成門ビル5F/6F</p>
              <p>TEL: 03-5843-7102（人材紹介事業部）</p>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex flex-col sm:flex-row gap-3 text-sm text-white/66 self-start">
            <Link href="/jobs" className="hover:text-white transition-colors">求人一覧</Link>
            <Link href="/contact" className="hover:text-white transition-colors">お問い合わせ</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">プライバシーポリシー</Link>
            <a
              href="https://www.cic-ct.co.jp/career-job/entry/kiyaku/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              利用規約
            </a>
          </nav>
        </div>

        <p className="mt-8 text-xs text-white/30 border-t border-white/12 pt-5">
          © {new Date().getFullYear()} 株式会社日本建設情報センター. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
