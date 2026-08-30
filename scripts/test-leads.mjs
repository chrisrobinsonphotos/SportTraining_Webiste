// ---------------------------------------------------------------------------
// Runs db/schema.sql and every statement in lib/leads-sql.ts against PGlite
// (Postgres compiled to WASM), so the SQL is parsed and executed by a real
// Postgres before it touches the live database.
//
//   node scripts/test-leads.mjs
//
// No network, no credentials, no Docker. Exits non-zero on the first failure.
// ---------------------------------------------------------------------------

import { PGlite } from '@electric-sql/pglite'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

// lib/leads-sql.ts is plain exported string constants — pull them out without
// needing a TypeScript build step.
const sqlSrc = readFileSync(join(root, 'lib/leads-sql.ts'), 'utf8')
const Q = {}
for (const m of sqlSrc.matchAll(/export const (\w+) = `([\s\S]*?)`/g)) Q[m[1]] = m[2]

let failures = 0
const check = (name, cond, detail = '') => {
  if (cond) {
    console.log(`  ok    ${name}`)
  } else {
    failures++
    console.log(`  FAIL  ${name}${detail ? ' — ' + detail : ''}`)
  }
}

const db = new PGlite()

console.log('\nschema')
await db.exec(readFileSync(join(root, 'db/schema.sql'), 'utf8'))
check('db/schema.sql applies', true)
// Re-running must be a no-op — the migration is run by hand and will be re-run.
await db.exec(readFileSync(join(root, 'db/schema.sql'), 'utf8'))
check('schema is idempotent (re-run is clean)', true)

console.log('\nconstraints')
try {
  await db.query(Q.INSERT_LEAD, ['facebook', null, 'X', null, null, null, null, false])
  check('rejects an unknown source', false, 'the check constraint did not fire')
} catch {
  check('rejects an unknown source', true)
}
try {
  await db.query(`insert into leads (source, nombre, status) values ('prueba', 'X', 'banana')`)
  check('rejects an unknown status', false, 'the check constraint did not fire')
} catch {
  check('rejects an unknown status', true)
}
try {
  await db.query(`insert into leads (source) values ('prueba')`)
  check('requires a name', false, 'null nombre was accepted')
} catch {
  check('requires a name', true)
}

console.log('\ninsert')
const ins = await db.query(Q.INSERT_LEAD, [
  'prueba', 'modal', 'Laura Sahelices', '666375898', null, 'HYROX', null, false,
])
const id = ins.rows[0]?.id
check('INSERT_LEAD returns id and created_at', !!id && !!ins.rows[0]?.created_at)

const defaults = await db.query('select status, email_sent, subscribe from leads where id = $1', [id])
check("status defaults to 'new'", defaults.rows[0].status === 'new', `got ${defaults.rows[0].status}`)
check('email_sent defaults to false', defaults.rows[0].email_sent === false)

console.log('\nemail telemetry')
await db.query(Q.MARK_EMAIL_FAILED, [id, 'Domain not verified'])
let row = (await db.query('select email_sent, email_error from leads where id = $1', [id])).rows[0]
check('MARK_EMAIL_FAILED records the reason',
  row.email_sent === false && row.email_error === 'Domain not verified')

await db.query(Q.MARK_EMAIL_SENT, [id])
row = (await db.query('select email_sent, email_error from leads where id = $1', [id])).rows[0]
check('MARK_EMAIL_SENT clears the error', row.email_sent === true && row.email_error === null)

console.log('\nqueries')
// A second, older lead so the ordering and age maths have something to bite on.
await db.query(
  `insert into leads (source, canal, nombre, telefono, interes, created_at)
   values ('contact', 'pagina', 'Eloy', '627060360', 'HYROX', now() - interval '13 days')`
)

const recent = await db.query(Q.RECENT_LEADS, ['15'])
check('RECENT_LEADS returns both, newest first',
  recent.rows.length === 2 && recent.rows[0].nombre === 'Laura Sahelices',
  `got ${recent.rows.length} rows`)

const narrow = await db.query(Q.RECENT_LEADS, ['7'])
check('RECENT_LEADS window excludes the 13-day-old row',
  narrow.rows.length === 1, `got ${narrow.rows.length} rows`)

const pending = await db.query(Q.PENDING_LEADS)
check('PENDING_LEADS returns both, oldest first',
  pending.rows.length === 2 && pending.rows[0].nombre === 'Eloy',
  `got ${pending.rows.map(r => r.nombre).join(', ')}`)
check('PENDING_LEADS age_days is ~13 for the old one',
  Math.round(Number(pending.rows[0].age_days)) === 13,
  `got ${pending.rows[0].age_days}`)

await db.query(`update leads set status = 'contacted' where nombre = 'Eloy'`)
check('PENDING_LEADS drops contacted leads',
  (await db.query(Q.PENDING_LEADS)).rows.length === 1)

const s = (await db.query(Q.LEAD_SUMMARY)).rows[0]
check('LEAD_SUMMARY total', s.total === 2, `got ${s.total}`)
check('LEAD_SUMMARY pending', s.pending === 1, `got ${s.pending}`)
check('LEAD_SUMMARY today', s.today === 1, `got ${s.today}`)
check('LEAD_SUMMARY last_7d', s.last_7d === 1, `got ${s.last_7d}`)
check('LEAD_SUMMARY last_30d', s.last_30d === 2, `got ${s.last_30d}`)
check('LEAD_SUMMARY undelivered', s.undelivered === 1, `got ${s.undelivered}`)

const breakdown = await db.query(Q.INTEREST_BREAKDOWN, ['30'])
check('INTEREST_BREAKDOWN groups by interest',
  breakdown.rows.length === 1 && breakdown.rows[0].interes === 'HYROX' && breakdown.rows[0].n === 2,
  JSON.stringify(breakdown.rows))

await db.query(`insert into leads (source, nombre, interes) values ('prueba', 'Sin', '')`)
const withBlank = await db.query(Q.INTEREST_BREAKDOWN, ['30'])
check("INTEREST_BREAKDOWN labels blank interest as 'sin especificar'",
  withBlank.rows.some(r => r.interes === 'sin especificar'),
  JSON.stringify(withBlank.rows))

console.log(failures === 0 ? '\nAll checks passed.\n' : `\n${failures} check(s) FAILED.\n`)
process.exit(failures === 0 ? 0 : 1)
