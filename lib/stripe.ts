import Stripe from 'stripe'

/**
 * Lazily-instantiated Stripe client. Reads STRIPE_SECRET_KEY at call time so the
 * app builds and runs even before the key is set (the store simply reports it is
 * not yet configured). See docs/stripe-setup.md.
 */
let client: Stripe | null = null

export function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) throw new Error('STRIPE_SECRET_KEY is not set')
  if (!client) {
    client = new Stripe(key)
  }
  return client
}

export const isStripeConfigured = (): boolean => Boolean(process.env.STRIPE_SECRET_KEY)

/** Site origin for building success / cancel URLs. */
export const siteUrl = (): string =>
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'https://sporttraining.es'
