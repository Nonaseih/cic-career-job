import Image from 'next/image'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

export default async function Header() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-[var(--color-line)] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-8 h-[68px] flex items-center justify-between">

        {/* Brand */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <div className="bg-[var(--color-red)] rounded-md px-2 py-1">
            <Image src="/ca-logo.png" alt="建設キャリア転職" width={88} height={24} className="h-6 w-auto" priority />
          </div>
          <span className="hidden md:block font-display font-bold text-[var(--color-dark)] text-sm tracking-tight">
            建設キャリア転職
          </span>
        </Link>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm text-[var(--color-muted)]">
          <Link href="/jobs" className="hover:text-[var(--color-text)] transition-colors">求人を探す</Link>
          <Link href="/contact" className="hover:text-[var(--color-text)] transition-colors">お問い合わせ</Link>
          <a href="https://www.cic-ct.co.jp/career-job/" target="_blank" rel="noopener noreferrer"
            className="hover:text-[var(--color-text)] transition-colors">採用担当者様</a>
        </nav>

        {/* CTAs */}
        <div className="flex items-center gap-3">
          {user ? (
            <Link href="/mypage" className="flex items-center gap-2.5 bg-[var(--color-dark)] text-white text-sm font-medium rounded-full pl-5 pr-1.5 py-1.5 hover:bg-[var(--color-dark-2)] transition-colors">
              マイページ
              <span className="w-7 h-7 bg-white/15 rounded-full flex items-center justify-center text-xs">›</span>
            </Link>
          ) : (
            <>
              <Link href="/login" className="hidden sm:block text-sm text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors px-3 py-2">
                ログイン
              </Link>
              <Link href="/register" className="flex items-center gap-2.5 bg-[var(--color-dark)] text-white text-sm font-medium rounded-full pl-5 pr-1.5 py-1.5 hover:bg-[var(--color-dark-2)] transition-colors">
                無料会員登録
                <span className="w-7 h-7 bg-white/15 rounded-full flex items-center justify-center text-xs">›</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
