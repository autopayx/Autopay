import Link from "next/link"
import { AppButton } from "@/components/reuseables/button"
import { Text } from "@/components/reuseables/text"
import { AppColors } from "@/lib/app_colors"
import { truncateAddress } from "@/lib/stellar/wallet-kit"
import { VaultActionDialog } from "@/components/layouts/dashboard/vault-action-dialog"
import type { Subscription } from "@/lib/api/types"

function SubscriptionsHeader({
  walletAddress,
  vaultBalance = "0.00 USDC",
  subscriptions = [],
}: {
  walletAddress: string
  vaultBalance?: string
  subscriptions?: Subscription[]
}) {
  const initials = walletAddress.slice(1, 3).toUpperCase()

  return (
    <div style={{ background: AppColors.blackBlueGradient }} className="rounded-2xl p-6">
      {/* mobile: condensed vault summary */}
      <div className="flex flex-col gap-4 sm:hidden">
        <div>
          <Text as="p" size="sm" weight="semibold" className="text-blue-300 uppercase tracking-wide">
            Customer
          </Text>
          <Text as="p" size="sm" className="mt-1 text-white/60">
            Held in your vaults
          </Text>
          <Text as="h2" weight="bold" className="text-2xl text-white">
            {vaultBalance}
          </Text>
        </div>
        <div className="flex gap-2">
          <VaultActionDialog
            mode="top-up"
            subscriptions={subscriptions}
            trigger={
              <AppButton className="min-w-0 flex-1 rounded-full bg-white text-[#0B1F3A] hover:bg-white/90">
                Top up
              </AppButton>
            }
          />
          <VaultActionDialog
            mode="withdraw"
            subscriptions={subscriptions}
            trigger={
              <AppButton
                variant="outline"
                className="min-w-0 flex-1 rounded-full border-white/30 bg-transparent text-white hover:bg-white/10"
              >
                Withdraw
              </AppButton>
            }
          />
        </div>
      </div>

      {/* desktop: full identity + actions */}
      <div className="hidden sm:flex sm:items-center sm:justify-between sm:gap-4">
        <div className="flex items-center gap-3">
          <span className="flex size-12 items-center justify-center rounded-lg bg-blue-500 font-semibold text-white">
            {initials}
          </span>
          <div>
            <Text as="p" size="sm" weight="semibold" className="text-blue-300 uppercase tracking-wide">
              Customer
            </Text>
            <Text as="h2" weight="bold" className="text-xl text-white">
              Your subscriptions
            </Text>
            <Text as="p" size="sm" className="text-white/60">
              Wallet {truncateAddress(walletAddress)} · Stellar Testnet
            </Text>
          </div>
        </div>

        <div className="flex gap-2">
          <AppButton
            variant="outline"
            nativeButton={false}
            render={<Link href="/dashboard/settings" />}
            className="min-w-0 rounded-full border-white/30 bg-transparent text-white hover:bg-white/10"
          >
            Wallet settings
          </AppButton>
          <VaultActionDialog
            mode="withdraw"
            subscriptions={subscriptions}
            trigger={
              <AppButton className="min-w-0 rounded-full bg-white text-[#0B1F3A] hover:bg-white/90">
                Withdraw funds
              </AppButton>
            }
          />
        </div>
      </div>
    </div>
  )
}

export { SubscriptionsHeader }

