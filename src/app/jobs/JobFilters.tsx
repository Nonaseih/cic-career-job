'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useCallback, useState } from 'react'

const JOB_TYPES = [
  '建築施工管理', '土木施工管理', '電気施工管理',
  '管工事施工管理', '設計', '積算', 'その他',
]

const REGIONS: Record<string, string[]> = {
  '北海道・東北': ['北海道','青森県','岩手県','宮城県','秋田県','山形県','福島県'],
  '関東':        ['茨城県','栃木県','群馬県','埼玉県','千葉県','東京都','神奈川県'],
  '中部':        ['新潟県','富山県','石川県','福井県','山梨県','長野県','岐阜県','静岡県','愛知県'],
  '近畿':        ['三重県','滋賀県','京都府','大阪府','兵庫県','奈良県','和歌山県'],
  '中国・四国':  ['鳥取県','島根県','岡山県','広島県','山口県','徳島県','香川県','愛媛県','高知県'],
  '九州・沖縄':  ['福岡県','佐賀県','長崎県','熊本県','大分県','宮崎県','鹿児島県','沖縄県'],
}

const INPUT = 'w-full border border-[var(--color-line)] rounded-xl px-4 py-2.5 text-sm bg-white focus:outline-none focus:border-[var(--color-text)] transition-colors'

export default function JobFilters({
  keyword, area, region, category,
}: {
  keyword: string; area: string; region: string; category: string
}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [kw, setKw] = useState(keyword)
  const [selectedRegion, setSelectedRegion] = useState(region)

  const update = useCallback((updates: Record<string, string>) => {
    const p = new URLSearchParams(searchParams.toString())
    Object.entries(updates).forEach(([key, value]) => {
      value ? p.set(key, value) : p.delete(key)
    })
    p.delete('page')
    router.push(`${pathname}?${p.toString()}`)
  }, [router, pathname, searchParams])

  const prefectures = selectedRegion ? REGIONS[selectedRegion] ?? [] : []
  const hasFilters = !!(keyword || area || region || category)

  return (
    <div className="bg-white border border-[var(--color-line)] rounded-2xl p-6 space-y-6">
      <p className="text-xs font-latin tracking-[.18em] uppercase text-[var(--color-muted)]">絞り込み</p>

      {/* Keyword */}
      <form onSubmit={(e) => { e.preventDefault(); update({ q: kw.trim() }) }}>
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

      {/* Job type — radio buttons */}
      <div>
        <label className="block text-xs font-medium text-[var(--color-text)] mb-3">職種</label>
        <div className="space-y-2">
          {JOB_TYPES.map((type) => (
            <label key={type} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="radio"
                name="category"
                value={type}
                checked={category === type}
                onChange={() => update({ category: category === type ? '' : type })}
                className="accent-[var(--color-red)] w-4 h-4 shrink-0"
              />
              <span className={`text-sm transition-colors ${
                category === type ? 'text-[var(--color-red)] font-medium' : 'text-[var(--color-muted)] group-hover:text-[var(--color-text)]'
              }`}>{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Location — 2-level */}
      <div>
        <label className="block text-xs font-medium text-[var(--color-text)] mb-2">勤務地</label>
        {/* Region */}
        <select
          value={selectedRegion}
          onChange={(e) => {
            setSelectedRegion(e.target.value)
            update({ region: e.target.value, area: '' })
          }}
          className={`${INPUT} mb-2`}
        >
          <option value="">すべてのエリア</option>
          {Object.keys(REGIONS).map((r) => <option key={r} value={r}>{r}</option>)}
        </select>
        {/* Prefecture — only shown when region selected */}
        {selectedRegion && (
          <select
            value={area}
            onChange={(e) => update({ area: e.target.value, region: selectedRegion })}
            className={INPUT}
          >
            <option value="">{selectedRegion}（全域）</option>
            {prefectures.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
        )}
      </div>

      {hasFilters && (
        <button
          type="button"
          onClick={() => { setKw(''); setSelectedRegion(''); router.push(pathname) }}
          className="text-xs text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors underline-offset-2 hover:underline"
        >
          条件をリセット
        </button>
      )}
    </div>
  )
}
