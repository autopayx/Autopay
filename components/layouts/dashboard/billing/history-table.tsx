"use client"

import { useState } from "react"
import { ChevronDown, ExternalLink } from "lucide-react"
import { Text } from "@/components/reuseables/text"
import type { BillingHistoryRow } from "@/lib/billing-history"

const FILTERS = ["All", "Successful", "Pending", "Failed", "Skipped", "Cancelled"] as const

const STATUS_STYLES: Record<string, string> = {
  SUCCESSFUL: "border-emerald-500 bg-emerald-50 text-emerald-700",
  SUCCESS: "border-emerald-500 bg-emerald-50 text-emerald-700",
  PENDING: "border-amber-500 bg-amber-50 text-amber-700",
  FAILED: "border-red-500 bg-red-50 text-red-700",
  SKIPPED: "border-border bg-muted text-muted-foreground",
  CANCELLED: "border-red-400 bg-red-50 text-red-600",
}

function BillingHistoryTable({ rows }: { rows: BillingHistoryRow[] }) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All")

  const filteredRows = filter === "All" ? rows : rows.filter((row) => row.status.toUpperCase() === filter.toUpperCase())

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

      {filteredRows.length === 0 ? (
        <Text as="p" size="sm" className="mt-6 text-center text-muted-foreground">
          No billing activity yet.
        </Text>
      ) : (
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-border text-muted-foreground">
                <th className="py-2 font-medium">Date</th>
                <th className="py-2 font-medium">Name</th>
                <th className="py-2 font-medium">Plan</th>
                <th className="py-2 font-medium">Status</th>
                <th className="py-2 font-medium">Amount</th>
                <th className="py-2 font-medium">Transaction</th>
                <th className="py-2 font-medium" />
              </tr>
            </thead>
            <tbody>
              {filteredRows.map((row) => (
                <tr key={row.id} className="border-b border-border last:border-0">
                  <td className="py-3 text-foreground">{row.date}</td>
                  <td className="py-3 font-medium text-blue-600">{row.merchant}</td>
                  <td className="py-3 text-muted-foreground">{row.plan}</td>
                  <td className="py-3">
                    <span
                      className={`rounded-md border-l-2 px-2 py-0.5 text-xs font-medium ${
                        STATUS_STYLES[row.status.toUpperCase()] ?? "border-border bg-muted text-muted-foreground"
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="py-3 font-semibold">{row.amount}</td>
                  <td className="py-3 text-muted-foreground">{row.txHash ?? "—"}</td>
                  <td className="py-3 text-right">
                    <a href="#" className="inline-flex items-center gap-1 font-medium text-blue-600 hover:underline">
                      Explorer
                      <ExternalLink className="size-3.5" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Text as="p" size="sm" className="mt-4 text-muted-foreground">
        Approving a subscription is not a payment. Only rows here moved money.
      </Text>
    </div>
  )
}

export { BillingHistoryTable }
