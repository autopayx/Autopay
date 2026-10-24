"use client"

import { useState, type ReactElement } from "react"
import { AlertDialog } from "@base-ui/react/alert-dialog"
import { AppButton } from "@/components/reuseables/button"
import { Text } from "@/components/reuseables/text"
import { DialogPopup } from "@/components/layouts/dashboard/subscription-detail/dialog-shell"

type TopUpDialogProps = {
  trigger: ReactElement
  vaultBalance: number
  perPaymentAmount: number
  onConfirm?: (amount: number) => void
}

const PRESETS = [1, 3, 6] as const

function TopUpDialog({ trigger, vaultBalance, perPaymentAmount, onConfirm }: TopUpDialogProps) {
  const [open, setOpen] = useState(false)
  const [selectedPreset, setSelectedPreset] = useState<number | "custom">(3)
  const [amount, setAmount] = useState(perPaymentAmount * 3)

  const vaultAfterTopUp = vaultBalance + amount
  const covers = perPaymentAmount > 0 ? Math.floor(vaultAfterTopUp / perPaymentAmount) : 0

  function selectPreset(preset: number) {
    setSelectedPreset(preset)
    setAmount(perPaymentAmount * preset)
  }

  const chipClass = (active: boolean) =>
    `rounded-lg border px-2 py-2 text-sm font-medium ${
      active ? "border-[#0B1F3A] bg-[#0B1F3A] text-white" : "border-border text-foreground hover:bg-muted"
    }`

  return (
    <AlertDialog.Root open={open} onOpenChange={setOpen}>
      <AlertDialog.Trigger render={trigger} />
      <DialogPopup>
        <AlertDialog.Title render={<Text as="h2" weight="bold" className="text-lg" />}>
          Top up vault
        </AlertDialog.Title>

        <div className="mt-4 grid grid-cols-4 gap-2">
          {PRESETS.map((preset) => (
            <button key={preset} type="button" onClick={() => selectPreset(preset)} className={chipClass(selectedPreset === preset)}>
              +{preset}
            </button>
          ))}
          <button type="button" onClick={() => setSelectedPreset("custom")} className={chipClass(selectedPreset === "custom")}>
            Custom
          </button>
        </div>

        <Text as="p" size="sm" className="mt-4 text-muted-foreground">
          Amount
        </Text>
        <div className="mt-1 flex items-center gap-2 rounded-lg border border-border px-3 py-2">
          <input
            type="number"
            value={amount}
            onChange={(e) => {
              setSelectedPreset("custom")
              setAmount(Number(e.target.value))
            }}
            className="w-full bg-transparent text-sm font-medium outline-none"
          />
          <span className="shrink-0 text-sm text-muted-foreground">USDC</span>
        </div>

        <div className="mt-4 flex flex-col gap-2 border-t border-border pt-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Vault after top-up</span>
            <span className="font-semibold text-foreground">{vaultAfterTopUp.toFixed(2)} USDC</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Covers</span>
            <span className="font-semibold text-foreground">{covers} payments</span>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-2">
          <AlertDialog.Close
            render={
              <AppButton
                nativeButton={false}
                onClick={() => onConfirm?.(amount)}
                className="min-w-0 w-full rounded-full bg-blue-500 text-white hover:bg-blue-600"
              />
            }
          >
            Top up {amount.toFixed(2)} USDC
          </AlertDialog.Close>
          <AlertDialog.Close render={<AppButton variant="outline" nativeButton={false} className="min-w-0 w-full rounded-full" />}>
            Cancel
          </AlertDialog.Close>
        </div>
      </DialogPopup>
    </AlertDialog.Root>
  )
}

export { TopUpDialog }
