// ---------------------------------------------------------------------------
// SQL used by the lead store, kept driver-free on purpose.
//
// `lib/leads.ts` runs these against Neon in production. `scripts/test-leads.mjs`
// runs the SAME strings against PGlite (Postgres in WASM) so the statements are
// executed by a real Postgres parser before they ever reach the live database.
// If you edit a query here, the test covers it automatically.
// ---------------------------------------------------------------------------

export const INSERT_LEAD = `
  insert into leads (source, canal, nombre, telefono, email, interes, mensaje, subscribe)
  values ($1, $2, $3, $4, $5, $6, $7, $8)
  returning id, created_at
`

export const MARK_EMAIL_SENT = `
  update leads set email_sent = true, email_error = null where id = $1
`

export const MARK_EMAIL_FAILED = `
  update leads set email_sent = false, email_error = $2 where id = $1
`

/** Everything that arrived in the window, newest first. */
export const RECENT_LEADS = `
  select id, created_at, source, canal, nombre, telefono, email, interes,
         mensaje, status, email_sent
  from leads
  where created_at >= now() - ($1 || ' days')::interval
  order by created_at desc
`

/** Anything still untouched, oldest first — the ones going stale. */
export const PENDING_LEADS = `
  select id, created_at, source, canal, nombre, telefono, interes,
         extract(epoch from (now() - created_at)) / 86400 as age_days
  from leads
  where status = 'new'
  order by created_at asc
`

/** Headline counts for the dashboard. */
export const LEAD_SUMMARY = `
  select
    count(*)::int                                                             as total,
    count(*) filter (where status = 'new')::int                               as pending,
    count(*) filter (where created_at >= current_date)::int                   as today,
    count(*) filter (where created_at >= now() - interval '7 days')::int      as last_7d,
    count(*) filter (where created_at >= now() - interval '30 days')::int     as last_30d,
    count(*) filter (where not email_sent)::int                               as undelivered,
    max(created_at)                                                           as newest
  from leads
`

/** Which programme people are asking for — drives ad spend decisions. */
export const INTEREST_BREAKDOWN = `
  select coalesce(nullif(interes, ''), 'sin especificar') as interes,
         count(*)::int as n
  from leads
  where created_at >= now() - ($1 || ' days')::interval
  group by 1
  order by n desc, 1 asc
`
