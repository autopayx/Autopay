"use client"

import { Check, Copy } from "lucide-react"
import { Text } from "@/components/reuseables/text"
import { useCopyToClipboard } from "@/lib/use-copy-to-clipboard"

function DeveloperCard({ merchantId, walletAddress }: { merchantId: string; walletAddress: string }) {
  const { copied, copy } = useCopyToClipboard()

  return (
    <div className="rounded-2xl border border-border bg-white p-6">
      <Text as="h3" weight="semibold">
        Developer
      </Text>

      <div className="mt-2 flex flex-col divide-y divide-border">
        <div className="flex items-center justify-between gap-3 py-2.5 text-sm">
          <span className="shrink-0 text-muted-foreground">Merchant ID</span>
          <span className="flex min-w-0 items-center gap-1.5 font-semibold text-foreground">
            <span className="truncate">{merchantId}</span>
            <button
              type="button"
              onClick={() => copy(merchantId)}
              aria-label="Copy merchant ID"
              className="shrink-0 text-muted-foreground hover:text-foreground"
            >
              {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
            </button>
          </span>
        </div>
        <div className="flex items-center justify-between py-2.5 text-sm">
          <span className="text-muted-foreground">Network</span>
          <span className="font-semibold text-foreground">Stellar Testnet</span>
        </div>
        <div className="flex items-center justify-between gap-3 py-2.5 text-sm">
          <span className="shrink-0 text-muted-foreground">Connected wallet</span>
          <span className="min-w-0 truncate font-semibold text-foreground">{walletAddress}</span>
        </div>
      </div>
    </div>
  )
}

export { DeveloperCard }
