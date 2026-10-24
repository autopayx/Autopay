"use client"

import Link from "next/link"
import { useState } from "react"
import { AlertDialog } from "@base-ui/react/alert-dialog"
import { Check, ChevronLeft, X } from "lucide-react"
import { AppButton } from "@/components/reuseables/button"
import { Text } from "@/components/reuseables/text"
import { CancelDialog } from "@/components/layouts/dashboard/subscription-detail/cancel-dialog"
import { DialogPopup } from "@/components/layouts/dashboard/subscription-detail/dialog-shell"
import { TopUpDialog } from "@/components/layouts/dashboard/subscription-detail/top-up-dialog"

type SubscriptionDetailHeaderProps = {
  name: string
  planLabel: string
  subscriptionId: string
  status: "Active" | "Paused"
  vaultBalance: string
  vaultBalanceAmount: number
  perPaymentAmount: number
  walletAddress: string
  onPause?: () => void
  onResume?: () => void
  onCancel?: () => void
  onTopUp?: (amount: number) => void
}

function SubscriptionDetailHeader({
  name,
  planLabel,
  subscriptionId,
  status: initialStatus,
  vaultBalance,
  vaultBalanceAmount,
  perPaymentAmount,
  walletAddress,
  onPause,
  onResume,
  onCancel,
  onTopUp,
}: SubscriptionDetailHeaderProps) {
  const [status, setStatus] = useState(initialStatus)
  const isPaused = status === "Paused"

  const pauseTrigger = (
    <AppButton variant="outline" nativeButton={false} className="min-w-0 flex-1 rounded-full sm:flex-none">
      Pause
    </AppButton>
  )

  const cancelTrigger = (
    <AppButton variant="outline" nativeButton={false} className="min-w-0 rounded-full">
      Cancel subscription
    </AppButton>
  )

  return (
    <div className="flex flex-col gap-4">
      {/* mobile: back nav */}
      <Link href="/dashboard" className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground sm:hidden">
        <ChevronLeft className="size-4" />
        Subscription
      </Link>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Text as="p" size="sm" className="hidden text-muted-foreground sm:block">
            <Link href="/dashboard" className="hover:text-foreground">
              Home
            </Link>{" "}
            / {name}
          </Text>
          <div className="mt-1 flex items-center gap-3">
            <Text as="h1" weight="bold" className="text-2xl">
              {name}
            </Text>
            <span
              className={`rounded-md px-2 py-0.5 text-xs font-medium ${
                !isPaused ? "bg-emerald-50 text-emerald-700" : "bg-muted text-muted-foreground"
              }`}
            >
              {status}
            </span>
          </div>
          <Text as="p" size="sm" className="mt-1 text-muted-foreground">
            {planLabel} · {subscriptionId}
          </Text>
        </div>

        {/* desktop actions */}
        <div className="hidden gap-2 sm:flex">
          {isPaused ? (
            <AppButton
              variant="outline"
              className="min-w-0 rounded-full"
              onClick={() => {
                setStatus("Active")
                onResume?.()
              }}
            >
              Resume
            </AppButton>
          ) : (
            <AlertDialog.Root>
              <AlertDialog.Trigger render={pauseTrigger} />
              <PauseDialogContent
                name={name}
                vaultBalance={vaultBalance}
                onConfirm={() => {
                  setStatus("Paused")
                  onPause?.()
                }}
              />
            </AlertDialog.Root>
          )}
          <CancelDialog
            trigger={cancelTrigger}
            name={name}
            vaultBalance={vaultBalanceAmount}
            walletAddress={walletAddress}
            onConfirm={onCancel}
          />
        </div>
      </div>

      {/* mobile actions */}
      <div className="flex flex-col gap-3 sm:hidden">
        <div className="flex gap-2">
          <TopUpDialog
            trigger={
              <AppButton className="min-w-0 flex-1 rounded-full bg-blue-500 text-white hover:bg-blue-600">
                Top up
              </AppButton>
            }
            vaultBalance={vaultBalanceAmount}
            perPaymentAmount={perPaymentAmount}
            onConfirm={onTopUp}
          />
          {isPaused ? (
            <AppButton
              variant="outline"
              className="min-w-0 flex-1 rounded-full"
              onClick={() => {
                setStatus("Active")
                onResume?.()
              }}
            >
              Resume
            </AppButton>
          ) : (
            <AlertDialog.Root>
              <AlertDialog.Trigger render={pauseTrigger} />
              <PauseDialogContent
                name={name}
                vaultBalance={vaultBalance}
                onConfirm={() => {
                  setStatus("Paused")
                  onPause?.()
                }}
              />
            </AlertDialog.Root>
          )}
        </div>
        <CancelDialog
          trigger={
            <button type="button" className="text-center text-sm font-medium text-red-600 hover:underline">
              Cancel subscription
            </button>
          }
          name={name}
          vaultBalance={vaultBalanceAmount}
          walletAddress={walletAddress}
          onConfirm={onCancel}
        />
      </div>
    </div>
  )
}

function PauseDialogContent({
  name,
  vaultBalance,
  onConfirm,
}: {
  name: string
  vaultBalance: string
  onConfirm: () => void
}) {
  const checklist = [
    "No payments are taken while paused.",
    "Payments due during the pause are skipped, not made up later.",
    `Your vault (${vaultBalance}) stays in place. You can withdraw it or resume anytime.`,
  ]

  return (
    <DialogPopup>
      <div className="flex items-start justify-between gap-4">
        <AlertDialog.Title render={<Text as="h2" weight="bold" className="text-lg" />}>
          Pause {name}?
        </AlertDialog.Title>
        <AlertDialog.Close className="hidden text-muted-foreground hover:text-foreground sm:block">
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
              className="min-w-0 w-full rounded-full bg-blue-500 text-white hover:bg-blue-600"
              onClick={onConfirm}
            />
          }
        >
          Pause subscription
        </AlertDialog.Close>
        <AlertDialog.Close
          render={<AppButton variant="outline" nativeButton={false} className="min-w-0 w-full rounded-full" />}
        >
          Keep active
        </AlertDialog.Close>
      </div>
    </DialogPopup>
  )
}

export { SubscriptionDetailHeader }


