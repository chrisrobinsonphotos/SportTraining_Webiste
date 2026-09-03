import { NextResponse } from 'next/server'
import { timingSafeEqual } from 'node:crypto'
import { gateForPath, safeNext, GATES, type Gate } from '@/lib/gates'

export const runtime = 'nodejs'

/**
 * Check a gate password and set that gate's access cookie.
 *
 * Which gate is being opened is derived from the destination the visitor was
 * heading for, never from a free-text field they control: a body claiming
 * gate "bandeja" while heading for /tienda would otherwise let the store
 * password be tried against the inbox and vice versa.
 */

/** Constant-time compare that cannot throw on a length mismatch. */
function matches(expected: string, given: string): boolean {
  const a = Buffer.from(expected, 'utf8')
  const b = Buffer.from(given, 'utf8')
  if (a.length !== b.length) return false
  return timingSafeEqual(a, b)
}

function resolveGate(next: unknown): Gate | null {
  if (typeof next !== 'string' || !next.startsWith('/')) return null
  return gateForPath(next.split('?')[0].split('#')[0])
}

export async function POST(req: Request) {
  let password = ''
  let next: unknown = ''
  try {
    const body = await req.json()
    password = String(body?.password ?? '')
    next = body?.next
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 })
  }

  // No destination, or one outside every gated area: fall back to the store
  // gate, which is what every existing caller means. It never opens the inbox.
  const gate = resolveGate(next) ?? GATES.find((g) => g.id === 'tienda')!

  const expected = process.env[gate.passwordEnv]
  const token = process.env[gate.tokenEnv]
  if (!expected || !token) {
    // Fail secure, and make the misconfiguration visible in the logs rather
    // than letting it read as a wrong password forever.
    console.error(`acceso: ${gate.passwordEnv} / ${gate.tokenEnv} not set`)
    return NextResponse.json({ ok: false }, { status: 503 })
  }

  if (!matches(expected, password)) {
    return NextResponse.json({ ok: false }, { status: 401 })
  }

  const res = NextResponse.json({ ok: true, next: safeNext(gate, next) })
  res.cookies.set(gate.cookie, token, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    // Scoped to the area it opens. The inbox cookie is not sent to the rest of
    // the site, so it is not exposed by every unrelated request.
    path: gate.home,
    maxAge: 60 * 60 * 24 * 30,
  })
  return res
}
