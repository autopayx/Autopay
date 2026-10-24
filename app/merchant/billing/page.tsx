"use client";

import { useMemo } from "react";
import { BillingStats, type Stat } from "@/components/layouts/merchant/billing/stats";
import { BillingTable } from "@/components/layouts/merchant/billing/table";
import { AppButton } from "@/components/reuseables/button";
import { Text } from "@/components/reuseables/text";
import { useMerchantContext } from "@/components/providers/merchant-provider";
import { useSubscriptions } from "@/lib/api/hooks/use-subscriptions";
import { useBillingHistory } from "@/lib/api/hooks/use-billing";
import { normalizeBillingHistory } from "@/lib/billing-history";
import { formatUsdc } from "@/lib/billing-format";

export default function MerchantBillingPage() {
  const { merchant } = useMerchantContext();
  const subscriptionsQuery = useSubscriptions();
  const billingQuery = useBillingHistory(merchant ? { merchant_id: merchant.merchant_id } : undefined);

  const subscriptions = useMemo(
    () => (subscriptionsQuery.data ?? []).filter((sub) => sub.merchant_id === merchant?.merchant_id),
    [subscriptionsQuery.data, merchant]
  );
  const rows = useMemo(() => normalizeBillingHistory(billingQuery.data), [billingQuery.data]);

  const successfulRows = rows.filter((row) => ["SUCCESSFUL", "SUCCESS"].includes(row.status.toUpperCase()));
  const pendingRows = rows.filter((row) => row.status.toUpperCase() === "PENDING");
  const failedRows = rows.filter((row) => row.status.toUpperCase() === "FAILED");
  const skippedRows = rows.filter((row) => row.status.toUpperCase() === "SKIPPED");

  const activeCount = subscriptions.filter((sub) => sub.status === "ACTIVE").length;
  const pausedCount = subscriptions.filter((sub) => sub.status === "PAUSED").length;
  const cancelledCount = subscriptions.filter((sub) => sub.status === "CANCELLED").length;
  const collected30d = successfulRows.reduce((sum, row) => sum + row.amountValue, 0);
  const pendingTotal = pendingRows.reduce((sum, row) => sum + row.amountValue, 0);

  const now = Date.now();
  const sevenDaysMs = 7 * 24 * 60 * 60 * 1000;
  const upcoming = subscriptions.filter((sub) => {
    if (sub.status !== "ACTIVE") return false;
    const next = new Date(sub.next_payment_time).getTime();
    return next - now >= 0 && next - now <= sevenDaysMs;
  });
  const next7daysTotal = upcoming.reduce((sum, sub) => sum + Number(sub.amount_usdc), 0);

  const desktopStats: Stat[] = [
    { label: "Active subscribers", value: String(activeCount), sublabel: `${pausedCount} paused · ${cancelledCount} cancelled` },
    { label: "Collected, 30 days", value: formatUsdc(collected30d), sublabel: `${successfulRows.length} payments` },
    { label: "Next 7 days", value: formatUsdc(next7daysTotal), sublabel: `${upcoming.length} charges` },
    { label: "Failed or skipped", value: String(failedRows.length + skippedRows.length), sublabel: "Needs a look", danger: failedRows.length + skippedRows.length > 0 },
  ];

  const mobileStats: Stat[] = [
    { label: "Collected", value: collected30d.toFixed(2), sublabel: `USDC · ${successfulRows.length} payments` },
    { label: "Pending", value: pendingTotal.toFixed(2), sublabel: `USDC · ${pendingRows.length} payments` },
    { label: "Failed", value: String(failedRows.length), sublabel: `${failedRows.length} open`, danger: failedRows.length > 0 },
    { label: "Skipped", value: String(skippedRows.length), sublabel: "Low vault balance", danger: skippedRows.length > 0 },
  ];

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Text as="h1" weight="bold" className="text-2xl">
            Billing
          </Text>
          <Text as="p" size="sm" className="mt-1 text-muted-foreground">
            Every payment across your plans
          </Text>
        </div>

        <AppButton variant="outline" className="hidden min-w-0 rounded-full sm:flex">
          Export CSV
        </AppButton>
      </div>

      <BillingStats mobileStats={mobileStats} desktopStats={desktopStats} />
      <BillingTable rows={rows} />
    </div>
  );
}
