import { Text } from "@/components/reuseables/text"
import { Sparkline } from "@/components/layouts/merchant/sparkline"

type MerchantStat = { label: string; shortLabel: string; value: string; sublabel: string; sparkline: number[]; danger?: boolean }

function MerchantStatsGrid({ stats }: { stats: MerchantStat[] }) {
  // mobile only shows the two headline stats; desktop shows the full row
  const mobileStats = [stats[1], stats[2]].filter(Boolean)

  return (
    <>
      <div className="grid grid-cols-2 gap-4 sm:hidden">
        {mobileStats.map((stat) => (
          <div key={stat.label} className="rounded-xl border border-border bg-white p-4 shadow-sm">
            <Text as="p" size="sm" className="text-muted-foreground">
              {stat.shortLabel}
            </Text>
            <p className="mt-1 flex items-baseline gap-1.5">
              <span className="text-lg font-bold text-foreground">{stat.value}</span>
              <span className="text-sm text-muted-foreground">{stat.sublabel}</span>
            </p>
          </div>
        ))}
      </div>

      <div className="hidden gap-4 sm:grid sm:grid-cols-3 lg:grid-cols-5">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-xl border border-border bg-white p-4 shadow-sm">
            <Text as="p" size="sm" className="text-muted-foreground">
              {stat.label}
            </Text>
            <p className="mt-1 flex items-baseline gap-1.5">
              <span className={`text-lg font-bold ${stat.danger ? "text-red-600" : "text-foreground"}`}>
                {stat.value}
              </span>
              <span className={`text-sm ${stat.danger ? "text-red-500" : "text-muted-foreground"}`}>
                {stat.sublabel}
              </span>
            </p>
            <div className="mt-2">
              <Sparkline data={stat.sparkline} color={stat.danger ? "#DC2626" : "#3B82F6"} />
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export { MerchantStatsGrid }
export type { MerchantStat }

