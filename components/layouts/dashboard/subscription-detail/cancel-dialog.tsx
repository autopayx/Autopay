"use client"

import { useState, type ReactElement } from "react"
import { AlertDialog } from "@base-ui/react/alert-dialog"
import { Check } from "lucide-react"
import { AppButton } from "@/components/reuseables/button"
import { Text } from "@/components/reuseables/text"
import { DialogPopup } from "@/components/layouts/dashboard/subscription-detail/dialog-shell"

type CancelDialogProps = {
  trigger: ReactElement
  name: string
  vaultBalance: number
  walletAddress: string
  onConfirm?: () => void
}

function CancelDialog({ trigger, name, vaultBalance, walletAddress, onConfirm }: CancelDialogProps) {
  const [open, setOpen] = useState(false)

  const checklist = [
    "No more payments will be taken after today.",
    `${vaultBalance.toFixed(2)} USDC in your vault returns to your wallet, ${walletAddress}.`,
    "Payments already made stay in your history.",
    "To start again, you'd subscribe again from the merchant's checkout.",
  ]

  return (
    <AlertDialog.Root open={open} onOpenChange={setOpen}>
      <AlertDialog.Trigger render={trigger} />
      <DialogPopup>
        <AlertDialog.Title render={<Text as="h2" weight="bold" className="text-lg" />}>
          Cancel {name}?
        </AlertDialog.Title>
        <AlertDialog.Description render={<Text as="p" size="sm" className="mt-1 text-muted-foreground" />}>
          This stops your subscription for good.
        </AlertDialog.Description>

        <ul className="mt-4 flex flex-col gap-3">
          {checklist.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-foreground">
              <Check className="mt-0.5 size-4 shrink-0 text-blue-600" />
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-col gap-2">
          <AlertDialog.Close
            render={
              <AppButton
                nativeButton={false}
                onClick={() => onConfirm?.()}
                className="min-w-0 w-full rounded-full bg-red-600 text-white hover:bg-red-700"
              />
            }
          >
            Cancel subscription
          </AlertDialog.Close>
          <AlertDialog.Close render={<AppButton variant="outline" nativeButton={false} className="min-w-0 w-full rounded-full" />}>
            Keep subscription
          </AlertDialog.Close>
        </div>
      </DialogPopup>
    </AlertDialog.Root>
  )
}

export { CancelDialog }
