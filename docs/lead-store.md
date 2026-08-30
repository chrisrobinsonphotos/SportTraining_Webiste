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

## Testing the SQL

```
node scripts/test-leads.mjs
```

Runs `db/schema.sql` and every statement in `lib/leads-sql.ts` against PGlite —
Postgres compiled to WASM — so the SQL is executed by a real Postgres parser
before it reaches the live database. No Docker, no local Postgres, no network.

The SQL is kept driver-free in `lib/leads-sql.ts` precisely so the test and the
app run the *same strings*. If you add a query there, add a check.

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

- The contact modal captures name and phone only, no email. That is why the
  recovered leads have no email addresses and why MailerLite cannot receive
  them.
- `/privacidad` does not yet mention web-form enquiries or a retention period.
  It should, now that personal data is being stored rather than passed through.
