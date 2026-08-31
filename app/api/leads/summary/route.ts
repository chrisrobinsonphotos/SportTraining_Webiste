import { NextResponse } from 'next/server'
import {
  getLeadSummary,
  getPendingLeads,
  getRecentLeads,
  getInterestBreakdown,
  getResponseTimes,
  getStatusCounts,
  getAttributionBreakdown,
} from '@/lib/leads'

/**
 * Lead summary for the daily monitoring run.
 *
 * This returns personal data (names, phone numbers), so it is NOT public: it
 * requires LEADS_DIGEST_TOKEN as a bearer token. Keeping the read behind the
 * site means the database credential lives in exactly one place — Vercel —
 * rather than being copied into the monitoring machine as well.
 *
 * If the token is not configured the route refuses rather than falling open.
 */

export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  const expected = process.env.LEADS_DIGEST_TOKEN
  if (!expected) {
    console.error('LEADS_DIGEST_TOKEN is not set — refusing to serve lead data')
    return NextResponse.json({ error: 'Not configured' }, { status: 503 })
  }

  const auth = req.headers.get('authorization') ?? ''
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : ''
  if (token !== expected) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const [summary, pending, recent, interests, response, statuses, attribution] =
      await Promise.all([
        getLeadSummary(),
        getPendingLeads(),
        getRecentLeads(30),
        getInterestBreakdown(30),
        getResponseTimes(30),
        getStatusCounts(),
        getAttributionBreakdown(30),
      ])

    return NextResponse.json({
      generated_at: new Date().toISOString(),
      window_days: 30,
      summary,
      pending,
      recent,
      interests,

      /**
       * Time-to-first-response, in hours, over leads that ARRIVED in the last
       * 30 days. `answered` / `unanswered` sit alongside the numbers on
       * purpose: a 2-hour median across 3 of 40 leads is not a 2-hour response
       * time, and a consumer that shows the median without the coverage will
       * report the queue as healthy while it rots. `median_hours` and
       * `worst_hours` are null when nothing in the window was answered.
       */
      response_times: response,

      /** Every status key present, zeros included. All time — a 'new' lead never ages out. */
      status_counts: statuses,

      /**
       * Where the last 30 days of enquiries came from: utm_source when tagged,
       * otherwise the referring host, otherwise 'directo'. `contactados` is how
       * many of each source were actually worked, so a source can be judged on
       * follow-up as well as volume.
       */
      attribution,
    })
  } catch (err) {
    console.error('Lead summary query failed:', err)
    return NextResponse.json({ error: 'Query failed' }, { status: 502 })
  }
}
