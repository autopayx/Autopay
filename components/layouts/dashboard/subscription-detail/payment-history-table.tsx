import { ExternalLink } from "lucide-react"
import { Text } from "@/components/reuseables/text"

type HistoryItem = { date: string; status: "Successful" | "Failed" | "Skipped"; amount: string }

const STATUS_STYLES: Record<string, string> = {
  Successful: "bg-emerald-100 text-emerald-700",
  Failed: "bg-red-100 text-red-700",
  Skipped: "bg-muted text-muted-foreground",
}

function PaymentHistoryTable({ history }: { history: HistoryItem[] }) {
  return (
    <div className="rounded-2xl border border-border bg-white p-6">
      <Text as="h3" weight="semibold">
        Payment history
      </Text>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[480px] text-left text-sm">
          <thead>
            <tr className="border-b border-border text-muted-foreground">
              <th className="py-2 font-medium">Date</th>
              <th className="py-2 font-medium">Status</th>
              <th className="py-2 font-medium">Amount</th>
              <th className="py-2 font-medium" />
            </tr>
          </thead>
          <tbody>
            {history.map((row, i) => (
              <tr key={i} className="border-b border-border last:border-0">
                <td className="py-3 text-foreground">{row.date}</td>
                <td className="py-3">
                  <span className={`rounded px-2 py-0.5 text-xs font-medium ${STATUS_STYLES[row.status]}`}>
                    {row.status}
                  </span>
                </td>
                <td className="py-3 font-medium">{row.amount}</td>
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
    </div>
  )
}

export { PaymentHistoryTable }
