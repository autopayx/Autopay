import Link from "next/link"
import { Text } from "@/components/reuseables/text"
import type { SubscriberRow } from "@/components/layouts/merchant/plan-detail/data"

const STATUS_STYLES: Record<string, string> = {
  ACTIVE: "border-emerald-500 bg-emerald-50 text-emerald-700",
  PAUSED: "border-border bg-muted text-muted-foreground",
  CANCELLED: "border-red-400 bg-red-50 text-red-600",
  EXPIRED: "border-border bg-muted text-muted-foreground",
}

function RecentSubscribersTable({ subscribers }: { subscribers: SubscriberRow[] }) {
  return (
    <div className="rounded-2xl border border-border bg-white p-6">
      <div className="flex items-center justify-between">
        <Text as="h3" weight="semibold">
          Recent subscribers
        </Text>
        <Link href="#" className="text-sm font-medium text-blue-600 hover:underline">
          View all subscribers
        </Link>
      </div>

      <div className="mt-4 overflow-x-auto">
        {subscribers.length === 0 ? (
          <Text as="p" size="sm" className="py-6 text-center text-muted-foreground">
            No subscribers yet.
          </Text>
        ) : (
          <table className="w-full min-w-[520px] text-left text-sm">
            <thead>
              <tr className="border-b border-border text-muted-foreground">
                <th className="py-2 font-medium">Subscriber</th>
                <th className="py-2 font-medium">Vault</th>
                <th className="py-2 font-medium">Status</th>
                <th className="py-2 font-medium">Amount</th>
                <th className="py-2 font-medium">Next payment</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map((row, i) => (
                <tr key={i} className="border-b border-border last:border-0">
                  <td className="py-3">
                    <span className="flex min-w-0 items-center gap-2 font-medium text-blue-600">
                      <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-blue-500 text-[9px] font-semibold text-white">
                        {row.address.slice(0, 2)}
                      </span>
                      <span className="truncate">{row.address}</span>
                    </span>
                  </td>
                  <td className="py-3 text-muted-foreground">{row.vault}</td>
                  <td className="py-3">
                    <span className={`rounded-md border-l-2 px-2 py-0.5 text-xs font-medium ${STATUS_STYLES[row.status] ?? "border-border bg-muted text-muted-foreground"}`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="py-3 font-semibold">{row.amount}</td>
                  <td className="py-3 text-muted-foreground">{row.nextPayment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export { RecentSubscribersTable }
