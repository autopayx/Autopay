import { Text } from "@/components/reuseables/text"
import type { PlanDetail } from "@/components/layouts/merchant/plan-detail/data"

function PlanTermsCard({ terms }: { terms: PlanDetail["terms"] }) {
  const rows = [
    { label: "Price", value: terms.price },
    { label: "Interval", value: terms.interval },
    { label: "Max allowance", value: terms.maxAllowance },
    { label: "Expires", value: terms.expires },
  ]

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-2xl border border-border bg-white p-6">
        <Text as="h3" weight="semibold">
          Plan terms
        </Text>
        <div className="mt-2 flex flex-col divide-y divide-border">
          {rows.map((row) => (
            <div key={row.label} className="flex items-center justify-between py-2.5 text-sm">
              <span className="text-muted-foreground">{row.label}</span>
              <span className="font-semibold text-foreground">{row.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border-l-2 border-blue-500 bg-blue-50 p-4">
        <Text as="p" size="sm" weight="semibold" className="text-foreground">
          Editing affects new subscribers only
        </Text>
        <Text as="p" size="sm" className="mt-1 text-muted-foreground">
          Existing subscribers keep their authorization.
        </Text>
      </div>
    </div>
  )
}

export { PlanTermsCard }
