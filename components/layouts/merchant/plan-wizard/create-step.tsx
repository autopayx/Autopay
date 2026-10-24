import { Text } from "@/components/reuseables/text"

type PlanFormState = {
  planName: string
  description: string
  price: number
  billingInterval: string
  minAllowance: number
  starts: string
  expires: string
}

type PlanFormErrors = Partial<Record<"planName" | "price", string>>

type CreateStepProps = {
  form: PlanFormState
  errors: PlanFormErrors
  onChange: <K extends keyof PlanFormState>(key: K, value: PlanFormState[K]) => void
}

function CreateStep({ form, errors, onChange }: CreateStepProps) {
  const paymentsCount = form.price > 0 ? Math.round(form.minAllowance / form.price) : 0

  return (
    <div className="flex flex-col gap-6">
      {(errors.planName || errors.price) && (
        <div className="rounded-lg border-l-4 border-red-400 bg-red-50 px-4 py-2.5">
          <Text as="p" size="sm" weight="semibold" className="text-red-700">
            Fix {Object.keys(errors).length} things to continue
          </Text>
        </div>
      )}

      <div className="rounded-2xl border border-border bg-white p-6">
        <Text as="h3" weight="semibold">
          Authorization limits
        </Text>

        <Text as="p" size="sm" weight="semibold" className="mt-4 text-muted-foreground">
          Minimum spending allowance
        </Text>
        <div className="mt-1 flex items-center gap-2 rounded-lg border border-border px-3 py-2">
          <input
            type="number"
            value={form.minAllowance}
            onChange={(e) => onChange("minAllowance", Number(e.target.value))}
            className="w-full bg-transparent text-sm font-medium outline-none"
          />
          <span className="shrink-0 text-sm text-muted-foreground">USDC</span>
        </div>
        <Text as="p" size="sm" className="mt-1 text-muted-foreground">
          That&apos;s {paymentsCount} payments of {form.price.toFixed(2)} USDC. Customers can never be charged more
          than this in total.
        </Text>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <Text as="p" size="sm" weight="semibold" className="text-muted-foreground">
              Starts
            </Text>
            <input
              value={form.starts}
              onChange={(e) => onChange("starts", e.target.value)}
              className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm font-medium outline-none"
            />
          </div>
          <div>
            <Text as="p" size="sm" weight="semibold" className="text-muted-foreground">
              Expires
            </Text>
            <input
              value={form.expires}
              onChange={(e) => onChange("expires", e.target.value)}
              className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm font-medium outline-none"
            />
          </div>
        </div>
        <Text as="p" size="sm" className="mt-1 text-muted-foreground">
          12 months after each customer subscribes
        </Text>
      </div>

      <div className="rounded-2xl border border-border bg-white p-6">
        <Text as="h3" weight="semibold">
          Plan details
        </Text>

        <Text as="p" size="sm" weight="semibold" className="mt-4 text-muted-foreground">
          Plan name
        </Text>
        <input
          value={form.planName}
          onChange={(e) => onChange("planName", e.target.value)}
          placeholder="e.g. Monthly membership"
          className={`mt-1 w-full rounded-lg border px-3 py-2 text-sm font-medium outline-none ${
            errors.planName ? "border-red-400" : "border-border"
          }`}
        />
        {errors.planName && (
          <Text as="p" size="sm" className="mt-1 text-red-600">
            {errors.planName}
          </Text>
        )}

        <Text as="p" size="sm" weight="semibold" className="mt-4 text-muted-foreground">
          Description
        </Text>
        <input
          value={form.description}
          onChange={(e) => onChange("description", e.target.value)}
          placeholder="What's included?"
          className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm font-medium outline-none"
        />
        <Text as="p" size="sm" className="mt-1 text-muted-foreground">
          Shown to customers on checkout
        </Text>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <Text as="p" size="sm" weight="semibold" className="text-muted-foreground">
              Price
            </Text>
            <div
              className={`mt-1 flex items-center gap-2 rounded-lg border px-3 py-2 ${
                errors.price ? "border-red-400" : "border-border"
              }`}
            >
              <input
                type="number"
                value={form.price}
                onChange={(e) => onChange("price", Number(e.target.value))}
                className="w-full bg-transparent text-sm font-medium outline-none"
              />
              <span className="shrink-0 text-sm text-muted-foreground">USDC</span>
            </div>
            {errors.price && (
              <Text as="p" size="sm" className="mt-1 text-red-600">
                {errors.price}
              </Text>
            )}
          </div>
          <div>
            <Text as="p" size="sm" weight="semibold" className="text-muted-foreground">
              Billing interval
            </Text>
            <select
              value={form.billingInterval}
              onChange={(e) => onChange("billingInterval", e.target.value)}
              className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm font-medium outline-none"
            >
              <option>Monthly</option>
              <option>Yearly</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}

export { CreateStep }
export type { PlanFormState, PlanFormErrors }
