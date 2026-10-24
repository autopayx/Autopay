"use client"

import { notFound } from "next/navigation"
import { AuthorizationPanel } from "@/components/layouts/dashboard/subscription-detail/authorization-panel"
import { SubscriptionDetailHeader } from "@/components/layouts/dashboard/subscription-detail/header"
import { PaymentHistoryTable } from "@/components/layouts/dashboard/subscription-detail/payment-history-table"
import { PaymentSchedulePanel } from "@/components/layouts/dashboard/subscription-detail/payment-schedule-panel"
import { VaultSummaryPanel } from "@/components/layouts/dashboard/subscription-detail/vault-summary-panel"
import { parseAmount } from "@/components/layouts/dashboard/subscription-detail/utils"
import { toSubscriptionDetailView, toPaymentHistory } from "@/components/layouts/dashboard/subscription-detail/subscription-view"
import { StatsGrid } from "@/components/layouts/dashboard/stats-grid"
import { LoadingSubscriptions } from "@/components/layouts/dashboard/loading-subscriptions"
import { ErrorSubscriptions } from "@/components/layouts/dashboard/error-subscriptions"
import { Text } from "@/components/reuseables/text"
import { useWallet } from "@/components/providers/wallet-provider"
import { truncateAddress } from "@/lib/stellar/wallet-kit"
import { useSubscription, usePauseSubscription, useResumeSubscription, useCancelSubscription, useTopUpSubscription, useWithdrawSubscription } from "@/lib/api/hooks/use-subscriptions"
import { useBillingHistory } from "@/lib/api/hooks/use-billing"

function SubscriptionDetailClient({ subCode }: { subCode: string }) {
  const { walletAddress } = useWallet()
  const subscriptionQuery = useSubscription(subCode)
  const billingQuery = useBillingHistory(
    subscriptionQuery.data
      ? { customer_wallet: subscriptionQuery.data.customer_wallet, plan_code: subscriptionQuery.data.plan_code }
      : undefined
  )

  const pause = usePauseSubscription(subCode)
  const resume = useResumeSubscription(subCode)
  const cancel = useCancelSubscription(subCode)
  const topUp = useTopUpSubscription(subCode)
  const withdraw = useWithdrawSubscription(subCode)

  if (subscriptionQuery.isLoading) {
    return (
      <div className="flex w-full flex-col gap-6">
        <LoadingSubscriptions />
      </div>
    )
  }

  if (subscriptionQuery.isError) {
    return (
      <div className="flex w-full flex-col gap-6">
        <ErrorSubscriptions />
      </div>
    )
  }

  if (!subscriptionQuery.data) {
    notFound()
  }

  const subscription = toSubscriptionDetailView(subscriptionQuery.data)
  subscription.history = toPaymentHistory(billingQuery.data)

  const stats = [
    { label: "Next payment", value: subscription.stats.nextPayment, sublabel: subscription.stats.nextAmount },
    { label: "Paid so far", value: subscription.stats.paidSoFar, sublabel: subscription.stats.paidSince },
    { label: "Allowance left", value: subscription.stats.allowanceLeft, sublabel: subscription.stats.allowanceTotal },
    { label: "Vault balance", value: subscription.stats.vaultBalance, sublabel: "Held for you" },
  ]

  const displayWallet = walletAddress ? truncateAddress(walletAddress) : ""

  return (
    <div className="flex w-full flex-col gap-6">
      <SubscriptionDetailHeader
        name={subscription.name}
        planLabel={subscription.planLabel}
        subscriptionId={subscription.subscriptionId}
        status={subscription.status}
        vaultBalance={subscription.stats.vaultBalance}
        vaultBalanceAmount={parseAmount(subscription.vault.balance)}
        perPaymentAmount={parseAmount(subscription.authorization.amount)}
        walletAddress={displayWallet}
        onPause={() => pause.mutate(undefined)}
        onResume={() => resume.mutate(undefined)}
        onCancel={() => cancel.mutate(undefined)}
        onTopUp={(amount) => topUp.mutate({ amount_usdc: amount.toFixed(7) })}
      />

      <div className="hidden sm:block">
        <StatsGrid stats={stats} />
      </div>

      {/* mobile: condensed next payment / vault summary */}
      <div className="grid grid-cols-2 gap-4 sm:hidden">
        <div className="rounded-xl border border-border bg-white p-4">
          <Text as="p" size="sm" className="text-muted-foreground">
            Next payment
          </Text>
          <Text as="p" weight="bold" className="mt-1 text-lg">
            {subscription.stats.nextPayment}
          </Text>
          <Text as="p" size="sm" className="text-muted-foreground">
            {subscription.stats.nextAmount}
          </Text>
        </div>
        <div className="rounded-xl border border-border bg-white p-4">
          <Text as="p" size="sm" className="text-muted-foreground">
            Vault
          </Text>
          <Text as="p" weight="bold" className="mt-1 text-lg">
            {subscription.vault.balance}
          </Text>
          <Text as="p" size="sm" className="text-muted-foreground">
            USDC · {subscription.vault.coversPayments} payments
          </Text>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
        <AuthorizationPanel
          merchantName={subscription.name}
          authorization={subscription.authorization}
          merchantWallet={subscription.merchantWallet}
          started={subscription.started}
          subscriptionId={subscription.subscriptionId}
          contract={subscription.contract}
        />
        <VaultSummaryPanel
          {...subscription.vault}
          merchantName={subscription.name}
          perPaymentAmount={parseAmount(subscription.authorization.amount)}
          nextPaymentDate={subscription.stats.nextPayment}
          walletAddress={displayWallet}
          onTopUp={(amount) => topUp.mutate({ amount_usdc: amount.toFixed(7) })}
          onWithdraw={(amount) => withdraw.mutate({ amount_usdc: amount.toFixed(7) })}
        />
      </div>

      <PaymentSchedulePanel schedule={subscription.schedule} />
      <PaymentHistoryTable history={subscription.history} />
    </div>
  )
}

export { SubscriptionDetailClient }
