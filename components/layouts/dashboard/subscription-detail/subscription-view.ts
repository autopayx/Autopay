import type { Subscription } from "@/lib/api/types"
import { intervalLabel, formatUsdc, formatShortDate, formatLongDate } from "@/lib/billing-format"
import { normalizeBillingHistory } from "@/lib/billing-history"
import { truncateAddress } from "@/lib/stellar/wallet-kit"
import type { SubscriptionDetail } from "@/components/layouts/dashboard/subscription-detail/data"

// payment_schedule has no documented shape (OpenAPI marks it as a free-form array); read
// common field names defensively and fall back to an empty schedule if nothing matches
function normalizeSchedule(raw: unknown): SubscriptionDetail["schedule"] {
  if (!Array.isArray(raw)) return []
  return raw.map((entry) => {
    const record = (entry && typeof entry === "object" ? entry : {}) as Record<string, unknown>
    const dateValue = record.due_date ?? record.date ?? record.payment_date
    const amount = record.amount_usdc ?? record.amount
    const funded = record.funded ?? record.is_funded
    const date = dateValue ? new Date(String(dateValue)) : null
    return {
      month: date ? date.toLocaleDateString("en-US", { month: "short" }).toUpperCase() : "—",
      day: date ? date.toLocaleDateString("en-US", { day: "2-digit" }) : "—",
      amount: formatUsdc(Number(amount) || 0),
      status: funded === false || record.status === "needs_top_up" ? "Needs top-up" : "Funded",
    } as SubscriptionDetail["schedule"][number]
  })
}

function statusFromBillingRow(status: string): "Successful" | "Failed" | "Skipped" {
  const normalized = status.toLowerCase()
  if (normalized.includes("fail")) return "Failed"
  if (normalized.includes("skip")) return "Skipped"
  return "Successful"
}

function toSubscriptionDetailView(sub: Subscription): SubscriptionDetail {
  const amount = Number(sub.amount_usdc)
  const maxLimit = Number(sub.max_spending_limit)
  const remaining = Number(sub.remaining_allowance)
  const vaultBalance = Number(sub.vault_balance)
  const held = Number(sub.held_for_next_payment)
  const free = Number(sub.free_to_withdraw)
  const usedPct = maxLimit > 0 ? Math.min(((maxLimit - remaining) / maxLimit) * 100, 100) : 0
  const coversPayments = amount > 0 ? Math.floor(vaultBalance / amount) : 0

  return {
    slug: sub.sub_code,
    name: sub.merchant_name,
    planLabel: sub.plan_name,
    subscriptionId: sub.sub_code,
    status: sub.status === "PAUSED" ? "Paused" : "Active",
    stats: {
      nextPayment: sub.status === "PAUSED" ? "Paused" : formatShortDate(sub.next_payment_time),
      nextAmount: formatUsdc(amount),
      paidSoFar: formatUsdc(sub.total_spent),
      paidSince: `Since ${formatShortDate(sub.start_time)}`,
      allowanceLeft: formatUsdc(remaining),
      allowanceTotal: `of ${formatUsdc(maxLimit)}`,
      vaultBalance: formatUsdc(vaultBalance),
    },
    authorization: {
      amount: formatUsdc(amount),
      interval: intervalLabel(sub.billing_interval),
      cap: formatUsdc(maxLimit),
      until: formatLongDate(sub.expiration_time),
    },
    merchantWallet: truncateAddress(sub.merchant_receiving_wallet),
    started: formatLongDate(sub.start_time),
    contract: sub.tx_hash || sub.sub_code,
    vault: {
      balance: formatUsdc(vaultBalance),
      coversPayments,
      usedPct,
      held: formatUsdc(held),
      free: formatUsdc(free),
    },
    schedule: normalizeSchedule(sub.payment_schedule),
    history: [],
  }
}

function toPaymentHistory(data: unknown): SubscriptionDetail["history"] {
  return normalizeBillingHistory(data).map((row) => ({
    date: row.date,
    status: statusFromBillingRow(row.status),
    amount: row.amount,
  }))
}

export { toSubscriptionDetailView, toPaymentHistory }
