"use client"

import { useState, type ReactElement } from "react"
import { AlertDialog } from "@base-ui/react/alert-dialog"
import { X } from "lucide-react"
import { AppButton } from "@/components/reuseables/button"
import { Text } from "@/components/reuseables/text"
import { DialogPopup } from "@/components/layouts/merchant/plan-detail/dialog-shell"

type EditPlanDialogProps = {
  trigger: ReactElement
  currentPrice: string
  interval: string
  activeSubscribers: number
  onConfirm?: (price: string) => void
}

function EditPlanDialog({ trigger, currentPrice, interval, activeSubscribers, onConfirm }: EditPlanDialogProps) {
  const [open, setOpen] = useState(false)
  const [price, setPrice] = useState("0")

  return (
    <AlertDialog.Root open={open} onOpenChange={setOpen}>
      <AlertDialog.Trigger render={trigger} />
      <DialogPopup>
        <div className="flex items-start justify-between gap-4">
          <AlertDialog.Title render={<Text as="h2" weight="bold" className="text-lg" />}>
            Edit plan
          </AlertDialog.Title>
          <AlertDialog.Close className="text-muted-foreground hover:text-foreground">
            <X className="size-4" />
          </AlertDialog.Close>
        </div>

        <Text as="p" size="sm" weight="semibold" className="mt-4 text-muted-foreground">
          Price
        </Text>
        <div className="mt-1 flex items-center gap-2 rounded-lg border border-border px-3 py-2">
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full bg-transparent text-sm font-medium outline-none"
          />
          <span className="shrink-0 text-sm text-muted-foreground">USDC</span>
        </div>

        <div className="mt-4 rounded-lg border-l-4 border-amber-400 bg-amber-50 p-3">
          <Text as="p" size="sm" weight="semibold" className="text-amber-800">
            This will not change existing subscribers
          </Text>
          <Text as="p" size="sm" className="mt-1 text-amber-700/80">
            {activeSubscribers} current subscribers keep paying {currentPrice}. Only new subscribers see the new
            price. To move existing subscribers, ask them to re-approve.
          </Text>
        </div>

        <Text as="p" size="sm" weight="semibold" className="mt-4 text-muted-foreground">
          Billing interval
        </Text>
        <div className="mt-1 rounded-lg bg-muted px-3 py-2 text-sm text-muted-foreground">{interval}</div>
        <Text as="p" size="sm" className="mt-1 text-muted-foreground">
          Interval can&apos;t change for existing subscribers.
        </Text>

        <div className="mt-6 flex flex-col gap-2">
          <AlertDialog.Close
            render={
              <AppButton
                nativeButton={false}
                onClick={() => onConfirm?.(price)}
                className="min-w-0 w-full rounded-full bg-blue-500 text-white hover:bg-blue-600"
              />
            }
          >
            Save changes
          </AlertDialog.Close>
          <AlertDialog.Close render={<AppButton variant="outline" nativeButton={false} className="min-w-0 w-full rounded-full" />}>
            Cancel
          </AlertDialog.Close>
        </div>
      </DialogPopup>
    </AlertDialog.Root>
  )
}

export { EditPlanDialog }
