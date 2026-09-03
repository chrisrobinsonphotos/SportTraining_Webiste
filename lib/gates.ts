/**
 * Password gates for the parts of the site that are not public.
 *
 * There are two, and they are deliberately SEPARATE credentials rather than
 * one shared "staff password". The store gate hides an unreleased product
 * catalogue; the inbox gate hides thirty-odd real people's names, phone
 * numbers and messages. Those are not the same secret, they do not warrant the
 * same distribution, and one being shared with a supplier must not hand over
 * the other. So each gate has its own password, its own cookie and its own
 * opaque token.
 *
 * This module is imported by BOTH the edge middleware and the Node route that
 * checks the password, so it must stay free of runtime-specific imports —
 * no `next/server`, no `node:crypto`. It is a table and two pure functions.
 */

export interface Gate {
  id: string
  /** Path prefixes this gate protects, matched on a segment boundary. */
  prefixes: string[]
  /** Cookie holding the opaque access token once the password is accepted. */
  cookie: string
  /** Env var holding that opaque token. */
  tokenEnv: string
  /** Env var holding the password a human types. */
  passwordEnv: string
  /** Where to send someone who authenticates without a specific destination. */
  home: string
  /** Gate-page copy. */
  eyebrow: string
  heading: string
  accent: string
  blurb: string
}

export const GATES: Gate[] = [
  {
    id: 'tienda',
    prefixes: ['/tienda'],
    cookie: 'st_tienda_ok',
    tokenEnv: 'TIENDA_ACCESS_TOKEN',
    passwordEnv: 'TIENDA_PASSWORD',
    home: '/tienda',
    eyebrow: 'Tienda · Acceso',
    heading: 'Zona',
    accent: 'privada',
    blurb: 'La tienda todavía no está abierta al público. Introduce la contraseña para acceder.',
  },
  {
    id: 'bandeja',
    // NOT '/lead'. /lead/confirmar is opened from a link in the daily digest by
    // someone who has no password and never will — it authenticates with its
    // own signed, single-lead, expiring token. Putting a password in front of
    // it would break the one-click reply flow entirely.
    prefixes: ['/lead/bandeja'],
    cookie: 'st_bandeja_ok',
    tokenEnv: 'BANDEJA_ACCESS_TOKEN',
    passwordEnv: 'BANDEJA_PASSWORD',
    home: '/lead/bandeja',
    eyebrow: 'Solicitudes · Acceso',
    heading: 'Bandeja',
    accent: 'privada',
    blurb: 'Aquí están los datos de contacto de personas reales. Introduce la contraseña para entrar.',
  },
]

/**
 * Which gate, if any, guards this path.
 *
 * Matching is on a segment boundary so that a future public route whose name
 * merely starts with a protected one — /tiendas, /lead/bandejas — is not
 * silently swallowed by the gate, and, more importantly, so that no path can
 * be crafted to slip past one.
 */
export function gateForPath(pathname: string): Gate | null {
  for (const gate of GATES) {
    for (const prefix of gate.prefixes) {
      if (pathname === prefix || pathname.startsWith(prefix + '/')) return gate
    }
  }
  return null
}

/**
 * Where to go after a successful password entry.
 *
 * The destination arrives in a query string, so it is attacker-controllable
 * and is treated as such: it is only honoured when it is a path inside THIS
 * gate's own area. That blocks the open-redirect (`?next=https://evil.example`)
 * and also stops one gate's password being used to land inside the other's.
 * Anything else falls back to the gate's own home.
 */
export function safeNext(gate: Gate, next: unknown): string {
  if (typeof next !== 'string' || !next.startsWith('/') || next.startsWith('//')) return gate.home
  const path = next.split('?')[0].split('#')[0]
  return gateForPath(path)?.id === gate.id ? next : gate.home
}
