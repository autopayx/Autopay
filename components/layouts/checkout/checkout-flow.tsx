"use client"

import { useEffect, useState } from "react"
import { AlertDialog } from "@base-ui/react/alert-dialog"
import { CheckoutTopbar } from "@/components/layouts/checkout/topbar"
import { CheckoutPlanSummary } from "@/components/layouts/checkout/plan-summary"
import { CheckoutWizard } from "@/components/layouts/checkout/wizard"
import { CheckoutSuccessCard } from "@/components/layouts/checkout/success-card"
import { CheckoutDialogs } from "@/components/layouts/checkout/dialogs"
import { DialogPopup } from "@/components/layouts/checkout/dialog-shell"
import { toCheckoutPlanView } from "@/components/layouts/checkout/plan-view"
import { Text } from "@/components/reuseables/text"
import { useWallet } from "@/components/providers/wallet-provider"
import { usePlan } from "@/lib/api/hooks/use-plans"
import { useCreateSubscription } from "@/lib/api/hooks/use-subscriptions"
import { useCheckoutPreflight } from "@/lib/api/hooks/use-checkout"
import { truncateAddress } from "@/lib/stellar/wallet-kit"
import type { DialogState } from "@/components/layouts/checkout/types"

// the preflight response has no documented shape; read a balance defensively if present
function readWalletBalance(data: unknown): number {
  if (!data || typeof data !== "object") return 0
  const record = data as Record<string, unknown>
  const candidate = record.usdc_balance ?? record.balance ?? record.wallet_balance
  const value = Number(candidate)
  return Number.isFinite(value) ? value : 0
}

function CheckoutFlow({ planCode }: { planCode: string }) {
  const { walletAddress, connect } = useWallet()
  const planQuery = usePlan(planCode)
  const preflight = useCheckoutPreflight(planCode)
  const createSubscription = useCreateSubscription()

  const [paymentsToFund, setPaymentsToFund] = useState(3)
  const [dialog, setDialog] = useState<DialogState>(null)
  const [subCode, setSubCode] = useState<string | null>(null)
  const [explorerUrl, setExplorerUrl] = useState<string | undefined>(undefined)

  const connected = Boolean(walletAddress)
  const plan = planQuery.data ? toCheckoutPlanView(planQuery.data) : null
  const depositNow = (plan?.amount ?? 0) * paymentsToFund
  const walletBalance = readWalletBalance(preflight.data)

  // best-effort wallet balance check once connected; failure here doesn't block checkout
  useEffect(() => {
    if (!walletAddress) return
    preflight.mutate({ customer_wallet: walletAddress })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [walletAddress])

  // real wallet connect, replacing the dialog's "connecting" placeholder
  useEffect(() => {
    if (dialog?.type !== "connecting") return

    let cancelled = false
    connect(dialog.walletId)
      .then(() => {
        if (cancelled) return
        setDialog({ type: "checking", walletId: dialog.walletId, walletName: dialog.walletName })
      })
      .catch(() => {
        if (cancelled) return
        setDialog({ type: "declined", walletId: dialog.walletId, walletName: dialog.walletName })
      })

    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dialog])

  // real subscription creation, replacing the dialog's "signing" placeholder
  useEffect(() => {
    if (dialog?.type !== "signing" || !walletAddress || !plan) return

    let cancelled = false
    createSubscription
      .mutateAsync({
        plan_code: plan.planCode,
        customer_wallet: walletAddress,
        initial_deposit: depositNow.toFixed(7),
      })
      .then((subscription) => {
        if (cancelled) return
        setSubCode(subscription.sub_code)
        setExplorerUrl(subscription.explorer_url || undefined)
        setDialog({ type: "confirming" })
      })
      .catch(() => {
        if (cancelled) return
        setDialog({ type: "error", message: "We couldn't create your subscription. Please try again." })
      })

    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dialog])

  if (planQuery.isLoading) {
    return (
      <div className="flex min-h-screen flex-1 items-center justify-center">
        <Text as="p" className="text-muted-foreground">
          Loading plan...
        </Text>
      </div>
    )
  }

  if (planQuery.isError || !plan) {
    return (
      <div className="flex min-h-screen flex-1 items-center justify-center">
        <Text as="p" className="text-muted-foreground">
          This plan is unavailable.
        </Text>
      </div>
    )
  }

  if (subCode) {
    return (
      <div className="flex min-h-screen flex-col">
        <CheckoutTopbar walletAddress={walletAddress ? truncateAddress(walletAddress) : null} />
        <CheckoutSuccessCard plan={plan} subCode={subCode} explorerUrl={explorerUrl} paymentsToFund={paymentsToFund} />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <CheckoutTopbar walletAddress={connected && walletAddress ? truncateAddress(walletAddress) : null} />

      <div className="grid flex-1 grid-cols-1 lg:grid-cols-2">
        <CheckoutPlanSummary plan={plan} fundedPayments={connected ? paymentsToFund : 1} />

        <div className="bg-muted/30 p-6 lg:p-8">
          <CheckoutWizard
            plan={plan}
            connected={connected}
            walletAddress={walletAddress ? truncateAddress(walletAddress) : null}
            walletBalance={walletBalance}
            paymentsToFund={paymentsToFund}
            onSelectPaymentsToFund={setPaymentsToFund}
            onConnectWallet={() => setDialog({ type: "wallet-picker" })}
            onChangeWallet={() => setDialog({ type: "wallet-picker" })}
            onSubscribe={() => setDialog({ type: "confirm" })}
          />
        </div>
      </div>

      <AlertDialog.Root open={dialog !== null} onOpenChange={(open) => !open && setDialog(null)}>
        <DialogPopup>
          <CheckoutDialogs
            dialog={dialog}
            plan={plan}
            depositNow={depositNow}
            connectedAddress={walletAddress}
            explorerUrl={explorerUrl}
            onSelectWallet={(walletId, walletName) => setDialog({ type: "connecting", walletId, walletName })}
            onCancelConnecting={() =>
              dialog?.type === "connecting" &&
              setDialog({ type: "declined", walletId: dialog.walletId, walletName: dialog.walletName })
            }
            onCheckingComplete={() => setDialog(null)}
            onTryAgain={() =>
              dialog?.type === "declined" &&
              setDialog({ type: "connecting", walletId: dialog.walletId, walletName: dialog.walletName })
            }
            onChooseAnother={() => setDialog({ type: "wallet-picker" })}
            onApprove={() => setDialog({ type: "signing" })}
            onCancelSigning={() => setDialog(null)}
            onConfirmingComplete={() => setDialog(null)}
            onDismissError={() => setDialog(null)}
          />
        </DialogPopup>
      </AlertDialog.Root>
    </div>
  )
}

export { CheckoutFlow }
