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
  await db.query(Q.INSERT_LEAD, ['facebook', null, 'X', null, null, null, null, false,
    null, null, null, null, null, null])
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
  'instagram', 'social', 'hyrox-abril', 'story-2', 'https://l.instagram.com/', '/prueba?utm_source=instagram',
])
const id = ins.rows[0]?.id
check('INSERT_LEAD returns id and created_at', !!id && !!ins.rows[0]?.created_at)

const defaults = await db.query('select status, email_sent, subscribe from leads where id = $1', [id])
check("status defaults to 'new'", defaults.rows[0].status === 'new', `got ${defaults.rows[0].status}`)
check('email_sent defaults to false', defaults.rows[0].email_sent === false)
check('contacted_at starts null',
  (await db.query('select contacted_at from leads where id = $1', [id])).rows[0].contacted_at === null)

console.log('\nattribution columns')
const attr = (await db.query(
  'select utm_source, utm_medium, utm_campaign, utm_content, referrer, landing_page from leads where id = $1',
  [id])).rows[0]
check('INSERT_LEAD stores all six attribution columns',
  attr.utm_source === 'instagram' && attr.utm_medium === 'social' &&
  attr.utm_campaign === 'hyrox-abril' && attr.utm_content === 'story-2' &&
  attr.referrer === 'https://l.instagram.com/' &&
  attr.landing_page === '/prueba?utm_source=instagram',
  JSON.stringify(attr))

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
check('LEAD_SUMMARY last_24h', s.last_24h === 1, `got ${s.last_24h}`)
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

console.log('\nsingle lead')
const one = (await db.query(Q.GET_LEAD, [id])).rows[0]
check('GET_LEAD returns the lead the confirmation page shows',
  one && one.nombre === 'Laura Sahelices' && one.status === 'new',
  JSON.stringify(one))
check('GET_LEAD on a missing id returns nothing',
  (await db.query(Q.GET_LEAD, [999999])).rows.length === 0)

console.log('\nstatus transitions')
const moved = (await db.query(Q.SET_LEAD_STATUS, [id, 'contacted'])).rows[0]
check('SET_LEAD_STATUS returns the updated row',
  !!moved && moved.status === 'contacted', JSON.stringify(moved))
check('SET_LEAD_STATUS stamps contacted_at', moved.contacted_at !== null)

// The metric is time to FIRST response, so a later move must not rewrite it —
// otherwise marking an old lead 'converted' would silently reset its clock and
// flatter every response-time figure that reads the column.
// Back-dated deliberately. Comparing two consecutive now() calls would not
// prove anything here — PGlite answers both within the same millisecond, so
// the assertion passed even with the coalesce removed. Hours apart, it bites.
await db.query(`update leads set contacted_at = now() - interval '3 hours' where id = $1`, [id])
const firstStamp = String(
  (await db.query('select contacted_at from leads where id = $1', [id])).rows[0].contacted_at)
const converted = (await db.query(Q.SET_LEAD_STATUS, [id, 'converted'])).rows[0]
check('a later status change keeps the FIRST contacted_at',
  String(converted.contacted_at) === firstStamp,
  `${firstStamp} -> ${converted.contacted_at}`)

const reopened = (await db.query(Q.SET_LEAD_STATUS, [id, 'new'])).rows[0]
check("moving back to 'new' clears contacted_at — it is unanswered again",
  reopened.contacted_at === null, `got ${reopened.contacted_at}`)

check('SET_LEAD_STATUS on a missing id returns no row (callers must 404)',
  (await db.query(Q.SET_LEAD_STATUS, [999999, 'contacted'])).rows.length === 0)

try {
  await db.query(Q.SET_LEAD_STATUS, [id, 'banana'])
  check('SET_LEAD_STATUS cannot write an unknown status', false, 'the check constraint did not fire')
} catch {
  check('SET_LEAD_STATUS cannot write an unknown status', true)
}

// ── Aggregates need a table whose every row is known, so the median and the
//    window boundaries can be asserted as exact numbers rather than "looks
//    about right". Everything above has already run against the earlier rows.
console.log('\nreporting fixtures')
await db.query('delete from leads')
await db.query(`
  insert into leads (source, nombre, status, created_at, contacted_at, utm_source, utm_medium, referrer) values
    ('prueba',  'R1', 'contacted', now() - interval '10 days', now() - interval '10 days' + interval '2 hours',  'instagram', 'social', null),
    ('prueba',  'R2', 'contacted', now() - interval '9 days',  now() - interval '9 days'  + interval '6 hours',  'instagram', 'social', null),
    ('prueba',  'R3', 'converted', now() - interval '8 days',  now() - interval '8 days'  + interval '40 hours', null, null, 'https://www.google.com/search?q=gimnasio+murcia'),
    ('contact', 'R4', 'new',       now() - interval '2 days',  null, null, null, null),
    ('contact', 'R5', 'new',       now() - interval '40 days', null, null, null, null)
`)
// R4 was captured after attribution shipped and genuinely had no source.
// R6 predates instrumentation entirely. Both have null utm and null referrer,
// so landing_page is the only thing that tells them apart.
await db.query(`update leads set landing_page = '/' where nombre = 'R4'`)
await db.query(`
  insert into leads (source, nombre, status, created_at, contacted_at, utm_source, utm_medium, referrer)
  values ('contact', 'R6', 'new', now() - interval '3 days', null, null, null, null)
`)
check('fixtures loaded', (await db.query('select count(*)::int as n from leads')).rows[0].n === 6)

console.log('\nresponse times')
const rt = (await db.query(Q.RESPONSE_TIMES, ['30'])).rows[0]
check('RESPONSE_TIMES counts the answered ones', rt.answered === 3, `got ${rt.answered}`)
check('RESPONSE_TIMES excludes the 40-day-old row from the window',
  rt.unanswered === 2, `got ${rt.unanswered}`)
check('RESPONSE_TIMES median is the middle of 2 h / 6 h / 40 h',
  Math.abs(Number(rt.median_hours) - 6) < 0.01, `got ${rt.median_hours}`)
check('RESPONSE_TIMES worst is the 40 h one',
  Math.abs(Number(rt.worst_hours) - 40) < 0.01, `got ${rt.worst_hours}`)

// With nothing answered there is no median to report, and reporting 0 would
// read as "instant replies" on the dashboard. It has to be null.
await db.query(`update leads set status = 'new', contacted_at = null`)
const rtEmpty = (await db.query(Q.RESPONSE_TIMES, ['30'])).rows[0]
check('RESPONSE_TIMES reports null, not zero, when nothing was answered',
  rtEmpty.answered === 0 && rtEmpty.median_hours === null && rtEmpty.worst_hours === null,
  JSON.stringify(rtEmpty))
await db.query(`
  update leads set status = 'contacted', contacted_at = created_at + interval '2 hours'  where nombre = 'R1';
`)
await db.query(`
  update leads set status = 'contacted', contacted_at = created_at + interval '6 hours'  where nombre = 'R2';
`)
await db.query(`
  update leads set status = 'converted', contacted_at = created_at + interval '40 hours' where nombre = 'R3';
`)

console.log('\nstatus counts')
const counts = Object.fromEntries(
  (await db.query(Q.STATUS_COUNTS)).rows.map(r => [r.status, r.n]))
check('STATUS_COUNTS counts contacted', counts.contacted === 2, JSON.stringify(counts))
check('STATUS_COUNTS counts converted', counts.converted === 1, JSON.stringify(counts))
check('STATUS_COUNTS is all-time, so the 40-day-old new lead still counts',
  counts.new === 3, JSON.stringify(counts))
check('STATUS_COUNTS omits statuses with no rows (the caller fills the zeros)',
  counts.lost === undefined, JSON.stringify(counts))

// The windowed variant is what the dashboard funnel reads. If it ever returned
// all-time numbers the funnel would widen as it descends, which is not a funnel.
const w = Object.fromEntries(
  (await db.query(Q.STATUS_COUNTS_WINDOW, ['30'])).rows.map(r => [r.status, r.n]))
check('STATUS_COUNTS_WINDOW excludes the 40-day-old lead that STATUS_COUNTS counts',
  w.new === 2 && counts.new === 3, `windowed ${JSON.stringify(w)} vs all-time ${JSON.stringify(counts)}`)
check('STATUS_COUNTS_WINDOW still counts the answered ones',
  w.contacted === 2 && w.converted === 1, JSON.stringify(w))
// The funnel invariant: replied can never exceed the enquiries it came from.
const arrived30 = (await db.query(
  `select count(*)::int as n from leads where created_at >= now() - interval '30 days'`)).rows[0].n
check('windowed statuses sum to the number of leads that arrived in the window',
  Object.values(w).reduce((a, b) => a + b, 0) === arrived30,
  `${JSON.stringify(w)} vs ${arrived30} arrived`)

console.log('\nattribution breakdown')
const attrRows = await db.query(Q.ATTRIBUTION_BREAKDOWN, ['30'])
const by = Object.fromEntries(attrRows.rows.map(r => [r.fuente, r]))
check('ATTRIBUTION_BREAKDOWN groups tagged traffic by utm_source',
  by.instagram?.n === 2 && by.instagram?.medio === 'social',
  JSON.stringify(attrRows.rows))
check('ATTRIBUTION_BREAKDOWN falls back to the referring host, www stripped',
  by['google.com']?.n === 1 && by['google.com']?.medio === 'referral',
  JSON.stringify(attrRows.rows))
check("ATTRIBUTION_BREAKDOWN calls instrumented, unreferred traffic 'directo'",
  by.directo?.n === 1, JSON.stringify(attrRows.rows))
// The distinction that stops the panel reporting "100% direct" for a month.
check("ATTRIBUTION_BREAKDOWN calls pre-instrumentation rows 'sin datos', not 'directo'",
  by['sin datos']?.n === 1, JSON.stringify(attrRows.rows))
check("'sin datos' is not silently folded into 'directo'",
  by.directo?.n !== 2, JSON.stringify(attrRows.rows))
check('ATTRIBUTION_BREAKDOWN window excludes the 40-day-old row',
  attrRows.rows.reduce((t, r) => t + r.n, 0) === 5,
  JSON.stringify(attrRows.rows))
check('ATTRIBUTION_BREAKDOWN reports how many of each source were worked',
  by.instagram?.contactados === 2 && by.directo?.contactados === 0,
  JSON.stringify(attrRows.rows))

console.log('\ninbox list')
const inbox = (await db.query(Q.INBOX_LEADS, [500])).rows
const total = (await db.query(`select count(*)::int as n from leads`)).rows[0].n
check('INBOX_LEADS returns the worked and the unworked together',
  inbox.length === total, `${inbox.length} of ${total}`)

// The ordering is the whole safety property: a lead still waiting for a reply
// must never be the row a limit throws away.
const firstNonNew = inbox.findIndex(r => r.status !== 'new')
const lastNew = inbox.map(r => r.status).lastIndexOf('new')
check('INBOX_LEADS puts every unworked lead above every worked one',
  firstNonNew === -1 || lastNew < firstNonNew, `last new at ${lastNew}, first worked at ${firstNonNew}`)
// The queue is worked from the front, so the longest wait must be the first
// thing on the page — not buried under whatever arrived this morning.
const news = inbox.filter(r => r.status === 'new').map(r => +new Date(r.created_at))
check('INBOX_LEADS puts the LONGEST-waiting enquiry at the top of the queue',
  news.every((t, i) => i === 0 || news[i - 1] <= t), JSON.stringify(news))
// The worked half is history, and history reads backwards.
const done = inbox.filter(r => r.status !== 'new').map(r => +new Date(r.created_at))
check('INBOX_LEADS orders the worked half newest first',
  done.every((t, i) => i === 0 || done[i - 1] >= t), JSON.stringify(done))

// A tight limit must bite the closed history, never the queue.
const pendingTotal = (await db.query(
  `select count(*)::int as n from leads where status = 'new'`)).rows[0].n
const clipped = (await db.query(Q.INBOX_LEADS, [pendingTotal])).rows
check('a limit at exactly the queue size still returns every waiting lead',
  clipped.length === pendingTotal && clipped.every(r => r.status === 'new'),
  JSON.stringify(clipped.map(r => r.status)))

check('INBOX_LEADS carries the phone number needed to actually answer the lead',
  inbox.every(r => 'telefono' in r && 'nombre' in r && 'interes' in r))
check('INBOX_LEADS carries attribution so the history says where they came from',
  inbox.every(r => 'utm_source' in r && 'referrer' in r && 'landing_page' in r && 'source' in r))

// response_hours must separate "answered fast" from "never answered".
const answered = inbox.filter(r => r.contacted_at !== null)
const unanswered = inbox.filter(r => r.contacted_at === null)
check('response_hours is a number for answered leads',
  answered.length > 0 && answered.every(r => r.response_hours !== null))
check('response_hours is null for unanswered leads, not zero',
  unanswered.length > 0 && unanswered.every(r => r.response_hours === null),
  JSON.stringify(unanswered.map(r => r.response_hours)))
check('age_days grows with how long a lead has been sitting',
  inbox.every(r => Number(r.age_days) >= 0))

console.log(failures === 0 ? '\nAll checks passed.\n' : `\n${failures} check(s) FAILED.\n`)
process.exit(failures === 0 ? 0 : 1)
