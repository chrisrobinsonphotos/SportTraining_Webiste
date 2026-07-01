import { NextResponse } from 'next/server'
import { ACCESS_COOKIE } from '@/middleware'

export const runtime = 'nodejs'

/**
 * Validates the pre-launch store password and sets the access cookie.
 * Password / token from env with fallbacks (see middleware.ts).
 */
export async function POST(req: Request) {
  let password = ''
  try {
    const body = await req.json()
    password = String(body?.password ?? '')
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 })
  }

  const expected = process.env.TIENDA_PASSWORD || 'SportTraining2026'
  if (password !== expected) {
    return NextResponse.json({ ok: false }, { status: 401 })
  }

  const token = process.env.TIENDA_ACCESS_TOKEN || 'st-tienda-2026-granted'
  const res = NextResponse.json({ ok: true })
  res.cookies.set(ACCESS_COOKIE, token, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30, // 30 days
  })
  return res
}
