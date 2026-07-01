'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function AccesoGate({ next }: { next: string }) {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(false)
    try {
      const res = await fetch('/api/acceso', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      if (res.ok) {
        router.replace(next && next.startsWith('/tienda') ? next : '/tienda')
      } else {
        setError(true)
        setLoading(false)
      }
    } catch {
      setError(true)
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
          <span className="text-[11px] tracking-[0.28em] uppercase text-[#F1B91E]" style={{ fontFamily: 'var(--font-inter)', fontWeight: 700 }}>
            Tienda · Acceso
          </span>
        </div>

        <h1 className="uppercase text-white" style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800, fontSize: 'clamp(2rem,5vw,3rem)', lineHeight: 0.9 }}>
          Zona <span className="text-[#F1B91E]">privada</span>.
        </h1>
        <p className="mt-4 text-[15px] leading-relaxed text-white/55" style={{ fontFamily: 'var(--font-inter)' }}>
          La tienda todavía no está abierta al público. Introduce la contraseña para acceder.
        </p>

        <form onSubmit={submit} className="mt-8">
          <input
            type="password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(false) }}
            placeholder="Contraseña"
            autoFocus
            className="w-full bg-[#111111] border border-white/15 focus:border-[#F1B91E] outline-none text-white px-4 py-4 text-[15px] transition-colors"
            style={{ fontFamily: 'var(--font-inter)' }}
          />
          {error && (
            <p className="mt-3 text-[13px] text-[#F1B91E]" style={{ fontFamily: 'var(--font-inter)', fontWeight: 600 }}>
              Contraseña incorrecta. Inténtalo de nuevo.
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
