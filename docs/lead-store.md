# Lead store — source documentation

**Files:** `db/schema.sql`, `lib/leads-sql.ts`, `lib/leads.ts`, `app/api/leads/summary/route.ts`
**Database:** Neon Postgres via Vercel Marketplace — resource `sport-training-leads`, Frankfurt (`fra1`), Free plan
**Created:** 2026-08-30

---

## Why this exists

Before it, the only record of a website enquiry was a notification email. When
Resend rejected the send — which it did on every attempt for at least 15 days,
because `sporttraining.es` was not a verified sending domain — the submission
was discarded and the visitor was still shown a success screen.

19 real enquiries from 15 people were lost that way. They were recoverable only
because Resend retains request logs for about a fortnight; anything older is
gone permanently.

The table is the fix: **a submission is stored before anyone is notified.**

---

## The ordering rule

Both `/api/prueba` and `/api/contact` do the same thing, in this order:

1. **Persist to Postgres.** Fails → `502`, and the visitor is told. An enquiry
   that cannot be stored is a lost enquiry, so it must not report success.
2. **Send the notification email.** Fails → still `200`. The lead is already
   safe; the failure is written to `email_sent = false` / `email_error` on the
   row and surfaced in the daily digest instead.
3. **MailerLite push** (trial route only, needs an email address). Never fails
   the request.

Step 2 returning success is deliberate and is not a repeat of the original bug.
The original bug reported success when the submission had been *destroyed*.
Here it has been *stored*, which is what the visitor was promised.

---

## Environments

`DATABASE_URL` is injected by the Vercel/Neon integration across Production,
Preview and Development. Preview deployments get their **own database branch**,
so test submissions never mix with real leads.

`LEAD_ACTION_SECRET` signs the one-click links in the digest. Generate with
`openssl rand -base64 32` and set it in Vercel; anything under 16 characters is
treated as unset. Rotating it invalidates every outstanding link, which the
next morning's digest replaces.

`LEADS_DIGEST_TOKEN` is currently **Production only**. That is enough for the
daily digest, which reads production. `/api/leads/summary` returns `503` in
Preview as a result — expected, not a fault.

---

## Reading the data

`GET /api/leads/summary` returns counts, everything still unworked, the last 30
days, and an interest breakdown.

It returns names and phone numbers, so it is **not public**: it requires
`Authorization: Bearer $LEADS_DIGEST_TOKEN` and refuses with `503` when the
token is unset rather than falling open. Reading through the site keeps the
database credential in Vercel alone — the monitoring machine holds only a
read token.

The daily run in `development/monitoring` calls this and renders the Lead Flow
panel on the dashboard.

---

## Working the queue

Before 2026-08-30 nothing ever wrote `status` or `contacted_at`. Every lead sat
at `new` forever and the pending count only grew, so "19 sin responder" meant
nothing — there was no way for a lead to leave the queue.

**`POST /api/leads/status`** is the only writer. Two ways in:

| Caller | Credential | Body |
|---|---|---|
| The digest email's confirmation page | a signed action token | `{ "token": "..." }` |
| Dashboard / working the list by hand | `Authorization: Bearer $LEADS_DIGEST_TOKEN` | `{ "id": 12, "status": "contacted" }` |

With neither, it refuses. With a secret unset it returns `503` rather than
falling open.

The confirmation page offers three outcomes, not one. The emailed link only
ever authorises `contacted`; the page mints separate signed tokens for
`converted` and `lost` server-side, where the key lives. No token-format change
was needed — the format already binds one status per token, which is what makes
issuing three of them safe.

Without those buttons `status_counts.converted` could never leave zero, and the
dashboard's Converted funnel stage would be a decoration. `converted` and `lost`
are terminal: the page stops offering actions once a lead reaches either, rather
than letting a closed lead be reopened by whoever still holds an old link.

`contacted_at` is a **first**-response timestamp. Moving a lead on to
`converted` or `lost` keeps the original stamp — otherwise every later status
change would reset the clock and flatter the response-time figures. Moving a
lead back to `new` clears it, because it is genuinely unanswered again.

### Why the email link is not a plain GET

The digest carries a "Contactada" link per pending lead. It **must not** mutate
on the GET, and the code is arranged so it cannot:

```
digest email  →  GET /lead/confirmar?t=<token>   ← reads only, no writes
                 the page shows the lead + a button
                 → POST /api/leads/status        ← the mutation
```

Mail scanners, spam filters and link previewers fetch every URL in an inbox
without being asked. A GET that marked a lead contacted would fire while the
digest sat unread, and the response-time metric would end up measuring Gmail's
crawler rather than anyone's follow-up. There is deliberately no `GET` export
in `app/api/leads/status/route.ts` — the route answers `405`.

The token (`lib/lead-token.ts`) is an HMAC-SHA256 over `<id>.<status>.<expiry>`,
so it names **one** lead and **one** status and expires after 14 days. It
cannot be repointed at another lead, escalated to another status, or extended.
Each morning's digest reissues one for anything still pending, so nothing gets
stranded by expiry.

`LEAD_ACTION_SECRET` (32+ random chars) signs them. It is deliberately separate
from `LEADS_DIGEST_TOKEN`: that one is a *read* credential that lives on the
monitoring machine, and a read credential must not also be able to forge write
links. If `LEAD_ACTION_SECRET` is unset the digest still sends — it just omits
the action column, and the JSON response reports `action_links: false`.

## Attribution

Added 2026-08-30. Before it, all 19 stored leads said `canal = 'modal'` and
nothing else, so there was no way to tell a Business Profile enquiry from an
Instagram one.

Six nullable columns: `utm_source`, `utm_medium`, `utm_campaign`,
`utm_content`, `referrer`, `landing_page`.

**First touch, not last.** `lib/attribution.ts` captures on the first page of
the session and refuses to overwrite. The reason is the shape of a real
journey: Instagram ad → `/prueba` → browse → open the modal on the home page →
submit. At the moment of submission there is no referrer and no utm in the URL,
so last-touch would file that lead as `directo` and credit nothing. Storage is
`sessionStorage` — no cookie, no identifier, gone when the tab closes.

Everything is client-supplied, so `normalizeAttribution()` in `lib/leads.ts`
trims it, strips control characters, caps the length and nulls anything blank
before it reaches the insert.

`canal` is untouched and still means what it meant: **which control** they
used. Attribution answers **which channel** they came from. Both are useful.

### 'directo' is not the same as 'sin datos'

Added 2026-08-31. `ATTRIBUTION_BREAKDOWN` reports two different kinds of
absence, and collapsing them is actively misleading:

- **`directo`** — instrumented, and genuinely no source. Typed the address,
  used a bookmark, or arrived with the referrer stripped.
- **`sin datos`** — never instrumented. Submitted before attribution existed.

`landing_page` is the discriminator: the client sets it from
`location.pathname + search` on every capture, *including* direct traffic, so a
null there means the row predates instrumentation rather than that the visit had
no page.

This matters because every one of the 25 leads in the store when attribution
shipped predates it. With a single bucket the dashboard reported **`directo`
25 — 100% direct traffic** for the whole 30-day window, when the honest answer
was "not measured yet". That was observed on the live endpoint, not theorised.

### Reading it

`GET /api/leads/summary` gained three keys:

- `response_times` — `{ answered, unanswered, median_hours, worst_hours }` over
  leads that **arrived** in the last 30 days. `median_hours` / `worst_hours`
  are `null`, never `0`, when nothing was answered. Read the median next to
  `answered`/`unanswered`: a 2-hour median across 3 of 40 leads is not a
  2-hour response time.
- `status_counts` — all four statuses, zeros included. All time, because a
  `new` lead never ages out of the queue.
- `status_counts_30d` — the same, restricted to leads that **arrived** in the
  window. This is the one the dashboard funnel reads: its Enquiries stage is a
  30-day figure, so an all-time reply count beside it could read higher than the
  stage above, and a funnel that widens as it descends is not a funnel.
- `attribution` — last 30 days grouped by `utm_source`, falling back to the
  referring host (`www.` stripped), falling back to `directo`. `contactados`
  per row shows how many of each source were actually worked.

## Testing the SQL

```
node scripts/test-leads.mjs
```

Runs `db/schema.sql` and every statement in `lib/leads-sql.ts` against PGlite —
Postgres compiled to WASM — so the SQL is executed by a real Postgres parser
before it reaches the live database. No Docker, no local Postgres, no network.

The SQL is kept driver-free in `lib/leads-sql.ts` precisely so the test and the
app run the *same strings*. If you add a query there, add a check.

```
node scripts/test-lead-token.mjs
```

Compiles `lib/lead-token.ts` with the project's own tsc and runs the real
module — signing, tampering, key rotation, expiry. It is the security boundary
of the one-click link, so it is tested by execution, not by reading.

**Both suites must be able to fail.** When you change either, plant a break and
confirm a non-zero exit before believing the green run. One of these checks was
written comparing two consecutive `now()` values and passed with the logic it
was guarding removed, because PGlite answered both inside the same millisecond;
it now back-dates the first stamp by three hours so it actually bites.

---

## Schema notes

- `source` is `prueba` or `contact`; `status` is `new` / `contacted` /
  `converted` / `lost`. Both are enforced by check constraints — the test
  proves they bite.
- `created_at` is set server-side, never by the client.
- The 19 recovered enquiries were backfilled with their original timestamps and
  carry `notes = 'Recuperado de los logs de Resend 2026-08-30'`. They are all
  `email_sent = false`, which is accurate: nobody was ever notified.

## Still open

- The response-time figures only became measurable on 2026-08-30, when
  something finally wrote `contacted_at`. Every lead before that has a null
  there, so the first month of numbers covers only leads worked after that
  date. That is accurate, not a gap — but do not read it as "we never
  responded to anyone before September".
- ~~The monitoring dashboard does not yet render `response_times`,
  `status_counts` or `attribution`.~~ **Done 2026-08-31** — the funnel now runs
  through to Converted, the Enquiries stage carries median/worst reply times
  with their coverage, and there is a "Where enquiries come from" panel.
- The three Nutrición components still point at `wa.me/34600000000`, a
  placeholder number. Deferred by the owner, so they carry no origin token
  either.
- The contact modal captures name and phone only, no email. That is why the
  recovered leads have no email addresses and why MailerLite cannot receive
  them.
- `/privacidad` does not yet mention web-form enquiries or a retention period.
  It should, now that personal data is being stored rather than passed through.
