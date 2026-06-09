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

function SelectField({
  label, value, onChange, options, placeholder,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  options: string[]
  placeholder: string
}) {
  return (
    <div className="relative">
      <label className="block text-[10px] font-latin tracking-[.15em] uppercase text-white/40 mb-1">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none bg-transparent border-0 border-b border-white/25 pb-2 pt-0.5 text-sm text-white focus:outline-none focus:border-white/60 transition-colors cursor-pointer pr-6"
          style={{ colorScheme: 'dark' }}
        >
          <option value="" style={{ background: '#2d1408', color: '#fff' }}>{placeholder}</option>
          {options.map((o) => (
            <option key={o} value={o} style={{ background: '#2d1408', color: '#fff' }}>{o}</option>
          ))}
        </select>
        {/* Custom chevron */}
        <svg className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/40 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  )
}

export default function HeroSearch() {
  const router = useRouter()
  const [keyword, setKeyword] = useState('')
  const [jobType, setJobType] = useState('')
  const [region, setRegion]   = useState('')
  const [area, setArea]       = useState('')

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

  return (
    <form onSubmit={handleSearch} className="space-y-5">

      {/* Keyword — underline style */}
      <div>
        <label className="block text-[10px] font-latin tracking-[.15em] uppercase text-white/40 mb-1">キーワード</label>
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="職種・会社名など"
          className="w-full bg-transparent border-0 border-b border-white/25 pb-2 pt-0.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/60 transition-colors"
        />
      </div>

      {/* Job type */}
      <SelectField
        label="職種"
        value={jobType}
        onChange={setJobType}
        options={JOB_TYPES}
        placeholder="すべての職種"
      />

      {/* Region */}
      <SelectField
        label="エリア"
        value={region}
        onChange={(v) => { setRegion(v); setArea('') }}
        options={Object.keys(REGIONS)}
        placeholder="すべてのエリア"
      />

      {/* Prefecture */}
      {region && (
        <SelectField
          label="都道府県"
          value={area}
          onChange={setArea}
          options={prefectures}
          placeholder={`${region}（全域）`}
        />
      )}

      <div className="pt-2">
        <button
          type="submit"
          className="w-full bg-[var(--color-red)] hover:bg-[var(--color-red-dark)] text-white font-display font-bold py-3.5 rounded-xl text-sm transition-colors flex items-center justify-center gap-2"
        >
          求人を検索する
          <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs">›</span>
        </button>
      </div>
    </form>
  )
}
