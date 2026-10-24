import Link from "next/link"
import { Text } from "@/components/reuseables/text"
import { formatUsdc } from "@/lib/billing-format"
import type { Subscription } from "@/lib/api/types"

function NextPaymentsPanel({ subscriptions }: { subscriptions: Subscription[] }) {
  const upcoming = subscriptions
    .filter((sub) => sub.status === "ACTIVE")
    .sort((a, b) => new Date(a.next_payment_time).getTime() - new Date(b.next_payment_time).getTime())
    .slice(0, 5)

  const pausedCount = subscriptions.filter((sub) => sub.status === "PAUSED").length

  return (
    <div className="flex flex-col rounded-2xl border border-border bg-white p-6">
      <div className="flex items-center justify-between">
        <Text as="h3" weight="semibold">
          Next payments
        </Text>
        <Link href="/dashboard/billing" className="text-sm font-medium text-blue-600 hover:underline">
          View billing history
        </Link>
      </div>

      {upcoming.length === 0 ? (
        <Text as="p" size="sm" className="mt-4 text-muted-foreground">
          No upcoming payments right now.
        </Text>
      ) : (
        <div className="mt-4 flex flex-col divide-y divide-border">
          {upcoming.map((sub) => {
            const date = new Date(sub.next_payment_time)
            const month = date.toLocaleDateString("en-US", { month: "short" }).toUpperCase()
            const day = date.toLocaleDateString("en-US", { day: "2-digit" })

            return (
              <div key={sub.sub_code} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
                <div className="flex w-12 shrink-0 flex-col items-center rounded-lg border border-border py-1.5">
                  <span className="text-[10px] font-semibold text-muted-foreground">{month}</span>
                  <span className="text-lg font-bold text-foreground">{day}</span>
                </div>
                <div className="flex-1">
                  <Text as="p" weight="semibold" size="sm">
                    {sub.merchant_name} · {sub.plan_name}
                  </Text>
                  <Text as="p" size="sm" className="text-muted-foreground">
                    Reserved in your vault
                  </Text>
                </div>
                <Text as="p" weight="semibold" size="sm" className="shrink-0">
                  {formatUsdc(sub.amount_usdc)}
                </Text>
              </div>
            )
          })}
        </div>
      )}

      {pausedCount > 0 && (
        <Text as="p" size="sm" className="mt-4 text-muted-foreground">
          {pausedCount} subscription{pausedCount > 1 ? "s are" : " is"} paused, so nothing is due for{" "}
          {pausedCount > 1 ? "them" : "it"}. Payments only happen on the dates above.
        </Text>
      )}
    </div>
  )
}

export { NextPaymentsPanel }
