import Image from 'next/image'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

export default async function Header() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <header className="bg-white border-b border-[var(--color-line)] sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 sm:px-10 h-[72px] flex items-center justify-between">

        <Link href="/" className="flex items-center gap-3 shrink-0">
          <div className="bg-[var(--color-red)] rounded-lg px-2.5 py-1.5">
            <Image src="/ca-logo.png" alt="建設キャリア転職" width={96} height={26} className="h-[26px] w-auto" priority />
          </div>
          <span className="hidden sm:block font-display font-bold text-[var(--color-ink)] text-sm">
            建設キャリア転職
          </span>
        </Link>

        <nav className="flex items-center gap-2 text-sm">
          <Link href="/jobs" className="hidden sm:block px-3 py-1.5 text-[var(--color-body)] hover:text-[var(--color-red)] font-medium transition-colors">
            求人を探す
          </Link>
          {user ? (
            <Link href="/mypage" className="px-4 py-2 bg-[var(--color-red)] text-white font-display font-bold rounded-lg text-sm hover:bg-[var(--color-red-dark)] transition-colors whitespace-nowrap">
              マイページ
            </Link>
          ) : (
            <>
              <Link href="/login" className="hidden sm:block px-3 py-1.5 text-[var(--color-body)] hover:text-[var(--color-red)] transition-colors">
                ログイン
              </Link>
              <Link href="/register" className="px-4 py-2 bg-[var(--color-red)] text-white font-display font-bold rounded-lg text-sm hover:bg-[var(--color-red-dark)] transition-colors whitespace-nowrap">
                無料会員登録
              </Link>
              <a href="https://www.cic-ct.co.jp/career-job/" target="_blank" rel="noopener noreferrer"
                className="hidden md:block px-4 py-2 border border-[var(--color-line-dark)] text-[var(--color-ink)] font-display font-bold rounded-lg text-sm hover:bg-[var(--color-warm-100)] transition-colors whitespace-nowrap">
                採用ご担当者様
              </a>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
