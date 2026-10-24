"use client";

import { useMemo } from "react";
import { ConnectWalletCard } from "@/components/layouts/dashboard/connect-wallet-card";
import { EmptySubscriptions } from "@/components/layouts/dashboard/empty-subscriptions";
import { ErrorSubscriptions } from "@/components/layouts/dashboard/error-subscriptions";
import { LoadingSubscriptions } from "@/components/layouts/dashboard/loading-subscriptions";
import { NextPaymentsPanel } from "@/components/layouts/dashboard/next-payments-panel";
import { NoticeBanner } from "@/components/layouts/dashboard/notice-banner";
import { RecentActivityTable } from "@/components/layouts/dashboard/recent-activity-table";
import { StatsGrid } from "@/components/layouts/dashboard/stats-grid";
import { SubscriptionsGrid } from "@/components/layouts/dashboard/subscriptions-grid";
import { SubscriptionsHeader } from "@/components/layouts/dashboard/subscriptions-header";
import { VaultsPanel } from "@/components/layouts/dashboard/vaults-panel";
import { useWallet } from "@/components/providers/wallet-provider";
import { useSubscriptions } from "@/lib/api/hooks/use-subscriptions";
import { useBillingHistory } from "@/lib/api/hooks/use-billing";
import { normalizeBillingHistory } from "@/lib/billing-history";
import { formatUsdc } from "@/lib/billing-format";

const PLACEHOLDER_STATS = [
  { label: "Active subscriptions", shortLabel: "Active", value: "0" },
  { label: "Total USDC paid", shortLabel: "Total paid", value: "0.00" },
  { label: "Upcoming payments", shortLabel: "Upcoming", value: "0", sublabel: "Next 30 days" },
  { label: "Remaining authorized allowance", shortLabel: "Allowance left", value: "0.00 USDC" },
];

export default function DashboardPage() {
  const { walletAddress } = useWallet();
  const subscriptionsQuery = useSubscriptions();
  const billingQuery = useBillingHistory(walletAddress ? { customer_wallet: walletAddress } : undefined);

  const subscriptions = useMemo(
    () => (subscriptionsQuery.data ?? []).filter((sub) => sub.customer_wallet === walletAddress),
    [subscriptionsQuery.data, walletAddress]
  );
  const billingRows = useMemo(() => normalizeBillingHistory(billingQuery.data), [billingQuery.data]);

  if (!walletAddress) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <ConnectWalletCard />
      </div>
    );
  }

  if (subscriptionsQuery.isLoading) {
    return (
      <div className="flex w-full flex-col gap-6">
        <SubscriptionsHeader walletAddress={walletAddress} />
        <StatsGrid stats={PLACEHOLDER_STATS} loading />
        <LoadingSubscriptions />
      </div>
    );
  }

  if (subscriptionsQuery.isError) {
    return (
      <div className="flex w-full flex-col gap-6">
        <SubscriptionsHeader walletAddress={walletAddress} />
        <StatsGrid stats={PLACEHOLDER_STATS} />
        <ErrorSubscriptions />
      </div>
    );
  }

  const vaultBalance = subscriptions.reduce((sum, sub) => sum + Number(sub.vault_balance), 0);
  const heldForNext = subscriptions.reduce((sum, sub) => sum + Number(sub.held_for_next_payment), 0);
  const freeToWithdraw = subscriptions.reduce((sum, sub) => sum + Number(sub.free_to_withdraw), 0);

  if (subscriptions.length === 0) {
    return (
      <div className="flex w-full flex-col gap-6">
        <SubscriptionsHeader walletAddress={walletAddress} />
        <StatsGrid stats={PLACEHOLDER_STATS} />
        <EmptySubscriptions />
      </div>
    );
  }

  const activeCount = subscriptions.filter((sub) => sub.status === "ACTIVE").length;
  const pausedCount = subscriptions.filter((sub) => sub.status === "PAUSED").length;
  const totalPaid = subscriptions.reduce((sum, sub) => sum + Number(sub.total_spent), 0);
  const remainingAllowance = subscriptions.reduce((sum, sub) => sum + Number(sub.remaining_allowance), 0);
  const now = Date.now();
  const upcomingCount = subscriptions.filter((sub) => {
    if (sub.status !== "ACTIVE") return false;
    const next = new Date(sub.next_payment_time).getTime();
    return next - now <= 30 * 24 * 60 * 60 * 1000;
  }).length;

  const stats = [
    {
      label: "Active subscriptions",
      shortLabel: "Active",
      value: String(activeCount),
      sublabel: pausedCount > 0 ? `${pausedCount} paused` : undefined,
    },
    { label: "Total USDC paid", shortLabel: "Total paid", value: totalPaid.toFixed(2) },
    { label: "Upcoming payments", shortLabel: "Upcoming", value: String(upcomingCount), sublabel: "Next 30 days" },
    {
      label: "Remaining authorized allowance",
      shortLabel: "Allowance left",
      value: formatUsdc(remainingAllowance),
      sublabel: "Across all subscriptions",
    },
  ];

  const alert = subscriptions.find((sub) => Array.isArray(sub.attention_alerts) && sub.attention_alerts.length > 0);

  return (
    <div className="flex w-full flex-col gap-6">
      <SubscriptionsHeader walletAddress={walletAddress} vaultBalance={formatUsdc(vaultBalance)} subscriptions={subscriptions} />
      <StatsGrid stats={stats} />

      {alert && (
        <NoticeBanner
          title={`${alert.merchant_name} needs your attention.`}
          description={alert.last_skip_reason || "One of your subscriptions needs a review."}
          actionLabel="View Details"
        />
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
        <NextPaymentsPanel subscriptions={subscriptions} />
        <VaultsPanel vaultBalance={vaultBalance} heldForNext={heldForNext} freeToWithdraw={freeToWithdraw} subscriptions={subscriptions} />
      </div>

      <SubscriptionsGrid subscriptions={subscriptions} />
      <RecentActivityTable rows={billingRows} />
    </div>
  );
}

