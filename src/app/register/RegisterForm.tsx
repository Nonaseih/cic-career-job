'use client'

import { useActionState, useState } from 'react'
import { registerWithProfile } from '@/app/actions/auth'
import Link from 'next/link'

const PREFECTURES = [
  '北海道','青森県','岩手県','宮城県','秋田県','山形県','福島県',
  '茨城県','栃木県','群馬県','埼玉県','千葉県','東京都','神奈川県',
  '新潟県','富山県','石川県','福井県','山梨県','長野県','岐阜県',
  '静岡県','愛知県','三重県','滋賀県','京都府','大阪府','兵庫県',
  '奈良県','和歌山県','鳥取県','島根県','岡山県','広島県','山口県',
  '徳島県','香川県','愛媛県','高知県','福岡県','佐賀県','長崎県',
  '熊本県','大分県','宮崎県','鹿児島県','沖縄県',
]

const QUALIFICATIONS = [
  '1級建築施工管理技士', '2級建築施工管理技士',
  '1級土木施工管理技士', '2級土木施工管理技士',
  '1級管工事施工管理技士', '2級管工事施工管理技士',
  '1級電気工事施工管理技士', '2級電気工事施工管理技士',
  '1級建設機械施工管理技士', '2級建設機械施工管理技士',
  '1級造園施工管理技士', '2級造園施工管理技士',
  '1級建築士', '2級建築士', '木造建築士', 'その他',
]

const JOB_TYPES = [
  '建築施工管理', '土木施工管理',
  '設備施工管理（空調）', '設備施工管理（給排水）', '設備施工管理（電気）',
  '積算', '設計（建築）', '設計（土木）', '現場作業員', 'その他',
]

const EXPERIENCE_YEARS = ['1年未満', '1〜3年', '3〜5年', '5〜10年', '10年以上']
const SALARY_RANGES    = ['〜300万円', '300〜400万円', '400〜500万円', '500〜600万円', '600〜800万円', '800万円以上']
const BIRTH_YEARS      = Array.from({ length: 50 }, (_, i) => 2005 - i)

const INPUT  = 'w-full border border-[var(--color-line)] rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:border-[var(--color-red)] transition-colors'
const SELECT = INPUT

function SectionHeader({ title }: { title: string }) {
  return (
    <h2 className="text-xs font-bold text-[var(--color-ink)] bg-[var(--color-bg-warm)] border-l-4 border-[var(--color-red)] px-4 py-2 rounded -mx-6 mb-4">
      {title}
    </h2>
  )
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-bold text-[var(--color-ink)] mb-1">
        {label}{required && <span className="text-[var(--color-red)] ml-1">*</span>}
      </label>
      {children}
    </div>
  )
}

export default function RegisterForm() {
  const [error, action, pending] = useActionState(registerWithProfile, null)
  const [password, setPassword] = useState('')
  const [confirm, setConfirm]   = useState('')
  const mismatch = confirm.length > 0 && password !== confirm

  return (
    <form action={action} className="space-y-8">
      {error && (
        <p className="text-sm text-[var(--color-red)] bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>
      )}

      {/* ── Account info ─────────────────────────────────────────────── */}
      <div className="space-y-4">
        <SectionHeader title="アカウント情報" />

        <Field label="メールアドレス" required>
          <input type="email" name="email" required autoComplete="email" className={INPUT} placeholder="example@email.com" />
        </Field>

        <Field label="パスワード（6文字以上）" required>
          <input type="password" name="password" required minLength={6} autoComplete="new-password"
            value={password} onChange={(e) => setPassword(e.target.value)} className={INPUT} placeholder="パスワード" />
        </Field>

        <Field label="パスワード（確認）" required>
          <input type="password" required autoComplete="new-password"
            value={confirm} onChange={(e) => setConfirm(e.target.value)}
            className={`${INPUT} ${mismatch ? 'border-[var(--color-red)]' : ''}`}
            placeholder="パスワードを再入力" />
          {mismatch && <p className="mt-1 text-xs text-[var(--color-red)]">パスワードが一致しません</p>}
        </Field>
      </div>

      {/* ── Basic info ───────────────────────────────────────────────── */}
      <div className="space-y-4">
        <SectionHeader title="基本情報" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="氏名" required>
            <input type="text" name="full_name" required placeholder="山田 太郎" className={INPUT} />
          </Field>
          <Field label="電話番号">
            <input type="tel" name="phone" placeholder="090-0000-0000" className={INPUT} />
          </Field>
          <Field label="生年">
            <select name="birth_year" defaultValue="" className={SELECT}>
              <option value="">選択してください</option>
              {BIRTH_YEARS.map(y => <option key={y} value={y}>{y}年</option>)}
            </select>
          </Field>
          <Field label="都道府県">
            <select name="prefecture" defaultValue="" className={SELECT}>
              <option value="">選択してください</option>
              {PREFECTURES.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </Field>
        </div>
        <Field label="市区町村">
          <input type="text" name="city" placeholder="例：大阪市北区" className={INPUT} />
        </Field>
      </div>

      {/* ── Qualifications ───────────────────────────────────────────── */}
      <div className="space-y-3">
        <SectionHeader title="保有資格" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {QUALIFICATIONS.map(q => (
            <label key={q} className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" name="qualifications" value={q} className="accent-[var(--color-red)]" />
              {q}
            </label>
          ))}
        </div>
      </div>

      {/* ── Work experience ──────────────────────────────────────────── */}
      <div className="space-y-4">
        <SectionHeader title="職務経験" />
        <Field label="就業状況">
          <select name="employment_status" defaultValue="" className={SELECT}>
            <option value="">選択してください</option>
            {['在職中', '離職中', 'その他'].map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </Field>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="現勤務先">
            <input type="text" name="current_employer" placeholder="株式会社〇〇" className={INPUT} />
          </Field>
          <Field label="直近の職種">
            <select name="recent_job_type" defaultValue="" className={SELECT}>
              <option value="">選択してください</option>
              {JOB_TYPES.map(j => <option key={j} value={j}>{j}</option>)}
            </select>
          </Field>
          <Field label="経験年数">
            <select name="experience_years" defaultValue="" className={SELECT}>
              <option value="">選択してください</option>
              {EXPERIENCE_YEARS.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </Field>
          <Field label="現在の年収">
            <select name="current_salary" defaultValue="" className={SELECT}>
              <option value="">選択してください</option>
              {SALARY_RANGES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </Field>
        </div>
        <Field label="経験職種（複数選択可）">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
            {JOB_TYPES.map(j => (
              <label key={j} className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="checkbox" name="experience_types" value={j} className="accent-[var(--color-red)]" />
                {j}
              </label>
            ))}
          </div>
        </Field>
      </div>

      {/* ── Desired conditions ───────────────────────────────────────── */}
      <div className="space-y-4">
        <SectionHeader title="希望条件" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="希望職種">
            <select name="desired_job_type" defaultValue="" className={SELECT}>
              <option value="">選択してください</option>
              {JOB_TYPES.map(j => <option key={j} value={j}>{j}</option>)}
            </select>
          </Field>
          <Field label="希望勤務地">
            <select name="desired_prefecture" defaultValue="" className={SELECT}>
              <option value="">選択してください</option>
              {PREFECTURES.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </Field>
          <Field label="希望年収">
            <select name="desired_salary" defaultValue="" className={SELECT}>
              <option value="">選択してください</option>
              {SALARY_RANGES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </Field>
        </div>
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input type="checkbox" name="can_relocate" className="accent-[var(--color-red)]" />
          転勤可能
        </label>
      </div>

      {/* ── Submit ───────────────────────────────────────────────────── */}
      <div className="pt-2">
        <button type="submit" disabled={pending || mismatch}
          className="w-full py-4 bg-[var(--color-red)] text-white font-display font-bold rounded-xl text-sm hover:bg-[var(--color-red-dark)] transition-colors disabled:opacity-60">
          {pending ? '登録中...' : '無料会員登録する'}
        </button>

        <p className="mt-4 text-center text-xs text-[var(--color-subtle)] leading-relaxed">
          登録することで
          <a href="https://www.cic-ct.co.jp/career-job/entry/kiyaku/" target="_blank" rel="noopener noreferrer"
            className="text-[var(--color-red)] hover:underline mx-0.5">利用規約</a>
          および
          <Link href="/privacy" className="text-[var(--color-red)] hover:underline mx-0.5">プライバシーポリシー</Link>
          に同意したものとみなします。
        </p>

        <p className="mt-3 text-center text-xs text-[var(--color-muted)]">
          すでにアカウントをお持ちの方は{' '}
          <Link href="/login" className="text-[var(--color-red)] hover:underline font-medium">ログイン</Link>
        </p>
      </div>
    </form>
  )
}
