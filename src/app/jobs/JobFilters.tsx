'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useCallback, useState } from 'react'

const EMPLOYMENT_TYPES = ['正社員', '契約社員', '派遣社員', 'アルバイト・パート']

const AREAS = [
  '北海道', '青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県',
  '茨城県', '栃木県', '群馬県', '埼玉県', '千葉県', '東京都', '神奈川県',
  '新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県', '岐阜県',
  '静岡県', '愛知県', '三重県', '滋賀県', '京都府', '大阪府', '兵庫県',
  '奈良県', '和歌山県', '鳥取県', '島根県', '岡山県', '広島県', '山口県',
  '徳島県', '香川県', '愛媛県', '高知県', '福岡県', '佐賀県', '長崎県',
  '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県',
]

export default function JobFilters({
  keyword,
  area,
  employmentType,
}: {
  keyword: string
  area: string
  employmentType: string
}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [keywordInput, setKeywordInput] = useState(keyword)

  const update = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value) params.set(key, value)
      else params.delete(key)
      params.delete('page')
      router.push(`${pathname}?${params.toString()}`)
    },
    [router, pathname, searchParams]
  )

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    update('q', keywordInput.trim())
  }

  const hasFilters = keyword || area || employmentType

  return (
    <div className="bg-white border border-[var(--color-cic-border)] rounded-lg p-4 space-y-4">
      {/* Keyword */}
      <form onSubmit={handleSearch}>
        <label className="block text-xs font-bold text-[var(--color-cic-brown)] mb-1">
          キーワード
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={keywordInput}
            onChange={(e) => setKeywordInput(e.target.value)}
            placeholder="職種・会社名など"
            className="flex-1 min-w-0 border border-[var(--color-cic-border)] rounded px-3 py-2 text-sm focus:outline-none focus:border-[var(--color-cic-red)]"
          />
          <button
            type="submit"
            className="shrink-0 px-3 py-2 bg-[var(--color-cic-red)] text-white text-xs font-bold rounded hover:bg-[var(--color-cic-red-dark)] transition-colors"
          >
            検索
          </button>
        </div>
      </form>

      {/* Area */}
      <div>
        <label className="block text-xs font-bold text-[var(--color-cic-brown)] mb-1">
          勤務地
        </label>
        <select
          value={area}
          onChange={(e) => update('area', e.target.value)}
          className="w-full border border-[var(--color-cic-border)] rounded px-3 py-2 text-sm focus:outline-none focus:border-[var(--color-cic-red)] bg-white"
        >
          <option value="">すべての都道府県</option>
          {AREAS.map((a) => (
            <option key={a} value={a}>{a}</option>
          ))}
        </select>
      </div>

      {/* Employment type */}
      <div>
        <label className="block text-xs font-bold text-[var(--color-cic-brown)] mb-1">
          雇用形態
        </label>
        <div className="flex flex-wrap gap-1.5">
          {EMPLOYMENT_TYPES.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => update('type', employmentType === type ? '' : type)}
              className={`text-xs px-2.5 py-1 rounded border transition-colors ${
                employmentType === type
                  ? 'bg-[var(--color-cic-red)] text-white border-[var(--color-cic-red)]'
                  : 'border-[var(--color-cic-border)] text-[var(--color-cic-brown)] hover:border-[var(--color-cic-red)]'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {hasFilters && (
        <button
          type="button"
          onClick={() => { setKeywordInput(''); router.push(pathname) }}
          className="text-xs text-[var(--color-cic-red)] hover:underline"
        >
          条件をリセット
        </button>
      )}
    </div>
  )
}
