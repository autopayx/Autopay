"use client"

import { useState } from "react"
import { Text } from "@/components/reuseables/text"
import { PlanTermsCard } from "@/components/layouts/merchant/plan-detail/plan-terms-card"
import { RecentSubscribersTable } from "@/components/layouts/merchant/plan-detail/recent-subscribers-table"
import type { PlanDetail } from "@/components/layouts/merchant/plan-detail/data"

const TABS = ["Overview", "Subscribers", "Payments"] as const

function PlanDetailTabs({ plan }: { plan: PlanDetail }) {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Overview")

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-6 border-b border-border">
        {TABS.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setTab(item)}
            className={`-mb-px border-b-2 pb-2 text-sm font-medium ${
              tab === item ? "border-blue-600 text-blue-600" : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {tab === "Overview" && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
          <RecentSubscribersTable subscribers={plan.recentSubscribers} />
          <PlanTermsCard terms={plan.terms} />
        </div>
      )}

      {tab === "Subscribers" && <RecentSubscribersTable subscribers={plan.recentSubscribers} />}

      {tab === "Payments" && (
        <div className="rounded-2xl border border-border bg-white p-6">
          <Text as="p" size="sm" className="text-muted-foreground">
            Payment history for this plan appears here.
          </Text>
        </div>
      )}
    </div>
  )
}

export { PlanDetailTabs }
