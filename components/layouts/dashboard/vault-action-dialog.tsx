"use client"

import { useState, type ReactElement } from "react"
import { AlertDialog } from "@base-ui/react/alert-dialog"
import { AppButton } from "@/components/reuseables/button"
import { Text } from "@/components/reuseables/text"
import { DialogPopup } from "@/components/layouts/dashboard/subscription-detail/dialog-shell"
import { useTopUpSubscription, useWithdrawSubscription } from "@/lib/api/hooks/use-subscriptions"
import { formatUsdc } from "@/lib/billing-format"
import type { Subscription } from "@/lib/api/types"

type VaultActionDialogProps = {
  trigger: ReactElement
  mode: "top-up" | "withdraw"
  subscriptions: Subscription[]
}

// account-wide top up/withdraw has no dedicated endpoint, so this picks a subscription first
function VaultActionDialog({ trigger, mode, subscriptions }: VaultActionDialogProps) {
  const [open, setOpen] = useState(false)
  const [subCode, setSubCode] = useState<string | null>(null)
  const [amount, setAmount] = useState(0)

  const selected = subscriptions.find((sub) => sub.sub_code === subCode) ?? null

  const topUp = useTopUpSubscription(subCode ?? "")
  const withdraw = useWithdrawSubscription(subCode ?? "")
  const mutation = mode === "top-up" ? topUp : withdraw

  function handleSelect(sub: Subscription) {
    setSubCode(sub.sub_code)
    setAmount(Number(mode === "top-up" ? sub.amount_usdc : sub.free_to_withdraw))
  }

  function handleOpenChange(next: boolean) {
    setOpen(next)
    if (!next) setSubCode(null)
  }

  async function handleConfirm() {
    if (!selected) return
    await mutation.mutateAsync({ amount_usdc: amount.toFixed(7) })
    handleOpenChange(false)
  }

  return (
    <AlertDialog.Root open={open} onOpenChange={handleOpenChange}>
      <AlertDialog.Trigger render={trigger} />
      <DialogPopup>
        <AlertDialog.Title render={<Text as="h2" weight="bold" className="text-lg" />}>
          {mode === "top-up" ? "Top up a vault" : "Withdraw from a vault"}
        </AlertDialog.Title>

        {!selected ? (
          <div className="mt-4 flex flex-col divide-y divide-border">
            {subscriptions.length === 0 ? (
              <Text as="p" size="sm" className="py-6 text-center text-muted-foreground">
                You have no subscriptions yet.
              </Text>
            ) : (
              subscriptions.map((sub) => (
                <button
                  key={sub.sub_code}
                  type="button"
                  onClick={() => handleSelect(sub)}
                  className="flex items-center justify-between gap-3 py-3 text-left hover:bg-muted/50"
                >
                  <div>
                    <Text as="p" weight="semibold" size="sm">
                      {sub.merchant_name}
                    </Text>
                    <Text as="p" size="sm" className="text-muted-foreground">
                      {sub.plan_name}
                    </Text>
                  </div>
                  <Text as="p" size="sm" weight="semibold">
                    {formatUsdc(mode === "top-up" ? sub.vault_balance : sub.free_to_withdraw)}
                  </Text>
                </button>
              ))
            )}
          </div>
        ) : (
          <>
            <Text as="p" size="sm" className="mt-1 text-muted-foreground">
              {selected.merchant_name} · {selected.plan_name}
            </Text>

            <Text as="p" size="sm" weight="semibold" className="mt-4 text-muted-foreground">
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

            <div className="mt-6 flex flex-col gap-2">
              <AppButton
                onClick={handleConfirm}
                disabled={mutation.isPending}
                className="min-w-0 w-full rounded-full bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-60"
              >
                {mutation.isPending
                  ? "Submitting..."
                  : mode === "top-up"
                    ? `Top up ${amount.toFixed(2)} USDC`
                    : `Withdraw ${amount.toFixed(2)} USDC`}
              </AppButton>
              <AppButton variant="outline" onClick={() => setSubCode(null)} className="min-w-0 w-full rounded-full">
                Choose a different subscription
              </AppButton>
            </div>
          </>
        )}
      </DialogPopup>
    </AlertDialog.Root>
  )
}

export { VaultActionDialog }
