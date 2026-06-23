'use client'

import { useState } from 'react'
import { OTHER_VALUE } from '@/lib/profileOptions'

export const INPUT = 'w-full border border-[var(--color-line)] rounded-lg px-3.5 py-3 text-base bg-white focus:outline-none focus:border-[var(--color-red)] transition-colors'
export const SELECT = INPUT
export const TEXTAREA = `${INPUT} resize-none`

export function SectionHeader({ title }: { title: string }) {
  return (
    <h2 className="text-sm font-bold text-[var(--color-ink)] bg-[var(--color-bg-warm)] border-l-4 border-[var(--color-red)] px-4 py-2.5 rounded -mx-6 mb-4">
      {title}
    </h2>
  )
}

export function Field({
  label, required, hint, children,
}: {
  label: string
  required?: boolean
  hint?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label className="block text-sm font-bold text-[var(--color-ink)] mb-1.5">
        {label}
        {required && <span className="text-[var(--color-red)] ml-1">*</span>}
        {hint && <span className="ml-2 text-xs font-normal text-[var(--color-subtle)]">{hint}</span>}
      </label>
      {children}
    </div>
  )
}

/**
 * <select> with a "その他" option that reveals a free-text input.
 * If `defaultValue` is set but isn't one of `options`, it's treated as a
 * previously-saved custom value: the select shows "その他" and the text
 * input is pre-filled with that value.
 */
export function SelectWithOther({
  name, label, required, options, defaultValue, placeholder = '選択してください',
}: {
  name: string
  label: string
  required?: boolean
  options: string[]
  defaultValue?: string | null
  placeholder?: string
}) {
  const isCustom = !!defaultValue && !options.includes(defaultValue)
  const [isOther, setIsOther] = useState(isCustom)

  return (
    <Field label={label} required={required}>
      <select
        name={name}
        defaultValue={isCustom ? OTHER_VALUE : (defaultValue ?? '')}
        required={required}
        onChange={(e) => setIsOther(e.target.value === OTHER_VALUE)}
        className={SELECT}
      >
        <option value="">{placeholder}</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
      {isOther && (
        <input
          type="text"
          name={`${name}_other`}
          defaultValue={isCustom ? defaultValue ?? '' : ''}
          required={isOther}
          placeholder="その他の内容を入力してください"
          className={`${INPUT} mt-2`}
        />
      )}
    </Field>
  )
}

/**
 * Checkbox group with a "その他" option that reveals a free-text input.
 * If `defaultValues` contains a value not present in `options` (and not the
 * literal "その他"), it's treated as a previously-saved custom value: the
 * "その他" checkbox is shown checked and the text input pre-filled.
 */
export function CheckboxGroupWithOther({
  name, label, required, options, defaultValues, columns = 2,
}: {
  name: string
  label: string
  required?: boolean
  options: string[]
  defaultValues?: string[] | null
  columns?: 1 | 2
}) {
  const defaults = defaultValues ?? []
  const customValue = defaults.find((v) => v !== OTHER_VALUE && !options.includes(v))
  const [showOther, setShowOther] = useState(defaults.includes(OTHER_VALUE) || !!customValue)

  return (
    <Field label={label} required={required}>
      <div className={`grid grid-cols-1 ${columns === 2 ? 'sm:grid-cols-2' : ''} gap-2 mt-1`}>
        {options.map((o) => (
          <label key={o} className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              name={name}
              value={o}
              defaultChecked={defaults.includes(o) || (o === OTHER_VALUE && !!customValue)}
              onChange={o === OTHER_VALUE ? (e) => setShowOther(e.target.checked) : undefined}
              className="accent-[var(--color-red)]"
            />
            {o}
          </label>
        ))}
      </div>
      {showOther && (
        <input
          type="text"
          name={`${name}_other`}
          defaultValue={customValue ?? ''}
          required={showOther}
          placeholder="その他の内容を入力してください"
          className={`${INPUT} mt-2`}
        />
      )}
    </Field>
  )
}
