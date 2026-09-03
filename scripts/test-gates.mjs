// ---------------------------------------------------------------------------
// Checks the gate table in lib/gates.ts — which paths are protected, which are
// deliberately NOT, and that a destination taken from a query string cannot be
// used to redirect off-site or to cross from one gate into the other.
//
//   node scripts/test-gates.mjs
//
// lib/gates.ts is plain data and two pure functions, so it is transpiled here
// with a regex rather than a TypeScript build step — same trick as
// test-leads.mjs uses for the SQL.
// ---------------------------------------------------------------------------

import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const src = readFileSync(join(root, 'lib/gates.ts'), 'utf8')

// Strip the TypeScript: the interface block, type annotations on the two
// exported functions, and the `: Gate[]` on the table.
const js = src
  .replace(/export interface Gate \{[\s\S]*?\n\}\n/, '')
  .replace(/export const GATES: Gate\[\]/, 'export const GATES')
  .replace(/export function gateForPath\(pathname: string\): Gate \| null/, 'export function gateForPath(pathname)')
  .replace(/export function safeNext\(gate: Gate, next: unknown\): string/, 'export function safeNext(gate, next)')

const mod = await import('data:text/javascript;base64,' + Buffer.from(js).toString('base64'))
const { GATES, gateForPath, safeNext } = mod

let failures = 0
const check = (name, cond, detail = '') => {
  if (cond) console.log(`  ok    ${name}`)
  else { failures++; console.log(`  FAIL  ${name}${detail ? ' — ' + detail : ''}`) }
}

console.log('\ngate table')
check('two gates, with distinct cookies', new Set(GATES.map(g => g.cookie)).size === GATES.length && GATES.length === 2)
check('the gates do not share a password env var',
  new Set(GATES.map(g => g.passwordEnv)).size === GATES.length,
  GATES.map(g => g.passwordEnv).join(', '))
check('the gates do not share an access token env var',
  new Set(GATES.map(g => g.tokenEnv)).size === GATES.length)

console.log('\nwhat is protected')
const tienda = GATES.find(g => g.id === 'tienda')
const bandeja = GATES.find(g => g.id === 'bandeja')
check('/tienda is gated', gateForPath('/tienda')?.id === 'tienda')
check('/tienda/creatina is gated', gateForPath('/tienda/creatina')?.id === 'tienda')
check('/lead/bandeja is gated', gateForPath('/lead/bandeja')?.id === 'bandeja')
check('/lead/bandeja/algo is gated', gateForPath('/lead/bandeja/algo')?.id === 'bandeja')

console.log('\nwhat is deliberately NOT protected')
// The digest link is opened by someone who has no password and never will.
check('/lead/confirmar is NOT gated — it arrives from the digest email',
  gateForPath('/lead/confirmar') === null)
check('/lead alone is not gated', gateForPath('/lead') === null)
check('the home page is not gated', gateForPath('/') === null)
check('/contacto is not gated', gateForPath('/contacto') === null)
// Boundary matching, so a lookalike path cannot inherit or evade a gate.
check('/tiendas is not swallowed by the /tienda gate', gateForPath('/tiendas') === null)
check('/lead/bandejas is not swallowed by the inbox gate', gateForPath('/lead/bandejas') === null)

console.log('\ndestination after login')
check('a normal destination inside the gate is kept',
  safeNext(bandeja, '/lead/bandeja?filtro=nuevas') === '/lead/bandeja?filtro=nuevas')
check('an absolute URL is refused (open redirect)',
  safeNext(bandeja, 'https://evil.example/x') === bandeja.home)
check('a protocol-relative URL is refused',
  safeNext(bandeja, '//evil.example/x') === bandeja.home)
check('a path in the OTHER gate is refused — one password must not open both',
  safeNext(bandeja, '/tienda') === bandeja.home)
check('the store gate cannot be talked into landing inside the inbox',
  safeNext(tienda, '/lead/bandeja') === tienda.home)
check('an ungated public path is refused',
  safeNext(bandeja, '/contacto') === bandeja.home)
check('a missing destination falls back to the gate home',
  safeNext(bandeja, undefined) === bandeja.home && safeNext(tienda, null) === tienda.home)
check('a query string cannot smuggle a different gate past the check',
  safeNext(bandeja, '/tienda?next=/lead/bandeja') === bandeja.home)

console.log(failures === 0 ? '\nAll checks passed.\n' : `\n${failures} check(s) FAILED.\n`)
process.exit(failures === 0 ? 0 : 1)
