import { Text } from "@/components/reuseables/text"

type Stat = { label: string; value: string; sublabel: string; danger?: boolean }

function BillingStats({ mobileStats, desktopStats }: { mobileStats: Stat[]; desktopStats: Stat[] }) {
  return (
    <>
      <div className="grid grid-cols-2 gap-4 sm:hidden">
        {mobileStats.map((stat) => (
          <div key={stat.label} className="rounded-xl border border-border bg-white p-4">
            <Text as="p" size="sm" className="text-muted-foreground">
              {stat.label}
            </Text>
            <Text as="p" weight="bold" className={`mt-1 text-lg ${stat.danger ? "text-red-600" : ""}`}>
              {stat.value}
            </Text>
            <Text as="p" size="sm" className={stat.danger ? "text-red-500" : "text-muted-foreground"}>
              {stat.sublabel}
            </Text>
          </div>
        ))}
      </div>

      <div className="hidden gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-4">
        {desktopStats.map((stat) => (
          <div key={stat.label} className="rounded-xl border border-border bg-white p-4">
            <Text as="p" size="sm" className="text-muted-foreground">
              {stat.label}
            </Text>
            <Text as="p" weight="bold" className={`mt-1 text-lg ${stat.danger ? "text-red-600" : ""}`}>
              {stat.value}
            </Text>
            <Text as="p" size="sm" className={stat.danger ? "text-red-500" : "text-muted-foreground"}>
              {stat.sublabel}
            </Text>
          </div>
        ))}
      </div>
    </>
  )
}

export { BillingStats }
export type { Stat }

