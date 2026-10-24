import { useEffect, useState } from "react"
import { AlertDialog } from "@base-ui/react/alert-dialog"
import { Check, CreditCard, Loader2, Wallet, X } from "lucide-react"
import { AppButton } from "@/components/reuseables/button"
import { Text } from "@/components/reuseables/text"
import { DialogPopup } from "@/components/layouts/checkout/dialog-shell"
import { SUPPORTED_WALLETS } from "@/lib/stellar/supported-wallets"
import type { CheckoutPlanView } from "@/components/layouts/checkout/plan-view"
import type { DialogState } from "@/components/layouts/checkout/types"

function Spinner() {
  return <Loader2 className="size-8 animate-spin text-blue-500" />
}

function WalletPickerDialog({ onSelect }: { onSelect: (walletId: string, walletName: string) => void }) {
  return (
    <>
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="flex size-8 items-center justify-center rounded-lg bg-muted text-muted-foreground">
            <CreditCard className="size-4" />
          </span>
          <div>
            <AlertDialog.Title render={<Text as="h2" weight="bold" className="text-base" />}>
              Connect a wallet
            </AlertDialog.Title>
            <Text as="p" size="sm" className="text-muted-foreground">
              We never ask for your private keys.
            </Text>
          </div>
        </div>
        <AlertDialog.Close className="hidden text-muted-foreground hover:text-foreground sm:block">
          <X className="size-4" />
        </AlertDialog.Close>
      </div>

      <div className="mt-4 flex flex-col divide-y divide-border">
        {SUPPORTED_WALLETS.map((wallet) => (
          <button
            key={wallet.id}
            type="button"
            onClick={() => onSelect(wallet.id, wallet.name)}
            className="flex items-center justify-between gap-3 py-3 text-left hover:bg-muted/50"
          >
            <div className="flex items-center gap-3">
              <span className={`flex size-8 items-center justify-center rounded-lg text-sm font-semibold text-white ${wallet.iconClassName}`}>
                {wallet.initials}
              </span>
              <span className="flex items-center gap-2 text-sm font-medium text-foreground">
                {wallet.name}
                {wallet.recommended && <span className="text-xs font-medium text-blue-600">Recommended</span>}
              </span>
            </div>
            <span className="text-xs text-muted-foreground">{wallet.badge}</span>
          </button>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
        <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
          Network: Stellar Testnet
        </span>
        <a href="#" className="text-sm font-medium text-blue-600 hover:underline">
          What&apos;s a wallet?
        </a>
      </div>
    </>
  )
}

function ConnectingDialog({ walletName, onCancel }: { walletName: string; onCancel: () => void }) {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <Spinner />
      <div>
        <AlertDialog.Title render={<Text as="h2" weight="bold" className="text-lg" />}>
          Waiting for {walletName}
        </AlertDialog.Title>
        <Text as="p" size="sm" className="mt-1 text-muted-foreground">
          Approve the connection in the {walletName} window.
        </Text>
        <Text as="p" size="sm" className="mt-1 text-muted-foreground">
          Don&apos;t see it? Check your browser&apos;s extension icon.
        </Text>
      </div>
      <AppButton variant="outline" onClick={onCancel} className="w-full rounded-full">
        Cancel
      </AppButton>
    </div>
  )
}

function CheckingWalletDialog({
  walletName,
  address,
  onComplete,
}: {
  walletName: string
  address: string
  onComplete: () => void
}) {
  const [step, setStep] = useState(0)
  const items = [
    { label: `Connected to ${walletName}`, detail: address },
    { label: "Network is Stellar Testnet" },
    { label: "Looking for a USDC balance" },
    { label: "Checking XLM for fees" },
  ]

  useEffect(() => {
    if (step >= items.length) {
      const timeout = setTimeout(onComplete, 500)
      return () => clearTimeout(timeout)
    }
    const timeout = setTimeout(() => setStep((s) => s + 1), 500)
    return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step])

  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <Spinner />
      <AlertDialog.Title render={<Text as="h2" weight="bold" className="text-lg" />}>
        Checking your wallet
      </AlertDialog.Title>
      <Text as="p" size="sm" className="-mt-3 text-muted-foreground">
        This takes a few seconds.
      </Text>

      <div className="w-full rounded-xl border border-border p-4 text-left">
        {items.map((item, i) => (
          <div key={item.label} className="flex items-center gap-2.5 py-1.5">
            {i < step ? (
              <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-emerald-500">
                <Check className="size-3 text-white" />
              </span>
            ) : i === step ? (
              <span className="size-4 shrink-0 rounded-full border-2 border-blue-500" />
            ) : (
              <span className="size-4 shrink-0 rounded-full border-2 border-border" />
            )}
            <div>
              <Text as="p" size="sm" weight={i <= step ? "semibold" : "normal"} className={i > step ? "text-muted-foreground" : ""}>
                {item.label}
              </Text>
              {item.detail && i < step && (
                <Text as="p" size="sm" className="text-muted-foreground">
                  {item.detail}
                </Text>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function DeclinedDialog({
  walletName,
  onTryAgain,
  onChooseAnother,
}: {
  walletName: string
  onTryAgain: () => void
  onChooseAnother: () => void
}) {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <span className="flex size-10 items-center justify-center rounded-full bg-red-100 text-red-600">
        <X className="size-5" />
      </span>
      <div>
        <AlertDialog.Title render={<Text as="h2" weight="bold" className="text-lg" />}>
          Connection declined
        </AlertDialog.Title>
        <Text as="p" size="sm" className="mt-1 text-muted-foreground">
          You closed the {walletName} request. Nothing was shared.
        </Text>
      </div>
      <div className="flex w-full flex-col gap-2">
        <AppButton onClick={onTryAgain} className="w-full rounded-full bg-blue-500 text-white hover:bg-blue-600">
          Try again
        </AppButton>
        <AppButton variant="outline" onClick={onChooseAnother} className="w-full rounded-full">
          Choose another wallet
        </AppButton>
      </div>
    </div>
  )
}

function ConfirmSubscriptionDialog({
  plan,
  depositNow,
  onApprove,
}: {
  plan: CheckoutPlanView
  depositNow: number
  onApprove: () => void
}) {
  const rows = [
    { label: "Each payment", value: `${plan.amount.toFixed(2)} USDC` },
    { label: "How often", value: `Every ${plan.intervalLabel}` },
    { label: "Most they can take in total", value: `${plan.cap.toFixed(2)} USDC` },
    { label: "Until", value: plan.expiresLabel },
    { label: "Paid to", value: plan.receivingWallet },
    { label: "Network fee (estimate)", value: "~0.00001 XLM" },
  ]

  return (
    <>
      <div className="flex items-start justify-between gap-4">
        <div>
          <AlertDialog.Title render={<Text as="h2" weight="bold" className="text-lg" />}>
            Confirm your subscription
          </AlertDialog.Title>
          <Text as="p" size="sm" className="text-muted-foreground">
            {plan.merchantName} · {plan.planName}
          </Text>
        </div>
        <AlertDialog.Close className="hidden text-muted-foreground hover:text-foreground sm:block">
          <X className="size-4" />
        </AlertDialog.Close>
      </div>

      <div className="mt-4 rounded-xl bg-[#0B1F3A] p-4">
        <Text as="p" weight="bold" className="text-2xl text-white">
          {depositNow.toFixed(2)} USDC
        </Text>
        <Text as="p" size="sm" className="mt-1 text-white/60">
          Moves into your vault now. Not paid to the merchant.
        </Text>
        <Text as="p" size="sm" className="mt-1 text-blue-300">
          It stays yours. Payments only leave it on their due dates.
        </Text>
      </div>

      <Text as="p" size="sm" weight="semibold" className="mt-4 text-muted-foreground uppercase tracking-wide">
        What {plan.merchantName} can take
      </Text>
      <div className="mt-1 flex flex-col divide-y divide-border">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between gap-3 py-2 text-sm">
            <span className="shrink-0 text-muted-foreground">{row.label}</span>
            <span className="min-w-0 truncate font-semibold text-foreground">{row.value}</span>
          </div>
        ))}
      </div>

      <ul className="mt-3 flex flex-col gap-2">
        {["Payments run automatically from your vault. You won't sign each one.", "You can pause or cancel anytime."].map(
          (item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-foreground">
              <Check className="mt-0.5 size-4 shrink-0 text-blue-600" />
              {item}
            </li>
          )
        )}
      </ul>

      <div className="mt-6 flex flex-col gap-2">
        <AppButton onClick={onApprove} className="w-full rounded-full bg-blue-500 text-white hover:bg-blue-600">
          <Wallet className="size-4" />
          Approve in wallet
        </AppButton>
        <AlertDialog.Close render={<AppButton variant="outline" nativeButton={false} className="w-full rounded-full" />}>
          Cancel
        </AlertDialog.Close>
      </div>

      <Text as="p" size="sm" className="mt-3 text-center text-muted-foreground">
        Your wallet will ask you to sign.{" "}
        <a href="#" className="font-medium text-blue-600 hover:underline">
          View what you&apos;re signing
        </a>{" "}
        · Plan {plan.planCode}
      </Text>
    </>
  )
}

function SigningDialog({ plan, depositNow, onCancel }: { plan: CheckoutPlanView; depositNow: number; onCancel: () => void }) {
  const steps = [
    { label: "Approve in your wallet", description: "Sending your subscription to AutoPayX...", active: true },
    { label: "Confirm on Stellar" },
    { label: "Subscription ready" },
  ]

  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <Spinner />
      <div>
        <AlertDialog.Title render={<Text as="h2" weight="bold" className="text-lg" />}>
          Waiting for your signature
        </AlertDialog.Title>
        <Text as="p" size="sm" className="mt-1 text-muted-foreground">
          Please keep this page open while we submit your subscription.
        </Text>
      </div>

      <div className="w-full rounded-xl border border-border p-4 text-left">
        {steps.map((step) => (
          <div key={step.label} className="flex items-start gap-2.5 py-1.5">
            <span
              className={`mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full border-2 ${
                step.active ? "border-blue-500" : "border-border"
              }`}
            >
              {step.active && <span className="size-2 rounded-full bg-blue-500" />}
            </span>
            <div>
              <Text as="p" size="sm" weight={step.active ? "semibold" : "normal"} className={!step.active ? "text-muted-foreground" : ""}>
                {step.label}
              </Text>
              {step.description && (
                <Text as="p" size="sm" className="text-muted-foreground">
                  {step.description}
                </Text>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="w-full rounded-xl bg-muted p-3 text-left">
        <Text as="p" size="sm" weight="semibold" className="text-muted-foreground uppercase tracking-wide">
          It should show
        </Text>
        <Text as="p" size="sm" className="mt-1 text-foreground">
          Deposit {depositNow.toFixed(2)} USDC into your vault
        </Text>
        <Text as="p" size="sm" className="text-foreground">
          Allow {plan.merchantName} {plan.amount.toFixed(2)} USDC / {plan.intervalLabel}, max {plan.cap.toFixed(2)} USDC
        </Text>
      </div>

      <Text as="p" size="sm" className="text-muted-foreground">
        You can cancel until you sign.
      </Text>
      <AppButton variant="outline" onClick={onCancel} className="w-full rounded-full">
        Cancel request
      </AppButton>
    </div>
  )
}

function ConfirmingDialog({ explorerUrl, onComplete }: { explorerUrl?: string; onComplete: () => void }) {
  const [confirmed, setConfirmed] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => setConfirmed(true), 1200)
    return () => clearTimeout(timeout)
  }, [])

  useEffect(() => {
    if (!confirmed) return
    const timeout = setTimeout(onComplete, 700)
    return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [confirmed])

  const steps = [
    { label: "Approved in your wallet", done: true },
    { label: "Confirming on Stellar", active: !confirmed, done: confirmed, description: confirmed ? undefined : "Usually about 5 seconds." },
    { label: "Subscription ready", done: false },
  ]

  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <Spinner />
      <div>
        <AlertDialog.Title render={<Text as="h2" weight="bold" className="text-lg" />}>
          Confirming on Stellar
        </AlertDialog.Title>
        <Text as="p" size="sm" className="mt-1 text-muted-foreground">
          Your signature was sent. Please keep this page open.
        </Text>
      </div>

      <div className="w-full rounded-xl border border-border p-4 text-left">
        {steps.map((step) => (
          <div key={step.label} className="flex items-start gap-2.5 py-1.5">
            {step.done ? (
              <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-emerald-500">
                <Check className="size-3 text-white" />
              </span>
            ) : step.active ? (
              <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full border-2 border-blue-500">
                <span className="size-2 rounded-full bg-blue-500" />
              </span>
            ) : (
              <span className="mt-0.5 size-4 shrink-0 rounded-full border-2 border-border" />
            )}
            <div>
              <Text as="p" size="sm" weight={step.done || step.active ? "semibold" : "normal"} className={!step.done && !step.active ? "text-muted-foreground" : ""}>
                {step.label}
              </Text>
              {step.description && (
                <Text as="p" size="sm" className="text-muted-foreground">
                  {step.description}
                </Text>
              )}
            </div>
          </div>
        ))}
      </div>

      {explorerUrl && (
        <div className="flex w-full items-center justify-between rounded-xl bg-muted p-3 text-left text-sm">
          <span className="text-muted-foreground">Transaction</span>
          <a href={explorerUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 font-medium text-blue-600 hover:underline">
            View on explorer
            <span aria-hidden>↗</span>
          </a>
        </div>
      )}

      <Text as="p" size="sm" className="text-muted-foreground">
        This can&apos;t be cancelled once it&apos;s submitted.
      </Text>
    </div>
  )
}

function ErrorDialog({ message, onClose }: { message: string; onClose: () => void }) {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <span className="flex size-10 items-center justify-center rounded-full bg-red-100 text-red-600">
        <X className="size-5" />
      </span>
      <div>
        <AlertDialog.Title render={<Text as="h2" weight="bold" className="text-lg" />}>
          Something went wrong
        </AlertDialog.Title>
        <Text as="p" size="sm" className="mt-1 text-muted-foreground">
          {message}
        </Text>
      </div>
      <AppButton onClick={onClose} className="w-full rounded-full bg-blue-500 text-white hover:bg-blue-600">
        Close
      </AppButton>
    </div>
  )
}

type CheckoutDialogsProps = {
  dialog: DialogState
  plan: CheckoutPlanView
  depositNow: number
  connectedAddress: string | null
  explorerUrl?: string
  onSelectWallet: (walletId: string, walletName: string) => void
  onCancelConnecting: () => void
  onCheckingComplete: () => void
  onTryAgain: () => void
  onChooseAnother: () => void
  onApprove: () => void
  onCancelSigning: () => void
  onConfirmingComplete: () => void
  onDismissError: () => void
}

function CheckoutDialogs({
  dialog,
  plan,
  depositNow,
  connectedAddress,
  explorerUrl,
  onSelectWallet,
  onCancelConnecting,
  onCheckingComplete,
  onTryAgain,
  onChooseAnother,
  onApprove,
  onCancelSigning,
  onConfirmingComplete,
  onDismissError,
}: CheckoutDialogsProps) {
  if (!dialog) return null

  switch (dialog.type) {
    case "wallet-picker":
      return <WalletPickerDialog onSelect={onSelectWallet} />
    case "connecting":
      return <ConnectingDialog walletName={dialog.walletName} onCancel={onCancelConnecting} />
    case "checking":
      return (
        <CheckingWalletDialog
          walletName={dialog.walletName}
          address={connectedAddress ?? ""}
          onComplete={onCheckingComplete}
        />
      )
    case "declined":
      return <DeclinedDialog walletName={dialog.walletName} onTryAgain={onTryAgain} onChooseAnother={onChooseAnother} />
    case "confirm":
      return <ConfirmSubscriptionDialog plan={plan} depositNow={depositNow} onApprove={onApprove} />
    case "signing":
      return <SigningDialog plan={plan} depositNow={depositNow} onCancel={onCancelSigning} />
    case "confirming":
      return <ConfirmingDialog explorerUrl={explorerUrl} onComplete={onConfirmingComplete} />
    case "error":
      return <ErrorDialog message={dialog.message} onClose={onDismissError} />
    default:
      return null
  }
}

export { CheckoutDialogs, DialogPopup }
