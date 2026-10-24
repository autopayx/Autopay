import { RefreshCw } from "lucide-react"
import { Text } from "@/components/reuseables/text"

function CheckoutTopbar({ walletAddress }: { walletAddress: string | null }) {
  return (
    <header className="flex items-center justify-between border-b border-border bg-white px-6 py-4">
      <div className="flex items-center gap-2">
        <span className="flex size-7 items-center justify-center rounded-lg bg-[#0B1F3A] text-white">
          <RefreshCw className="size-3.5" />
        </span>
        <Text as="span" weight="bold">
          AutoPayX
        </Text>
      </div>

      <div className="flex items-center gap-3">
        <span className="flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
          <span className="size-1.5 rounded-full bg-emerald-500" />
          Stellar Testnet
        </span>
        {walletAddress ? (
          <span className="flex items-center gap-1.5 rounded-full bg-blue-500 px-2.5 py-1 text-xs font-medium text-white">
            <span className="size-2 rounded-full bg-white" />
            {walletAddress}
          </span>
        ) : (
          <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
            Not connected
          </span>
        )}
      </div>
    </header>
  )
}

export { CheckoutTopbar }
