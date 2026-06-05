import Image from 'next/image'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import HeaderWrapper from './HeaderWrapper'

export default async function Header() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <HeaderWrapper>
      <div className="max-w-7xl mx-auto px-8 h-[68px] flex items-center justify-between">

        {/* Brand */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <div className="bg-[var(--color-red)] rounded-md px-2 py-1">
            <Image src="/ca-logo.png" alt="建設キャリア転職" width={88} height={24} className="h-6 w-auto" priority />
          </div>
          <span className="hidden md:block font-display font-bold text-white text-sm tracking-tight drop-shadow-sm">
            建設キャリア転職
          </span>
        </Link>

        {/* Floating pill nav */}
        <nav className="hidden md:flex items-center gap-6 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-6 py-2 text-sm text-white/80">
          <Link href="/jobs" className="hover:text-white transition-colors">求人を探す</Link>
          <Link href="/contact" className="hover:text-white transition-colors">お問い合わせ</Link>
          <a href="https://www.cic-ct.co.jp/career-job/" target="_blank" rel="noopener noreferrer"
            className="hover:text-white transition-colors">採用担当者様</a>
        </nav>

        {/* CTAs */}
        <div className="flex items-center gap-3">
          {user ? (
            <Link href="/mypage"
              className="flex items-center gap-2.5 bg-white text-[var(--color-dark)] text-sm font-medium rounded-full pl-5 pr-1.5 py-1.5 hover:bg-white/90 transition-colors">
              マイページ
              <span className="w-7 h-7 bg-[var(--color-dark)]/10 rounded-full flex items-center justify-center text-xs">›</span>
            </Link>
          ) : (
            <>
              <Link href="/login" className="hidden sm:block text-sm text-white/70 hover:text-white transition-colors px-3 py-2">
                ログイン
              </Link>
              <Link href="/register"
                className="flex items-center gap-2.5 bg-white text-[var(--color-dark)] text-sm font-medium rounded-full pl-5 pr-1.5 py-1.5 hover:bg-white/90 transition-colors">
                無料会員登録
                <span className="w-7 h-7 bg-[var(--color-dark)]/10 rounded-full flex items-center justify-center text-xs">›</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </HeaderWrapper>
  )
}
