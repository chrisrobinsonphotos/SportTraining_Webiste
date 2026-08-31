import { Resend } from 'resend'
import { NextResponse } from 'next/server'
import { recordLead, markEmail, normalizeAttribution } from '@/lib/leads'

const resend = new Resend(process.env.RESEND_API_KEY)

/**
 * Trial day request endpoint.
 * Receives requests from /prueba (page form) and ContactModal (background capture).
 *
 * Order matters:
 * 1. Persist the lead to Postgres. This is the system of record — if it fails
 *    the request fails, because a submission we cannot store is a lost lead.
 * 2. Notification email to the team via Resend, recorded against the lead.
 *    A failed send no longer loses the enquiry, so it does NOT fail the
 *    request; it is flagged on the row and surfaced in the daily digest.
 * 3. If email present: push subscriber to MailerLite trial-leads group
 *    (MAILERLITE_TRIAL_GROUP_ID, falls back to MAILERLITE_GROUP_ID).
 * MailerLite failures never fail the request.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { nombre, telefono, email, interes, mensaje, canal, attribution } = body

    if (!nombre || !telefono) {
      return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 })
    }

    // ── Persist first: this is the system of record ─────────────────────────
    let leadId: number
    try {
      const lead = await recordLead({
        source: 'prueba',
        canal: canal ?? null,
        nombre,
        telefono,
        email: email ?? null,
        interes: interes ?? null,
        mensaje: mensaje ?? null,
        // First-touch attribution from the browser. Absent for anyone with
        // storage blocked, which stores cleanly as nulls rather than failing.
        ...normalizeAttribution(attribution),
      })
      leadId = lead.id
    } catch (dbError) {
      console.error('Lead store write failed (trial request) — submission NOT saved:', dbError)
      return NextResponse.json({ error: 'Error al enviar la solicitud' }, { status: 502 })
    }

    // ── Notification email ──────────────────────────────────────────────────
    const { error: emailError } = await resend.emails.send({
      from: 'Sport Training Web <noreply@sporttraining.es>',
      to: ['chrisccrobinson@gmail.com', 'miguelangelbarrionuevooliveira@gmail.com'],
      subject: `DÍA DE PRUEBA — ${nombre}${interes ? ` — ${interes}` : ''}`,
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto;background:#0a0a0a;color:#fff;padding:32px;border-top:4px solid #F1B91E">
          <h2 style="margin:0 0 8px;font-size:20px;color:#F1B91E;text-transform:uppercase;letter-spacing:0.1em">
            Solicitud de día de prueba
          </h2>
          <p style="margin:0 0 24px;color:#999;font-size:13px">
            Siguiente paso: crear cuenta de prueba en FitNova y confirmar con la persona. Ventana de 7 días.
          </p>
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:8px 0;color:#999;font-size:12px;text-transform:uppercase;letter-spacing:0.15em;width:120px">Nombre</td><td style="padding:8px 0;color:#fff">${nombre}</td></tr>
            <tr><td style="padding:8px 0;color:#999;font-size:12px;text-transform:uppercase;letter-spacing:0.15em">Teléfono</td><td style="padding:8px 0"><a href="tel:${telefono}" style="color:#F1B91E">${telefono}</a></td></tr>
            <tr><td style="padding:8px 0;color:#999;font-size:12px;text-transform:uppercase;letter-spacing:0.15em">Email</td><td style="padding:8px 0;color:#fff">${email ? `<a href="mailto:${email}" style="color:#F1B91E">${email}</a>` : '—'}</td></tr>
            <tr><td style="padding:8px 0;color:#999;font-size:12px;text-transform:uppercase;letter-spacing:0.15em">Interés</td><td style="padding:8px 0;color:#fff">${interes || '—'}</td></tr>
            <tr><td style="padding:8px 0;color:#999;font-size:12px;text-transform:uppercase;letter-spacing:0.15em;vertical-align:top">Mensaje</td><td style="padding:8px 0;color:#fff">${mensaje || '—'}</td></tr>
            <tr><td style="padding:8px 0;color:#999;font-size:12px;text-transform:uppercase;letter-spacing:0.15em">Canal</td><td style="padding:8px 0;color:#fff">${canal === 'modal' ? 'Modal (WhatsApp)' : 'Página /prueba'}</td></tr>
          </table>
          <p style="margin:24px 0 0;color:#555;font-size:11px">sporttraining.es/prueba · ${new Date().toLocaleString('es-ES', { timeZone: 'Europe/Madrid' })}</p>
        </div>
      `,
    })

    // The Resend SDK resolves with { data, error } instead of throwing on API
    // errors, so this has to be inspected explicitly. The lead is already
    // stored at this point, so a failed send is recorded rather than returned
    // as an error — the submission genuinely succeeded.
    if (emailError) {
      console.error('Resend send failed (trial request):', emailError)
      await markEmail(leadId, false, String((emailError as { message?: string })?.message ?? emailError))
    } else {
      await markEmail(leadId, true)
    }

    // ── MailerLite trial lead (best-effort, requires email) ─────────────────
    const trialGroup = process.env.MAILERLITE_TRIAL_GROUP_ID || process.env.MAILERLITE_GROUP_ID
    if (email && process.env.MAILERLITE_API_KEY) {
      try {
        await fetch('https://connect.mailerlite.com/api/subscribers', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.MAILERLITE_API_KEY}`,
          },
          body: JSON.stringify({
            email,
            fields: {
              name: nombre,
              phone: telefono,
            },
            groups: trialGroup ? [trialGroup] : [],
          }),
        })
      } catch (mlError) {
        console.error('MailerLite trial push failed (non-fatal):', mlError)
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Trial request error:', error)
    return NextResponse.json({ error: 'Error al enviar la solicitud' }, { status: 500 })
  }
}
