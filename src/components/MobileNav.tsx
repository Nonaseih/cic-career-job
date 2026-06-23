'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV = [
  { label: '求人を探す', href: '/jobs' },
  { label: 'お問い合わせ', href: '/contact' },
]

export default function MobileNav({ isLoggedIn }: { isLoggedIn: boolean }) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  // Close on route change.
  useEffect(() => { setOpen(false) }, [pathname])

  // Lock body scroll while the panel is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={open ? 'メニューを閉じる' : 'メニューを開く'}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="w-10 h-10 flex items-center justify-center text-white group-data-[scrolled=true]:text-[var(--color-dark)] transition-colors"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          {open ? (
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
          )}
        </svg>
      </button>

      {open && (
        <>
          {/* Backdrop */}
          <button
            type="button"
            aria-label="メニューを閉じる"
            onClick={() => setOpen(false)}
            className="fixed inset-0 top-[68px] z-40 bg-black/30 backdrop-blur-[1px] cursor-default"
          />

          {/* Panel */}
          <div className="fixed top-[68px] left-0 right-0 z-50 bg-white border-b border-[var(--color-line)] shadow-[0_12px_32px_rgba(20,16,8,0.12)]">
            <nav className="max-w-7xl mx-auto px-4 py-3 flex flex-col">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="py-3.5 px-2 text-base font-medium text-[var(--color-ink)] border-b border-[var(--color-line)] hover:text-[var(--color-red)] transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              <a
                href="https://www.cic-ct.co.jp/career-job/recruitment/"
                target="_blank"
                rel="noopener noreferrer"
                className="py-3.5 px-2 text-base font-medium text-[var(--color-ink)] border-b border-[var(--color-line)] hover:text-[var(--color-red)] transition-colors"
              >
                採用担当者様
              </a>

              <div className="pt-4 pb-2 flex flex-col gap-3">
                {isLoggedIn ? (
                  <Link
                    href="/mypage"
                    className="flex items-center justify-center gap-2 bg-[var(--color-red)] text-white text-base font-bold rounded-xl py-3.5 hover:bg-[var(--color-red-dark)] transition-colors"
                  >
                    マイページ
                  </Link>
                ) : (
                  <>
                    <Link
                      href="/register"
                      className="flex items-center justify-center gap-2 bg-[var(--color-red)] text-white text-base font-bold rounded-xl py-3.5 hover:bg-[var(--color-red-dark)] transition-colors"
                    >
                      無料会員登録
                    </Link>
                    <Link
                      href="/login"
                      className="flex items-center justify-center text-base font-medium text-[var(--color-muted)] py-2.5 hover:text-[var(--color-ink)] transition-colors"
                    >
                      ログイン
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        </>
      )}
    </div>
  )
}
