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
