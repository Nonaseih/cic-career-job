import type { Metadata } from 'next'
import AdminClient from './AdminClient'

export const metadata: Metadata = { title: '求人CSVインポート' }

export default function AdminPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-lg font-bold text-[var(--color-cic-brown)] mb-1">求人CSVインポート</h1>
      <p className="text-xs text-gray-400 mb-6">kintone求人データをインポートします。</p>
      <AdminClient />
    </div>
  )
}
