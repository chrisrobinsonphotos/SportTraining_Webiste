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
 * The same counts, but only for leads that ARRIVED in the window.
 *
 * The funnel on the dashboard needs this rather than the all-time version.
 * Its Enquiries stage is a 30-day figure, so pairing it with an all-time
 * "replied" count would let a later stage read higher than the one above it —
 * a funnel that widens as it descends is not measuring a funnel.
 */
export const STATUS_COUNTS_WINDOW = `
  select status, count(*)::int as n
  from leads
  where created_at >= now() - ($1 || ' days')::interval
  group by status
  order by n desc, status asc
`

/**
 * Where enquiries actually came from, last N days.
 *
 * utm_source wins when it is there; otherwise the referring host, which is what
 * distinguishes a Business Profile click from Instagram from organic search.
 *
 * The last fallback is split in two, and the distinction is the whole point:
 *
 *   'directo'   — instrumented, and genuinely no source. The person typed the
 *                 address, used a bookmark, or arrived with the referrer stripped.
 *   'sin datos' — never instrumented. Submitted before attribution existed
 *                 (everything before 30 Aug 2026), so there is nothing to know.
 *
 * `landing_page` is the discriminator because the client sets it from
 * `location.pathname + search` on every capture, including direct traffic — see
 * lib/attribution.ts. So a null there means the row predates the instrumentation,
 * not that the visit had no page.
 *
 * Collapsing the two would be actively misleading: every one of the 25 leads in
 * the store at the time this shipped predates attribution, so a single 'directo'
 * bucket would have reported 100% direct traffic for a month when the honest
 * answer was "not measured yet".
 */
export const ATTRIBUTION_BREAKDOWN = `
  select
    coalesce(
      nullif(utm_source, ''),
      nullif(substring(referrer from '^[a-zA-Z][a-zA-Z0-9+.-]*://(?:www[.])?([^/?#]+)'), ''),
      case when landing_page is null then 'sin datos' else 'directo' end
    )                                                                as fuente,
    coalesce(
      nullif(utm_medium, ''),
      -- Referrer first: if we know where they came from, the row is not
      -- 'sin datos' whatever landing_page says. Checking landing_page first
      -- let a row report fuente 'google.com' alongside medio 'sin datos'.
      case when coalesce(referrer, '') <> ''      then 'referral'
           when landing_page is null              then 'sin datos'
           else 'directo' end
    )                                                                as medio,
    count(*)::int                                                    as n,
    count(*) filter (where contacted_at is not null)::int             as contactados
  from leads
  where created_at >= now() - ($1 || ' days')::interval
  group by 1, 2
  order by n desc, 1 asc
`

/**
 * Everything the inbox at /lead/bandeja shows: the queue to work, plus the
 * leads already worked, so the page doubles as the history of who came in
 * through the website and what happened to them.
 *
 * The ordering is load-bearing, not cosmetic, and the two halves of the list
 * are ordered OPPOSITE ways on purpose.
 *
 * Unworked leads sort first, and within them OLDEST first — the queue is
 * worked from the front, and the person who has been waiting eleven days is
 * the one the page must put in front of you. Sorting the queue newest-first
 * would bury exactly the enquiries the page exists to rescue, and the stale
 * markers in the UI would sit at the bottom where nobody scrolls.
 *
 * Everything already worked sorts newest first, because that half is history
 * and history reads backwards.
 *
 * Unworked-first also makes the limit safe: if it ever bites it discards the
 * oldest CLOSED lead, never someone still waiting for a reply. A plain
 * `created_at desc` with a limit would drop the queue's most-neglected
 * enquiries off the bottom of the page, which is the precise failure the
 * monitoring side already shipped once.
 *
 * `response_hours` is null for anything unanswered, which is what lets the
 * page distinguish "answered instantly" from "never answered" without a
 * second query.
 */
export const INBOX_LEADS = `
  select id, created_at, source, canal, nombre, telefono, email, interes, mensaje,
         status, contacted_at, email_sent,
         utm_source, utm_medium, utm_campaign, referrer, landing_page,
         extract(epoch from (now() - created_at)) / 86400          as age_days,
         extract(epoch from (contacted_at - created_at)) / 3600    as response_hours
  from leads
  order by (status = 'new') desc,
           case when status = 'new' then created_at end asc,
           created_at desc
  limit $1::int
`
