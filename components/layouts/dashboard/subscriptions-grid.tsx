import Link from "next/link"
import { AppButton } from "@/components/reuseables/button"
import { Text } from "@/components/reuseables/text"
import { intervalLabel, formatUsdc, formatShortDate } from "@/lib/billing-format"
import type { Subscription } from "@/lib/api/types"

const STATUS_LABELS: Record<Subscription["status"], string> = {
  ACTIVE: "Active",
  PAUSED: "Paused",
  CANCELLED: "Cancelled",
  EXPIRED: "Expired",
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

function SubscriptionsGrid({ subscriptions }: { subscriptions: Subscription[] }) {
  return (
    <div className="rounded-2xl border border-border bg-white p-6">
      <div className="flex items-center justify-between">
        <Text as="h3" weight="semibold">
          Subscriptions
        </Text>
        <Link href="#" className="text-sm font-medium text-blue-600 hover:underline">
          View all subscriptions
        </Link>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        {subscriptions.map((sub) => {
          const maxLimit = Number(sub.max_spending_limit)
          const remaining = Number(sub.remaining_allowance)
          const used = Math.max(maxLimit - remaining, 0)
          const usedPct = maxLimit > 0 ? Math.min((used / maxLimit) * 100, 100) : 0

          return (
            <div key={sub.sub_code} className="flex flex-col rounded-xl border border-border p-4">
              <div className="flex items-center gap-2">
                <span className="flex size-8 items-center justify-center rounded-lg bg-[#0B1F3A] text-xs font-semibold text-white">
                  {initialsFromName(sub.merchant_name)}
                </span>
                <div>
                  <Text as="p" weight="semibold" size="sm">
                    {sub.merchant_name}
                  </Text>
                  <Text as="p" size="sm" className="text-muted-foreground">
                    {sub.plan_name}
                  </Text>
                </div>
              </div>

              <span
                className={`mt-3 w-fit rounded-md px-2 py-0.5 text-xs font-medium ${
                  sub.status === "ACTIVE" ? "bg-emerald-50 text-emerald-700" : "bg-muted text-muted-foreground"
                }`}
              >
                {STATUS_LABELS[sub.status]}
              </span>

              <Text as="p" weight="semibold" size="sm" className="mt-3">
                {formatUsdc(sub.amount_usdc)} / {intervalLabel(sub.billing_interval)}{" "}
                <span className="font-normal text-muted-foreground">
                  · {sub.status === "PAUSED" ? "Paused by you" : `Next ${formatShortDate(sub.next_payment_time)}`}
                </span>
              </Text>

              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-border">
                <div className="h-full rounded-full bg-blue-500" style={{ width: `${usedPct}%` }} />
              </div>
              <Text as="p" size="sm" className="mt-1 text-muted-foreground">
                {formatUsdc(used)} of {formatUsdc(maxLimit)} allowance used
              </Text>

              <div className="mt-3 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Vault balance</span>
                <span className="font-semibold text-foreground">{formatUsdc(sub.vault_balance)}</span>
              </div>

              <AppButton
                variant="outline"
                nativeButton={false}
                render={<Link href={`/dashboard/subscriptions/${sub.sub_code}`} />}
                className="mt-4 min-w-0 w-full rounded-full"
              >
                Manage
              </AppButton>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export { SubscriptionsGrid }
