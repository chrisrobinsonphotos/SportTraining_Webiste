import { neon } from '@neondatabase/serverless'
import {
  INSERT_LEAD,
  MARK_EMAIL_SENT,
  MARK_EMAIL_FAILED,
  RECENT_LEADS,
  PENDING_LEADS,
  LEAD_SUMMARY,
  INTEREST_BREAKDOWN,
} from './leads-sql'

/**
 * Enquiry store — the system of record for anything submitted through the site.
 *
 * The ordering rule in the API routes is deliberate: persist FIRST, notify
 * second. A submission is only reported as successful once the row is
 * committed. Email is a convenience on top; if it fails the lead is still safe
 * and the daily digest carries it. The reverse order is what lost 19 enquiries.
 */

export interface LeadInput {
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
  const rows = (await db().query(INSERT_LEAD, [
    lead.source,
    lead.canal ?? null,
    lead.nombre,
    lead.telefono ?? null,
    lead.email ?? null,
    lead.interes ?? null,
    lead.mensaje ?? null,
    lead.subscribe ?? false,
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
