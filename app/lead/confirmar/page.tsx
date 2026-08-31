import type { Metadata } from 'next'
import { verifyLeadToken, signLeadToken } from '@/lib/lead-token'
import { getLead } from '@/lib/leads'
import LeadStatusConfirm, { type LeadAction } from '@/components/LeadStatusConfirm'

/**
 * Confirmation page for the one-click link in the daily digest.
 *
 * This page READS. It never writes, on any code path, and that is the point:
 * mail scanners, spam filters and link previewers fetch every URL in an email
 * without being asked. If following the link were enough to mark a lead
 * contacted, leads would be marked contacted while the digest sat unread, and
 * the response-time metric would measure Gmail rather than Miguel.
 *
 * So the flow is: signed link → this page → an explicit button press → POST
 * /api/leads/status. A scanner gets as far as reading a name.
 *
 * It is noindex/nofollow and dynamic — it shows one person's name and phone
 * number to whoever holds an unexpired signed link, and must never be cached
 * or crawled.
 */

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Solicitud',
  robots: { index: false, follow: false, nocache: true },
}

const STATUS_LABEL: Record<string, string> = {
  new: 'Sin contactar',
  contacted: 'Contactada',
  converted: 'Convertida',
  lost: 'Perdida',
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <main className="bg-[#0a0a0a] min-h-screen flex items-start justify-center px-5 py-16 md:py-24">
      <div className="w-full" style={{ maxWidth: '520px' }}>
        <div className="h-[3px] bg-[#F1B91E] w-full" />
        <div className="bg-[#161616] border border-white/8 border-t-0" style={{ padding: 'clamp(1.75rem, 5vw, 2.75rem)' }}>
          {children}
        </div>
      </div>
    </main>
  )
}

function Title({ children }: { children: React.ReactNode }) {
  return (
    <h1
      style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800 }}
      className="text-[2.25rem] leading-[0.95] uppercase text-white mb-5"
    >
      {children}
    </h1>
  )
}

function Body({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{ fontFamily: 'var(--font-inter)', fontWeight: 300 }}
      className="text-white/60 text-[1rem] leading-relaxed"
    >
      {children}
    </p>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline gap-4 py-3 border-t border-white/8">
      <span
        style={{ fontFamily: 'var(--font-inter)', fontWeight: 600, letterSpacing: '0.16em' }}
        className="text-[0.65rem] uppercase text-white/35 w-[92px] flex-shrink-0"
      >
        {label}
      </span>
      <span style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }} className="text-[1rem] text-white">
        {value}
      </span>
    </div>
  )
}

function waitedFor(created: Date, until: Date): string {
  const hours = Math.max(0, (until.getTime() - created.getTime()) / 3_600_000)
  if (hours < 1) return 'menos de una hora'
  if (hours < 24) return `${Math.round(hours)} h`
  const days = Math.round(hours / 24)
  return `${days} ${days === 1 ? 'día' : 'días'}`
}

export default async function ConfirmarPage({
  searchParams,
}: {
  searchParams: Promise<{ t?: string }>
}) {
  const { t } = await searchParams
  const result = verifyLeadToken(t)

  if (!result.ok) {
    const copy: Record<typeof result.reason, string> = {
      unconfigured:
        'Esta función no está configurada en el servidor. Avisa a Chris — falta la clave de firma.',
      malformed: 'El enlace está incompleto. Ábrelo de nuevo desde el correo del resumen diario.',
      'bad-signature': 'El enlace no es válido. Ábrelo de nuevo desde el correo del resumen diario.',
      expired:
        'El enlace ha caducado. El resumen diario de mañana trae uno nuevo para esta misma solicitud.',
    }
    return (
      <Shell>
        <Title>Enlace no válido</Title>
        <Body>{copy[result.reason]}</Body>
      </Shell>
    )
  }

  let lead: Record<string, unknown> | null
  try {
    lead = await getLead(result.id)
  } catch (err) {
    console.error('Confirmation page could not read the lead:', err)
    return (
      <Shell>
        <Title>No disponible</Title>
        <Body>No se ha podido leer la solicitud ahora mismo. Inténtalo en un momento.</Body>
      </Shell>
    )
  }

  if (!lead) {
    return (
      <Shell>
        <Title>No encontrada</Title>
        <Body>Esta solicitud ya no existe en el sistema.</Body>
      </Shell>
    )
  }

  const nombre = String(lead.nombre ?? '—')
  const telefono = lead.telefono ? String(lead.telefono) : null
  const created = new Date(String(lead.created_at))
  const currentStatus = String(lead.status ?? 'new')
  const alreadyDone = currentStatus !== 'new'
  const contactedAt = lead.contacted_at ? new Date(String(lead.contacted_at)) : null

  // 'converted' and 'lost' are terminal — there is nothing left to record, so
  // the page stops offering actions rather than letting a closed lead be
  // reopened by whoever still holds an old link.
  const terminal = currentStatus === 'converted' || currentStatus === 'lost'

  /**
   * Each outcome gets its own freshly-signed token, minted here on the server
   * where LEAD_ACTION_SECRET lives. The emailed link only ever authorises
   * 'contacted'; these are additional grants for THIS lead, issued because a
   * human is already looking at the page.
   *
   * Without them `status_counts.converted` could never move off zero, and the
   * funnel's Converted stage would be a decoration.
   */
  const actions: LeadAction[] = []
  if (!terminal) {
    if (!alreadyDone) {
      actions.push({
        token: t as string,
        label: 'Marcar como contactada',
        doneLabel: 'Marcada como contactada',
        tone: 'primary',
      })
    }
    const converted = signLeadToken(result.id, 'converted')
    const lost = signLeadToken(result.id, 'lost')
    if (converted) {
      actions.push({
        token: converted,
        label: 'Se apuntó',
        doneLabel: 'Marcada como convertida',
        tone: alreadyDone ? 'primary' : 'secondary',
      })
    }
    if (lost) {
      actions.push({
        token: lost,
        label: 'No siguió',
        doneLabel: 'Marcada como perdida',
        tone: 'secondary',
      })
    }
  }

  const fecha = created.toLocaleString('es-ES', {
    day: 'numeric',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Europe/Madrid',
  })

  return (
    <Shell>
      <p
        style={{ fontFamily: 'var(--font-inter)', fontWeight: 600, letterSpacing: '0.2em' }}
        className="text-[0.65rem] uppercase text-[#F1B91E] mb-4"
      >
        Solicitud web
      </p>

      <Title>{nombre}</Title>

      <div className="mb-8">
        {telefono && <Row label="Teléfono" value={telefono} />}
        {lead.interes ? <Row label="Interés" value={String(lead.interes)} /> : null}
        <Row label="Recibida" value={fecha} />
        <Row
          label="Estado"
          value={
            alreadyDone && contactedAt
              ? `${STATUS_LABEL[currentStatus] ?? currentStatus} · respondida en ${waitedFor(created, contactedAt)}`
              : `${STATUS_LABEL[currentStatus] ?? currentStatus} · lleva esperando ${waitedFor(created, new Date())}`
          }
        />
      </div>

      {telefono && (
        <a
          href={`tel:${telefono}`}
          style={{
            fontFamily: 'var(--font-inter)',
            fontWeight: 700,
            fontSize: '0.85rem',
            letterSpacing: '0.16em',
            padding: '1.15rem 2rem',
          }}
          className="block w-full text-center uppercase border border-[#F1B91E] text-[#F1B91E] hover:bg-[#F1B91E] hover:text-[#0a0a0a] transition-colors duration-150 mb-4"
        >
          Llamar ahora
        </a>
      )}

      {terminal ? (
        <Body>
          Está marcada como <strong className="text-white/80">{(STATUS_LABEL[currentStatus] ?? currentStatus).toLowerCase()}</strong>, así que
          no hay nada más que hacer aquí.
        </Body>
      ) : (
        <>
          {alreadyDone && (
            <p
              style={{ fontFamily: 'var(--font-inter)', fontWeight: 300 }}
              className="text-white/50 text-[0.95rem] leading-relaxed mb-5"
            >
              Ya estaba marcada como <strong className="text-white/80">contactada</strong>. Si ya sabes
              cómo ha terminado, ciérrala aquí.
            </p>
          )}
          <LeadStatusConfirm actions={actions} />
          <p
            style={{ fontFamily: 'var(--font-inter)', fontWeight: 300 }}
            className="text-white/35 text-[0.8rem] leading-relaxed mt-4"
          >
            {alreadyDone
              ? 'Cerrarla la saca de la lista para siempre. Nada cambia hasta que pulses un botón.'
              : 'Sale de la lista de pendientes y queda registrado cuánto ha tardado la respuesta. Nada cambia hasta que pulses un botón.'}
          </p>
        </>
      )}
    </Shell>
  )
}
