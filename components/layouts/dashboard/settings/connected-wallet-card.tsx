"use client"

import { useState } from "react"
import { AppButton } from "@/components/reuseables/button"
import { Text } from "@/components/reuseables/text"
import { useWallet } from "@/components/providers/wallet-provider"
import { truncateAddress } from "@/lib/stellar/wallet-kit"
import { SUPPORTED_WALLETS } from "@/lib/stellar/supported-wallets"

function ConnectedWalletCard() {
  const { walletAddress, walletId, connect, disconnect } = useWallet()
  const [switching, setSwitching] = useState(false)

  const wallet = SUPPORTED_WALLETS.find((w) => w.id === walletId)

  async function handleSwitch(id: string) {
    await connect(id)
    setSwitching(false)
  }

  if (!walletAddress) {
    return (
      <div className="flex flex-col rounded-2xl border border-border bg-white p-6">
        <Text as="h3" weight="semibold">
          Connected wallet
        </Text>
        <Text as="p" size="sm" className="mt-2 text-muted-foreground">
          No wallet connected.
        </Text>
      </div>
    )
  }

  return (
    <div className="flex flex-col rounded-2xl border border-border bg-white p-6">
      <Text as="h3" weight="semibold">
        Connected wallet
      </Text>

      <div className="mt-4 flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#0B1F3A] font-semibold text-white">
            {wallet?.initials ?? "?"}
          </span>
          <div className="min-w-0">
            <Text as="p" weight="semibold" size="sm">
              {wallet?.name ?? "Wallet"}
            </Text>
            <Text as="p" size="sm" className="truncate text-muted-foreground">
              {truncateAddress(walletAddress)}
            </Text>
          </div>
        </div>
        <span className="shrink-0 rounded-md bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">Connected</span>
      </div>

      <div className="mt-4 flex flex-col gap-3 border-t border-border pt-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Network</span>
          <span className="font-semibold text-foreground">Stellar Testnet</span>
        </div>
      </div>

      {switching && (
        <div className="mt-4 flex flex-col divide-y divide-border rounded-xl border border-border">
          {SUPPORTED_WALLETS.map((w) => (
            <button
              key={w.id}
              type="button"
              onClick={() => handleSwitch(w.id)}
              className="flex items-center gap-2 p-3 text-left text-sm font-medium hover:bg-muted/50"
            >
              <span className={`flex size-6 items-center justify-center rounded-lg text-xs font-semibold text-white ${w.iconClassName}`}>
                {w.initials}
              </span>
              {w.name}
            </button>
          ))}
        </div>
      )}

      <div className="mt-4 flex gap-2">
        <AppButton variant="outline" className="min-w-0 rounded-full" onClick={() => setSwitching((v) => !v)}>
          Switch wallet
        </AppButton>
        <AppButton variant="outline" className="min-w-0 rounded-full" onClick={() => disconnect()}>
          Disconnect
        </AppButton>
      </div>
    </div>
  )
}

export { ConnectedWalletCard }
