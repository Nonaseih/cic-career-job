'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

export default function HeaderWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const [scrolled, setScrolled] = useState(!isHome)

  useEffect(() => {
    if (!isHome) {
      setScrolled(true)
      return
    }
    const onScroll = () => setScrolled(window.scrollY > 72)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isHome])

  return (
    <div
      data-scrolled={scrolled ? 'true' : 'false'}
      className={`group fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-[var(--color-line)] shadow-sm'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      {children}
    </div>
  )
}
