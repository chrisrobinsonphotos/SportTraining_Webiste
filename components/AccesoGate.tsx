'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

/**
 * The password screen in front of a gated area.
 *
 * Shared by both gates (see lib/gates.ts), so the copy is passed in rather
 * than written here — a screen that says "la tienda" while guarding the
 * enquiry inbox teaches whoever reads it the wrong thing about what the
 * password protects.
 *
 * Where to go next comes back from the SERVER, which validates it against the
 * gate that was actually opened. Trusting the query string here would let a
 * crafted link bounce someone off-site after a successful login.
 */

export interface GateCopy {
  eyebrow: string
  heading: string
  accent: string
  blurb: string
  home: string
}

export default function AccesoGate({ next, copy }: { next: string; copy: GateCopy }) {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/acceso', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, next }),
      })
      if (res.ok) {
        const data = (await res.json().catch(() => ({}))) as { next?: string }
        router.replace(data.next && data.next.startsWith('/') ? data.next : copy.home)
        return
      }
      // 503 is a server misconfiguration, not a typo. Saying "contraseña
      // incorrecta" there would send someone into an unwinnable loop.
      setError(
        res.status === 503
          ? 'Esta zona no está configurada en el servidor. Avisa a Chris.'
          : 'Contraseña incorrecta. Inténtalo de nuevo.',
      )
      setLoading(false)
    } catch {
      setError('Sin conexión. Inténtalo de nuevo.')
      setLoading(false)
    }
  }

  return (
    <main className="bg-[#191919] min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      <div className="geo-grid absolute inset-0 opacity-50" />
      <div className="relative w-full max-w-[420px]">
        <div className="flex items-center gap-3 mb-8">
          <div className="relative w-[46px] h-[46px]">
            <Image src="/st-logo-new.png" alt="Sport Training" fill className="object-contain" />
          </div>
          <span
            className="text-[11px] tracking-[0.28em] uppercase text-[#F1B91E]"
            style={{ fontFamily: 'var(--font-inter)', fontWeight: 700 }}
          >
            {copy.eyebrow}
          </span>
        </div>

        <h1
          className="uppercase text-white"
          style={{
            fontFamily: 'var(--font-barlow)',
            fontWeight: 800,
            fontSize: 'clamp(2rem,5vw,3rem)',
            lineHeight: 0.9,
          }}
        >
          {copy.heading} <span className="text-[#F1B91E]">{copy.accent}</span>.
        </h1>
        <p
          className="mt-4 text-[15px] leading-relaxed text-white/55"
          style={{ fontFamily: 'var(--font-inter)' }}
        >
          {copy.blurb}
        </p>

        <form onSubmit={submit} className="mt-8">
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
              setError(null)
            }}
            placeholder="Contraseña"
            autoFocus
            autoComplete="current-password"
            className="w-full bg-[#111111] border border-white/15 focus:border-[#F1B91E] outline-none text-white px-4 py-4 text-[15px] transition-colors"
            style={{ fontFamily: 'var(--font-inter)' }}
          />
          {error && (
            <p
              role="alert"
              className="mt-3 text-[13px] text-[#F1B91E]"
              style={{ fontFamily: 'var(--font-inter)', fontWeight: 600 }}
            >
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={loading || password.length === 0}
            className={`w-full mt-4 px-6 py-4 text-[13px] tracking-[0.18em] uppercase transition-colors ${
              loading || password.length === 0
                ? 'bg-white/10 text-white/40 cursor-not-allowed'
                : 'bg-[#F1B91E] text-[#191919] hover:bg-[#C99200] cursor-pointer'
            }`}
            style={{ fontFamily: 'var(--font-barlow)', fontWeight: 700 }}
          >
            {loading ? 'Comprobando…' : 'Entrar'}
          </button>
        </form>
      </div>
    </main>
  )
}
