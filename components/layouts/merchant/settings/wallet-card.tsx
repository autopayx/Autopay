"use client"

import { useState } from "react"
import { AppButton } from "@/components/reuseables/button"
import { Text } from "@/components/reuseables/text"
import { useWallet } from "@/components/providers/wallet-provider"
import { SUPPORTED_WALLETS } from "@/lib/stellar/supported-wallets"

function WalletCard() {
  const { disconnect, connect } = useWallet()
  const [switching, setSwitching] = useState(false)

  async function handleSwitch(id: string) {
    await connect(id)
    setSwitching(false)
  }

  return (
    <div className="rounded-2xl border border-border bg-white p-6">
      <Text as="h3" weight="semibold">
        Wallet
      </Text>

      {switching && (
        <div className="mt-4 flex flex-col divide-y divide-border rounded-xl border border-border">
          {SUPPORTED_WALLETS.map((wallet) => (
            <button
              key={wallet.id}
              type="button"
              onClick={() => handleSwitch(wallet.id)}
              className="flex items-center gap-2 p-3 text-left text-sm font-medium hover:bg-muted/50"
            >
              <span className={`flex size-6 items-center justify-center rounded-lg text-xs font-semibold text-white ${wallet.iconClassName}`}>
                {wallet.initials}
              </span>
              {wallet.name}
            </button>
          ))}
        </div>
      )}

      <div className="mt-4 flex gap-2">
        <AppButton variant="outline" className="min-w-0 flex-1 rounded-full" onClick={() => setSwitching((v) => !v)}>
          Switch wallet
        </AppButton>
        <AppButton variant="outline" className="min-w-0 flex-1 rounded-full" onClick={() => disconnect()}>
          Disconnect
        </AppButton>
      </div>
    </div>
  )
}

export { WalletCard }
