import { NextResponse } from 'next/server'
import { getLeadSummary, getPendingLeads, getRecentLeads, getInterestBreakdown } from '@/lib/leads'

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
    const [summary, pending, recent, interests] = await Promise.all([
      getLeadSummary(),
      getPendingLeads(),
      getRecentLeads(30),
      getInterestBreakdown(30),
    ])
    return NextResponse.json({
      generated_at: new Date().toISOString(),
      summary,
      pending,
      recent,
      interests,
    })
  } catch (err) {
    console.error('Lead summary query failed:', err)
    return NextResponse.json({ error: 'Query failed' }, { status: 502 })
  }
}
