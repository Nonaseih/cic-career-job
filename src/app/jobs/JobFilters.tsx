'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useCallback, useState } from 'react'

const EMPLOYMENT_TYPES = ['正社員', '契約社員', '派遣社員', 'アルバイト・パート']
const AREAS = [
  '北海道','青森県','岩手県','宮城県','秋田県','山形県','福島県',
  '茨城県','栃木県','群馬県','埼玉県','千葉県','東京都','神奈川県',
  '新潟県','富山県','石川県','福井県','山梨県','長野県','岐阜県',
  '静岡県','愛知県','三重県','滋賀県','京都府','大阪府','兵庫県',
  '奈良県','和歌山県','鳥取県','島根県','岡山県','広島県','山口県',
  '徳島県','香川県','愛媛県','高知県','福岡県','佐賀県','長崎県',
  '熊本県','大分県','宮崎県','鹿児島県','沖縄県',
]

const INPUT = 'w-full border border-[var(--color-line)] rounded-xl px-4 py-2.5 text-sm bg-white focus:outline-none focus:border-[var(--color-text)] transition-colors'

export default function JobFilters({ keyword, area, employmentType }: { keyword: string; area: string; employmentType: string }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [kw, setKw] = useState(keyword)

  const update = useCallback((key: string, value: string) => {
    const p = new URLSearchParams(searchParams.toString())
    value ? p.set(key, value) : p.delete(key)
    p.delete('page')
    router.push(`${pathname}?${p.toString()}`)
  }, [router, pathname, searchParams])

  return (
    <div className="bg-white border border-[var(--color-line)] rounded-2xl p-6 space-y-6">
      <p className="text-xs font-latin tracking-[.18em] uppercase text-[var(--color-muted)]">絞り込み</p>

      {/* Keyword */}
      <form onSubmit={(e) => { e.preventDefault(); update('q', kw.trim()) }}>
        <label className="block text-xs font-medium text-[var(--color-text)] mb-2">キーワード</label>
        <div className="flex gap-2">
          <input type="text" value={kw} onChange={(e) => setKw(e.target.value)}
            placeholder="職種・会社名など" className={`${INPUT} flex-1`} />
          <button type="submit"
            className="shrink-0 px-4 py-2 bg-[var(--color-dark)] text-white text-xs rounded-xl hover:bg-[var(--color-dark-2)] transition-colors">
            検索
          </button>
        </div>
      </form>

      {/* Area */}
      <div>
        <label className="block text-xs font-medium text-[var(--color-text)] mb-2">勤務地</label>
        <select value={area} onChange={(e) => update('area', e.target.value)} className={INPUT}>
          <option value="">すべての都道府県</option>
          {AREAS.map((a) => <option key={a} value={a}>{a}</option>)}
        </select>
      </div>

      {/* Employment type */}
      <div>
        <label className="block text-xs font-medium text-[var(--color-text)] mb-2">雇用形態</label>
        <div className="flex flex-wrap gap-2">
          {EMPLOYMENT_TYPES.map((type) => (
            <button key={type} type="button"
              onClick={() => update('type', employmentType === type ? '' : type)}
              className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                employmentType === type
                  ? 'bg-[var(--color-dark)] text-white border-[var(--color-dark)]'
                  : 'border-[var(--color-line)] text-[var(--color-muted)] hover:border-[var(--color-text)]'
              }`}>
              {type}
            </button>
          ))}
        </div>
      </div>

      {(keyword || area || employmentType) && (
        <button type="button" onClick={() => { setKw(''); router.push(pathname) }}
          className="text-xs text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors underline-offset-2 hover:underline">
          条件をリセット
        </button>
      )}
    </div>
  )
}
