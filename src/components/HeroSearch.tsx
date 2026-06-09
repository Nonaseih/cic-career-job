'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

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

export default function HeroSearch() {
  const router = useRouter()
  const [keyword, setKeyword] = useState('')
  const [jobType, setJobType] = useState('')
  const [region, setRegion] = useState('')
  const [area, setArea] = useState('')

  const prefectures = region ? REGIONS[region] : []

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const p = new URLSearchParams()
    if (keyword.trim()) p.set('q', keyword.trim())
    if (jobType) p.set('category', jobType)
    if (area) p.set('area', area)
    else if (region) p.set('region', region)
    router.push(`/jobs${p.toString() ? `?${p.toString()}` : ''}`)
  }

  const INPUT = 'w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm text-white placeholder-white/40 focus:outline-none focus:border-white/50 transition-colors'
  const SELECT = `${INPUT} appearance-none`

  return (
    <form onSubmit={handleSearch} className="space-y-3">
      {/* Keyword */}
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="キーワード（職種・会社名など）"
        className={INPUT}
      />

      {/* Job type */}
      <select value={jobType} onChange={(e) => setJobType(e.target.value)} className={SELECT}>
        <option value="">職種を選択</option>
        {JOB_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
      </select>

      {/* Region */}
      <select
        value={region}
        onChange={(e) => { setRegion(e.target.value); setArea('') }}
        className={SELECT}
      >
        <option value="">エリアを選択</option>
        {Object.keys(REGIONS).map((r) => <option key={r} value={r}>{r}</option>)}
      </select>

      {/* Prefecture — only shown when region selected */}
      {region && (
        <select value={area} onChange={(e) => setArea(e.target.value)} className={SELECT}>
          <option value="">{region}（全域）</option>
          {prefectures.map((p) => <option key={p} value={p}>{p}</option>)}
        </select>
      )}

      <button
        type="submit"
        className="w-full bg-[var(--color-red)] hover:bg-[var(--color-red-dark)] text-white font-display font-bold py-3.5 rounded-xl text-sm transition-colors flex items-center justify-center gap-2"
      >
        求人を検索する
        <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs">›</span>
      </button>
    </form>
  )
}
