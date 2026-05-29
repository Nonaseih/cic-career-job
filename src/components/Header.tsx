import Image from 'next/image'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

export default async function Header() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <header className="bg-white border-b border-[var(--color-cic-border)] sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="bg-[var(--color-cic-red)] rounded px-2 py-1">
            <Image
              src="/ca-logo.png"
              alt="建設キャリア転職"
              width={100}
              height={28}
              className="h-7 w-auto"
              priority
            />
          </div>
        </Link>

        <nav className="flex items-center gap-1 text-sm">
          <Link
            href="/jobs"
            className="px-3 py-1.5 text-[var(--color-cic-brown)] hover:text-[var(--color-cic-red)] font-medium transition-colors"
          >
            求人を探す
          </Link>
          {user ? (
            <Link
              href="/mypage"
              className="ml-1 px-4 py-1.5 bg-[var(--color-cic-red)] text-white rounded text-sm font-medium hover:bg-[var(--color-cic-red-dark)] transition-colors"
            >
              マイページ
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="px-3 py-1.5 text-[var(--color-cic-brown)] hover:text-[var(--color-cic-red)] transition-colors"
              >
                ログイン
              </Link>
              <Link
                href="/register"
                className="ml-1 px-4 py-1.5 bg-[var(--color-cic-red)] text-white rounded text-sm font-medium hover:bg-[var(--color-cic-red-dark)] transition-colors"
              >
                無料会員登録
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
