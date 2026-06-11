import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

/**
 * Trial day request endpoint.
 * Receives requests from /prueba (page form) and ContactModal (background capture).
 * 1. Always: notification email to the team via Resend.
 * 2. If email present: push subscriber to MailerLite trial-leads group
 *    (MAILERLITE_TRIAL_GROUP_ID, falls back to MAILERLITE_GROUP_ID).
 * MailerLite failures never fail the request — the notification email is the
 * system of record until FitNova has an API.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { nombre, telefono, email, interes, mensaje, canal } = body

    if (!nombre || !telefono) {
      return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 })
    }

    // ── Notification email ──────────────────────────────────────────────────
    await resend.emails.send({
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
