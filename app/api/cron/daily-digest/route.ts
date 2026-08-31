import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { getLeadSummary, getPendingLeads, getInterestBreakdown, getResponseTimes } from '@/lib/leads'
import { signLeadToken, isLeadTokenConfigured } from '@/lib/lead-token'

/**
 * Daily lead digest — fired by Vercel Cron (see vercel.json), 05:00 UTC.
 *
 * Runs on Vercel, so it already has DATABASE_URL and RESEND_API_KEY; nothing
 * has to be copied to another machine for this to work. That is the whole
 * reason it lives here rather than in the monitoring scripts.
 *
 * Guarded by CRON_SECRET. Vercel sends it as `Authorization: Bearer $CRON_SECRET`
 * on scheduled invocations. If the secret is unset the route refuses rather
 * than falling open — it reads personal data and triggers a send.
 */

export const dynamic = 'force-dynamic'
export const maxDuration = 30

const TO = ['chrisccrobinson@gmail.com']

const siteUrl = (): string =>
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'https://sporttraining.es'

/**
 * The one-click link.
 *
 * It is a GET to a page that only READS. The mutation is a POST the page makes
 * after an explicit button press. That split is not ceremony: every scanner,
 * spam filter and link previewer between here and Miguel's phone fetches every
 * URL in this email unprompted, so a GET that marked a lead contacted would do
 * so while the digest was still unread — and the response-time figures below
 * would then be measuring Gmail's crawler.
 *
 * Each token names one lead and one status and expires in 14 days. Tomorrow's
 * digest reissues one for anything still pending, so nothing gets stranded.
 */
function markContactedUrl(id: unknown): string | null {
  const leadId = Number(id)
  if (!Number.isInteger(leadId) || leadId <= 0) return null
  const token = signLeadToken(leadId, 'contacted')
  if (!token) return null
  return `${siteUrl()}/lead/confirmar?t=${encodeURIComponent(token)}`
}

/** Hours as something readable at a glance on a lock screen. */
function hrs(v: number | null): string {
  if (v === null || !Number.isFinite(v)) return '—'
  if (v < 1) return `${Math.round(v * 60)} min`
  if (v < 48) return `${v < 10 ? v.toFixed(1) : Math.round(v)} h`
  return `${Math.round(v / 24)} d`
}

function esc(s: unknown): string {
  return String(s ?? '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET
  if (!secret) {
    console.error('CRON_SECRET is not set — refusing to run the digest')
    return NextResponse.json({ error: 'Not configured' }, { status: 503 })
  }
  const auth = req.headers.get('authorization') ?? ''
  if (auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let summary: Record<string, unknown>
  let pending: Record<string, unknown>[]
  let interests: { interes: string; n: number }[]
  let response: Awaited<ReturnType<typeof getResponseTimes>>
  try {
    ;[summary, pending, interests, response] = await Promise.all([
      getLeadSummary(),
      getPendingLeads(),
      getInterestBreakdown(30),
      getResponseTimes(30),
    ])
  } catch (err) {
    console.error('Digest query failed:', err)
    return NextResponse.json({ error: 'Query failed' }, { status: 502 })
  }

  const nuevas = Number(summary.last_24h ?? 0)
  const esperando = Number(summary.pending ?? 0)
  const sinAviso = Number(summary.undelivered ?? 0)
  const oldest = pending.length ? Math.round(Number(pending[0].age_days ?? 0)) : 0

  // The subject line has to be readable on a lock screen without opening it —
  // that is the whole point of a 07:00 digest.
  const subject = nuevas > 0
    ? `${nuevas} solicitud${nuevas === 1 ? '' : 'es'} nueva${nuevas === 1 ? '' : 's'} · ${esperando} sin responder`
    : esperando > 0
      ? `Sin solicitudes nuevas · ${esperando} sin responder (la más antigua ${oldest} d)`
      : 'Sin solicitudes nuevas · nada pendiente'

  // One signed link per pending lead. If LEAD_ACTION_SECRET is unset the column
  // is simply absent — the digest still goes out, because a missing button is
  // an inconvenience and a missing digest is a lost morning.
  const canAct = isLeadTokenConfigured()

  const rows = pending.slice(0, 30).map((p) => {
    const age = Math.round(Number(p.age_days ?? 0))
    const stale = age >= 7
    const url = canAct ? markContactedUrl(p.id) : null
    const action = url
      ? `<a href="${esc(url)}" style="display:inline-block;background:#F1B91E;color:#0a0a0a;text-decoration:none;font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;padding:7px 12px;white-space:nowrap">Contactada</a>`
      : ''
    return `<tr>
      <td style="padding:8px 10px;border-top:1px solid #2A2A2A;color:#fff">${esc(p.nombre)}</td>
      <td style="padding:8px 10px;border-top:1px solid #2A2A2A"><a href="tel:${esc(p.telefono)}" style="color:#F1B91E;text-decoration:none">${esc(p.telefono) || '—'}</a></td>
      <td style="padding:8px 10px;border-top:1px solid #2A2A2A;color:#bbb">${esc(p.interes) || '—'}</td>
      <td style="padding:8px 10px;border-top:1px solid #2A2A2A;text-align:right;color:${stale ? '#F0904E' : '#888'};font-weight:${stale ? 700 : 400}">${age} d</td>
      ${canAct ? `<td style="padding:8px 10px;border-top:1px solid #2A2A2A;text-align:right">${action}</td>` : ''}
    </tr>`
  }).join('')

  const interestLine = interests.length
    ? interests.slice(0, 6).map((i) => `${esc(i.interes)} ${i.n}`).join(' · ')
    : '—'

  const html = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,sans-serif;max-width:640px;margin:0 auto;background:#0a0a0a;color:#fff;padding:32px;border-top:4px solid #F1B91E">
      <h2 style="margin:0 0 4px;font-size:20px;color:#F1B91E;text-transform:uppercase;letter-spacing:.1em">Solicitudes web</h2>
      <p style="margin:0 0 24px;color:#888;font-size:13px">${esc(new Date().toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'Europe/Madrid' }))}</p>

      <table style="width:100%;border-collapse:collapse;margin-bottom:28px">
        <tr>
          <td style="padding:14px;background:#161616;border-left:3px solid #F1B91E">
            <div style="font-size:26px;font-weight:700;line-height:1">${nuevas}</div>
            <div style="font-size:11px;color:#888;text-transform:uppercase;letter-spacing:.12em;margin-top:4px">Últimas 24 h</div>
          </td>
          <td style="width:10px"></td>
          <td style="padding:14px;background:#161616;border-left:3px solid ${oldest >= 7 ? '#9E1420' : '#F1B91E'}">
            <div style="font-size:26px;font-weight:700;line-height:1">${esperando}</div>
            <div style="font-size:11px;color:#888;text-transform:uppercase;letter-spacing:.12em;margin-top:4px">Sin responder</div>
          </td>
          <td style="width:10px"></td>
          <td style="padding:14px;background:#161616;border-left:3px solid ${sinAviso ? '#B4480C' : '#1E6F4C'}">
            <div style="font-size:26px;font-weight:700;line-height:1">${sinAviso}</div>
            <div style="font-size:11px;color:#888;text-transform:uppercase;letter-spacing:.12em;margin-top:4px">Sin aviso por email</div>
          </td>
        </tr>
      </table>

      ${pending.length ? `
        <p style="margin:0 0 8px;font-size:12px;color:#888;text-transform:uppercase;letter-spacing:.14em">Esperando respuesta — más antiguas primero</p>
        <table style="width:100%;border-collapse:collapse;font-size:14px">
          <thead><tr>
            <th style="text-align:left;padding:6px 10px;font-size:10px;color:#777;text-transform:uppercase;letter-spacing:.14em;font-weight:500">Nombre</th>
            <th style="text-align:left;padding:6px 10px;font-size:10px;color:#777;text-transform:uppercase;letter-spacing:.14em;font-weight:500">Teléfono</th>
            <th style="text-align:left;padding:6px 10px;font-size:10px;color:#777;text-transform:uppercase;letter-spacing:.14em;font-weight:500">Interés</th>
            <th style="text-align:right;padding:6px 10px;font-size:10px;color:#777;text-transform:uppercase;letter-spacing:.14em;font-weight:500">Espera</th>
            ${canAct ? '<th style="text-align:right;padding:6px 10px;font-size:10px;color:#777;text-transform:uppercase;letter-spacing:.14em;font-weight:500">Acción</th>' : ''}
          </tr></thead>
          <tbody>${rows}</tbody>
        </table>
        ${pending.length > 30 ? `<p style="margin:10px 0 0;color:#888;font-size:12px">…y ${pending.length - 30} más.</p>` : ''}
      ` : '<p style="color:#5FCB95;font-size:15px">Nada pendiente. Todas las solicitudes están atendidas.</p>'}

      <p style="margin:26px 0 8px;font-size:12px;color:#888;text-transform:uppercase;letter-spacing:.14em">Tiempo de respuesta — solicitudes de los últimos 30 días</p>
      <table style="width:100%;border-collapse:collapse;margin-bottom:6px">
        <tr>
          <td style="padding:12px 14px;background:#161616;border-left:3px solid ${
            response.median_hours !== null && response.median_hours > 24 ? '#B4480C' : '#F1B91E'
          }">
            <div style="font-size:20px;font-weight:700;line-height:1">${esc(hrs(response.median_hours))}</div>
            <div style="font-size:11px;color:#888;text-transform:uppercase;letter-spacing:.12em;margin-top:4px">Mediana</div>
          </td>
          <td style="width:10px"></td>
          <td style="padding:12px 14px;background:#161616;border-left:3px solid ${
            response.worst_hours !== null && response.worst_hours > 72 ? '#9E1420' : '#F1B91E'
          }">
            <div style="font-size:20px;font-weight:700;line-height:1">${esc(hrs(response.worst_hours))}</div>
            <div style="font-size:11px;color:#888;text-transform:uppercase;letter-spacing:.12em;margin-top:4px">La peor</div>
          </td>
          <td style="width:10px"></td>
          <td style="padding:12px 14px;background:#161616;border-left:3px solid #2A2A2A">
            <div style="font-size:20px;font-weight:700;line-height:1">${response.answered}<span style="color:#888;font-size:14px">/${response.answered + response.unanswered}</span></div>
            <div style="font-size:11px;color:#888;text-transform:uppercase;letter-spacing:.12em;margin-top:4px">Respondidas</div>
          </td>
        </tr>
      </table>
      <p style="margin:0;color:#555;font-size:11px">
        ${response.answered === 0
          ? 'Todavía no hay ninguna respondida en la ventana, así que no hay mediana que calcular.'
          : `Calculado sobre las ${response.answered} respondidas de ${response.answered + response.unanswered}. Las ${response.unanswered} sin responder no cuentan todavía — cuentan cuando se responden.`}
      </p>

      <p style="margin:26px 0 0;padding-top:14px;border-top:1px solid #2A2A2A;color:#888;font-size:12px">
        Interés, últimos 30 días: ${interestLine}
      </p>
      <p style="margin:10px 0 0;color:#555;font-size:11px">
        ${esperando} de ${esc(summary.total)} solicitudes guardadas siguen sin responder.
        Las solicitudes se guardan aunque falle el email — “sin aviso por email” significa que nadie recibió la notificación, no que se haya perdido.
      </p>
      ${canAct ? `<p style="margin:8px 0 0;color:#555;font-size:11px">
        “Contactada” abre una página de confirmación: nada cambia hasta que pulses el botón que aparece allí. Los enlaces caducan a los 14 días y el resumen de mañana trae unos nuevos.
      </p>` : ''}
    </div>`

  const resend = new Resend(process.env.RESEND_API_KEY)
  const { error } = await resend.emails.send({
    from: 'Sport Training Web <noreply@sporttraining.es>',
    to: TO,
    subject,
    html,
  })

  if (error) {
    console.error('Digest send failed:', error)
    return NextResponse.json({ error: 'Send failed', detail: String(error) }, { status: 502 })
  }

  return NextResponse.json({ sent: true, subject, pending: esperando, new_24h: nuevas, action_links: canAct })
}
