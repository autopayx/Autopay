import { formatUsdc, formatLongDate, formatShortDate, intervalLabel } from "@/lib/billing-format"
import { buildCheckoutUrl } from "@/lib/checkout-url"
import { truncateAddress } from "@/lib/stellar/wallet-kit"
import type { BillingHistoryRow } from "@/lib/billing-history"
import type { SubscriptionPlan, Subscription } from "@/lib/api/types"
import type { PlanDetail } from "@/components/layouts/merchant/plan-detail/data"

function toPlanDetailView(plan: SubscriptionPlan, subscriptions: Subscription[], billingRows: BillingHistoryRow[]): PlanDetail {
  const activeSubscribers = subscriptions.filter((sub) => sub.status === "ACTIVE").length
  const pausedSubscribers = subscriptions.filter((sub) => sub.status === "PAUSED").length
  const cancelledSubscribers = subscriptions.filter((sub) => sub.status === "CANCELLED").length

  const successfulRows = billingRows.filter((row) => ["SUCCESSFUL", "SUCCESS"].includes(row.status.toUpperCase()))
  const failedOrSkippedRows = billingRows.filter((row) => ["FAILED", "SKIPPED"].includes(row.status.toUpperCase()))
  const collected30d = successfulRows.reduce((sum, row) => sum + row.amountValue, 0)

  const now = Date.now()
  const sevenDaysMs = 7 * 24 * 60 * 60 * 1000
  const upcoming = subscriptions.filter((sub) => {
    if (sub.status !== "ACTIVE") return false
    const next = new Date(sub.next_payment_time).getTime()
    return next - now >= 0 && next - now <= sevenDaysMs
  })
  const next7daysTotal = upcoming.reduce((sum, sub) => sum + Number(sub.amount_usdc), 0)

  return {
    slug: plan.plan_code,
    name: plan.name,
    status: plan.status === "ACTIVE" ? "Active" : "Closed",
    createdDate: formatLongDate(plan.created_at),
    checkoutLink: buildCheckoutUrl(plan.plan_code),
    stats: {
      activeSubscribers,
      subscribersNote: `${pausedSubscribers} paused · ${cancelledSubscribers} cancelled`,
      collected30d: formatUsdc(collected30d),
      paymentsCount: successfulRows.length,
      next7days: formatUsdc(next7daysTotal),
      chargesCount: upcoming.length,
      failedOrSkipped: failedOrSkippedRows.length,
    },
    terms: {
      price: formatUsdc(plan.amount_usdc),
      interval: intervalLabel(plan.billing_interval),
      maxAllowance: formatUsdc(plan.max_spending_limit),
      expires: plan.expires_at ? formatLongDate(plan.expires_at) : "No expiry",
    },
    recentSubscribers: subscriptions.slice(0, 10).map((sub) => ({
      address: truncateAddress(sub.customer_wallet),
      vault: formatUsdc(sub.vault_balance),
      status: sub.status,
      amount: formatUsdc(sub.amount_usdc),
      nextPayment: sub.status === "ACTIVE" ? formatShortDate(sub.next_payment_time) : "—",
    })),
  }
}

export { toPlanDetailView }
