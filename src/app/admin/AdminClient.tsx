'use client'

import { useActionState, useRef } from 'react'
import { parseCSV, importJobs } from '@/app/actions/csvImport'

export default function AdminClient() {
  const [parseResult, parseAction, parsePending] = useActionState(parseCSV, null)
  const [importResult, importAction, importPending] = useActionState(importJobs, null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const preview = parseResult?.success ? parseResult : null
  const done = importResult?.success === true

  return (
    <div className="space-y-6">
      {/* Step 1 — Upload */}
      {!done && (
        <section className="bg-white border border-[var(--color-cic-border)] rounded-lg p-6">
          <h2 className="text-sm font-bold text-[var(--color-cic-brown)] mb-1">
            Step 1 — CSVファイルをアップロード
          </h2>
          <p className="text-xs text-gray-400 mb-4">kintoneからエクスポートしたCP932形式のCSVファイルを選択してください。</p>

          <form action={parseAction}>
            <div className="flex items-center gap-3">
              <input
                ref={fileInputRef}
                type="file"
                name="file"
                accept=".csv"
                required
                className="text-sm text-gray-600 file:mr-3 file:py-1.5 file:px-3 file:rounded file:border file:border-[var(--color-cic-border)] file:text-xs file:font-medium file:bg-white file:text-[var(--color-cic-brown)] hover:file:border-[var(--color-cic-red)] file:cursor-pointer"
              />
              <button
                type="submit"
                disabled={parsePending}
                className="shrink-0 px-4 py-2 bg-[var(--color-cic-brown)] text-white text-sm font-medium rounded hover:bg-[var(--color-cic-brown-light)] transition-colors disabled:opacity-60"
              >
                {parsePending ? '解析中...' : '解析する'}
              </button>
            </div>
            {parseResult?.success === false && (
              <p className="mt-3 text-sm text-[var(--color-cic-red)]">{parseResult.error}</p>
            )}
          </form>
        </section>
      )}

      {/* Step 2 — Preview */}
      {preview && !done && (
        <section className="bg-white border border-[var(--color-cic-border)] rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold text-[var(--color-cic-brown)]">
                Step 2 — 内容を確認してインポート
              </h2>
              <p className="text-xs text-gray-400 mt-0.5">
                有効な求人: <span className="font-bold text-[var(--color-foreground)]">{preview.total}件</span>
                　（先頭10件を表示）
              </p>
            </div>
          </div>

          {/* Preview table */}
          <div className="overflow-x-auto rounded border border-[var(--color-cic-border)] mb-5">
            <table className="w-full text-xs">
              <thead className="bg-[var(--color-cic-gray)]">
                <tr>
                  <th className="text-left px-3 py-2 font-bold text-[var(--color-cic-brown)] min-w-[200px]">求人名</th>
                  <th className="text-left px-3 py-2 font-bold text-[var(--color-cic-brown)] min-w-[120px]">法人名</th>
                  <th className="text-left px-3 py-2 font-bold text-[var(--color-cic-brown)]">年収</th>
                  <th className="text-left px-3 py-2 font-bold text-[var(--color-cic-brown)]">エリア</th>
                  <th className="text-left px-3 py-2 font-bold text-[var(--color-cic-brown)]">公開</th>
                </tr>
              </thead>
              <tbody>
                {preview.preview.map((job, i) => (
                  <tr key={i} className="border-t border-[var(--color-cic-border)]">
                    <td className="px-3 py-2 max-w-[240px] truncate">{job.title}</td>
                    <td className="px-3 py-2 max-w-[150px] truncate">{job.company_name}</td>
                    <td className="px-3 py-2 whitespace-nowrap">
                      {job.salary_min ? `${(job.salary_min / 10000).toFixed(0)}万` : '—'}
                      {job.salary_max ? `〜${(job.salary_max / 10000).toFixed(0)}万` : ''}
                    </td>
                    <td className="px-3 py-2">{job.areas.slice(0, 3).join('・') || '—'}</td>
                    <td className="px-3 py-2">
                      <span className={`px-1.5 py-0.5 rounded text-xs ${job.is_published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                        {job.is_published ? '公開' : '非公開'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {importResult?.success === false && (
            <p className="mb-3 text-sm text-[var(--color-cic-red)]">{importResult.error}</p>
          )}

          <form action={importAction} className="space-y-3">
            <input type="hidden" name="encoded" value={preview.encoded} />

            <label className="flex items-start gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                name="clear_first"
                value="true"
                defaultChecked
                className="mt-0.5 accent-[var(--color-cic-red)]"
              />
              <span className="text-xs text-gray-600 leading-relaxed">
                <span className="font-bold">既存の求人をすべて削除してからインポート</span>
                <span className="block text-gray-400 mt-0.5">週次更新時はONを推奨。OFFにすると既存データに追加されます。</span>
              </span>
            </label>

            <div className="flex items-center gap-4">
              <button
                type="submit"
                disabled={importPending}
                className="px-6 py-2.5 bg-[var(--color-cic-red)] text-white font-bold rounded text-sm hover:bg-[var(--color-cic-red-dark)] transition-colors disabled:opacity-60"
              >
                {importPending ? 'インポート中...' : `${preview.total}件をインポートする`}
              </button>
              <p className="text-xs text-gray-400">この操作は取り消せません</p>
            </div>
          </form>
        </section>
      )}

      {/* Step 3 — Done */}
      {done && importResult?.success === true && (
        <section className="bg-white border border-[var(--color-cic-border)] rounded-lg p-8 text-center">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="font-bold text-[var(--color-cic-brown)]">インポート完了</p>
          <p className="text-sm text-gray-500 mt-1">
            {importResult.inserted}件の求人を登録しました。
            {importResult.skipped > 0 && ` （${importResult.skipped}件はスキップ）`}
          </p>
          <a
            href="/admin"
            className="mt-5 inline-block text-xs text-[var(--color-cic-red)] hover:underline"
          >
            続けてインポートする
          </a>
        </section>
      )}
    </div>
  )
}
