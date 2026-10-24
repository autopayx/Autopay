"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { AppButton } from "@/components/reuseables/button"
import { Text } from "@/components/reuseables/text"
import { truncateAddress } from "@/lib/stellar/wallet-kit"
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

function BillingTable({ rows }: { rows: BillingHistoryRow[] }) {
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
              className={`shrink-0 rounded-full px-3 py-1.5 text-sm font-medium ${
                filter === item ? "bg-blue-100 text-blue-700" : "text-muted-foreground hover:bg-muted"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="hidden gap-2 sm:flex">
          <button type="button" className="flex items-center gap-1 rounded-full border border-border px-3 py-1.5 text-sm font-medium text-foreground">
            All plans
            <ChevronDown className="size-4" />
          </button>
          <button type="button" className="flex items-center gap-1 rounded-full border border-border px-3 py-1.5 text-sm font-medium text-foreground">
            Last 30 days
            <ChevronDown className="size-4" />
          </button>
        </div>
      </div>

      {filteredRows.length === 0 ? (
        <Text as="p" size="sm" className="mt-6 text-center text-muted-foreground">
          No billing activity yet.
        </Text>
      ) : (
        <>
          {/* mobile: card list */}
          <div className="mt-4 flex flex-col divide-y divide-border sm:hidden">
            {filteredRows.map((row) => (
              <div key={row.id} className="flex items-center justify-between gap-2 py-3">
                <div className="min-w-0">
                  <p className="truncate font-medium text-blue-600">{row.customerWallet ? truncateAddress(row.customerWallet) : "—"}</p>
                  <p className="text-sm text-muted-foreground">
                    {row.date} · {row.plan}
                  </p>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-1">
                  <span className="font-semibold">{row.amount}</span>
                  <span
                    className={`rounded-md border-l-2 px-2 py-0.5 text-xs font-medium ${
                      STATUS_STYLES[row.status.toUpperCase()] ?? "border-border bg-muted text-muted-foreground"
                    }`}
                  >
                    {row.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between sm:hidden">
            <p className="text-sm text-muted-foreground">Showing {filteredRows.length} of {rows.length}</p>
            <div className="flex gap-2">
              <AppButton variant="outline" className="min-w-0 rounded-full">
                Previous
              </AppButton>
              <AppButton variant="outline" className="min-w-0 rounded-full">
                Next
              </AppButton>
            </div>
          </div>

          <AppButton variant="outline" className="mt-4 w-full rounded-full sm:hidden">
            Export CSV
          </AppButton>

          {/* desktop: table */}
          <div className="mt-4 hidden overflow-x-auto sm:block">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-border text-muted-foreground">
                  <th className="py-2 font-medium">Date</th>
                  <th className="py-2 font-medium">Subscriber</th>
                  <th className="py-2 font-medium">Status</th>
                  <th className="py-2 font-medium">Amount</th>
                  <th className="py-2 font-medium">Transaction</th>
                </tr>
              </thead>
              <tbody>
                {filteredRows.map((row) => (
                  <tr key={row.id} className="border-b border-border last:border-0">
                    <td className="py-3 text-foreground">{row.date}</td>
                    <td className="py-3 font-medium text-blue-600">{row.customerWallet ? truncateAddress(row.customerWallet) : "—"}</td>
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

export { BillingTable }

