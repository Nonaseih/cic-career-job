import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-[var(--color-cic-brown)] text-white mt-auto">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between gap-6">
          <div>
            <p className="font-bold text-lg">建設キャリア転職</p>
            <p className="text-sm text-white/70 mt-1">施工管理技士の転職支援サイト</p>
          </div>
          <nav className="flex flex-col sm:flex-row gap-3 text-sm text-white/80">
            <Link href="/jobs" className="hover:text-white transition-colors">求人一覧</Link>
            <Link href="/contact" className="hover:text-white transition-colors">お問い合わせ</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">プライバシーポリシー</Link>
          </nav>
        </div>
        <p className="mt-6 text-xs text-white/50 border-t border-white/20 pt-4">
          © {new Date().getFullYear()} CIC Career. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
