import { truncateAddress } from "@/lib/stellar/wallet-kit"
import type { SubscriptionPlan } from "@/lib/api/types"

const INTERVAL_LABELS: Record<string, string> = {
  WEEKLY: "week",
  MONTHLY: "month",
  YEARLY: "year",
  CUSTOM: "billing cycle",
}

type CheckoutPlanView = {
  planCode: string
  merchantName: string
  merchantWebsite: string
  merchantInitials: string
  planName: string
  description: string
  amount: number
  intervalLabel: string
  cap: number
  startsLabel: string
  expiresLabel: string
  receivingWallet: string
  paymentDates: string[]
}

function initialsFromName(name: string) {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join("")
  return initials || "?"
}

function formatDateLabel(iso: string | null | undefined, options: Intl.DateTimeFormatOptions) {
  if (!iso) return "—"
  return new Date(iso).toLocaleDateString("en-US", options)
}

function upcomingPaymentDates(plan: SubscriptionPlan, count = 5): string[] {
  const start = new Date(plan.starts_at || Date.now())
  const intervalMs = (plan.interval_seconds || 30 * 24 * 60 * 60) * 1000
  return Array.from({ length: count }, (_, i) =>
    new Date(start.getTime() + intervalMs * i).toLocaleDateString("en-US", { month: "short", day: "numeric" })
  )
}

function toCheckoutPlanView(plan: SubscriptionPlan): CheckoutPlanView {
  return {
    planCode: plan.plan_code,
    merchantName: plan.merchant_name,
    merchantWebsite: plan.merchant_website,
    merchantInitials: initialsFromName(plan.merchant_name),
    planName: plan.name,
    description: plan.description || "",
    amount: Number(plan.amount_usdc),
    intervalLabel: INTERVAL_LABELS[plan.billing_interval] ?? "billing cycle",
    cap: Number(plan.max_spending_limit),
    startsLabel: formatDateLabel(plan.starts_at, { month: "short", day: "numeric", year: "numeric" }),
    expiresLabel: plan.expires_at
      ? formatDateLabel(plan.expires_at, { month: "short", day: "numeric", year: "numeric" })
      : "No expiry",
    receivingWallet: truncateAddress(plan.receiving_wallet),
    paymentDates: upcomingPaymentDates(plan),
  }
}

export { toCheckoutPlanView }
export type { CheckoutPlanView }
