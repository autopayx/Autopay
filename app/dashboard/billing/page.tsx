"use client";

import Link from "next/link";
import { useMemo } from "react";
import { BillingHistoryTable } from "@/components/layouts/dashboard/billing/history-table";
import { AppButton } from "@/components/reuseables/button";
import { Text } from "@/components/reuseables/text";
import { useWallet } from "@/components/providers/wallet-provider";
import { useBillingHistory } from "@/lib/api/hooks/use-billing";
import { useSubscriptions } from "@/lib/api/hooks/use-subscriptions";
import { normalizeBillingHistory } from "@/lib/billing-history";
import { formatShortDate, formatUsdc } from "@/lib/billing-format";

export default function BillingPage() {
  const { walletAddress } = useWallet();
  const billingQuery = useBillingHistory(walletAddress ? { customer_wallet: walletAddress } : undefined);
  const subscriptionsQuery = useSubscriptions();

  const rows = useMemo(() => normalizeBillingHistory(billingQuery.data), [billingQuery.data]);
  const mySubscriptions = useMemo(
    () => (subscriptionsQuery.data ?? []).filter((sub) => sub.customer_wallet === walletAddress),
    [subscriptionsQuery.data, walletAddress]
  );

  const totalPaid = rows
    .filter((row) => row.status.toUpperCase() === "SUCCESSFUL" || row.status.toUpperCase() === "SUCCESS")
    .reduce((sum, row) => sum + row.amountValue, 0);
  const skipped = rows.filter((row) => row.status.toUpperCase() === "SKIPPED");

  const nextPaymentSub = mySubscriptions
    .filter((sub) => sub.status === "ACTIVE")
    .sort((a, b) => new Date(a.next_payment_time).getTime() - new Date(b.next_payment_time).getTime())[0];

  const stats = [
    { label: "Total paid", value: formatUsdc(totalPaid), sublabel: `${rows.length} payment${rows.length === 1 ? "" : "s"}` },
    {
      label: "Skipped",
      value: String(skipped.length),
      sublabel: skipped[0] ? `${skipped[0].date} · ${skipped[0].merchant}` : "None",
    },
    {
      label: "Next payment",
      value: nextPaymentSub ? formatShortDate(nextPaymentSub.next_payment_time) : "—",
      sublabel: nextPaymentSub ? formatUsdc(nextPaymentSub.amount_usdc) : "No upcoming payments",
    },
  ];

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Text as="p" size="sm" className="text-muted-foreground">
            <Link href="/dashboard" className="hover:text-foreground">
              Home
            </Link>{" "}
            / Billing
          </Text>
          <Text as="h1" weight="bold" className="mt-1 text-2xl">
            Billing history
          </Text>
          <Text as="p" size="sm" className="mt-1 text-muted-foreground">
            Payments taken from your vaults
          </Text>
        </div>

        <AppButton variant="outline" className="min-w-0 rounded-full">
          Export CSV
        </AppButton>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-xl border border-border bg-white grid grid-cols-1 p-4">
            <Text as="p" size="sm" className="text-muted-foreground">
              {stat.label}
            </Text>
            <Text as="p" weight="bold" className="mt-1 text-lg">
              {stat.value}
            </Text>
            <Text as="p" size="sm" className="text-muted-foreground">
              {stat.sublabel}
            </Text>
          </div>
        ))}
      </div>

      <BillingHistoryTable rows={rows} />
    </div>
  );
}

