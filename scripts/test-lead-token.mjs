// ---------------------------------------------------------------------------
// Exercises lib/lead-token.ts — the signed, expiring, single-lead tokens that
// the daily digest puts in Miguel's inbox.
//
//   node scripts/test-lead-token.mjs
//
// This is the security boundary of the whole "mark as contacted" feature, so
// it is tested by RUNNING the real module rather than by reading it. The
// module is TypeScript, so it is compiled with the project's own tsc into
// node_modules/.cache (already ignored) and the output is imported. Nothing
// here reimplements the signing — a copy that agreed with itself would prove
// nothing.
//
// No network, no database, no credentials. Exits non-zero on the first failure.
// ---------------------------------------------------------------------------

import { execFileSync } from 'node:child_process'
import { rmSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { createRequire } from 'node:module'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const out = join(root, 'node_modules', '.cache', 'st-lead-token')

rmSync(out, { recursive: true, force: true })
execFileSync(
  'npx',
  ['tsc', 'lib/lead-token.ts', '--outDir', out,
   '--module', 'commonjs', '--target', 'es2022', '--esModuleInterop', '--skipLibCheck'],
  { cwd: root, stdio: 'inherit' },
)
if (!existsSync(join(out, 'lead-token.js'))) {
  console.error('lead-token.ts did not compile — nothing to test.')
  process.exit(1)
}

const require_ = createRequire(import.meta.url)
const T = require_(join(out, 'lead-token.js'))

let failures = 0
const check = (name, cond, detail = '') => {
  if (cond) {
    console.log(`  ok    ${name}`)
  } else {
    failures++
    console.log(`  FAIL  ${name}${detail ? ' — ' + detail : ''}`)
  }
}

const GOOD_SECRET = 'a-real-looking-secret-value-0123456789'

console.log('\nunconfigured')
delete process.env.LEAD_ACTION_SECRET
check('reports itself unconfigured', T.isLeadTokenConfigured() === false)
check('refuses to sign, so the digest omits the link rather than shipping an unsigned one',
  T.signLeadToken(1, 'contacted') === null)
check('refuses to verify and names the reason',
  T.verifyLeadToken('x').reason === 'unconfigured')

process.env.LEAD_ACTION_SECRET = 'tooshort'
check('a secret under 16 chars counts as no secret at all',
  T.signLeadToken(1, 'contacted') === null)

process.env.LEAD_ACTION_SECRET = GOOD_SECRET

console.log('\nround trip')
const tok = T.signLeadToken(42, 'contacted')
check('signs into four dot-separated parts',
  typeof tok === 'string' && tok.split('.').length === 4, String(tok))
const v = T.verifyLeadToken(tok)
check('verifies back to the same lead and the same status',
  v.ok && v.id === 42 && v.status === 'contacted', JSON.stringify(v))
check('the token is URL-safe as-is', tok === encodeURIComponent(tok).replace(/%2E/g, '.'), tok)

console.log('\ntampering — every part is bound by the signature')
const [rawId, rawStatus, rawExp, sig] = tok.split('.')
check('cannot be repointed at another lead',
  T.verifyLeadToken(`43.${rawStatus}.${rawExp}.${sig}`).reason === 'bad-signature')
check('cannot be escalated to another status',
  T.verifyLeadToken(`${rawId}.converted.${rawExp}.${sig}`).reason === 'bad-signature')
check('cannot have its expiry extended',
  T.verifyLeadToken(`${rawId}.${rawStatus}.${Number(rawExp) + 99999}.${sig}`).reason === 'bad-signature')
check('a made-up signature is rejected',
  T.verifyLeadToken(`${rawId}.${rawStatus}.${rawExp}.AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA`)
    .reason === 'bad-signature')

console.log('\nmalformed input never throws')
for (const [label, input] of [
  ['garbage', 'nonsense'],
  ['empty string', ''],
  ['undefined', undefined],
  ['null', null],
  ['a number', 12345],
  ['too many parts', 'a.b.c.d.e'],
  ['an oversized token', 'a.'.repeat(400)],
]) {
  let reason
  try {
    reason = T.verifyLeadToken(input).reason
  } catch (err) {
    reason = `THREW: ${err}`
  }
  check(`${label} is rejected cleanly`, reason === 'malformed', String(reason))
}

console.log('\nkey rotation')
const oldKeyToken = T.signLeadToken(42, 'contacted')
process.env.LEAD_ACTION_SECRET = 'a-DIFFERENT-secret-value-9876543210abc'
check('rotating the secret invalidates outstanding links',
  T.verifyLeadToken(oldKeyToken).reason === 'bad-signature')
process.env.LEAD_ACTION_SECRET = GOOD_SECRET

console.log('\nexpiry')
const now = Date.now()
const shortLived = T.signLeadToken(7, 'contacted', now, 60)
check('valid inside its window', T.verifyLeadToken(shortLived, now + 59_000).ok === true)
check('expired just past it', T.verifyLeadToken(shortLived, now + 61_000).reason === 'expired')
check('exactly at the boundary counts as expired',
  T.verifyLeadToken(shortLived, now + 60_000).reason === 'expired')
check('the default TTL is the 14 days the digest promises the reader',
  T.LEAD_TOKEN_TTL_SECONDS === 14 * 24 * 3600, String(T.LEAD_TOKEN_TTL_SECONDS))

// A forged token must never be reported as merely "expired" — that would tell
// whoever sent it that their forgery was otherwise well-formed.
const expiredThenTampered = T.signLeadToken(7, 'contacted', now, 60).split('.')
check('a forged token is called forged, not expired',
  T.verifyLeadToken(`99.${expiredThenTampered[1]}.${expiredThenTampered[2]}.${expiredThenTampered[3]}`,
    now + 999_000).reason === 'bad-signature')

console.log('\nrefusing to sign nonsense')
check('non-integer id', T.signLeadToken(1.5, 'contacted') === null)
check('zero id', T.signLeadToken(0, 'contacted') === null)
check('negative id', T.signLeadToken(-1, 'contacted') === null)
check('unknown status', T.signLeadToken(1, 'banana') === null)

console.log(failures === 0 ? '\nAll checks passed.\n' : `\n${failures} check(s) FAILED.\n`)
process.exit(failures === 0 ? 0 : 1)
