import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: {
    default: '建設キャリア転職 | 施工管理技士の転職支援',
    template: '%s | 建設キャリア転職',
  },
  description: '施工管理技士・建設技術者のための転職支援サイト。専任のキャリアアドバイザーが無料でサポートします。',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" className="h-full">
      <body className="min-h-full flex flex-col bg-[var(--color-cic-cream)]">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
