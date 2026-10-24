"use client"

import { useState, type ReactElement } from "react"
import { AlertDialog } from "@base-ui/react/alert-dialog"
import { Check, X } from "lucide-react"
import { AppButton } from "@/components/reuseables/button"
import { Text } from "@/components/reuseables/text"
import { DialogPopup } from "@/components/layouts/merchant/plan-detail/dialog-shell"

function ClosePlanDialog({
  trigger,
  activeSubscribers,
  onConfirm,
}: {
  trigger: ReactElement
  activeSubscribers: number
  onConfirm?: () => void
}) {
  const [open, setOpen] = useState(false)

  const checklist = [
    "Nobody new can subscribe from the checkout link.",
    `The ${activeSubscribers} current subscribers keep paying on schedule.`,
    "You can reopen the plan anytime.",
  ]

  return (
    <AlertDialog.Root open={open} onOpenChange={setOpen}>
      <AlertDialog.Trigger render={trigger} />
      <DialogPopup>
        <div className="flex items-start justify-between gap-4">
          <AlertDialog.Title render={<Text as="h2" weight="bold" className="text-lg" />}>
            Close this plan to new subscribers?
          </AlertDialog.Title>
          <AlertDialog.Close className="text-muted-foreground hover:text-foreground">
            <X className="size-4" />
          </AlertDialog.Close>
        </div>

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
                onClick={onConfirm}
                className="min-w-0 w-full rounded-full bg-blue-500 text-white hover:bg-blue-600"
              />
            }
          >
            Close to new subscribers
          </AlertDialog.Close>
          <AlertDialog.Close render={<AppButton variant="outline" nativeButton={false} className="min-w-0 w-full rounded-full" />}>
            Keep open
          </AlertDialog.Close>
        </div>
      </DialogPopup>
    </AlertDialog.Root>
  )
}

export { ClosePlanDialog }
