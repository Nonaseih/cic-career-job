'use client'

import { useActionState } from 'react'
import { saveProfile } from '@/app/actions/profile'
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

type Profile = {
  full_name: string | null
  phone: string | null
  birth_year: number | null
  prefecture: string | null
  city: string | null
  employment_status: string | null
  current_employer: string | null
  recent_job_type: string | null
  experience_years: string | null
  current_salary: string | null
  experience_types: string[] | null
  desired_job_type: string | null
  desired_prefecture: string | null
  relocation: string | null
  other_requirements: string | null
  desired_salary: string | null
  qualifications: string[] | null
}

export default function ProfileForm({ profile }: { profile: Profile | null }) {
  const [result, action, pending] = useActionState(saveProfile, null)

  const p = profile

  return (
    <form action={action} className="bg-white border border-[var(--color-cic-border)] rounded-lg px-6 py-6 space-y-6">
      {result?.success === false && (
        <p className="text-sm text-[var(--color-red)] bg-red-50 border border-red-200 rounded px-3 py-2">
          {result.error}
        </p>
      )}

      {/* 基本情報 */}
      <div className="space-y-4">
        <SectionHeader title="基本情報" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="氏名" required>
            <input type="text" name="full_name" defaultValue={p?.full_name ?? ''} placeholder="山田 太郎" className={INPUT} />
          </Field>
          <Field label="電話番号" required>
            <input type="tel" name="phone" required defaultValue={p?.phone ?? ''} placeholder="090-0000-0000" className={INPUT} />
          </Field>
          <Field label="生年" required>
            <select name="birth_year" required defaultValue={p?.birth_year ?? ''} className={SELECT}>
              <option value="">選択してください</option>
              {BIRTH_YEARS.map(y => <option key={y} value={y}>{y}年</option>)}
            </select>
          </Field>
          <Field label="都道府県" required>
            <select name="prefecture" required defaultValue={p?.prefecture ?? ''} className={SELECT}>
              <option value="">選択してください</option>
              {PREFECTURES.map(pref => <option key={pref} value={pref}>{pref}</option>)}
            </select>
          </Field>
        </div>
        <Field label="市区町村" required>
          <input type="text" name="city" required defaultValue={p?.city ?? ''} placeholder="例：大阪市北区" className={INPUT} />
        </Field>
      </div>

      {/* 保有資格 */}
      <div className="space-y-3">
        <SectionHeader title="保有資格" />
        <CheckboxGroupWithOther
          name="qualifications"
          label="保有資格"
          required
          options={QUALIFICATIONS}
          defaultValues={p?.qualifications}
          columns={2}
        />
      </div>

      {/* 職務経験 */}
      <div className="space-y-4">
        <SectionHeader title="職務経験" />
        <Field label="就業状況" required>
          <select name="employment_status" required defaultValue={p?.employment_status ?? ''} className={SELECT}>
            <option value="">選択してください</option>
            {EMPLOYMENT_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </Field>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="現勤務先">
            <input type="text" name="current_employer" defaultValue={p?.current_employer ?? ''} placeholder="株式会社〇〇" className={INPUT} />
          </Field>
          <SelectWithOther
            name="recent_job_type"
            label="直近の職種"
            required
            options={RECENT_JOB_TYPES}
            defaultValue={p?.recent_job_type}
          />
          <Field label="経験年数" required>
            <select name="experience_years" required defaultValue={p?.experience_years ?? ''} className={SELECT}>
              <option value="">選択してください</option>
              {EXPERIENCE_YEARS.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </Field>
          <Field label="現在の年収" required>
            <select name="current_salary" required defaultValue={p?.current_salary ?? ''} className={SELECT}>
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
          defaultValues={p?.experience_types}
          columns={2}
        />
      </div>

      {/* 希望条件 */}
      <div className="space-y-4">
        <SectionHeader title="希望条件" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <SelectWithOther
            name="desired_job_type"
            label="希望職種"
            required
            options={DESIRED_JOB_TYPES}
            defaultValue={p?.desired_job_type}
          />
          <SelectWithOther
            name="desired_prefecture"
            label="希望勤務地"
            required
            options={PREFECTURES_WITH_OTHER}
            defaultValue={p?.desired_prefecture}
          />
          <Field label="希望年収" required>
            <select name="desired_salary" required defaultValue={p?.desired_salary ?? ''} className={SELECT}>
              <option value="">選択してください</option>
              {SALARY_RANGES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </Field>
          <Field label="転勤の可否" required>
            <select name="relocation" required defaultValue={p?.relocation ?? ''} className={SELECT}>
              <option value="">選択してください</option>
              {RELOCATION_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </Field>
        </div>
        <Field label="その他希望する勤務条件・伝えたいこと" hint="任意">
          <textarea name="other_requirements" rows={4} defaultValue={p?.other_requirements ?? ''} placeholder="ご希望の働き方やキャリアプランなど、自由にご記入ください。" className={TEXTAREA} />
        </Field>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full py-3 bg-[var(--color-red)] text-white font-bold rounded text-sm hover:bg-[var(--color-cic-red-dark)] transition-colors disabled:opacity-60"
      >
        {pending ? '保存中...' : 'プロフィールを保存する'}
      </button>
    </form>
  )
}
