import type { LucideIcon } from "lucide-react"
import type { ReactNode } from "react"
import { CreditCard, Lock, PauseCircle, ShieldCheck, Wallet } from "lucide-react"
import { AppButton } from "@/components/reuseables/button"
import { Text } from "@/components/reuseables/text"
import type { CheckoutPlanView } from "@/components/layouts/checkout/plan-view"

const PAYMENT_PRESETS = [1, 3, 6, 12] as const

type CheckoutWizardProps = {
  plan: CheckoutPlanView
  connected: boolean
  walletAddress: string | null
  walletBalance: number
  paymentsToFund: number
  onSelectPaymentsToFund: (n: number) => void
  onConnectWallet: () => void
  onChangeWallet: () => void
  onSubscribe: () => void
}

function StepCard({
  number,
  done,
  title,
  icon: Icon,
  children,
}: {
  number: number
  done?: boolean
  title: string
  icon: LucideIcon
  children: ReactNode
}) {
  return (
    <div className="rounded-2xl border border-border bg-white p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span
            className={`flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
              done ? "bg-emerald-500 text-white" : "bg-blue-500 text-white"
            }`}
          >
            {done ? "✓" : number}
          </span>
          <Text as="h3" weight="bold">
            {title}
          </Text>
        </div>
        <Icon className="size-4 text-muted-foreground" />
      </div>
      <div className="mt-4">{children}</div>
    </div>
  )
}

function CheckoutWizard({
  plan,
  connected,
  walletAddress,
  walletBalance,
  paymentsToFund,
  onSelectPaymentsToFund,
  onConnectWallet,
  onChangeWallet,
  onSubscribe,
}: CheckoutWizardProps) {
  const depositNow = plan.amount * paymentsToFund
  const walletBalanceAfterDeposit = Math.max(walletBalance - depositNow, 0)

  return (
    <div className="flex flex-col gap-4">
      <StepCard number={1} done={connected} title={connected ? "Wallet connected" : "Connect your wallet"} icon={Wallet}>
        {connected ? (
          <div className="flex items-center justify-between gap-3">
            <Text as="p" size="sm" className="min-w-0 truncate text-muted-foreground">
              {walletAddress}
            </Text>
            <div className="flex shrink-0 items-center gap-3">
              <Text as="p" weight="semibold" size="sm">
                {walletBalance.toFixed(2)} USDC available
              </Text>
              <button type="button" onClick={onChangeWallet} className="text-sm font-medium text-blue-600 hover:underline">
                Change wallet
              </button>
            </div>
          </div>
        ) : (
          <>
            <Text as="p" size="sm" className="text-muted-foreground">
              Choose a Stellar wallet to continue. We never ask for your private keys.
            </Text>
            <AppButton onClick={onConnectWallet} className="mt-4 w-full rounded-full bg-blue-500 text-white hover:bg-blue-600">
              <CreditCard className="size-4" />
              Connect wallet
            </AppButton>
            <Text as="p" size="sm" className="mt-2 text-muted-foreground">
              Works with Freighter, xBull, Albedo and LOBSTR
            </Text>
          </>
        )}
      </StepCard>

      <StepCard number={2} title="Fund your vault" icon={Lock}>
        {!connected ? (
          <Text as="p" size="sm" className="text-muted-foreground">
            Connect a wallet to see your balance and choose how much to deposit.
          </Text>
        ) : (
          <>
            <Text as="p" size="sm" className="text-muted-foreground">
              Your vault holds the USDC that payments are taken from. Whatever is unspent, you can withdraw
              anytime.
            </Text>

            <Text as="p" size="sm" weight="semibold" className="mt-4 text-muted-foreground">
              Payments to fund
            </Text>
            <div className="mt-2 grid grid-cols-4 gap-2">
              {PAYMENT_PRESETS.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => onSelectPaymentsToFund(preset)}
                  className={`rounded-lg border px-2 py-2 text-sm font-medium ${
                    paymentsToFund === preset
                      ? "border-[#0B1F3A] bg-[#0B1F3A] text-white"
                      : "border-border text-foreground hover:bg-muted"
                  }`}
                >
                  {preset}
                </button>
              ))}
            </div>

            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-border">
              <div
                className="h-full rounded-full bg-blue-500"
                style={{ width: `${Math.min((paymentsToFund / 12) * 100, 100)}%` }}
              />
            </div>
            <div className="mt-1 flex items-center justify-between text-sm text-muted-foreground">
              <span>{paymentsToFund} funded now</span>
              <span>{Math.max(12 - paymentsToFund, 0)} need a top-up later</span>
            </div>

            <div className="mt-4 flex flex-col gap-2 border-t border-border pt-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Deposit now</span>
                <span className="font-semibold text-foreground">{depositNow.toFixed(2)} USDC</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Reserved for payments</span>
                <span className="text-foreground">{depositNow.toFixed(2)} USDC</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Spare, withdrawable</span>
                <span className="text-foreground">0.00 USDC</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Network fee (estimate)</span>
                <span className="text-foreground">~0.00001 XLM</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Wallet balance after deposit</span>
                <span className="font-semibold text-foreground">{walletBalanceAfterDeposit.toFixed(2)} USDC</span>
              </div>
            </div>
          </>
        )}
      </StepCard>

      <StepCard number={3} title="Review and approve" icon={ShieldCheck}>
        <div className="rounded-xl bg-blue-50 p-4">
          <Text as="p" size="sm" className="text-foreground">
            <span className="font-semibold">{plan.merchantName}</span> can take{" "}
            <span className="font-semibold">{plan.amount.toFixed(2)} USDC</span> every{" "}
            <span className="font-semibold">{plan.intervalLabel}</span>, up to{" "}
            <span className="font-semibold">{plan.cap.toFixed(2)} USDC</span> in total, until{" "}
            <span className="font-semibold">{plan.expiresLabel}</span>.
          </Text>
        </div>
        <Text as="p" size="sm" className="mt-2 text-muted-foreground">
          Payments run automatically from your vault. You won&apos;t sign each one.
        </Text>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {[
            { icon: ShieldCheck, title: "Approval is not payment", description: "Money only moves on due dates" },
            { icon: PauseCircle, title: "Pause or cancel", description: "Anytime, no questions" },
            { icon: Lock, title: "Withdraw unspent", description: "Back to your wallet, anytime" },
          ].map((item) => (
            <div key={item.title} className="rounded-xl bg-muted p-3">
              <item.icon className="size-4 text-blue-600" />
              <Text as="p" weight="semibold" size="sm" className="mt-2">
                {item.title}
              </Text>
              <Text as="p" size="sm" className="text-muted-foreground">
                {item.description}
              </Text>
            </div>
          ))}
        </div>

        {connected ? (
          <AppButton onClick={onSubscribe} className="mt-4 w-full rounded-full bg-blue-500 text-white hover:bg-blue-600">
            <Lock className="size-4" />
            Subscribe
          </AppButton>
        ) : (
          <Text as="p" size="sm" className="mt-4 text-muted-foreground">
            The Subscribe button appears after you connect a wallet and fund your vault.
          </Text>
        )}
      </StepCard>
    </div>
  )
}

export { CheckoutWizard }
