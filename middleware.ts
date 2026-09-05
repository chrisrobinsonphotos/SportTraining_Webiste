import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { gateForPath } from '@/lib/gates'

/**
 * Password gates for the non-public parts of the site.
 *
 * Two areas are protected, each with its OWN credential (see lib/gates.ts):
 *   /tienda/*        the unreleased supplement store
 *   /lead/bandeja/*  the enquiry inbox — real names, phones and messages
 *
 * Everything else on sporttraining.es stays fully public. In particular
 * /lead/confirmar is NOT gated: it is opened from a link in the daily digest
 * by someone who has no password, and it authenticates with its own signed,
 * expiring, single-lead token instead.
 *
 * Passwords and tokens come from env ONLY, with no fallbacks in code. If a
 * gate's env vars are missing the gate stays CLOSED for everyone rather than
 * falling open — an unconfigured deployment must not publish a list of
 * people's phone numbers.
 *
 * Set these in Vercel → Project → Settings → Environment Variables:
 *   TIENDA_PASSWORD / TIENDA_ACCESS_TOKEN
 *   BANDEJA_PASSWORD / BANDEJA_ACCESS_TOKEN
 */

/** Kept exported: older imports referenced the store cookie by this name. */
export const ACCESS_COOKIE = 'st_tienda_ok'

export function middleware(req: NextRequest) {
  const gate = gateForPath(req.nextUrl.pathname)
  if (!gate) return NextResponse.next()

  // Read per-request rather than at module scope: a token captured once at
  // module init is a stale token after an env change, and the failure mode is
  // a gate that silently stops accepting the right password.
  const token = process.env[gate.tokenEnv]
  const authed = Boolean(token) && req.cookies.get(gate.cookie)?.value === token
  if (authed) return NextResponse.next()

  const url = new URL('/acceso', req.url)
  url.searchParams.set('next', req.nextUrl.pathname + req.nextUrl.search)
  return NextResponse.redirect(url)
}

export const config = {
  matcher: ['/tienda', '/tienda/:path*', '/lead/bandeja', '/lead/bandeja/:path*'],
}
