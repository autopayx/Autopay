import { Text } from "@/components/reuseables/text"

const EMPTY_STATS = [
  { label: "Total plans", value: "0" },
  { label: "Subscribers", value: "0" },
  { label: "Collected, 30 days", value: "0.00 USDC" },
  { label: "Payments", value: "0" },
]

function MerchantEmptyStats() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {EMPTY_STATS.map((stat) => (
        <div key={stat.label} className="rounded-xl border border-border bg-white p-4 shadow-sm">
          <Text as="p" size="sm" className="text-muted-foreground">
            {stat.label}
          </Text>
          <Text as="p" weight="bold" className="mt-1 text-lg">
            {stat.value}
          </Text>
        </div>
      ))}
    </div>
  )
}

export { MerchantEmptyStats }
