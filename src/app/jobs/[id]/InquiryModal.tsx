'use client'

import { useActionState, useEffect, useRef, useState } from 'react'
import { submitInquiry } from '@/app/actions/inquiry'

export default function InquiryModal({
  jobId,
  jobTitle,
  userEmail,
}: {
  jobId: number
  jobTitle: string
  userEmail: string
}) {
  const [open, setOpen] = useState(false)
  const [result, action, pending] = useActionState(submitInquiry, null)
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    if (open) dialogRef.current?.showModal()
    else dialogRef.current?.close()
  }, [open])

  // Close on backdrop click
  function handleBackdropClick(e: React.MouseEvent<HTMLDialogElement>) {
    if (e.target === dialogRef.current) setOpen(false)
  }

  const succeeded = result?.success === true

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-full py-3.5 bg-[var(--color-cic-red)] text-white font-bold rounded text-sm hover:bg-[var(--color-cic-red-dark)] transition-colors"
      >
        詳細を聞く
      </button>

      <dialog
        ref={dialogRef}
        onClick={handleBackdropClick}
        className="w-full max-w-md rounded-lg p-0 shadow-xl backdrop:bg-black/50 open:flex open:flex-col"
        style={{ margin: 'auto' }}
      >
        <div className="p-6">
          {succeeded ? (
            <div className="text-center py-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="font-bold text-[var(--color-cic-brown)]">お問い合わせを受け付けました</p>
              <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                担当のキャリアアドバイザーより<br />3営業日以内にご連絡いたします。
              </p>
              <button
                onClick={() => setOpen(false)}
                className="mt-5 px-6 py-2 border border-[var(--color-cic-border)] rounded text-sm text-[var(--color-cic-brown)] hover:bg-gray-50 transition-colors"
              >
                閉じる
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="font-bold text-[var(--color-cic-brown)] text-base">この求人の詳細を聞く</h2>
                  <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{jobTitle}</p>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="text-gray-400 hover:text-gray-600 text-xl leading-none ml-3"
                  aria-label="閉じる"
                >
                  ×
                </button>
              </div>

              {result?.success === false && (
                <p className="mb-3 text-sm text-[var(--color-cic-red)] bg-red-50 border border-red-200 rounded px-3 py-2">
                  {result.error}
                </p>
              )}

              <p className="text-sm text-gray-600 leading-relaxed mb-1">
                ご登録の会員情報で、担当キャリアアドバイザーへお問い合わせします。
              </p>
              <p className="text-xs text-gray-400 mb-5">
                ご連絡先：{userEmail}
              </p>

              <form action={action} className="flex items-center gap-3">
                <input type="hidden" name="job_id" value={jobId} />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex-1 py-3 border border-[var(--color-cic-border)] rounded text-sm font-medium text-[var(--color-cic-brown)] hover:bg-gray-50 transition-colors"
                >
                  キャンセル
                </button>
                <button
                  type="submit"
                  disabled={pending}
                  className="flex-1 py-3 bg-[var(--color-cic-red)] text-white font-bold rounded text-sm hover:bg-[var(--color-cic-red-dark)] transition-colors disabled:opacity-60"
                >
                  {pending ? '送信中...' : '詳細を聞く'}
                </button>
              </form>
            </>
          )}
        </div>
      </dialog>
    </>
  )
}
