import { neon } from '@neondatabase/serverless'
import {
  INSERT_LEAD,
  MARK_EMAIL_SENT,
  MARK_EMAIL_FAILED,
  RECENT_LEADS,
  PENDING_LEADS,
  LEAD_SUMMARY,
  INTEREST_BREAKDOWN,
  SET_LEAD_STATUS,
  GET_LEAD,
  RESPONSE_TIMES,
  STATUS_COUNTS,
  STATUS_COUNTS_WINDOW,
  ATTRIBUTION_BREAKDOWN,
  INBOX_LEADS,
} from './leads-sql'

/**
 * Enquiry store — the system of record for anything submitted through the site.
 *
 * The ordering rule in the API routes is deliberate: persist FIRST, notify
 * second. A submission is only reported as successful once the row is
 * committed. Email is a convenience on top; if it fails the lead is still safe
 * and the daily digest carries it. The reverse order is what lost 19 enquiries.
 */

export const LEAD_STATUSES = ['new', 'contacted', 'converted', 'lost'] as const
export type LeadStatus = (typeof LEAD_STATUSES)[number]

export function isLeadStatus(v: unknown): v is LeadStatus {
  return typeof v === 'string' && (LEAD_STATUSES as readonly string[]).includes(v)
}

/**
 * First-touch attribution, captured in the browser and posted with the form.
 *
 * Every field is client-supplied, so every field is treated as untrusted text:
 * trimmed, length-capped, and stored as a value only. Nothing here is ever
 * interpolated into SQL or into an email without escaping.
 */
export interface AttributionInput {
  utm_source?: string | null
  utm_medium?: string | null
  utm_campaign?: string | null
  utm_content?: string | null
  referrer?: string | null
  landing_page?: string | null
}

const ATTR_LIMITS: Record<keyof AttributionInput, number> = {
  utm_source: 120,
  utm_medium: 120,
  utm_campaign: 200,
  utm_content: 200,
  referrer: 500,
  landing_page: 500,
}

/** Clean one client-supplied string: null unless it is real, printable and short. */
function cleanAttrValue(v: unknown, max: number): string | null {
  if (typeof v !== 'string') return null
  const trimmed = v.replace(/[\u0000-\u001F\u007F]/g, ' ').trim()
  return trimmed ? trimmed.slice(0, max) : null
}

/**
 * Normalise whatever the client sent into the six attribution columns.
 * Anything absent, blank or the wrong type becomes null — an absent source is
 * a fact ("directo"), so it is stored as a clean null rather than an empty
 * string that would then need special-casing in every query.
 */
export function normalizeAttribution(input: unknown): Required<AttributionInput> {
  const src = (input && typeof input === 'object' ? input : {}) as Record<string, unknown>
  return {
    utm_source: cleanAttrValue(src.utm_source, ATTR_LIMITS.utm_source),
    utm_medium: cleanAttrValue(src.utm_medium, ATTR_LIMITS.utm_medium),
    utm_campaign: cleanAttrValue(src.utm_campaign, ATTR_LIMITS.utm_campaign),
    utm_content: cleanAttrValue(src.utm_content, ATTR_LIMITS.utm_content),
    referrer: cleanAttrValue(src.referrer, ATTR_LIMITS.referrer),
    landing_page: cleanAttrValue(src.landing_page, ATTR_LIMITS.landing_page),
  }
}

export interface LeadInput extends AttributionInput {
  source: 'prueba' | 'contact'
  canal?: string | null
  nombre: string
  telefono?: string | null
  email?: string | null
  interes?: string | null
  mensaje?: string | null
  subscribe?: boolean
}

function db() {
  const url = process.env.DATABASE_URL
  if (!url) throw new Error('DATABASE_URL is not set — the lead store is unreachable')
  return neon(url)
}

/** Persist an enquiry. Throws if it cannot be stored — callers must NOT swallow this. */
export async function recordLead(lead: LeadInput): Promise<{ id: number; created_at: string }> {
  const attr = normalizeAttribution(lead)
  const rows = (await db().query(INSERT_LEAD, [
    lead.source,
    lead.canal ?? null,
    lead.nombre,
    lead.telefono ?? null,
    lead.email ?? null,
    lead.interes ?? null,
    lead.mensaje ?? null,
    lead.subscribe ?? false,
    attr.utm_source,
    attr.utm_medium,
    attr.utm_campaign,
    attr.utm_content,
    attr.referrer,
    attr.landing_page,
  ])) as { id: number; created_at: string }[]
  return rows[0]
}

/**
 * Record whether the notification email went out. Best-effort by design: the
 * lead is already safe, so a telemetry write failing must never turn a stored
 * submission into an error for the visitor.
 */
export async function markEmail(id: number, sent: boolean, error?: string): Promise<void> {
  try {
    if (sent) await db().query(MARK_EMAIL_SENT, [id])
    else await db().query(MARK_EMAIL_FAILED, [id, (error ?? 'unknown').slice(0, 500)])
  } catch (err) {
    console.error('Lead email telemetry write failed (non-fatal):', err)
  }
}

export async function getRecentLeads(days = 30) {
  return (await db().query(RECENT_LEADS, [String(days)])) as Record<string, unknown>[]
}

export async function getPendingLeads() {
  return (await db().query(PENDING_LEADS)) as Record<string, unknown>[]
}

export async function getLeadSummary() {
  const rows = (await db().query(LEAD_SUMMARY)) as Record<string, unknown>[]
  return rows[0]
}

export async function getInterestBreakdown(days = 30) {
  return (await db().query(INTEREST_BREAKDOWN, [String(days)])) as { interes: string; n: number }[]
}

/** One lead by id, or null. Used by the confirmation page the email links to. */
export async function getLead(id: number) {
  const rows = (await db().query(GET_LEAD, [id])) as Record<string, unknown>[]
  return rows[0] ?? null
}

/**
 * Move a lead's status and stamp `contacted_at`. Returns the updated row, or
 * null when the id does not exist — callers must not report success on null.
 */
export async function setLeadStatus(id: number, status: LeadStatus) {
  const rows = (await db().query(SET_LEAD_STATUS, [id, status])) as Record<string, unknown>[]
  return rows[0] ?? null
}

export interface ResponseTimes {
  answered: number
  unanswered: number
  median_hours: number | null
  worst_hours: number | null
}

/** Time-to-first-response over the leads that arrived in the window. */
export async function getResponseTimes(days = 30): Promise<ResponseTimes> {
  const rows = (await db().query(RESPONSE_TIMES, [String(days)])) as Record<string, unknown>[]
  const r = rows[0] ?? {}
  const num = (v: unknown) => (v === null || v === undefined ? null : Number(v))
  return {
    answered: Number(r.answered ?? 0),
    unanswered: Number(r.unanswered ?? 0),
    median_hours: num(r.median_hours),
    worst_hours: num(r.worst_hours),
  }
}

/**
 * Counts by status, all four keys always present. Postgres only returns the
 * statuses that exist, and a dashboard reading `converted` should get 0 rather
 * than undefined when nothing has converted yet.
 */
export async function getStatusCounts(): Promise<Record<LeadStatus, number>> {
  const rows = (await db().query(STATUS_COUNTS)) as { status: string; n: number }[]
  const out = Object.fromEntries(LEAD_STATUSES.map((s) => [s, 0])) as Record<LeadStatus, number>
  for (const row of rows) {
    if (isLeadStatus(row.status)) out[row.status] = Number(row.n)
  }
  return out
}

/** Where the enquiries came from, last N days. */
export async function getAttributionBreakdown(days = 30) {
  return (await db().query(ATTRIBUTION_BREAKDOWN, [String(days)])) as {
    fuente: string
    medio: string
    n: number
    contactados: number
  }[]
}

/**
 * The inbox list: the queue to work, plus everything already worked.
 *
 * The cap is a bound on the page, not a view of the business — and because
 * INBOX_LEADS sorts unworked leads first, hitting it drops the oldest CLOSED
 * lead rather than hiding someone still waiting. The page says so when the
 * cap is reached rather than silently showing a shorter list; a monitor that
 * truncated quietly is exactly how nine waiting enquiries went unseen.
 */
export const INBOX_LIMIT = 500

export async function getInboxLeads(limit = INBOX_LIMIT) {
  return (await db().query(INBOX_LEADS, [limit])) as Record<string, unknown>[]
}

/**
 * Status counts for leads that arrived in the window. Same zero-filling as the
 * all-time version — a dashboard reading `converted` needs 0, not undefined.
 */
export async function getStatusCountsWindow(days = 30): Promise<Record<LeadStatus, number>> {
  const rows = (await db().query(STATUS_COUNTS_WINDOW, [String(days)])) as {
    status: string
    n: number
  }[]
  const out = Object.fromEntries(LEAD_STATUSES.map((s) => [s, 0])) as Record<LeadStatus, number>
  for (const row of rows) {
    if (isLeadStatus(row.status)) out[row.status] = Number(row.n)
  }
  return out
}
