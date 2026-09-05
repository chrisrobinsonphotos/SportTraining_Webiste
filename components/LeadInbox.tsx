'use client'

import { useMemo, useState } from 'react'

/**
 * The working list of website enquiries.
 *
 * This is an operational tool, not a report: the job it exists for is "answer
 * the person, then say so", and everything on screen is arranged around that.
 * The phone number is the primary action because that is how these enquiries
 * are actually answered. Waiting leads are loud and closed ones are quiet.
 *
 * Every mutation goes through a signed, single-lead, expiring token minted on
 * the server — the same mechanism the daily digest uses. No bearer credential
 * ever reaches the browser, so a leaked page or an open laptop grants exactly
 * what the page already shows and nothing wider.
 */

export type LeadStatus = 'new' | 'contacted' | 'converted' | 'lost'

export interface InboxLead {
  id: number
  nombre: string
  telefono: string | null
  email: string | null
  interes: string | null
  mensaje: string | null
  origen: string
  formulario: string
  createdAt: string
  status: LeadStatus
  contactedAt: string | null
  ageDays: number
  responseHours: number | null
  tokens: Partial<Record<Exclude<LeadStatus, 'new'>, string>>
}

const STATUS_LABEL: Record<LeadStatus, string> = {
  new: 'Sin contactar',
  contacted: 'Contactada',
  converted: 'Se apuntó',
  lost: 'No siguió',
}

type Filter = 'pendientes' | 'contactadas' | 'cerradas' | 'todas'

const FILTERS: { id: Filter; label: string; match: (s: LeadStatus) => boolean }[] = [
  { id: 'pendientes', label: 'Pendientes', match: (s) => s === 'new' },
  { id: 'contactadas', label: 'Contactadas', match: (s) => s === 'contacted' },
  { id: 'cerradas', label: 'Cerradas', match: (s) => s === 'converted' || s === 'lost' },
  { id: 'todas', label: 'Todas', match: () => true },
]

function esperando(days: number): string {
  if (days < 1 / 24) return 'ahora mismo'
  if (days < 1) return `${Math.round(days * 24)} h`
  const d = Math.round(days)
  return `${d} ${d === 1 ? 'día' : 'días'}`
}

function respondidaEn(hours: number): string {
  if (hours < 1) return 'en menos de una hora'
  if (hours < 48) return `en ${Math.round(hours)} h`
  const d = Math.round(hours / 24)
  return `en ${d} ${d === 1 ? 'día' : 'días'}`
}

/** Fixed locale and timezone so the server and the browser render the same string. */
function fecha(iso: string): string {
  return new Date(iso).toLocaleString('es-ES', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Europe/Madrid',
  })
}

const MONO = { fontFamily: 'var(--font-inter)' } as const
const DISPLAY = { fontFamily: 'var(--font-barlow)' } as const

function Pill({
  active,
  onClick,
  children,
  count,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
  count: number
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{ ...MONO, fontWeight: 700, letterSpacing: '0.14em' }}
      className={`px-4 py-3 text-[0.7rem] uppercase border transition-colors duration-150 cursor-pointer whitespace-nowrap ${
        active
          ? 'bg-[#F1B91E] text-[#0a0a0a] border-[#F1B91E]'
          : 'bg-transparent text-white/55 border-white/15 hover:border-white/40 hover:text-white'
      }`}
    >
      {children}
      <span className={active ? 'text-[#0a0a0a]/60 ml-2' : 'text-white/30 ml-2'}>{count}</span>
    </button>
  )
}

function Card({
  lead,
  busy,
  error,
  onAction,
}: {
  lead: InboxLead
  busy: Exclude<LeadStatus, 'new'> | null
  error: string | null
  onAction: (lead: InboxLead, to: Exclude<LeadStatus, 'new'>) => void
}) {
  const waiting = lead.status === 'new'
  const stale = waiting && lead.ageDays >= 2
  const veryStale = waiting && lead.ageDays >= 7
  const closed = lead.status === 'converted' || lead.status === 'lost'

  const edge = veryStale ? '#F0904E' : stale ? '#F1B91E' : waiting ? 'rgba(255,255,255,0.22)' : 'transparent'

  return (
    <article
      className={`border border-white/8 mb-3 ${closed ? 'bg-[#111111]' : 'bg-[#161616]'}`}
      style={{ borderLeft: `3px solid ${edge}` }}
    >
      <div className="p-5 md:p-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="min-w-0">
            <h2
              style={{ ...DISPLAY, fontWeight: 800 }}
              className={`uppercase leading-[0.95] text-[1.5rem] md:text-[1.75rem] ${closed ? 'text-white/45' : 'text-white'}`}
            >
              {lead.nombre}
            </h2>
            <p style={{ ...MONO, fontWeight: 400 }} className="text-white/35 text-[0.8rem] mt-1.5">
              {lead.formulario} · {lead.origen} · {fecha(lead.createdAt)}
            </p>
          </div>

          <span
            style={{ ...MONO, fontWeight: 700, letterSpacing: '0.14em' }}
            className={`text-[0.62rem] uppercase px-2.5 py-1.5 whitespace-nowrap ${
              waiting
                ? veryStale
                  ? 'bg-[#F0904E] text-[#0a0a0a]'
                  : 'bg-white/10 text-white/70'
                : 'border border-white/15 text-white/40'
            }`}
          >
            {waiting ? `Esperando ${esperando(lead.ageDays)}` : STATUS_LABEL[lead.status]}
          </span>
        </div>

        {(lead.interes || lead.mensaje) && (
          <div className="mt-4">
            {lead.interes && (
              <p style={{ ...MONO, fontWeight: 600 }} className="text-[#F1B91E] text-[0.85rem]">
                {lead.interes}
              </p>
            )}
            {lead.mensaje && (
              <p
                style={{ ...MONO, fontWeight: 300 }}
                className="text-white/55 text-[0.95rem] leading-relaxed mt-1.5 whitespace-pre-line"
              >
                {lead.mensaje}
              </p>
            )}
          </div>
        )}

        {!waiting && lead.responseHours !== null && (
          <p style={{ ...MONO, fontWeight: 400 }} className="text-white/30 text-[0.78rem] mt-3">
            Respondida {respondidaEn(lead.responseHours)}
          </p>
        )}

        <div className="mt-5 flex flex-wrap gap-2.5">
          {lead.telefono && (
            <>
              <a
                href={`tel:${lead.telefono}`}
                style={{ ...MONO, fontWeight: 700, letterSpacing: '0.12em' }}
                className="px-5 py-3 text-[0.72rem] uppercase border border-[#F1B91E] text-[#F1B91E] hover:bg-[#F1B91E] hover:text-[#0a0a0a] transition-colors duration-150"
              >
                Llamar {lead.telefono}
              </a>
              <a
                href={`https://wa.me/${lead.telefono.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ ...MONO, fontWeight: 700, letterSpacing: '0.12em' }}
                className="px-5 py-3 text-[0.72rem] uppercase border border-white/20 text-white/70 hover:border-white/50 hover:text-white transition-colors duration-150"
              >
                WhatsApp
              </a>
            </>
          )}
          {lead.email && (
            <a
              href={`mailto:${lead.email}`}
              style={{ ...MONO, fontWeight: 700, letterSpacing: '0.12em' }}
              className="px-5 py-3 text-[0.72rem] uppercase border border-white/20 text-white/70 hover:border-white/50 hover:text-white transition-colors duration-150"
            >
              Email
            </a>
          )}
        </div>

        {!closed && (
          <div className="mt-3 pt-4 border-t border-white/8 flex flex-wrap gap-2.5 items-center">
            <span
              style={{ ...MONO, fontWeight: 600, letterSpacing: '0.16em' }}
              className="text-[0.6rem] uppercase text-white/25 mr-1"
            >
              Marcar
            </span>
            {(['contacted', 'converted', 'lost'] as const).map((to) =>
              lead.tokens[to] ? (
                <button
                  key={to}
                  type="button"
                  disabled={busy !== null}
                  onClick={() => onAction(lead, to)}
                  style={{ ...MONO, fontWeight: 700, letterSpacing: '0.12em' }}
                  className={`px-4 py-2.5 text-[0.68rem] uppercase border transition-colors duration-150 ${
                    busy !== null
                      ? 'border-white/8 text-white/20 cursor-not-allowed'
                      : to === 'contacted'
                        ? 'border-white/30 text-white hover:bg-white hover:text-[#0a0a0a] cursor-pointer'
                        : 'border-white/15 text-white/50 hover:border-[#F1B91E] hover:text-[#F1B91E] cursor-pointer'
                  }`}
                >
                  {busy === to ? 'Guardando…' : STATUS_LABEL[to]}
                </button>
              ) : null,
            )}
          </div>
        )}

        {error && (
          <p role="alert" style={{ ...MONO, fontWeight: 500 }} className="mt-3 text-[0.85rem] text-[#F0904E]">
            {error}
          </p>
        )}
      </div>
    </article>
  )
}

export default function LeadInbox({
  leads: initial,
  truncated,
  actionsDisabledReason,
}: {
  leads: InboxLead[]
  truncated: boolean
  actionsDisabledReason: string | null
}) {
  const [leads, setLeads] = useState(initial)
  const [filter, setFilter] = useState<Filter>('pendientes')
  const [query, setQuery] = useState('')
  const [busy, setBusy] = useState<{ id: number; to: Exclude<LeadStatus, 'new'> } | null>(null)
  const [errors, setErrors] = useState<Record<number, string>>({})

  const counts = useMemo(() => {
    const c: Record<Filter, number> = { pendientes: 0, contactadas: 0, cerradas: 0, todas: leads.length }
    for (const l of leads) {
      if (l.status === 'new') c.pendientes++
      else if (l.status === 'contacted') c.contactadas++
      else c.cerradas++
    }
    return c
  }, [leads])

  const shown = useMemo(() => {
    const f = FILTERS.find((x) => x.id === filter)!
    const q = query.trim().toLowerCase()
    return leads.filter((l) => {
      if (!f.match(l.status)) return false
      if (!q) return true
      return (
        l.nombre.toLowerCase().includes(q) ||
        (l.telefono ?? '').toLowerCase().includes(q) ||
        (l.email ?? '').toLowerCase().includes(q) ||
        (l.interes ?? '').toLowerCase().includes(q)
      )
    })
  }, [leads, filter, query])

  const oldest = useMemo(
    () => leads.filter((l) => l.status === 'new').reduce((m, l) => Math.max(m, l.ageDays), 0),
    [leads],
  )

  async function apply(lead: InboxLead, to: Exclude<LeadStatus, 'new'>) {
    const token = lead.tokens[to]
    if (!token || busy) return
    setBusy({ id: lead.id, to })
    setErrors((e) => ({ ...e, [lead.id]: '' }))
    try {
      const res = await fetch('/api/leads/status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      })
      if (res.ok) {
        const data = (await res.json().catch(() => ({}))) as { lead?: { contacted_at?: string | null } }
        const contactedAt = data.lead?.contacted_at ?? lead.contactedAt ?? new Date().toISOString()
        setLeads((prev) =>
          prev.map((l) =>
            l.id === lead.id
              ? {
                  ...l,
                  status: to,
                  contactedAt,
                  responseHours:
                    l.responseHours ??
                    (new Date(contactedAt).getTime() - new Date(l.createdAt).getTime()) / 3_600_000,
                  // 'contactada' is spent once used; the outcome buttons remain.
                  tokens: to === 'contacted' ? { ...l.tokens, contacted: undefined } : {},
                }
              : l,
          ),
        )
        return
      }
      const data = (await res.json().catch(() => ({}))) as { error?: string }
      setErrors((e) => ({
        ...e,
        [lead.id]:
          res.status === 410
            ? 'Este enlace ha caducado. Recarga la página para renovarlo.'
            : data.error || 'No se ha podido guardar. Inténtalo de nuevo.',
      }))
    } catch {
      setErrors((e) => ({ ...e, [lead.id]: 'Sin conexión. Inténtalo de nuevo.' }))
    } finally {
      setBusy(null)
    }
  }

  return (
    <main className="bg-[#0a0a0a] min-h-screen">
      <div className="h-[3px] bg-[#F1B91E] w-full" />

      <div className="mx-auto px-5 md:px-8 py-10 md:py-14" style={{ maxWidth: '860px' }}>
        <p
          style={{ ...MONO, fontWeight: 700, letterSpacing: '0.2em' }}
          className="text-[0.65rem] uppercase text-[#F1B91E] mb-3"
        >
          Sport Training · Solicitudes web
        </p>
        <h1
          style={{ ...DISPLAY, fontWeight: 800 }}
          className="uppercase text-white leading-[0.9] text-[2.5rem] md:text-[3.5rem]"
        >
          {counts.pendientes > 0 ? (
            <>
              {counts.pendientes} <span className="text-[#F1B91E]">sin contestar</span>
            </>
          ) : (
            <>
              Todo <span className="text-[#F1B91E]">contestado</span>
            </>
          )}
        </h1>
        <p style={{ ...MONO, fontWeight: 300 }} className="text-white/45 text-[0.95rem] mt-4 leading-relaxed">
          {counts.pendientes > 0
            ? `La más antigua lleva esperando ${esperando(oldest)}. Todas llegaron por los formularios de la web.`
            : 'No queda ninguna solicitud pendiente. Abajo está el historial completo.'}
        </p>

        {actionsDisabledReason && (
          <p
            role="alert"
            style={{ ...MONO, fontWeight: 500 }}
            className="mt-6 border border-[#F0904E]/40 bg-[#F0904E]/10 text-[#F0904E] text-[0.88rem] leading-relaxed p-4"
          >
            {actionsDisabledReason}
          </p>
        )}

        <div className="mt-8 flex gap-2 flex-wrap">
          {FILTERS.map((f) => (
            <Pill key={f.id} active={filter === f.id} onClick={() => setFilter(f.id)} count={counts[f.id]}>
              {f.label}
            </Pill>
          ))}
        </div>

        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar por nombre, teléfono o interés"
          style={MONO}
          className="w-full mt-3 mb-8 bg-[#111111] border border-white/12 focus:border-[#F1B91E] outline-none text-white px-4 py-3.5 text-[0.95rem] transition-colors"
        />

        {shown.length === 0 ? (
          <p style={{ ...MONO, fontWeight: 300 }} className="text-white/35 text-[0.95rem] py-10 text-center">
            {query ? 'Nada coincide con esa búsqueda.' : 'No hay nada en esta lista.'}
          </p>
        ) : (
          shown.map((l) => (
            <Card
              key={l.id}
              lead={l}
              busy={busy?.id === l.id ? busy.to : null}
              error={errors[l.id] || null}
              onAction={apply}
            />
          ))
        )}

        {truncated && (
          <p style={{ ...MONO, fontWeight: 400 }} className="text-white/30 text-[0.8rem] mt-6 leading-relaxed">
            La lista está recortada por tamaño. Todas las solicitudes pendientes se muestran siempre; lo
            que falta es historial antiguo ya cerrado.
          </p>
        )}
      </div>
    </main>
  )
}
