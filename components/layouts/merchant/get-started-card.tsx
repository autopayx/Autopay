import Link from "next/link"
import { AppButton } from "@/components/reuseables/button"
import { Text } from "@/components/reuseables/text"
import type { MerchantProfile } from "@/lib/api/types"

function GetStartedCard({ merchant, firstPlanCode }: { merchant: MerchantProfile; firstPlanCode?: string }) {
  const steps = [
    {
      title: "Create your first plan",
      description: "Price, interval and a maximum allowance.",
      done: merchant.created_first_plan,
      href: "/merchant/plans/new",
      actionLabel: merchant.created_first_plan ? undefined : "Create a plan",
    },
    {
      title: "Share your checkout link",
      description: "Copy a link or embed the Subscribe button.",
      done: merchant.shared_checkout_link,
      href: firstPlanCode ? `/merchant/plans/${firstPlanCode}` : "/merchant/plans",
      actionLabel: merchant.shared_checkout_link ? undefined : "Open checkout integration",
    },
    {
      title: "Test your checkout",
      description: "Try the customer experience on Stellar Testnet.",
      done: merchant.tested_checkout,
      href: firstPlanCode ? `/checkout/${firstPlanCode}` : "/merchant/plans",
      actionLabel: merchant.tested_checkout ? undefined : "Test checkout",
    },
  ]

  const done = steps.filter((step) => step.done).length

  return (
    <div className="flex flex-col rounded-2xl border border-border bg-white p-6">
      <div className="flex items-center justify-between">
        <Text as="h3" weight="semibold">
          Get started
        </Text>
        <Text as="p" size="sm" className="text-muted-foreground">
          {done} of {steps.length} done
        </Text>
      </div>

      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-border">
        <div className="h-full rounded-full bg-blue-500" style={{ width: `${(done / steps.length) * 100}%` }} />
      </div>

      <div className="mt-4 flex flex-col divide-y divide-border">
        {steps.map((step) => (
          <div key={step.title} className="flex items-start gap-3 py-3">
            <span
              className={`mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full border-2 ${
                step.done ? "border-blue-500 bg-blue-500" : "border-border"
              }`}
            >
              {step.done && <span className="size-1.5 rounded-full bg-white" />}
            </span>
            <div className="flex-1">
              <Text as="p" weight="semibold" size="sm">
                {step.title}
              </Text>
              <Text as="p" size="sm" className="text-muted-foreground">
                {step.description}
              </Text>
              {step.actionLabel && (
                <AppButton
                  variant="outline"
                  nativeButton={false}
                  render={<Link href={step.href} />}
                  className="mt-2 min-w-0 rounded-full"
                >
                  {step.actionLabel}
                </AppButton>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export { GetStartedCard }

