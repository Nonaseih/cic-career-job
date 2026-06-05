'use client'

import { useEffect, useState } from 'react'

export default function HeaderWrapper({ children }: { children: React.ReactNode }) {
  const [scrolled, setScrolled] = useState(true)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 72)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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
