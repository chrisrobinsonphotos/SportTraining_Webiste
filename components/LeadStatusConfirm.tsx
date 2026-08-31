'use client'

import { useState } from 'react'

/**
 * The explicit human action that actually mutates the lead.
 *
 * Everything up to this point — the link in the email, the page around it — is
 * read-only, precisely so that the scanners and previewers which fetch every
 * URL in an inbox cannot change anything. Nothing moves until someone presses
 * this button, and pressing it issues a POST, which nothing automated does.
 */
export default function LeadStatusConfirm({
  token,
  label,
  doneLabel,
}: {
  token: string
  label: string
  doneLabel: string
}) {
  const [state, setState] = useState<'idle' | 'working' | 'done' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function confirm() {
    if (state === 'working' || state === 'done') return
    setState('working')
    try {
      const res = await fetch('/api/leads/status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      })
      if (res.ok) {
        setState('done')
        return
      }
      const data = (await res.json().catch(() => ({}))) as { error?: string }
      setMessage(data.error || 'No se ha podido actualizar. Inténtalo de nuevo.')
      setState('error')
    } catch {
      setMessage('Sin conexión. Inténtalo de nuevo.')
      setState('error')
    }
  }

  if (state === 'done') {
    return (
      <div
        role="status"
        className="flex items-center gap-4 bg-[#F1B91E] text-[#0a0a0a]"
        style={{ padding: '1.25rem 1.5rem' }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} className="w-6 h-6 flex-shrink-0">
          <path strokeLinecap="square" d="M5 13l4 4L19 7" />
        </svg>
        <span
          style={{ fontFamily: 'var(--font-inter)', fontWeight: 700, letterSpacing: '0.08em' }}
          className="text-[0.85rem] uppercase"
        >
          {doneLabel}
        </span>
      </div>
    )
  }

  return (
    <div>
      <button
        type="button"
        onClick={confirm}
        disabled={state === 'working'}
        style={{
          fontFamily: 'var(--font-inter)',
          fontWeight: 700,
          fontSize: '0.85rem',
          letterSpacing: '0.16em',
          padding: '1.15rem 2rem',
        }}
        className={`w-full uppercase transition-colors duration-150 ${
          state === 'working'
            ? 'bg-white/10 text-white/30 cursor-not-allowed'
            : 'bg-[#F1B91E] text-[#0a0a0a] hover:bg-white cursor-pointer'
        }`}
      >
        {state === 'working' ? 'Guardando…' : label}
      </button>

      {state === 'error' && (
        <p
          role="alert"
          style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }}
          className="mt-4 text-[0.9rem] text-[#F0904E]"
        >
          {message}
        </p>
      )}
    </div>
  )
}
