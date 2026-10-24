import { AppButton } from "@/components/reuseables/button"
import { Text } from "@/components/reuseables/text"
import { formatUsdc } from "@/lib/billing-format"
import { VaultActionDialog } from "@/components/layouts/dashboard/vault-action-dialog"
import type { Subscription } from "@/lib/api/types"

function VaultsPanel({
  vaultBalance,
  heldForNext,
  freeToWithdraw,
  subscriptions = [],
}: {
  vaultBalance: number
  heldForNext: number
  freeToWithdraw: number
  subscriptions?: Subscription[]
}) {
  const heldPct = vaultBalance > 0 ? Math.min((heldForNext / vaultBalance) * 100, 100) : 0

  return (
    <div className="flex flex-col rounded-2xl border border-border bg-white p-6">
      <Text as="h3" weight="semibold">
        Your vaults
      </Text>
      <Text as="p" size="sm" className="mt-1 text-muted-foreground">
        Each subscription has its own vault. It is your money until a payment is made.
      </Text>

      <Text as="p" weight="bold" className="mt-4 text-2xl">
        {formatUsdc(vaultBalance)}
      </Text>
      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-border">
        <div className="h-full rounded-full bg-blue-500" style={{ width: `${heldPct}%` }} />
      </div>

      <div className="mt-3 flex flex-col gap-1.5">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Held for next payments</span>
          <span className="font-medium text-foreground">{formatUsdc(heldForNext)}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Free to withdraw</span>
          <span className="font-medium text-foreground">{formatUsdc(freeToWithdraw)}</span>
        </div>
      </div>

      <div className="mt-6 flex gap-2">
        <VaultActionDialog
          mode="top-up"
          subscriptions={subscriptions}
          trigger={
            <AppButton className="min-w-0 flex-1 rounded-full bg-blue-500 text-white hover:bg-blue-600">
              Top up
            </AppButton>
          }
        />
        <VaultActionDialog
          mode="withdraw"
          subscriptions={subscriptions}
          trigger={
            <AppButton variant="outline" className="min-w-0 flex-1 rounded-full">
              Withdraw
            </AppButton>
          }
        />
      </div>
    </div>
  )
}

export { VaultsPanel }
