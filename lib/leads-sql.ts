// ---------------------------------------------------------------------------
// SQL used by the lead store, kept driver-free on purpose.
//
// `lib/leads.ts` runs these against Neon in production. `scripts/test-leads.mjs`
// runs the SAME strings against PGlite (Postgres in WASM) so the statements are
// executed by a real Postgres parser before they ever reach the live database.
// If you edit a query here, the test covers it automatically.
// ---------------------------------------------------------------------------

export const INSERT_LEAD = `
  insert into leads (source, canal, nombre, telefono, email, interes, mensaje, subscribe,
                     utm_source, utm_medium, utm_campaign, utm_content, referrer, landing_page)
  values ($1, $2, $3, $4, $5, $6, $7, $8,
          $9, $10, $11, $12, $13, $14)
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
         mensaje, status, contacted_at, email_sent,
         utm_source, utm_medium, utm_campaign, utm_content, referrer, landing_page
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
    count(*) filter (where created_at >= now() - interval '24 hours')::int    as last_24h,
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

/**
 * Move a lead out of the queue and stamp the moment it was first worked.
 *
 * `contacted_at` is a FIRST-response timestamp, so `coalesce` keeps the
 * original: marking an already-contacted lead as converted must not rewrite
 * history and flatter the response-time numbers. Sending a lead back to 'new'
 * clears it, because it is going back into the queue unanswered.
 */
export const SET_LEAD_STATUS = `
  update leads
     set status       = $2,
         contacted_at = case when $2 = 'new' then null
                             else coalesce(contacted_at, now()) end
   where id = $1
  returning id, nombre, telefono, status, created_at, contacted_at
`

/** One lead, for the confirmation page. No message body — it is not needed there. */
export const GET_LEAD = `
  select id, created_at, source, canal, nombre, telefono, email, interes,
         status, contacted_at
  from leads
  where id = $1
`

/**
 * How long people wait for a first reply, over leads CREATED in the window.
 *
 * Windowing on created_at rather than contacted_at makes this a cohort figure:
 * "of the enquiries that arrived in the last 30 days, how fast were they
 * answered". `answered` and `unanswered` are both returned so the median is
 * never read without knowing how much of the cohort it covers — a 2-hour
 * median over 3 of 40 leads is not a 2-hour response time.
 */
export const RESPONSE_TIMES = `
  select
    count(*) filter (where contacted_at is not null)::int as answered,
    count(*) filter (where contacted_at is null)::int     as unanswered,
    percentile_cont(0.5) within group (
      order by extract(epoch from (contacted_at - created_at)) / 3600
    ) filter (where contacted_at is not null)             as median_hours,
    max(extract(epoch from (contacted_at - created_at)) / 3600)
      filter (where contacted_at is not null)             as worst_hours
  from leads
  where created_at >= now() - ($1 || ' days')::interval
`

/** The whole queue by state — all time, because a 'new' lead never ages out of it. */
export const STATUS_COUNTS = `
  select status, count(*)::int as n
  from leads
  group by status
  order by n desc, status asc
`

/**
 * Where enquiries actually came from, last N days.
 *
 * utm_source wins when it is there; otherwise the referring host, which is what
 * distinguishes a Business Profile click from Instagram from organic search.
 * Neither present means the person typed the address or arrived with the
 * referrer stripped — that is 'directo', not missing data.
 */
export const ATTRIBUTION_BREAKDOWN = `
  select
    coalesce(
      nullif(utm_source, ''),
      nullif(substring(referrer from '^[a-zA-Z][a-zA-Z0-9+.-]*://(?:www[.])?([^/?#]+)'), ''),
      'directo'
    )                                                                as fuente,
    coalesce(
      nullif(utm_medium, ''),
      case when coalesce(referrer, '') = '' then 'directo' else 'referral' end
    )                                                                as medio,
    count(*)::int                                                    as n,
    count(*) filter (where contacted_at is not null)::int             as contactados
  from leads
  where created_at >= now() - ($1 || ' days')::interval
  group by 1, 2
  order by n desc, 1 asc
`
