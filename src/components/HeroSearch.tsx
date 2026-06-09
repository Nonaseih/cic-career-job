'use client'

import { useState, useRef, useEffect } from 'react'
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

function CustomSelect({
  label, value, onChange, options, placeholder,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  options: string[]
  placeholder: string
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const displayed = value || placeholder

  return (
    <div ref={ref} className="relative">
      <label className="block text-[10px] font-latin tracking-[.15em] uppercase text-white/40 mb-1">{label}</label>

      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between border-b border-white/25 pb-2 pt-0.5 text-sm text-left transition-colors focus:outline-none hover:border-white/50"
      >
        <span className={value ? 'text-white' : 'text-white/35'}>{displayed}</span>
        <svg
          className={`w-3.5 h-3.5 text-white/40 transition-transform duration-200 shrink-0 ml-2 ${open ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown panel */}
      {open && (
        <div className="absolute z-50 left-0 right-0 mt-1 bg-[#2d1408] border border-white/10 rounded-2xl overflow-hidden shadow-2xl shadow-black/60">
          {/* Clear / placeholder option */}
          <button
            type="button"
            onClick={() => { onChange(''); setOpen(false) }}
            className="w-full text-left px-5 py-3 text-sm text-white/35 hover:bg-white/5 transition-colors border-b border-white/8"
          >
            {placeholder}
          </button>
          <div className="max-h-56 overflow-y-auto">
            {options.map((o) => (
              <button
                key={o}
                type="button"
                onClick={() => { onChange(o); setOpen(false) }}
                className={`w-full text-left px-5 py-3 text-sm transition-colors ${
                  value === o
                    ? 'text-white bg-white/10 font-medium'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                {o}
              </button>
            ))}
          </div>
        </div>
      )}
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

      {/* Keyword */}
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

      <CustomSelect label="職種" value={jobType} onChange={setJobType} options={JOB_TYPES} placeholder="すべての職種" />

      <CustomSelect
        label="エリア"
        value={region}
        onChange={(v) => { setRegion(v); setArea('') }}
        options={Object.keys(REGIONS)}
        placeholder="すべてのエリア"
      />

      {region && (
        <CustomSelect
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
