"use client"

import { useState } from "react"
import { Loader2 } from "lucide-react"
import { Text } from "@/components/reuseables/text"
import { SUPPORTED_WALLETS } from "@/lib/stellar/supported-wallets"

function ConnectStep({ onConnect }: { onConnect: (walletId: string) => Promise<void> }) {
  const [connectingId, setConnectingId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function handleSelect(walletId: string) {
    setError(null)
    setConnectingId(walletId)
    try {
      await onConnect(walletId)
    } catch {
      setError("Couldn't connect to that wallet. Make sure it's installed and try again.")
    } finally {
      setConnectingId(null)
    }
  }

  return (
    <div>
      <Text as="p" size="sm" weight="semibold" className="text-blue-600">
        Step 1 of 3
      </Text>
      <Text as="h2" weight="bold" className="mt-1 text-2xl">
        Connect your wallet
      </Text>
      <Text as="p" size="sm" className="mt-2 text-muted-foreground">
        Your wallet is your account. Payments from your customers go to the wallet you connect. We never ask for
        your private keys.
      </Text>

      {error && (
        <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3">
          <Text as="p" size="sm" className="text-red-600">
            {error}
          </Text>
        </div>
      )}

      <div className="mt-6 flex flex-col divide-y divide-border rounded-2xl border border-border">
        {SUPPORTED_WALLETS.map((wallet) => (
          <button
            key={wallet.id}
            type="button"
            disabled={connectingId !== null}
            onClick={() => handleSelect(wallet.id)}
            className="flex items-center justify-between gap-3 p-4 text-left hover:bg-muted/50 disabled:opacity-60"
          >
            <div className="flex items-center gap-3">
              <span className={`flex size-8 items-center justify-center rounded-lg text-sm font-semibold text-white ${wallet.iconClassName}`}>
                {wallet.initials}
              </span>
              <span className="flex items-center gap-2 text-sm font-medium text-foreground">
                {wallet.name}
                {wallet.recommended && <span className="text-xs font-medium text-blue-600">Recommended</span>}
              </span>
            </div>
            {connectingId === wallet.id ? (
              <Loader2 className="size-4 animate-spin text-blue-500" />
            ) : (
              <span className="text-xs text-muted-foreground">{wallet.badge}</span>
            )}
          </button>
        ))}
      </div>

      <Text as="p" size="sm" className="mt-4 text-muted-foreground">
        New to Stellar wallets?{" "}
        <a href="#" className="font-medium text-blue-600 hover:underline">
          What is a wallet?
        </a>
      </Text>
    </div>
  )
}

export { ConnectStep }
