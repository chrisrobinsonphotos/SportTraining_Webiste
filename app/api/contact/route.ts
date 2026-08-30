import { Resend } from 'resend'
import { NextResponse } from 'next/server'
import { recordLead, markEmail } from '@/lib/leads'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { nombre, email, telefono, interes, mensaje, subscribe } = body

    if (!nombre || !email) {
      return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 })
    }

    // ── Persist first: this is the system of record. A submission we cannot
    //    store is a lost enquiry, so a failure here fails the request. ───────
    let leadId: number
    try {
      const lead = await recordLead({
        source: 'contact',
        canal: 'pagina',
        nombre,
        telefono: telefono ?? null,
        email,
        interes: interes ?? null,
        mensaje: mensaje ?? null,
        subscribe: !!subscribe,
      })
      leadId = lead.id
    } catch (dbError) {
      console.error('Lead store write failed (contact form) — submission NOT saved:', dbError)
      return NextResponse.json({ error: 'Error al enviar el mensaje' }, { status: 502 })
    }

    // ── Notification email ──────────────────────────────────────────────────
    const { error: emailError } = await resend.emails.send({
      from: 'Sport Training Web <noreply@sporttraining.es>',
      to: ['chrisccrobinson@gmail.com', 'miguelangelbarrionuevooliveira@gmail.com'],
      subject: `Nuevo contacto web — ${interes} — ${nombre}`,
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto;background:#0a0a0a;color:#fff;padding:32px;border-top:4px solid #F1B91E">
          <h2 style="margin:0 0 24px;font-size:20px;color:#F1B91E;text-transform:uppercase;letter-spacing:0.1em">
            Nuevo mensaje — sporttraining.es
          </h2>
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:8px 0;color:#999;font-size:12px;text-transform:uppercase;letter-spacing:0.15em;width:120px">Nombre</td><td style="padding:8px 0;color:#fff">${nombre}</td></tr>
            <tr><td style="padding:8px 0;color:#999;font-size:12px;text-transform:uppercase;letter-spacing:0.15em">Email</td><td style="padding:8px 0"><a href="mailto:${email}" style="color:#F1B91E">${email}</a></td></tr>
            <tr><td style="padding:8px 0;color:#999;font-size:12px;text-transform:uppercase;letter-spacing:0.15em">Teléfono</td><td style="padding:8px 0;color:#fff">${telefono || '—'}</td></tr>
            <tr><td style="padding:8px 0;color:#999;font-size:12px;text-transform:uppercase;letter-spacing:0.15em">Interés</td><td style="padding:8px 0;color:#fff">${interes}</td></tr>
            <tr><td style="padding:8px 0;color:#999;font-size:12px;text-transform:uppercase;letter-spacing:0.15em;vertical-align:top">Mensaje</td><td style="padding:8px 0;color:#fff">${mensaje || '—'}</td></tr>
            <tr><td style="padding:8px 0;color:#999;font-size:12px;text-transform:uppercase;letter-spacing:0.15em">Newsletter</td><td style="padding:8px 0;color:#fff">${subscribe ? '✓ Sí' : 'No'}</td></tr>
          </table>
          <p style="margin:24px 0 0;color:#555;font-size:11px">sporttraining.es · ${new Date().toLocaleString('es-ES', { timeZone: 'Europe/Madrid' })}</p>
        </div>
      `,
    })

    // The Resend SDK resolves with { data, error } instead of throwing on API
    // errors, so this has to be inspected explicitly. The enquiry is already
    // stored, so a failed send is recorded rather than returned as an error.
    if (emailError) {
      console.error('Resend send failed (contact form):', emailError)
      await markEmail(leadId, false, String((emailError as { message?: string })?.message ?? emailError))
    } else {
      await markEmail(leadId, true)
    }

    // ── MailerLite subscriber (if opted in) ─────────────────────────────────
    if (subscribe && process.env.MAILERLITE_API_KEY) {
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
            phone: telefono || '',
          },
          groups: process.env.MAILERLITE_GROUP_ID
            ? [process.env.MAILERLITE_GROUP_ID]
            : [],
        }),
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({ error: 'Error al enviar el mensaje' }, { status: 500 })
  }
}
