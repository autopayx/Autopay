"use client";

import { useMemo } from "react";
import { CollectedChartCard } from "@/components/layouts/merchant/collected-chart-card";
import { MerchantEmptyState } from "@/components/layouts/merchant/empty-state";
import { MerchantEmptyStats } from "@/components/layouts/merchant/empty-stats";
import { GetStartedCard } from "@/components/layouts/merchant/get-started-card";
import { HeaderBanner } from "@/components/layouts/merchant/header-banner";
import { MerchantStatsGrid, type MerchantStat } from "@/components/layouts/merchant/stats-grid";
import { Next7DaysCard, type DayForecast } from "@/components/layouts/merchant/next-7-days-card";
import { PlansGrid, type PlanWithCollected } from "@/components/layouts/merchant/plans-grid";
import { RecentActivityCard } from "@/components/layouts/merchant/recent-activity";
import { useMerchantContext } from "@/components/providers/merchant-provider";
import { usePlans } from "@/lib/api/hooks/use-plans";
import { useSubscriptions } from "@/lib/api/hooks/use-subscriptions";
import { useBillingHistory } from "@/lib/api/hooks/use-billing";
import { normalizeBillingHistory } from "@/lib/billing-history";
import { cumulativeSeries } from "@/lib/time-series";

export default function MerchantHomePage() {
  const { merchant } = useMerchantContext();
  const plansQuery = usePlans();
  const subscriptionsQuery = useSubscriptions();
  const billingQuery = useBillingHistory(merchant ? { merchant_id: merchant.merchant_id } : undefined);

  const plans = useMemo(
    () => (plansQuery.data ?? []).filter((plan) => plan.merchant_id === merchant?.merchant_id),
    [plansQuery.data, merchant]
  );
  const subscriptions = useMemo(
    () => (subscriptionsQuery.data ?? []).filter((sub) => sub.merchant_id === merchant?.merchant_id),
    [subscriptionsQuery.data, merchant]
  );
  const billingRows = useMemo(() => normalizeBillingHistory(billingQuery.data), [billingQuery.data]);

  if (!merchant) return null;

  if (plans.length === 0) {
    return (
      <div className="flex w-full flex-col gap-6">
        <HeaderBanner merchant={merchant} />
        <div className="-mt-10 px-2">
          <MerchantEmptyStats />
        </div>
        <MerchantEmptyState />
      </div>
    );
  }

  const successfulRows = billingRows.filter((row) => ["SUCCESSFUL", "SUCCESS"].includes(row.status.toUpperCase()));
  const failedRows = billingRows.filter((row) => row.status.toUpperCase() === "FAILED");
  const collected30d = successfulRows.reduce((sum, row) => sum + row.amountValue, 0);

  const collectedSparkline = cumulativeSeries(successfulRows, (row) => row.dateValue, (row) => row.amountValue, 6);
  const subscriptionsSparkline = cumulativeSeries(subscriptions, (sub) => sub.created_at, () => 1, 6);
  const plansSparkline = cumulativeSeries(plans, (plan) => plan.created_at, () => 1, 6);
  const successSparkline = cumulativeSeries(successfulRows, (row) => row.dateValue, () => 1, 6);
  const failedSparkline = cumulativeSeries(failedRows, (row) => row.dateValue, () => 1, 6);

  const stats: MerchantStat[] = [
    {
      label: "Total plans",
      shortLabel: "Plans",
      value: String(plans.length),
      sublabel: `${plans.filter((p) => p.status === "ACTIVE").length} active`,
      sparkline: plansSparkline,
    },
    {
      label: "Active subscriptions",
      shortLabel: "Subscribers",
      value: String(subscriptions.filter((s) => s.status === "ACTIVE").length),
      sublabel: `${plans.length} plans`,
      sparkline: subscriptionsSparkline,
    },
    {
      label: "USDC collected",
      shortLabel: "Collected",
      value: collected30d.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      sublabel: "30 days",
      sparkline: collectedSparkline,
    },
    {
      label: "Successful payments",
      shortLabel: "Payments",
      value: String(successfulRows.length),
      sublabel: billingRows.length > 0 ? `${((successfulRows.length / billingRows.length) * 100).toFixed(1)}% rate` : "—",
      sparkline: successSparkline,
    },
    {
      label: "Failed payments",
      shortLabel: "Failed",
      value: String(failedRows.length),
      sublabel: `${failedRows.length} total`,
      danger: failedRows.length > 0,
      sparkline: failedSparkline,
    },
  ];

  const collectedSeries = {
    "7D": cumulativeSeries(successfulRows, (row) => row.dateValue, (row) => row.amountValue, 7),
    "30D": cumulativeSeries(successfulRows, (row) => row.dateValue, (row) => row.amountValue, 30),
    "90D": cumulativeSeries(successfulRows, (row) => row.dateValue, (row) => row.amountValue, 90),
  };

  const plansWithCollected: PlanWithCollected[] = plans.map((plan) => {
    const rows = successfulRows.filter((row) => row.planCode === plan.plan_code);
    return {
      ...plan,
      collected: rows.reduce((sum, row) => sum + row.amountValue, 0),
      sparkline: cumulativeSeries(rows, (row) => row.dateValue, (row) => row.amountValue, 6),
    };
  });

  const now = Date.now();
  const sevenDaysMs = 7 * 24 * 60 * 60 * 1000;
  const upcoming = subscriptions.filter((sub) => {
    if (sub.status !== "ACTIVE") return false;
    const next = new Date(sub.next_payment_time).getTime();
    return next - now >= 0 && next - now <= sevenDaysMs;
  });
  const forecast: DayForecast[] = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(now + i * 24 * 60 * 60 * 1000);
    const label = date.toLocaleDateString("en-US", { weekday: "short" });
    const amount = upcoming
      .filter((sub) => new Date(sub.next_payment_time).toDateString() === date.toDateString())
      .reduce((sum, sub) => sum + Number(sub.amount_usdc), 0);
    return { day: label, amount };
  });
  const lowVaultCount = subscriptions.filter(
    (sub) => sub.status === "ACTIVE" && Number(sub.vault_balance) < Number(sub.amount_usdc)
  ).length;

  return (
    <div className="flex w-full flex-col gap-6">
      <HeaderBanner merchant={merchant} />
      <div className="-mt-10 px-2">
        <MerchantStatsGrid stats={stats} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[2fr_3fr]">
        <GetStartedCard merchant={merchant} firstPlanCode={plans[0]?.plan_code} />
        <CollectedChartCard series={collectedSeries} />
      </div>

      <PlansGrid plans={plansWithCollected} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
        <RecentActivityCard transactions={billingRows} subscriptions={subscriptions} />
        <Next7DaysCard forecast={forecast} chargeCount={upcoming.length} lowVaultCount={lowVaultCount} />
      </div>
    </div>
  );
}

