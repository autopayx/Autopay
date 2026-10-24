"use client"

import { useState } from "react"
import { CreditCard, Loader2 } from "lucide-react"
import { AppButton } from "@/components/reuseables/button"
import { Text } from "@/components/reuseables/text"
import { AppColors } from "@/lib/app_colors"
import { useWallet } from "@/components/providers/wallet-provider"
import { SUPPORTED_WALLETS } from "@/lib/stellar/supported-wallets"

function ConnectWalletCard() {
  const { connect } = useWallet()
  const [expanded, setExpanded] = useState(false)
  const [connectingId, setConnectingId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function handleSelect(walletId: string) {
    setError(null)
    setConnectingId(walletId)
    try {
      await connect(walletId)
    } catch {
      setError("Couldn't connect to that wallet. Make sure it's installed and try again.")
    } finally {
      setConnectingId(null)
    }
  }

  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-4 rounded-2xl border border-border bg-white p-8 text-center shadow-sm">
      <span
        style={{ background: AppColors.grayBlueGradient }}
        className="flex size-14 items-center justify-center rounded-xl text-white"
      >
        <CreditCard className="size-6" />
      </span>
      <Text as="h2" weight="semibold" className="text-xl">
        Connect your wallet
      </Text>
      <Text as="p" size="sm" className="text-muted-foreground">
        Your wallet is your account. Connect it to see your subscriptions and vaults.
      </Text>

      {error && (
        <Text as="p" size="sm" className="text-red-600">
          {error}
        </Text>
      )}

      {expanded ? (
        <div className="flex w-full flex-col divide-y divide-border rounded-xl border border-border">
          {SUPPORTED_WALLETS.map((wallet) => (
            <button
              key={wallet.id}
              type="button"
              disabled={connectingId !== null}
              onClick={() => handleSelect(wallet.id)}
              className="flex items-center justify-between gap-3 p-3 text-left hover:bg-muted/50 disabled:opacity-60"
            >
              <span className="flex items-center gap-2 text-sm font-medium text-foreground">
                <span
                  className={`flex size-7 items-center justify-center rounded-lg text-xs font-semibold text-white ${wallet.iconClassName}`}
                >
                  {wallet.initials}
                </span>
                {wallet.name}
              </span>
              {connectingId === wallet.id && <Loader2 className="size-4 animate-spin text-blue-500" />}
            </button>
          ))}
        </div>
      ) : (
        <AppButton onClick={() => setExpanded(true)} className="w-full rounded-full bg-blue-500 text-white hover:bg-blue-600">
          Connect wallet
        </AppButton>
      )}

      <Text as="p" size="sm" className="text-muted-foreground">
        We never ask for your private keys.
      </Text>
    </div>
  )
}

export { ConnectWalletCard }
