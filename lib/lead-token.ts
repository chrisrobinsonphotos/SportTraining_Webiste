import { createHmac, timingSafeEqual } from 'node:crypto'
import { isLeadStatus, type LeadStatus } from './leads'

/**
 * Signed, single-lead, expiring action tokens.
 *
 * These exist so the daily digest can carry a one-click "mark as contacted"
 * link without that link being a loaded gun. The threat is mundane and
 * guaranteed: mail scanners, spam filters, link previewers and Gmail's own
 * proxy all fetch every URL in an email, unprompted. A GET that mutates would
 * therefore mark leads contacted while the email sits unread — silently
 * destroying the one metric this whole feature exists to produce.
 *
 * So the token is deliberately NOT a capability to mutate. It is a capability
 * to *see a confirmation page*. The mutation happens on an explicit POST from
 * that page, which no scanner performs.
 *
 * The token binds three things, and a change to any of them invalidates it:
 *   - one lead id       (a token for lead 12 cannot touch lead 13)
 *   - one target status (a "contacted" token cannot mark a lead 'lost')
 *   - one expiry        (a leaked digest from months ago is inert)
 *
 * Format: `<id>.<status>.<expiry>.<signature>` — every part URL-safe, and
 * readable enough to debug from a log line without a decoder.
 */

/** Fourteen days: long enough that a digest left unread for a fortnight still works. */
export const LEAD_TOKEN_TTL_SECONDS = 14 * 24 * 60 * 60

export type LeadTokenFailure =
  | 'unconfigured'
  | 'malformed'
  | 'bad-signature'
  | 'expired'

export type LeadTokenResult =
  | { ok: true; id: number; status: LeadStatus; expiresAt: Date }
  | { ok: false; reason: LeadTokenFailure }

/**
 * Signing key. Separate from LEADS_DIGEST_TOKEN on purpose: that one is a
 * read credential handed to the monitoring machine, and a read credential
 * must not also be able to forge write links.
 */
function secret(): string | null {
  const s = process.env.LEAD_ACTION_SECRET
  return s && s.length >= 16 ? s : null
}

export function isLeadTokenConfigured(): boolean {
  return secret() !== null
}

function sign(payload: string, key: string): string {
  return createHmac('sha256', key).update(payload).digest('base64url')
}

/** Constant-time compare that cannot throw on a length mismatch. */
function signatureMatches(expected: string, given: string): boolean {
  const a = Buffer.from(expected, 'utf8')
  const b = Buffer.from(given, 'utf8')
  if (a.length !== b.length) return false
  return timingSafeEqual(a, b)
}

/**
 * Mint a token for one lead and one status.
 * Returns null when no signing key is configured — callers omit the link
 * rather than emitting an unsigned one.
 */
export function signLeadToken(
  id: number,
  status: LeadStatus,
  nowMs: number = Date.now(),
  ttlSeconds: number = LEAD_TOKEN_TTL_SECONDS,
): string | null {
  const key = secret()
  if (!key) return null
  if (!Number.isInteger(id) || id <= 0) return null
  if (!isLeadStatus(status)) return null

  const exp = Math.floor(nowMs / 1000) + ttlSeconds
  const payload = `${id}.${status}.${exp}`
  return `${payload}.${sign(payload, key)}`
}

/**
 * Verify a token. Signature is checked BEFORE expiry so a forged token is
 * never reported as merely "expired", which would tell an attacker their
 * forgery was otherwise well-formed.
 */
export function verifyLeadToken(
  token: unknown,
  nowMs: number = Date.now(),
): LeadTokenResult {
  const key = secret()
  if (!key) return { ok: false, reason: 'unconfigured' }
  if (typeof token !== 'string' || token.length === 0 || token.length > 512) {
    return { ok: false, reason: 'malformed' }
  }

  const parts = token.split('.')
  if (parts.length !== 4) return { ok: false, reason: 'malformed' }

  const [rawId, rawStatus, rawExp, signature] = parts
  const payload = `${rawId}.${rawStatus}.${rawExp}`

  if (!signatureMatches(sign(payload, key), signature)) {
    return { ok: false, reason: 'bad-signature' }
  }

  // Only now is the content trustworthy enough to parse.
  const id = Number(rawId)
  const exp = Number(rawExp)
  if (!Number.isInteger(id) || id <= 0) return { ok: false, reason: 'malformed' }
  if (!Number.isFinite(exp)) return { ok: false, reason: 'malformed' }
  if (!isLeadStatus(rawStatus)) return { ok: false, reason: 'malformed' }
  if (exp * 1000 <= nowMs) return { ok: false, reason: 'expired' }

  return { ok: true, id, status: rawStatus, expiresAt: new Date(exp * 1000) }
}
