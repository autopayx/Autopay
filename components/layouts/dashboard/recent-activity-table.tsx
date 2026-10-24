import Link from "next/link"
import { Text } from "@/components/reuseables/text"
import type { BillingHistoryRow } from "@/lib/billing-history"

const STATUS_STYLES: Record<string, string> = {
  SUCCESSFUL: "bg-emerald-100 text-emerald-700",
  SUCCESS: "bg-emerald-100 text-emerald-700",
  FAILED: "bg-red-100 text-red-700",
  SKIPPED: "bg-muted text-muted-foreground",
}

function RecentActivityTable({ rows }: { rows: BillingHistoryRow[] }) {
  const recent = rows.slice(0, 5)

  return (
    <div className="rounded-2xl border border-border bg-white p-6">
      <div className="flex items-center justify-between">
        <Text as="h3" weight="semibold">
          Recent activity
        </Text>
        <Link href="/dashboard/billing" className="text-sm font-medium text-blue-600 hover:underline">
          View billing history
        </Link>
      </div>

      {recent.length === 0 ? (
        <Text as="p" size="sm" className="mt-4 text-muted-foreground">
          No billing activity yet.
        </Text>
      ) : (
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[480px] text-left text-sm">
            <thead>
              <tr className="border-b border-border text-muted-foreground">
                <th className="py-2 font-medium">Merchant</th>
                <th className="py-2 font-medium">Plan</th>
                <th className="py-2 font-medium">Status</th>
                <th className="py-2 text-right font-medium">Amount</th>
                <th className="py-2 text-right font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((row) => (
                <tr key={row.id} className="border-b border-border last:border-0">
                  <td className="py-3 font-medium text-blue-600">{row.merchant}</td>
                  <td className="py-3 text-muted-foreground">{row.plan}</td>
                  <td className="py-3">
                    <span className={`rounded px-2 py-0.5 text-xs font-medium ${STATUS_STYLES[row.status.toUpperCase()] ?? "bg-muted text-muted-foreground"}`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="py-3 text-right font-medium">{row.amount}</td>
                  <td className="py-3 text-right text-muted-foreground">{row.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Text as="p" size="sm" className="mt-4 text-center text-muted-foreground">
        You are on Stellar Testnet. Payments use test USDC.
      </Text>
    </div>
  )
}

export { RecentActivityTable }
