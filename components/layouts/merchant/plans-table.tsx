"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown } from "lucide-react"
import { Text } from "@/components/reuseables/text"
import { intervalLabel, formatUsdc } from "@/lib/billing-format"
import { buildCheckoutUrl } from "@/lib/checkout-url"
import type { SubscriptionPlan } from "@/lib/api/types"

const FILTERS = ["All", "Active", "Closed"] as const

const STATUS_STYLES: Record<SubscriptionPlan["status"], string> = {
  ACTIVE: "border-emerald-500 bg-emerald-50 text-emerald-700",
  CLOSED: "border-border bg-muted text-muted-foreground",
}

type PlanWithCollected = SubscriptionPlan & { collected: number }

function PlansTable({ plans }: { plans: PlanWithCollected[] }) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All")

  const rows =
    filter === "All" ? plans : plans.filter((plan) => plan.status === (filter === "Active" ? "ACTIVE" : "CLOSED"))

  return (
    <div className="rounded-2xl border border-border bg-white p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setFilter(item)}
              className={`rounded-full px-3 py-1.5 text-sm font-medium ${
                filter === item ? "bg-blue-100 text-blue-700" : "text-muted-foreground hover:bg-muted"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
        <button
          type="button"
          className="flex shrink-0 items-center gap-1 rounded-full border border-border px-3 py-1.5 text-sm font-medium text-foreground"
        >
          Last 30 days
          <ChevronDown className="size-4" />
        </button>
      </div>

      {rows.length === 0 ? (
        <Text as="p" size="sm" className="mt-6 text-center text-muted-foreground">
          No plans match this filter.
        </Text>
      ) : (
        <>
          {/* mobile: card list */}
          <div className="mt-4 flex flex-col gap-3 sm:hidden">
            {rows.map((row) => (
              <div key={row.plan_code} className="rounded-xl border border-border p-4">
                <div className="flex items-center justify-between gap-2">
                  <Link href={`/merchant/plans/${row.plan_code}`} className="font-semibold text-blue-600 hover:underline">
                    {row.name}
                  </Link>
                  <span className={`shrink-0 rounded-md border-l-2 px-2 py-0.5 text-xs font-medium ${STATUS_STYLES[row.status]}`}>
                    {row.status === "ACTIVE" ? "Active" : "Closed"}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {formatUsdc(row.amount_usdc)} · {intervalLabel(row.billing_interval)}
                </p>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-xs text-muted-foreground">Subscribers</p>
                    <p className="text-sm font-semibold">{row.subscriber_count}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Collected, 30d</p>
                    <p className="text-sm font-semibold">{formatUsdc(row.collected)}</p>
                  </div>
                </div>
                <p className="mt-3 border-t border-border pt-3 truncate font-mono text-xs text-muted-foreground">{buildCheckoutUrl(row.plan_code)}</p>
              </div>
            ))}
          </div>

          {/* desktop: table */}
          <div className="mt-4 hidden overflow-x-auto sm:block">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead>
                <tr className="border-b border-border text-muted-foreground">
                  <th className="py-2 font-medium">Plan</th>
                  <th className="py-2 font-medium">Status</th>
                  <th className="py-2 font-medium">Price</th>
                  <th className="py-2 font-medium">Interval</th>
                  <th className="py-2 font-medium">Subscribers</th>
                  <th className="py-2 font-medium">Collected, 30 days</th>
                  <th className="py-2 font-medium">Checkout link</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.plan_code} className="border-b border-border last:border-0">
                    <td className="py-3 font-medium">
                      <Link href={`/merchant/plans/${row.plan_code}`} className="text-blue-600 hover:underline">
                        {row.name}
                      </Link>
                    </td>
                    <td className="py-3">
                      <span className={`rounded-md border-l-2 px-2 py-0.5 text-xs font-medium ${STATUS_STYLES[row.status]}`}>
                        {row.status === "ACTIVE" ? "Active" : "Closed"}
                      </span>
                    </td>
                    <td className="py-3 font-semibold">{formatUsdc(row.amount_usdc)}</td>
                    <td className="py-3 text-muted-foreground">{intervalLabel(row.billing_interval)}</td>
                    <td className="py-3 text-muted-foreground">{row.subscriber_count}</td>
                    <td className="py-3 font-semibold">{formatUsdc(row.collected)}</td>
                    <td className="py-3 font-mono text-xs text-muted-foreground">{buildCheckoutUrl(row.plan_code)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  )
}

export { PlansTable }
export type { PlanWithCollected }

