import type { Metadata } from 'next'
import { getInboxLeads, INBOX_LIMIT } from '@/lib/leads'
import { signLeadToken, isLeadTokenConfigured } from '@/lib/lead-token'
import LeadInbox, { type InboxLead, type LeadStatus } from '@/components/LeadInbox'

/**
 * The enquiry inbox — the working list behind the password gate.
 *
 * Why this page exists at all: the Daily Surface dashboard is a sandboxed
 * artifact and physically cannot write to this site, so marking an enquiry
 * answered there is only ever an intention that a nightly job carries across.
 * Here the button and the database are on the same side of the wall, so the
 * lead moves the moment someone presses it.
 *
 * Two properties are deliberate:
 *
 *   1. It renders per request and is noindex/nofollow. It shows real people's
 *      names, phone numbers and messages, so nothing about it may be cached,
 *      crawled, or served from a stale edge copy.
 *
 *   2. No credential capable of writing reaches the browser. Each action is a
 *      separately signed token naming ONE lead and ONE target status, minted
 *      here where LEAD_ACTION_SECRET lives. That is the same mechanism the
 *      digest email uses, and it means the worst a leaked page can do is what
 *      the page already shows.
 */

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Solicitudes — Sport Training',
  robots: { index: false, follow: false, nocache: true },
}

const FORM_LABEL: Record<string, string> = {
  prueba: 'Web · día de prueba',
  contact: 'Web · contacto',
}

/**
 * Where the person came from, in one phrase.
 *
 * Mirrors ATTRIBUTION_BREAKDOWN's fallback chain, including its most important
 * distinction: 'directo' means measured and genuinely unreferred, while
 * 'sin datos' means the enquiry predates attribution being captured at all.
 * Collapsing those two would quietly relabel a month of unmeasured history as
 * direct traffic.
 */
function origen(row: Record<string, unknown>): string {
  const utm = String(row.utm_source ?? '').trim()
  if (utm) return utm
  const ref = String(row.referrer ?? '').trim()
  if (ref) {
    const host = ref.match(/^[a-zA-Z][a-zA-Z0-9+.-]*:\/\/(?:www\.)?([^/?#]+)/)
    if (host) return host[1]
  }
  return row.landing_page === null || row.landing_page === undefined ? 'sin datos' : 'directo'
}

function Notice({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <main className="bg-[#0a0a0a] min-h-screen flex items-start justify-center px-5 py-16 md:py-24">
      <div className="w-full" style={{ maxWidth: '520px' }}>
        <div className="h-[3px] bg-[#F1B91E] w-full" />
        <div
          className="bg-[#161616] border border-white/8 border-t-0"
          style={{ padding: 'clamp(1.75rem, 5vw, 2.75rem)' }}
        >
          <h1
            style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800 }}
            className="text-[2.25rem] leading-[0.95] uppercase text-white mb-5"
          >
            {title}
          </h1>
          <p
            style={{ fontFamily: 'var(--font-inter)', fontWeight: 300 }}
            className="text-white/60 text-[1rem] leading-relaxed"
          >
            {children}
          </p>
        </div>
      </div>
    </main>
  )
}

export default async function BandejaPage() {
  let rows: Record<string, unknown>[]
  try {
    rows = await getInboxLeads()
  } catch (err) {
    console.error('Inbox could not read the leads:', err)
    return (
      <Notice title="No disponible">
        No se ha podido leer la lista ahora mismo. Vuelve a intentarlo en un momento — no se ha perdido
        ninguna solicitud.
      </Notice>
    )
  }

  // A signing key is required to change anything. Without it the page still
  // shows the list — the phone numbers are the point and they still work —
  // but it says plainly why the buttons are missing rather than shipping
  // controls that silently fail.
  const canAct = isLeadTokenConfigured()

  const leads: InboxLead[] = rows.map((r) => {
    const id = Number(r.id)
    const status = String(r.status ?? 'new') as LeadStatus
    const terminal = status === 'converted' || status === 'lost'

    const tokens: InboxLead['tokens'] = {}
    if (canAct && !terminal) {
      // Only the outcomes that are still available are offered: an already
      // contacted lead cannot be contacted again, and a closed one is closed.
      if (status === 'new') tokens.contacted = signLeadToken(id, 'contacted') ?? undefined
      tokens.converted = signLeadToken(id, 'converted') ?? undefined
      tokens.lost = signLeadToken(id, 'lost') ?? undefined
    }

    return {
      id,
      nombre: String(r.nombre ?? '—'),
      telefono: r.telefono ? String(r.telefono) : null,
      email: r.email ? String(r.email) : null,
      interes: r.interes ? String(r.interes) : null,
      mensaje: r.mensaje ? String(r.mensaje) : null,
      origen: origen(r),
      formulario: FORM_LABEL[String(r.source)] ?? 'Web',
      createdAt: new Date(String(r.created_at)).toISOString(),
      status,
      contactedAt: r.contacted_at ? new Date(String(r.contacted_at)).toISOString() : null,
      ageDays: Number(r.age_days ?? 0),
      responseHours: r.response_hours === null || r.response_hours === undefined ? null : Number(r.response_hours),
      tokens,
    }
  })

  return (
    <LeadInbox
      leads={leads}
      truncated={rows.length >= INBOX_LIMIT}
      actionsDisabledReason={
        canAct
          ? null
          : 'Falta LEAD_ACTION_SECRET en el servidor, así que no se puede marcar nada desde aquí. Los teléfonos siguen funcionando. Avisa a Chris.'
      }
    />
  )
}
