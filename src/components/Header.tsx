import Image from 'next/image'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

export default async function Header() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <header className="bg-white border-b border-[var(--color-line)] sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 sm:px-10 h-[76px] flex items-center justify-between">

        {/* Brand */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <div className="bg-[var(--color-cic-red)] rounded-lg px-2.5 py-1.5">
            <Image
              src="/ca-logo.png"
              alt="建設キャリア転職"
              width={100}
              height={28}
              className="h-7 w-auto"
              priority
            />
          </div>
          <span className="hidden sm:block font-display font-bold text-[var(--color-navy)] text-sm leading-tight">
            建設キャリア転職
          </span>
        </Link>

        {/* Nav */}
        <nav className="flex items-center gap-2 text-sm">
          <Link
            href="/jobs"
            className="hidden sm:block px-3 py-1.5 text-[var(--color-slate)] hover:text-[var(--color-blue)] font-medium transition-colors"
          >
            求人を探す
          </Link>

          {user ? (
            <Link
              href="/mypage"
              className="px-4 py-2 bg-[var(--color-cic-red)] text-white font-display font-bold rounded-lg text-sm hover:bg-[var(--color-cic-red-dark)] transition-colors whitespace-nowrap"
            >
              マイページ
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="hidden sm:block px-3 py-1.5 text-[var(--color-slate)] hover:text-[var(--color-blue)] transition-colors"
              >
                ログイン
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 bg-[var(--color-cic-red)] text-white font-display font-bold rounded-lg text-sm hover:bg-[var(--color-cic-red-dark)] transition-colors whitespace-nowrap"
              >
                無料会員登録
              </Link>
              <a
                href="https://www.cic-ct.co.jp/career-job/"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:block px-4 py-2 border-[1.5px] border-[var(--color-sky-200)] text-[var(--color-navy)] font-display font-bold rounded-lg text-sm hover:bg-[var(--color-sky-50)] transition-colors whitespace-nowrap"
              >
                採用ご担当者様
              </a>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
