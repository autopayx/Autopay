"use client"

import { useState } from "react"
import Link from "next/link"
import { Text } from "@/components/reuseables/text"
import { intervalLabel, formatShortDate, formatUsdc } from "@/lib/billing-format"
import { truncateAddress } from "@/lib/stellar/wallet-kit"
import type { BillingHistoryRow } from "@/lib/billing-history"
import type { Subscription } from "@/lib/api/types"

const STATUS_STYLES: Record<string, string> = {
  SUCCESSFUL: "bg-emerald-50 text-emerald-700",
  SUCCESS: "bg-emerald-50 text-emerald-700",
  ACTIVE: "bg-emerald-50 text-emerald-700",
  FAILED: "bg-red-50 text-red-700",
  SKIPPED: "bg-amber-50 text-amber-700",
  PENDING: "bg-muted text-muted-foreground",
  PAUSED: "bg-muted text-muted-foreground",
  CANCELLED: "bg-muted text-muted-foreground",
  EXPIRED: "bg-muted text-muted-foreground",
}

function RecentActivityCard({ transactions, subscriptions }: { transactions: BillingHistoryRow[]; subscriptions: Subscription[] }) {
  const [tab, setTab] = useState<"Transactions" | "Subscriptions">("Transactions")

  return (
    <div className="rounded-2xl border border-border bg-white p-6">
      <div className="flex items-center justify-between">
        <div className="flex gap-1 rounded-full bg-muted p-1">
          {(["Transactions", "Subscriptions"] as const).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setTab(item)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium ${
                tab === item ? "bg-white text-foreground shadow-sm" : "text-muted-foreground"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
        <Link href="/merchant/billing" className="text-sm font-medium text-blue-600 hover:underline">
          View billing history
        </Link>
      </div>

      <div className="mt-4 overflow-x-auto">
        {tab === "Transactions" ? (
          transactions.length === 0 ? (
            <Text as="p" size="sm" className="py-4 text-center text-muted-foreground">
              No transactions yet.
            </Text>
          ) : (
            <table className="w-full min-w-[480px] text-left text-sm">
              <thead>
                <tr className="border-b border-border text-muted-foreground">
                  <th className="py-2 font-medium">Customer</th>
                  <th className="py-2 font-medium">Plan</th>
                  <th className="py-2 font-medium">Status</th>
                  <th className="py-2 font-medium">Amount</th>
                  <th className="py-2 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {transactions.slice(0, 5).map((row) => (
                  <tr key={row.id} className="border-b border-border last:border-0">
                    <td className="py-3 font-medium text-blue-600">{row.customerWallet ? truncateAddress(row.customerWallet) : "—"}</td>
                    <td className="py-3 text-muted-foreground">{row.plan}</td>
                    <td className="py-3">
                      <span className={`rounded-md px-2 py-0.5 text-xs font-medium ${STATUS_STYLES[row.status.toUpperCase()] ?? "bg-muted text-muted-foreground"}`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="py-3 font-semibold">{row.amount}</td>
                    <td className="py-3 text-muted-foreground">{row.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )
        ) : subscriptions.length === 0 ? (
          <Text as="p" size="sm" className="py-4 text-center text-muted-foreground">
            No subscribers yet.
          </Text>
        ) : (
          <table className="w-full min-w-[480px] text-left text-sm">
            <thead>
              <tr className="border-b border-border text-muted-foreground">
                <th className="py-2 font-medium">Customer</th>
                <th className="py-2 font-medium">Plan</th>
                <th className="py-2 font-medium">Status</th>
                <th className="py-2 font-medium">Started</th>
              </tr>
            </thead>
            <tbody>
              {subscriptions.slice(0, 5).map((row) => (
                <tr key={row.sub_code} className="border-b border-border last:border-0">
                  <td className="py-3 font-medium text-blue-600">{truncateAddress(row.customer_wallet)}</td>
                  <td className="py-3 text-muted-foreground">
                    {row.plan_name} ({intervalLabel(row.billing_interval)})
                  </td>
                  <td className="py-3">
                    <span className={`rounded-md px-2 py-0.5 text-xs font-medium ${STATUS_STYLES[row.status] ?? "bg-muted text-muted-foreground"}`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="py-3 text-muted-foreground">{formatShortDate(row.start_time)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export { RecentActivityCard }
