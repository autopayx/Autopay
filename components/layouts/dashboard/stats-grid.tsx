import { Text } from "@/components/reuseables/text"

type Stat = { label: string; shortLabel?: string; value: string; sublabel?: string }

function StatsGrid({ stats, loading = false }: { stats: Stat[]; loading?: boolean }) {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.label} className="rounded-xl border border-border bg-white p-4">
          {loading ? (
            <>
              <div className="h-3 w-20 animate-pulse rounded bg-muted" />
              <div className="mt-2 h-5 w-14 animate-pulse rounded bg-muted" />
            </>
          ) : (
            <>
              <Text as="p" size="sm" className="text-muted-foreground">
                {stat.shortLabel ? (
                  <>
                    <span className="lg:hidden">{stat.shortLabel}</span>
                    <span className="hidden lg:inline">{stat.label}</span>
                  </>
                ) : (
                  stat.label
                )}
              </Text>
              <Text as="p" weight="bold" className="mt-1 text-lg">
                {stat.value}
              </Text>
              {stat.sublabel && (
                <Text as="p" size="sm" className="text-muted-foreground">
                  {stat.sublabel}
                </Text>
              )}
            </>
          )}
        </div>
      ))}
    </div>
  )
}

export { StatsGrid }
