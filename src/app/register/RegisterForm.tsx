'use client'

import { useActionState, useState } from 'react'
import { registerWithProfile } from '@/app/actions/auth'
import Link from 'next/link'
import {
  PREFECTURES, PREFECTURES_WITH_OTHER, QUALIFICATIONS,
  RECENT_JOB_TYPES, EXPERIENCE_JOB_TYPES, DESIRED_JOB_TYPES,
  EXPERIENCE_YEARS, SALARY_RANGES, BIRTH_YEARS,
  EMPLOYMENT_STATUSES, RELOCATION_OPTIONS,
} from '@/lib/profileOptions'
import {
  Field, SectionHeader, SelectWithOther, CheckboxGroupWithOther,
  INPUT, SELECT, TEXTAREA,
} from '@/components/ProfileFormFields'

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
          {mismatch && <p className="mt-1 text-sm text-[var(--color-red)]">パスワードが一致しません</p>}
        </Field>
      </div>

      {/* ── Qualifications / skills ──────────────────────────────────── */}
      <div className="space-y-3">
        <SectionHeader title="資格・スキル" />
        <CheckboxGroupWithOther
          name="qualifications"
          label="保有資格"
          required
          options={QUALIFICATIONS}
          columns={2}
        />
      </div>

      {/* ── Work experience ──────────────────────────────────────────── */}
      <div className="space-y-4">
        <SectionHeader title="職務経験" />
        <Field label="就業状況" required>
          <select name="employment_status" required defaultValue="" className={SELECT}>
            <option value="">選択してください</option>
            {EMPLOYMENT_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </Field>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="現勤務先">
            <input type="text" name="current_employer" placeholder="株式会社〇〇" className={INPUT} />
          </Field>
          <SelectWithOther
            name="recent_job_type"
            label="直近の職種"
            required
            options={RECENT_JOB_TYPES}
          />
          <Field label="経験年数" required>
            <select name="experience_years" required defaultValue="" className={SELECT}>
              <option value="">選択してください</option>
              {EXPERIENCE_YEARS.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </Field>
          <Field label="現在の年収" required>
            <select name="current_salary" required defaultValue="" className={SELECT}>
              <option value="">選択してください</option>
              {SALARY_RANGES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </Field>
        </div>
        <CheckboxGroupWithOther
          name="experience_types"
          label="経験職種（複数選択可）"
          required
          options={EXPERIENCE_JOB_TYPES}
          columns={2}
        />
      </div>

      {/* ── Desired conditions ───────────────────────────────────────── */}
      <div className="space-y-4">
        <SectionHeader title="希望条件" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <SelectWithOther
            name="desired_job_type"
            label="希望職種"
            required
            options={DESIRED_JOB_TYPES}
          />
          <SelectWithOther
            name="desired_prefecture"
            label="希望勤務地"
            required
            options={PREFECTURES_WITH_OTHER}
          />
          <Field label="希望年収" required>
            <select name="desired_salary" required defaultValue="" className={SELECT}>
              <option value="">選択してください</option>
              {SALARY_RANGES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </Field>
          <Field label="転勤の可否" required>
            <select name="relocation" required defaultValue="" className={SELECT}>
              <option value="">選択してください</option>
              {RELOCATION_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </Field>
        </div>
        <Field label="その他希望する勤務条件・伝えたいこと" hint="任意">
          <textarea name="other_requirements" rows={4} placeholder="ご希望の働き方やキャリアプランなど、自由にご記入ください。" className={TEXTAREA} />
        </Field>
      </div>

      {/* ── Submit ───────────────────────────────────────────────────── */}
      <div className="pt-2">
        <button type="submit" disabled={pending || mismatch}
          className="w-full py-4 bg-[var(--color-red)] text-white font-display font-bold rounded-xl text-base hover:bg-[var(--color-red-dark)] transition-colors disabled:opacity-60">
          {pending ? '登録中...' : '無料会員登録する'}
        </button>

        <p className="mt-4 text-center text-sm text-[var(--color-subtle)] leading-relaxed">
          登録することで
          <a href="https://www.cic-ct.co.jp/career-job/entry/kiyaku/" target="_blank" rel="noopener noreferrer"
            className="text-[var(--color-red)] hover:underline mx-0.5">利用規約</a>
          および
          <Link href="/privacy" className="text-[var(--color-red)] hover:underline mx-0.5">プライバシーポリシー</Link>
          に同意したものとみなします。
        </p>

        <p className="mt-3 text-center text-sm text-[var(--color-muted)]">
          すでにアカウントをお持ちの方は{' '}
          <Link href="/login" className="text-[var(--color-red)] hover:underline font-medium">ログイン</Link>
        </p>
      </div>
    </form>
  )
}
