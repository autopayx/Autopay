"use client";

import Link from "next/link";
import { useMemo } from "react";
import { Plus } from "lucide-react";
import { PlansTable, type PlanWithCollected } from "@/components/layouts/merchant/plans-table";
import { AppButton } from "@/components/reuseables/button";
import { Text } from "@/components/reuseables/text";
import { useMerchantContext } from "@/components/providers/merchant-provider";
import { usePlans } from "@/lib/api/hooks/use-plans";
import { useBillingHistory } from "@/lib/api/hooks/use-billing";
import { normalizeBillingHistory } from "@/lib/billing-history";

export default function MerchantPlansPage() {
  const { merchant } = useMerchantContext();
  const plansQuery = usePlans();
  const billingQuery = useBillingHistory(merchant ? { merchant_id: merchant.merchant_id } : undefined);

  const plans = useMemo(
    () => (plansQuery.data ?? []).filter((plan) => plan.merchant_id === merchant?.merchant_id),
    [plansQuery.data, merchant]
  );
  const billingRows = useMemo(() => normalizeBillingHistory(billingQuery.data), [billingQuery.data]);

  const plansWithCollected: PlanWithCollected[] = useMemo(
    () =>
      plans.map((plan) => ({
        ...plan,
        collected: billingRows
          .filter((row) => row.planCode === plan.plan_code && ["SUCCESSFUL", "SUCCESS"].includes(row.status.toUpperCase()))
          .reduce((sum, row) => sum + row.amountValue, 0),
      })),
    [plans, billingRows]
  );

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Text as="h1" weight="bold" className="text-2xl">
            Plans
          </Text>
          <Text as="p" size="sm" className="mt-1 text-muted-foreground">
            One checkout link per plan
          </Text>
        </div>

        <AppButton
          render={<Link href="/merchant/plans/new" />}
          nativeButton={false}
          className="min-w-0 rounded-full bg-blue-500 text-white hover:bg-blue-600"
        >
          <Plus className="size-4" />
          Create new plan
        </AppButton>
      </div>

      <PlansTable plans={plansWithCollected} />
    </div>
  );
}
