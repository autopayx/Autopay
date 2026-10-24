import { Text } from "@/components/reuseables/text"
import type { PlanFormState } from "@/components/layouts/merchant/plan-wizard/create-step"

function ReviewStep({ form, paidTo, onEdit }: { form: PlanFormState; paidTo: string; onEdit: () => void }) {
  const paymentsCount = form.price > 0 ? Math.round(form.minAllowance / form.price) : 0

  const rows = [
    { label: "Name", value: form.planName },
    { label: "Price", value: `${form.price.toFixed(2)} USDC` },
    { label: "Billing interval", value: form.billingInterval },
    { label: "Maximum allowance", value: `${form.minAllowance.toFixed(2)} USDC (${paymentsCount} payments)` },
    { label: "Expires", value: form.expires },
    { label: "Paid to", value: paidTo },
  ]

  return (
    <div className="rounded-2xl border border-border bg-white p-6">
      <div className="flex items-center justify-between">
        <Text as="h3" weight="semibold">
          Plan summary
        </Text>
        <button type="button" onClick={onEdit} className="text-sm font-medium text-blue-600 hover:underline">
          Edit
        </button>
      </div>

      <div className="mt-2 flex flex-col divide-y divide-border">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between gap-3 py-2.5 text-sm">
            <span className="shrink-0 text-muted-foreground">{row.label}</span>
            <span className="min-w-0 truncate font-semibold text-foreground">{row.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export { ReviewStep }
