// the backend's SubscriptionPlan.checkout_url doesn't point at this frontend's routes, so
// checkout links shown/copied in the UI must be built from our own /checkout/[planCode] route
function buildCheckoutUrl(planCode: string): string {
  if (typeof window !== "undefined") {
    return `${window.location.origin}/checkout/${planCode}`
  }
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  return `${siteUrl}/checkout/${planCode}`
}

export { buildCheckoutUrl }
