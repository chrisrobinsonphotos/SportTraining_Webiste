import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Pre-launch gate for the supplement store.
 *
 * Only `/tienda/*` is protected — the rest of sporttraining.es stays fully public.
 * Unauthenticated visitors are redirected to `/acceso` (branded password page).
 * Once the correct password is entered, `/api/acceso` sets the access cookie and
 * the middleware lets them through.
 *
 * Password + token read from env with a built-in fallback so it works on deploy
 * without extra config:
 *   TIENDA_PASSWORD      (default "SportTraining2026")
 *   TIENDA_ACCESS_TOKEN  (opaque cookie value; default below)
 *
 * Remove this file (and the matcher) to open the store to the public.
 */

export const ACCESS_COOKIE = 'st_tienda_ok'
const TOKEN = process.env.TIENDA_ACCESS_TOKEN || 'st-tienda-2026-granted'

export function middleware(req: NextRequest) {
  const authed = req.cookies.get(ACCESS_COOKIE)?.value === TOKEN
  if (authed) return NextResponse.next()

  const gate = new URL('/acceso', req.url)
  gate.searchParams.set('next', req.nextUrl.pathname + req.nextUrl.search)
  return NextResponse.redirect(gate)
}

export const config = {
  matcher: ['/tienda', '/tienda/:path*'],
}
