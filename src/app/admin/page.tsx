import type { Metadata } from 'next'
import Link from 'next/link'
import AdminClient from './AdminClient'
import { FadeUp } from '@/components/Animate'

export const metadata: Metadata = { title: '求人CSVインポート' }

export default function AdminPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <FadeUp>
        <div className="flex items-center justify-between mb-1">
          <h1 className="text-lg font-bold text-[var(--color-cic-brown)]">求人CSVインポート</h1>
          <Link
            href="/admin/manual"
            className="text-xs text-[var(--color-cic-red)] hover:underline"
          >
            操作マニュアルを見る →
          </Link>
        </div>
        <p className="text-xs text-gray-400 mb-6">kintone求人データをインポートします。</p>
      </FadeUp>
      <FadeUp delay={0.1}>
        <AdminClient />
      </FadeUp>
    </div>
  )
}
