import { Text } from "@/components/reuseables/text"
import type { PlanDetail } from "@/components/layouts/merchant/plan-detail/data"

function PlanDetailStats({ stats }: { stats: PlanDetail["stats"] }) {
  const cards = [
    { label: "Active subscribers", value: String(stats.activeSubscribers), sublabel: stats.subscribersNote },
    { label: "Collected, 30 days", value: stats.collected30d, sublabel: `${stats.paymentsCount} payments` },
    { label: "Next 7 days", value: stats.next7days, sublabel: `${stats.chargesCount} charges` },
    { label: "Failed or skipped", value: String(stats.failedOrSkipped), sublabel: "Needs a look", danger: stats.failedOrSkipped > 0 },
  ]

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {cards.map((card) => (
        <div key={card.label} className="rounded-xl border border-border bg-white p-4">
          <Text as="p" size="sm" className="text-muted-foreground">
            {card.label}
          </Text>
          <Text as="p" weight="bold" className={`mt-1 text-lg ${card.danger ? "text-red-600" : ""}`}>
            {card.value}
          </Text>
          <Text as="p" size="sm" className={card.danger ? "text-red-500" : "text-muted-foreground"}>
            {card.sublabel}
          </Text>
        </div>
      ))}
    </div>
  )
}

export { PlanDetailStats }
