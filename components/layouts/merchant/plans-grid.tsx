"use client"

import Link from "next/link"
import { useState } from "react"
import { Check, Copy } from "lucide-react"
import { Text } from "@/components/reuseables/text"
import { Sparkline } from "@/components/layouts/merchant/sparkline"
import { intervalLabel, formatUsdc } from "@/lib/billing-format"
import { buildCheckoutUrl } from "@/lib/checkout-url"
import type { SubscriptionPlan } from "@/lib/api/types"

type PlanWithCollected = SubscriptionPlan & { collected: number; sparkline: number[] }

function PlansGrid({ plans }: { plans: PlanWithCollected[] }) {
  const primary = plans[0]
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  async function handleCopy(planCode: string, checkoutUrl: string) {
    try {
      await navigator.clipboard.writeText(checkoutUrl)
      setCopiedCode(planCode)
      setTimeout(() => setCopiedCode((current) => (current === planCode ? null : current)), 1500)
    } catch {
      // clipboard API unavailable or blocked by browser permissions; fail silently
    }
  }

  return (
    <div className="rounded-2xl border border-border bg-white p-6">
      <div className="flex items-center justify-between">
        <Text as="h3" weight="semibold">
          Your plans
        </Text>
        <Link href="/merchant/plans" className="text-sm font-medium text-blue-600 hover:underline">
          View all plans
        </Link>
      </div>

      {/* mobile: condensed preview of the primary plan */}
      {primary && (
        <div className="mt-4 sm:hidden">
          <div className="rounded-xl border border-border p-4 shadow-sm">
            <div className="flex items-center justify-between gap-2">
              <Text as="p" weight="semibold" size="sm">
                {primary.name}
              </Text>
              <span
                className={`shrink-0 rounded-md px-2 py-0.5 text-xs font-medium ${
                  primary.status === "ACTIVE" ? "bg-emerald-50 text-emerald-700" : "bg-muted text-muted-foreground"
                }`}
              >
                {primary.status === "ACTIVE" ? "Active" : "Closed"}
              </span>
            </div>
            <Text as="p" size="sm" className="mt-1 text-muted-foreground">
              {formatUsdc(primary.amount_usdc)} / {intervalLabel(primary.billing_interval)} · {primary.subscriber_count} subs
            </Text>
            <div className="mt-3 flex items-center justify-between gap-2 border-t border-border pt-3">
              <span className="truncate text-xs text-muted-foreground">{buildCheckoutUrl(primary.plan_code)}</span>
              <button
                type="button"
                onClick={() => handleCopy(primary.plan_code, buildCheckoutUrl(primary.plan_code))}
                className="flex shrink-0 items-center gap-1 text-xs font-medium text-blue-600 hover:underline"
              >
                {copiedCode === primary.plan_code ? <Check className="size-3" /> : <Copy className="size-3" />}
                {copiedCode === primary.plan_code ? "Copied" : "Copy"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-4 hidden gap-4 sm:grid sm:grid-cols-1 lg:grid-cols-3">
        {plans.map((plan) => (
          <div key={plan.plan_code} className="flex flex-col rounded-2xl border border-border p-4 shadow-sm">
            <div className="flex items-center justify-between gap-2">
              <Text as="p" weight="semibold" size="sm">
                {plan.name}
              </Text>
              <span
                className={`shrink-0 rounded-md px-2 py-0.5 text-xs font-medium ${
                  plan.status === "ACTIVE" ? "bg-emerald-50 text-emerald-700" : "bg-muted text-muted-foreground"
                }`}
              >
                {plan.status === "ACTIVE" ? "Active" : "Closed"}
              </span>
            </div>
            <Text as="p" size="sm" className="text-muted-foreground">
              {formatUsdc(plan.amount_usdc)} / {intervalLabel(plan.billing_interval)}
            </Text>

            <Text as="p" size="sm" className="mt-3 text-muted-foreground">
              Collected
            </Text>
            <div className="flex items-center justify-between gap-2">
              <Text as="p" weight="bold" className="text-lg">
                {formatUsdc(plan.collected)}
              </Text>
              <Sparkline data={plan.sparkline} color={plan.subscriber_count > 0 ? "#3B82F6" : "#9CA3AF"} dashed={plan.subscriber_count === 0} />
            </div>

            <Text as="p" size="sm" className="mt-1 text-muted-foreground">
              {plan.subscriber_count} subscriber{plan.subscriber_count === 1 ? "" : "s"}
            </Text>

            <div className="mt-3 flex items-center justify-between gap-2 border-t border-border pt-3">
              <span className="truncate text-xs text-muted-foreground">{buildCheckoutUrl(plan.plan_code)}</span>
              <button
                type="button"
                onClick={() => handleCopy(plan.plan_code, buildCheckoutUrl(plan.plan_code))}
                className="flex shrink-0 items-center gap-1 text-xs font-medium text-blue-600 hover:underline"
              >
                {copiedCode === plan.plan_code ? <Check className="size-3" /> : <Copy className="size-3" />}
                {copiedCode === plan.plan_code ? "Copied" : "Copy"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export { PlansGrid }
export type { PlanWithCollected }
