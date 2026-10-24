"use client"

import { useState, type ReactElement } from "react"
import { AlertDialog } from "@base-ui/react/alert-dialog"
import { Wallet } from "lucide-react"
import { AppButton } from "@/components/reuseables/button"
import { Text } from "@/components/reuseables/text"
import { DialogPopup } from "@/components/layouts/dashboard/subscription-detail/dialog-shell"

type WithdrawDialogProps = {
  trigger: ReactElement
  merchantName: string
  vaultBalance: number
  freeToWithdraw: number
  nextPaymentDate: string
  nextPaymentAmount: number
  walletAddress: string
  onConfirm?: (amount: number) => void
}

function WithdrawDialog({
  trigger,
  merchantName,
  vaultBalance,
  freeToWithdraw,
  nextPaymentDate,
  nextPaymentAmount,
  walletAddress,
  onConfirm,
}: WithdrawDialogProps) {
  const [open, setOpen] = useState(false)
  const [amount, setAmount] = useState(freeToWithdraw)

  const remaining = Math.max(vaultBalance - amount, 0)
  const wouldSkipPayment = amount > freeToWithdraw

  return (
    <AlertDialog.Root open={open} onOpenChange={setOpen}>
      <AlertDialog.Trigger render={trigger} />
      <DialogPopup>
        <div className="flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-lg bg-muted text-muted-foreground">
            <Wallet className="size-4" />
          </span>
          <div>
            <AlertDialog.Title render={<Text as="h2" weight="bold" className="text-base" />}>
              Withdraw from vault
            </AlertDialog.Title>
            <Text as="p" size="sm" className="text-muted-foreground">
              {merchantName}
            </Text>
          </div>
        </div>

        <Text as="p" size="sm" className="mt-4 text-muted-foreground">
          Amount
        </Text>
        <div className="mt-1 flex items-center gap-2 rounded-lg border border-border px-3 py-2">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full bg-transparent text-sm font-medium outline-none"
          />
          <span className="shrink-0 text-sm text-muted-foreground">USDC</span>
        </div>
        <Text as="p" size="sm" className="mt-1 text-muted-foreground">
          Free to withdraw: {freeToWithdraw.toFixed(2)} USDC · Vault: {vaultBalance.toFixed(2)} USDC
        </Text>

        {wouldSkipPayment ? (
          <div className="mt-4 rounded-lg border-l-4 border-amber-400 bg-amber-50 p-3">
            <Text as="p" size="sm" weight="semibold" className="text-amber-800">
              Your {nextPaymentDate} payment would be skipped
            </Text>
            <Text as="p" size="sm" className="mt-1 text-amber-700/80">
              Withdrawing {amount.toFixed(2)} USDC leaves {remaining.toFixed(2)} USDC. The payment needs{" "}
              {nextPaymentAmount.toFixed(2)} USDC. Keep at least {nextPaymentAmount.toFixed(2)} USDC.
            </Text>
          </div>
        ) : (
          <div className="mt-4 rounded-lg bg-blue-50 p-3">
            <Text as="p" size="sm" className="text-foreground">
              {remaining.toFixed(2)} USDC stays in the vault for your {nextPaymentDate} payment.
            </Text>
          </div>
        )}

        <div className="mt-4 flex flex-col gap-2 border-t border-border pt-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Sent to</span>
            <span className="font-semibold text-foreground">{walletAddress} (your wallet)</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Network fee (est.)</span>
            <span className="font-semibold text-foreground">~0.00001 XLM</span>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-2">
          <AlertDialog.Close
            render={
              <AppButton
                nativeButton={false}
                onClick={() => onConfirm?.(amount)}
                className={`min-w-0 w-full rounded-full text-white ${
                  wouldSkipPayment ? "bg-red-600 hover:bg-red-700" : "bg-blue-500 hover:bg-blue-600"
                }`}
              />
            }
          >
            {wouldSkipPayment ? "Withdraw anyway" : `Withdraw ${amount.toFixed(2)} USDC`}
          </AlertDialog.Close>
          <AlertDialog.Close render={<AppButton variant="outline" nativeButton={false} className="min-w-0 w-full rounded-full" />}>
            Cancel
          </AlertDialog.Close>
        </div>
      </DialogPopup>
    </AlertDialog.Root>
  )
}

export { WithdrawDialog }
