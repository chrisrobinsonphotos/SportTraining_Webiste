import { NextResponse } from 'next/server'
import { setLeadStatus, isLeadStatus, type LeadStatus } from '@/lib/leads'
import { verifyLeadToken } from '@/lib/lead-token'

/**
 * Move a lead out of the queue.
 *
 * POST only, and that is a load-bearing decision rather than REST tidiness.
 * The link that reaches this feature is in an email, and every mail scanner,
 * spam filter and link previewer in the chain fetches every URL it finds. A
 * GET that mutated would mark leads contacted before Miguel had read the
 * digest, which would corrupt the exact metric this exists to measure. There
 * is deliberately no GET handler here.
 *
 * Two ways in, both authenticated:
 *
 *   1. A signed action token from the digest email. It names one lead and one
 *      target status, and it expires. The confirmation page holds it and posts
 *      it when a human presses the button.
 *   2. `Authorization: Bearer $LEADS_DIGEST_TOKEN` with an explicit id and
 *      status, for the dashboard and for working the list in bulk.
 *
 * With neither, the route refuses. It never falls open when a secret is unset:
 * an unconfigured deployment must not become a world-writable lead database.
 */

export const dynamic = 'force-dynamic'

type Outcome = { status: number; body: Record<string, unknown> }

const deny = (code: number, error: string): Outcome => ({ status: code, body: { error } })

/** Resolve who is asking and what they are allowed to do. */
function authorize(body: Record<string, unknown>, req: Request):
  | { ok: true; id: number; status: LeadStatus; via: 'token' | 'bearer' }
  | { ok: false; outcome: Outcome } {

  // ── 1. Signed token from the digest email ────────────────────────────────
  if (typeof body.token === 'string' && body.token) {
    const result = verifyLeadToken(body.token)
    if (!result.ok) {
      if (result.reason === 'unconfigured') {
        console.error('LEAD_ACTION_SECRET is not set — refusing to act on a lead token')
        return { ok: false, outcome: deny(503, 'Not configured') }
      }
      if (result.reason === 'expired') {
        return { ok: false, outcome: deny(410, 'El enlace ha caducado') }
      }
      return { ok: false, outcome: deny(401, 'Enlace no válido') }
    }
    // The token names the lead and the status. Anything in the body that
    // disagrees is ignored rather than honoured — the signature is the
    // authority, not the request that carried it.
    return { ok: true, id: result.id, status: result.status, via: 'token' }
  }

  // ── 2. Bearer token, for the dashboard ───────────────────────────────────
  const expected = process.env.LEADS_DIGEST_TOKEN
  if (!expected) {
    console.error('LEADS_DIGEST_TOKEN is not set — refusing to mutate leads')
    return { ok: false, outcome: deny(503, 'Not configured') }
  }
  const auth = req.headers.get('authorization') ?? ''
  const bearer = auth.startsWith('Bearer ') ? auth.slice(7) : ''
  if (!bearer || bearer !== expected) {
    return { ok: false, outcome: deny(401, 'Unauthorized') }
  }

  const id = Number(body.id)
  if (!Number.isInteger(id) || id <= 0) {
    return { ok: false, outcome: deny(400, 'A positive integer id is required') }
  }
  if (!isLeadStatus(body.status)) {
    return { ok: false, outcome: deny(400, "status must be one of new, contacted, converted, lost") }
  }
  return { ok: true, id, status: body.status, via: 'bearer' }
}

export async function POST(req: Request) {
  let body: Record<string, unknown>
  try {
    body = (await req.json()) as Record<string, unknown>
    if (!body || typeof body !== 'object') throw new Error('not an object')
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const auth = authorize(body, req)
  if (!auth.ok) return NextResponse.json(auth.outcome.body, { status: auth.outcome.status })

  try {
    const lead = await setLeadStatus(auth.id, auth.status)
    if (!lead) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 })
    }
    return NextResponse.json({ ok: true, via: auth.via, lead })
  } catch (err) {
    console.error('Lead status update failed:', err)
    return NextResponse.json({ error: 'Update failed' }, { status: 502 })
  }
}
