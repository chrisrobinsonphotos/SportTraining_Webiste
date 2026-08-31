'use client'

import { useState } from 'react'

/**
 * The explicit human action that actually mutates the lead.
 *
 * Everything up to this point — the link in the email, the page around it — is
 * read-only, precisely so that the scanners and previewers which fetch every
 * URL in an inbox cannot change anything. Nothing moves until someone presses
 * one of these buttons, and pressing one issues a POST, which nothing
 * automated does.
 *
 * Each action carries its own signed token. That is why offering three buttons
 * needs no change to the token format: a token names one lead and one status,
 * so the "convertida" button cannot be replayed to mark something contacted,
 * and none of them can be repointed at another lead.
 */

export interface LeadAction {
  token: string
  /** Button text. */
  label: string
  /** Confirmation text once it has been applied. */
  doneLabel: string
  /** `primary` is the expected next step; `secondary` are the other outcomes. */
  tone: 'primary' | 'secondary'
}

export default function LeadStatusConfirm({ actions }: { actions: LeadAction[] }) {
  const [state, setState] = useState<'idle' | 'working' | 'done' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const [doneLabel, setDoneLabel] = useState('')
  const [pending, setPending] = useState<string | null>(null)

  async function apply(action: LeadAction) {
    if (state === 'working' || state === 'done') return
    setPending(action.token)
    setState('working')
    try {
      const res = await fetch('/api/leads/status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: action.token }),
      })
      if (res.ok) {
        setDoneLabel(action.doneLabel)
        setState('done')
        return
      }
      const data = (await res.json().catch(() => ({}))) as { error?: string }
      setMessage(data.error || 'No se ha podido actualizar. Inténtalo de nuevo.')
      setState('error')
    } catch {
      setMessage('Sin conexión. Inténtalo de nuevo.')
      setState('error')
    } finally {
      setPending(null)
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

  const primary = actions.filter((a) => a.tone === 'primary')
  const secondary = actions.filter((a) => a.tone === 'secondary')
  const busy = state === 'working'

  return (
    <div>
      {primary.map((a) => (
        <button
          key={a.token}
          type="button"
          onClick={() => apply(a)}
          disabled={busy}
          style={{
            fontFamily: 'var(--font-inter)',
            fontWeight: 700,
            fontSize: '0.85rem',
            letterSpacing: '0.16em',
            padding: '1.15rem 2rem',
          }}
          className={`w-full uppercase transition-colors duration-150 mb-3 ${
            busy
              ? 'bg-white/10 text-white/30 cursor-not-allowed'
              : 'bg-[#F1B91E] text-[#0a0a0a] hover:bg-white cursor-pointer'
          }`}
        >
          {busy && pending === a.token ? 'Guardando…' : a.label}
        </button>
      ))}

      {secondary.length > 0 && (
        <div className={`grid gap-3 ${secondary.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
          {secondary.map((a) => (
            <button
              key={a.token}
              type="button"
              onClick={() => apply(a)}
              disabled={busy}
              style={{
                fontFamily: 'var(--font-inter)',
                fontWeight: 600,
                fontSize: '0.75rem',
                letterSpacing: '0.16em',
                padding: '0.95rem 1rem',
              }}
              className={`uppercase border transition-colors duration-150 ${
                busy
                  ? 'border-white/10 text-white/25 cursor-not-allowed'
                  : 'border-white/25 text-white/70 hover:border-[#F1B91E] hover:text-[#F1B91E] cursor-pointer'
              }`}
            >
              {busy && pending === a.token ? 'Guardando…' : a.label}
            </button>
          ))}
        </div>
      )}

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
