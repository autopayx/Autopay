import { Text } from "@/components/reuseables/text"

type DayForecast = { day: string; amount: number }

function Next7DaysCard({ forecast, chargeCount, lowVaultCount }: { forecast: DayForecast[]; chargeCount: number; lowVaultCount: number }) {
  const total = forecast.reduce((sum, day) => sum + day.amount, 0)
  const max = Math.max(...forecast.map((day) => day.amount), 1)

  return (
    <div className="flex flex-col rounded-2xl border border-border bg-white p-6">
      <Text as="h3" weight="semibold">
        Next 7 days
      </Text>

      <Text as="p" weight="bold" className="mt-3 text-2xl">
        {total.toFixed(2)} USDC
      </Text>
      <Text as="p" size="sm" className="text-muted-foreground">
        {chargeCount} charge{chargeCount === 1 ? "" : "s"} upcoming
      </Text>

      <div className="mt-6 flex h-28 items-end gap-2">
        {forecast.map((day) => (
          <div key={day.day} className="flex flex-1 flex-col items-center gap-1.5">
            <div
              className={`w-full rounded-t-sm ${day.amount === max ? "bg-blue-500" : "bg-blue-200"}`}
              style={{ height: `${(day.amount / max) * 100}%` }}
            />
            <Text as="p" size="sm" className="text-muted-foreground">
              {day.day}
            </Text>
          </div>
        ))}
      </div>

      {lowVaultCount > 0 && (
        <div className="mt-4 rounded-lg border-l-2 border-amber-400 bg-amber-50 p-3">
          <Text as="p" size="sm" className="text-amber-800">
            {lowVaultCount} subscriber{lowVaultCount === 1 ? "" : "s"} {lowVaultCount === 1 ? "has" : "have"} a low vault balance and may be skipped.
          </Text>
        </div>
      )}
    </div>
  )
}

export { Next7DaysCard }
export type { DayForecast }
