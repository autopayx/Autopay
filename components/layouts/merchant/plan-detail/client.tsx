"use client"

import { useMemo } from "react"
import { notFound } from "next/navigation"
import { CheckoutLinkCard } from "@/components/layouts/merchant/plan-detail/checkout-link-card"
import { PlanDetailHeader } from "@/components/layouts/merchant/plan-detail/header"
import { PlanDetailStats } from "@/components/layouts/merchant/plan-detail/stats-row"
import { PlanDetailTabs } from "@/components/layouts/merchant/plan-detail/tabs"
import { toPlanDetailView } from "@/components/layouts/merchant/plan-detail/plan-view"
import { LoadingSubscriptions } from "@/components/layouts/dashboard/loading-subscriptions"
import { ErrorSubscriptions } from "@/components/layouts/dashboard/error-subscriptions"
import { usePlan, usePatchPlan, useClosePlan, useReopenPlan } from "@/lib/api/hooks/use-plans"
import { useSubscriptions } from "@/lib/api/hooks/use-subscriptions"
import { useBillingHistory } from "@/lib/api/hooks/use-billing"
import { normalizeBillingHistory } from "@/lib/billing-history"

function PlanDetailClient({ planCode }: { planCode: string }) {
  const planQuery = usePlan(planCode)
  const subscriptionsQuery = useSubscriptions()
  const billingQuery = useBillingHistory({ plan_code: planCode })

  const patchPlan = usePatchPlan(planCode)
  const closePlan = useClosePlan(planCode)
  const reopenPlan = useReopenPlan(planCode)

  const subscriptions = useMemo(
    () => (subscriptionsQuery.data ?? []).filter((sub) => sub.plan_code === planCode),
    [subscriptionsQuery.data, planCode]
  )
  const billingRows = useMemo(() => normalizeBillingHistory(billingQuery.data), [billingQuery.data])

  if (planQuery.isLoading) {
    return <LoadingSubscriptions />
  }

  if (planQuery.isError) {
    return <ErrorSubscriptions />
  }

  if (!planQuery.data) {
    notFound()
  }

  const planData = planQuery.data
  const plan = toPlanDetailView(planData, subscriptions, billingRows)

  return (
    <div className="flex w-full flex-col gap-6">
      <PlanDetailHeader
        name={plan.name}
        status={plan.status}
        createdDate={plan.createdDate}
        currentPrice={plan.terms.price}
        interval={plan.terms.interval}
        activeSubscribers={plan.stats.activeSubscribers}
        onEditPrice={(price) => patchPlan.mutate({ amount_usdc: price })}
        onClose={() =>
          closePlan.mutate({
            merchant_id: planData.merchant_id,
            name: planData.name,
            amount_usdc: planData.amount_usdc,
            max_spending_limit: planData.max_spending_limit,
          })
        }
        onReopen={() =>
          reopenPlan.mutate({
            merchant_id: planData.merchant_id,
            name: planData.name,
            amount_usdc: planData.amount_usdc,
            max_spending_limit: planData.max_spending_limit,
          })
        }
      />
      <CheckoutLinkCard checkoutLink={plan.checkoutLink} planCode={plan.slug} />
      <PlanDetailStats stats={plan.stats} />
      <PlanDetailTabs plan={plan} />
    </div>
  )
}

export { PlanDetailClient }
