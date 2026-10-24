import { ExternalLink } from "lucide-react"
import { Text } from "@/components/reuseables/text"

type AuthorizationPanelProps = {
  merchantName: string
  authorization: { amount: string; interval: string; cap: string; until: string }
  merchantWallet: string
  started: string
  subscriptionId: string
  contract: string
}

function AuthorizationPanel({
  merchantName,
  authorization,
  merchantWallet,
  started,
  subscriptionId,
  contract,
}: AuthorizationPanelProps) {
  const rows = [
    { label: "Merchant wallet", value: merchantWallet },
    { label: "Started", value: started },
    { label: "Subscription ID", value: subscriptionId },
  ]

  return (
    <div className="flex flex-col rounded-2xl border border-border bg-white p-6">
      <Text as="h3" weight="semibold">
        What you authorized
      </Text>

      <div className="mt-4 rounded-xl bg-blue-50 p-4">
        <Text as="p" size="sm" className="text-foreground">
          <span className="font-semibold">{merchantName}</span> can take{" "}
          <span className="font-semibold">{authorization.amount}</span> every{" "}
          <span className="font-semibold">{authorization.interval}</span>, up to{" "}
          <span className="font-semibold">{authorization.cap}</span> in total, until{" "}
          <span className="font-semibold">{authorization.until}</span>.
        </Text>
      </div>

      <div className="mt-2 flex flex-col divide-y divide-border">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between gap-3 py-3">
            <Text as="p" size="sm" className="shrink-0 text-muted-foreground">
              {row.label}
            </Text>
            <Text as="p" weight="semibold" size="sm" className="min-w-0 truncate">
              {row.value}
            </Text>
          </div>
        ))}
        <div className="flex items-center justify-between py-3">
          <Text as="p" size="sm" className="text-muted-foreground">
            Contract
          </Text>
          <a href="#" className="flex items-center gap-1 text-sm font-semibold text-blue-600 hover:underline">
            {contract}
            <ExternalLink className="size-3.5" />
          </a>
        </div>
      </div>
    </div>
  )
}

export { AuthorizationPanel }

