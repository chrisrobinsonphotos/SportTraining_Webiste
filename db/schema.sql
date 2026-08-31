-- ---------------------------------------------------------------------------
-- Sport Training — website enquiry store
--
-- This table is the SYSTEM OF RECORD for enquiries submitted through the site.
-- Before it existed, the only record was a notification email; when Resend
-- rejected the send the submission was discarded and the visitor was still
-- shown a success screen. 19 real enquiries were lost that way in 15 days.
--
-- The rule that follows from that: a submission counts as accepted once the
-- row is committed here. Email is a notification on top, not the record.
--
-- Idempotent — safe to re-run.
-- ---------------------------------------------------------------------------

create table if not exists leads (
  id            bigint generated always as identity primary key,

  -- when the visitor submitted. Set by the server, never by the client.
  created_at    timestamptz not null default now(),

  -- which form: 'prueba' (trial day) or 'contact' (general contact)
  source        text        not null,

  -- which surface within that form: 'modal', 'modal-nutricion', 'pagina'
  canal         text,

  nombre        text        not null,
  telefono      text,
  email         text,
  interes       text,
  mensaje       text,
  subscribe     boolean     not null default false,

  -- follow-up state, owned by whoever works the list
  status        text        not null default 'new',
  contacted_at  timestamptz,
  notes         text,

  -- delivery telemetry for the notification email. A lead with
  -- email_sent = false is still a good lead — it just means nobody was
  -- pinged, so the daily digest has to carry it.
  email_sent    boolean     not null default false,
  email_error   text,

  constraint leads_source_ck check (source in ('prueba', 'contact')),
  constraint leads_status_ck check (status in ('new', 'contacted', 'converted', 'lost'))
);

create index if not exists leads_created_at_idx on leads (created_at desc);
create index if not exists leads_status_idx     on leads (status);
create index if not exists leads_telefono_idx   on leads (telefono);

-- ---------------------------------------------------------------------------
-- Attribution — added 2026-08-30.
--
-- `canal` answers "which control did they use" (modal, página, nutrición).
-- These answer a different question: "where did this person come from" —
-- Business Profile, Instagram, an ad, organic search. Both are useful and
-- neither substitutes for the other, so canal is untouched.
--
-- Captured FIRST-touch on the client and held for the browser session, so a
-- visitor who lands on /prueba from Instagram, reads three pages and then
-- submits the modal is still credited to Instagram. Last-touch would credit
-- the internal page they happened to be on.
--
-- Every column is nullable: direct traffic genuinely has no utm and no
-- referrer, and a null there is a fact, not a gap.
--
-- `add column if not exists` keeps this file re-runnable as a whole.
-- ---------------------------------------------------------------------------

alter table leads add column if not exists utm_source   text;
alter table leads add column if not exists utm_medium   text;
alter table leads add column if not exists utm_campaign text;
alter table leads add column if not exists utm_content  text;

-- Full referring URL as the browser reported it; same-origin referrers are
-- dropped client-side, so a value here always means an external source.
alter table leads add column if not exists referrer     text;

-- First page of the session, path + query. Not the page they submitted from.
alter table leads add column if not exists landing_page text;

create index if not exists leads_utm_source_idx   on leads (utm_source);

-- Response-time reporting reads contacted_at across the whole table.
create index if not exists leads_contacted_at_idx on leads (contacted_at);
