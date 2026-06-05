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

        {/* Brand — white logo on hero, red logo on scroll */}
        <Link href="/" className="flex items-center shrink-0">
          <Image
            src="/ca-logo.png"
            alt="建設キャリア転職"
            width={1272} height={225}
            className="h-10 w-auto group-data-[scrolled=true]:hidden"
            priority
          />
          <Image
            src="/ca-logo-red.png"
            alt="建設キャリア転職"
            width={1390} height={300}
            className="h-11 w-auto hidden group-data-[scrolled=true]:block"
            priority
          />
        </Link>

        {/* Nav — frosted pill on hero, long solid pill on scroll */}
        <nav className={[
          'hidden md:flex items-center gap-6 rounded-full px-6 py-2 text-sm transition-all duration-300',
          'bg-white/15 backdrop-blur-sm border border-white/20 text-white/80',
          'group-data-[scrolled=true]:bg-[var(--color-dark)] group-data-[scrolled=true]:backdrop-blur-none',
          'group-data-[scrolled=true]:border-transparent group-data-[scrolled=true]:text-white/80',
          'group-data-[scrolled=true]:px-10 group-data-[scrolled=true]:py-2.5',
        ].join(' ')}>
          <Link href="/jobs" className="hover:text-white transition-colors">求人を探す</Link>
          <Link href="/contact" className="hover:text-white transition-colors">お問い合わせ</Link>
          <a href="https://www.cic-ct.co.jp/career-job/" target="_blank" rel="noopener noreferrer"
            className="hover:text-white transition-colors">採用担当者様</a>
        </nav>

        {/* CTAs */}
        <div className="flex items-center gap-3">
          {user ? (
            <Link href="/mypage"
              className="flex items-center gap-2.5 bg-white text-[var(--color-dark)] text-sm font-medium rounded-full pl-5 pr-1.5 py-1.5 hover:bg-white/90 transition-colors group-data-[scrolled=true]:bg-[var(--color-red)] group-data-[scrolled=true]:text-white group-data-[scrolled=true]:hover:bg-[var(--color-red)]/85">
              マイページ
              <span className="w-7 h-7 bg-[var(--color-dark)]/10 rounded-full flex items-center justify-center text-xs group-data-[scrolled=true]:bg-white/20">›</span>
            </Link>
          ) : (
            <>
              <Link href="/login"
                className="hidden sm:block text-sm text-white/70 hover:text-white transition-colors px-3 py-2 group-data-[scrolled=true]:text-[var(--color-dark)]/60 group-data-[scrolled=true]:hover:text-[var(--color-dark)]">
                ログイン
              </Link>
              <Link href="/register"
                className="flex items-center gap-2.5 bg-white text-[var(--color-dark)] text-sm font-medium rounded-full pl-5 pr-1.5 py-1.5 hover:bg-white/90 transition-colors group-data-[scrolled=true]:bg-[var(--color-red)] group-data-[scrolled=true]:text-white group-data-[scrolled=true]:hover:bg-[var(--color-red)]/85">
                無料会員登録
                <span className="w-7 h-7 bg-[var(--color-dark)]/10 rounded-full flex items-center justify-center text-xs group-data-[scrolled=true]:bg-white/20">›</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </HeaderWrapper>
  )
}
