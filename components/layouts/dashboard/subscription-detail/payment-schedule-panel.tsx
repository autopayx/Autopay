import { Text } from "@/components/reuseables/text"

type ScheduleItem = { month: string; day: string; amount: string; status: "Funded" | "Needs top-up" }

function PaymentSchedulePanel({ schedule }: { schedule: ScheduleItem[] }) {
  return (
    <div className="rounded-2xl border border-border bg-white p-6">
      <Text as="h3" weight="semibold">
        Payment schedule
      </Text>
      <Text as="p" size="sm" className="text-muted-foreground">
        Funded means your vault covers it.
      </Text>

      <div className="mt-4 flex flex-col divide-y divide-border">
        {schedule.map((item, i) => (
          <div key={i} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
            <div className="flex w-12 shrink-0 flex-col items-center rounded-lg border border-border py-1.5">
              <span className="text-[10px] font-semibold text-muted-foreground">{item.month}</span>
              <span className="text-lg font-bold text-foreground">{item.day}</span>
            </div>
            <Text as="p" weight="semibold" size="sm" className="flex-1">
              {item.amount}
            </Text>
            <span
              className={`flex shrink-0 items-center gap-1.5 text-xs font-medium ${
                item.status === "Funded" ? "text-emerald-600" : "text-amber-600"
              }`}
            >
              <span className={`size-1.5 rounded-full ${item.status === "Funded" ? "bg-emerald-500" : "bg-amber-500"}`} />
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export { PaymentSchedulePanel }
