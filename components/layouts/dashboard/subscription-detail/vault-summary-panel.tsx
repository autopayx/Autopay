import { AppButton } from "@/components/reuseables/button"
import { Text } from "@/components/reuseables/text"
import { TopUpDialog } from "@/components/layouts/dashboard/subscription-detail/top-up-dialog"
import { WithdrawDialog } from "@/components/layouts/dashboard/subscription-detail/withdraw-dialog"

type VaultSummaryPanelProps = {
  merchantName: string
  balance: string
  coversPayments: number
  usedPct: number
  held: string
  free: string
  perPaymentAmount: number
  nextPaymentDate: string
  walletAddress: string
  onTopUp?: (amount: number) => void
  onWithdraw?: (amount: number) => void
}

function VaultSummaryPanel({
  merchantName,
  balance,
  coversPayments,
  usedPct,
  held,
  free,
  perPaymentAmount,
  nextPaymentDate,
  walletAddress,
  onTopUp,
  onWithdraw,
}: VaultSummaryPanelProps) {
  const balanceAmount = parseFloat(balance)
  const freeAmount = parseFloat(free)

  return (
    <div className="flex flex-col rounded-2xl border border-border bg-white p-6">
      <Text as="h3" weight="semibold">
        Vault
      </Text>

      <Text as="p" weight="bold" className="mt-4 text-2xl">
        {balance}
      </Text>
      <Text as="p" size="sm" className="text-muted-foreground">
        Covers {coversPayments} payments
      </Text>

      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-border">
        <div className="h-full rounded-full bg-blue-500" style={{ width: `${usedPct}%` }} />
      </div>

      <div className="mt-3 flex flex-col gap-1.5">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Held for next payments</span>
          <span className="font-medium text-foreground">{held}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Free to withdraw</span>
          <span className="font-medium text-foreground">{free}</span>
        </div>
      </div>

      <div className="mt-6 flex gap-2">
        <WithdrawDialog
          trigger={
            <AppButton variant="outline" nativeButton={false} className="min-w-0 flex-1 rounded-full">
              Withdraw
            </AppButton>
          }
          merchantName={merchantName}
          vaultBalance={balanceAmount}
          freeToWithdraw={freeAmount}
          nextPaymentDate={nextPaymentDate}
          nextPaymentAmount={perPaymentAmount}
          walletAddress={walletAddress}
          onConfirm={onWithdraw}
        />
        <TopUpDialog
          trigger={
            <AppButton nativeButton={false} className="min-w-0 flex-1 rounded-full bg-blue-500 text-white hover:bg-blue-600">
              Top up
            </AppButton>
          }
          vaultBalance={balanceAmount}
          perPaymentAmount={perPaymentAmount}
          onConfirm={onTopUp}
        />
      </div>

      <Text as="p" size="sm" className="mt-3 text-muted-foreground">
        This is your money. It only leaves the vault when a payment is due.
      </Text>
    </div>
  )
}

export { VaultSummaryPanel }
