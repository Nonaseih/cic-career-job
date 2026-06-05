import type { Metadata } from 'next'
import { Noto_Sans_JP, Zen_Kaku_Gothic_New, Shippori_Mincho_B1, Archivo } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const noto    = Noto_Sans_JP({ subsets: ['latin'], weight: ['400', '500', '700'], variable: '--font-noto', display: 'swap' })
const zen     = Zen_Kaku_Gothic_New({ subsets: ['latin'], weight: ['500', '700', '900'], variable: '--font-zen', display: 'swap' })
const mincho  = Shippori_Mincho_B1({ subsets: ['latin'], weight: ['600', '700'], variable: '--font-mincho', display: 'swap' })
const archivo = Archivo({ subsets: ['latin'], weight: ['600', '700', '800'], variable: '--font-archivo', display: 'swap' })

export const metadata: Metadata = {
  title: {
    default: '建設キャリア転職 | 施工管理技士の転職支援',
    template: '%s | 建設キャリア転職',
  },
  description: '施工管理技士・建設技術者のための転職支援サイト。専任のキャリアアドバイザーが無料でサポートします。',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={`h-full ${noto.variable} ${zen.variable} ${mincho.variable} ${archivo.variable}`}>
      <body className="min-h-full flex flex-col bg-[var(--color-background)]">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
