import Link from "next/link"
import { Check } from "lucide-react"
import { AppButton } from "@/components/reuseables/button"
import { Text } from "@/components/reuseables/text"
import type { CheckoutPlanView } from "@/components/layouts/checkout/plan-view"

function CheckoutSuccessCard({
  plan,
  subCode,
  explorerUrl,
  paymentsToFund,
}: {
  plan: CheckoutPlanView
  subCode: string
  explorerUrl?: string
  paymentsToFund: number
}) {
  const upcoming = plan.paymentDates.slice(0, Math.min(paymentsToFund, 3))

  return (
    <div className="flex flex-1 items-center justify-center bg-muted/30 p-6">
      <div className="w-full max-w-md rounded-2xl border border-border bg-white p-8">
        <div className="flex flex-col items-center text-center">
          <span className="flex size-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
            <Check className="size-5" />
          </span>
          <Text as="h1" weight="bold" className="mt-3 text-xl">
            You&apos;re subscribed
          </Text>
          <Text as="p" size="sm" className="text-muted-foreground">
            {plan.merchantName} · {plan.planName}
          </Text>
        </div>

        <div className="mt-6 flex flex-col gap-2">
          <div className="flex items-center justify-between rounded-lg border-l-2 border-emerald-500 bg-emerald-50 px-3 py-2">
            <Text as="p" weight="semibold" size="sm">
              Subscription authorized
            </Text>
            <span className="text-xs font-semibold text-emerald-700">Done</span>
          </div>
          <div className="flex items-center justify-between rounded-lg border-l-2 border-amber-500 bg-amber-50 px-3 py-2">
            <div>
              <Text as="p" weight="semibold" size="sm">
                First payment
              </Text>
              <Text as="p" size="sm" className="text-muted-foreground">
                Next eligible payment: {plan.paymentDates[0]}
              </Text>
            </div>
            <span className="text-xs font-semibold text-amber-700">Pending</span>
          </div>
        </div>

        <Text as="p" size="sm" className="mt-4 text-muted-foreground">
          Approving a subscription isn&apos;t the same as paying. Each payment is taken from your vault on its
          due date and shows up in Billing history.
        </Text>

        <Text as="p" size="sm" weight="semibold" className="mt-6 text-muted-foreground uppercase tracking-wide">
          Coming up
        </Text>
        <div className="mt-2 flex flex-col divide-y divide-border">
          {upcoming.map((date, i) => (
            <div key={date} className="flex items-center gap-3 py-2.5">
              <div className="flex w-12 shrink-0 flex-col items-center rounded-lg border border-border py-1">
                <span className="text-[10px] font-semibold text-muted-foreground">
                  {date.split(" ")[0].toUpperCase()}
                </span>
                <span className="text-sm font-bold text-foreground">{date.split(" ")[1]}</span>
              </div>
              <Text as="p" weight="semibold" size="sm" className="flex-1">
                Payment {i + 1}
              </Text>
              <Text as="p" weight="semibold" size="sm">
                {plan.amount.toFixed(2)} USDC
              </Text>
            </div>
          ))}
        </div>

        <div className="mt-4 flex flex-col gap-2 border-t border-border pt-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Subscription ID</span>
            <span className="font-medium text-foreground">{subCode}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Authorized spending limit</span>
            <span className="font-semibold text-foreground">{plan.cap.toFixed(2)} USDC</span>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-2">
          <AppButton
            render={<Link href={`/dashboard/subscriptions/${subCode}`} />}
            nativeButton={false}
            className="w-full rounded-full bg-blue-500 text-white hover:bg-blue-600"
          >
            View subscription
          </AppButton>
          {explorerUrl && (
            <AppButton
              variant="outline"
              render={<a href={explorerUrl} target="_blank" rel="noopener noreferrer" />}
              nativeButton={false}
              className="w-full rounded-full"
            >
              View on Stellar Explorer
            </AppButton>
          )}
        </div>
      </div>
    </div>
  )
}

export { CheckoutSuccessCard }
