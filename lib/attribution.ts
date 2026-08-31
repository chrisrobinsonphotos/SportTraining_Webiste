/**
 * First-touch attribution, captured in the browser.
 *
 * The question this answers is "where did this person come from" — Business
 * Profile, Instagram, an ad, organic search — which `canal` cannot answer,
 * because `canal` records which control they pressed once they were already
 * on the site.
 *
 * FIRST touch, not last, and that is the whole design. A real journey looks
 * like: Instagram ad → /prueba → reads the schedule → opens the modal on the
 * home page → submits. At the moment of submission the referrer is empty and
 * the URL has no utm at all, so last-touch attribution would file that lead
 * under "directo" and quietly credit nothing. Capturing on the first page of
 * the session and refusing to overwrite it keeps the credit where it belongs.
 *
 * Storage is `sessionStorage`: it survives navigation and reloads within the
 * visit and disappears when the tab closes, which matches "for the session"
 * without leaving a durable tracking identifier on anyone's machine. There is
 * no cookie, no id, and nothing here that identifies a person.
 *
 * Every function is defensive by design. sessionStorage throws outright in
 * some privacy modes, and a lead form that breaks because a browser refused
 * to store a utm parameter would be a far worse bug than missing attribution.
 * Failure mode everywhere: return null, let the submission through.
 */

export interface Attribution {
  utm_source: string | null
  utm_medium: string | null
  utm_campaign: string | null
  utm_content: string | null
  referrer: string | null
  landing_page: string | null
}

const STORAGE_KEY = 'st_attr_v1'

const LIMITS = {
  utm: 120,
  campaign: 200,
  url: 500,
} as const

const EMPTY: Attribution = {
  utm_source: null,
  utm_medium: null,
  utm_campaign: null,
  utm_content: null,
  referrer: null,
  landing_page: null,
}

function clean(value: string | null | undefined, max: number): string | null {
  if (typeof value !== 'string') return null
  const trimmed = value.trim()
  return trimmed ? trimmed.slice(0, max) : null
}

/**
 * The referring URL, or null when it is useless.
 *
 * Same-origin referrers are dropped: on the first page of a session a referrer
 * pointing at sporttraining.es means a reload or a back-navigation, and storing
 * it would file the lead as "referred by ourselves".
 */
function externalReferrer(): string | null {
  const raw = clean(document.referrer, LIMITS.url)
  if (!raw) return null
  try {
    if (new URL(raw).origin === window.location.origin) return null
  } catch {
    return null
  }
  return raw
}

function readCurrent(): Attribution {
  const params = new URLSearchParams(window.location.search)
  const get = (k: string, max: number) => clean(params.get(k), max)
  return {
    utm_source: get('utm_source', LIMITS.utm),
    utm_medium: get('utm_medium', LIMITS.utm),
    utm_campaign: get('utm_campaign', LIMITS.campaign),
    utm_content: get('utm_content', LIMITS.campaign),
    referrer: externalReferrer(),
    landing_page: clean(window.location.pathname + window.location.search, LIMITS.url),
  }
}

/**
 * Record the first touch of this session. Safe to call on every page — the
 * second and later calls are deliberate no-ops, which is what makes it
 * first-touch rather than last-touch.
 */
export function captureFirstTouch(): void {
  if (typeof window === 'undefined') return
  try {
    if (window.sessionStorage.getItem(STORAGE_KEY)) return
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(readCurrent()))
  } catch {
    // Storage unavailable (private mode, blocked site data). Attribution is
    // lost for this visit; the forms carry on working untouched.
  }
}

/**
 * Read the stored first touch, for posting alongside a form submission.
 *
 * Falls back to the current page when nothing was stored — that covers the
 * private-mode case and anyone who submits before the capture effect has run,
 * and it is still better than sending nothing.
 */
export function getAttribution(): Attribution {
  if (typeof window === 'undefined') return { ...EMPTY }
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<Attribution>
      return {
        utm_source: clean(parsed.utm_source, LIMITS.utm),
        utm_medium: clean(parsed.utm_medium, LIMITS.utm),
        utm_campaign: clean(parsed.utm_campaign, LIMITS.campaign),
        utm_content: clean(parsed.utm_content, LIMITS.campaign),
        referrer: clean(parsed.referrer, LIMITS.url),
        landing_page: clean(parsed.landing_page, LIMITS.url),
      }
    }
  } catch {
    // Unreadable or corrupt — fall through to the live page below.
  }
  try {
    return readCurrent()
  } catch {
    return { ...EMPTY }
  }
}
