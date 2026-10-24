import { Banknote, Calendar, CalendarCheck, CalendarX, RefreshCw, Wallet } from "lucide-react"
import { Text } from "@/components/reuseables/text"
import { AppColors } from "@/lib/app_colors"
import type { CheckoutPlanView } from "@/components/layouts/checkout/plan-view"

function CheckoutPlanSummary({ plan, fundedPayments }: { plan: CheckoutPlanView; fundedPayments: number }) {
  const terms = [
    { icon: Banknote, label: "Payment amount", value: `${plan.amount.toFixed(2)} USDC` },
    { icon: RefreshCw, label: "Billing interval", value: plan.intervalLabel },
    { icon: Wallet, label: "Maximum spending allowance", value: `${plan.cap.toFixed(2)} USDC` },
    { icon: Calendar, label: "Starts", value: plan.startsLabel },
    { icon: CalendarX, label: "Expires", value: plan.expiresLabel },
    { icon: CalendarCheck, label: "Merchant wallet", value: plan.receivingWallet },
  ]

  return (
    <div style={{ background: AppColors.blackBlueGradient }} className="flex flex-col gap-6 p-8">
      <Text as="p" size="sm" weight="semibold" className="text-blue-300 uppercase tracking-wide">
        You&apos;re subscribing to
      </Text>

      <div className="-mt-2 flex items-center gap-3">
        <span className="flex size-10 items-center justify-center rounded-lg bg-blue-500 font-semibold text-white">
          {plan.merchantInitials}
        </span>
        <div>
          <Text as="p" weight="bold" className="text-white">
            {plan.merchantName}
          </Text>
          <Text as="p" size="sm" className="text-white/50">
            {plan.merchantWebsite}
          </Text>
        </div>
      </div>

      <div className="rounded-2xl bg-white/5 p-5">
        <div className="flex items-center justify-between">
          <Text as="p" size="sm" className="text-white/50 uppercase tracking-wide">
            Membership plan
          </Text>
          <span className="rounded-md bg-white/10 px-2 py-0.5 text-xs font-medium text-white/70">Testnet</span>
        </div>
        <Text as="p" weight="bold" className="mt-3 text-lg text-white">
          {plan.planName}
        </Text>
        <p className="mt-1 flex items-baseline gap-1">
          <span className="text-3xl font-bold text-white">{plan.amount.toFixed(2)}</span>
          <span className="text-sm font-medium text-white/70">USDC</span>
          <span className="text-sm text-white/50">/ {plan.intervalLabel}</span>
        </p>
      </div>

      <Text as="p" size="sm" className="text-white/60">
        {plan.description}
      </Text>

      <div className="rounded-2xl bg-white/5 p-5">
        <Text as="p" size="sm" weight="semibold" className="mb-3 text-white/50 uppercase tracking-wide">
          Terms
        </Text>
        <div className="flex flex-col divide-y divide-white/10">
          {terms.map((term) => (
            <div key={term.label} className="flex items-center justify-between gap-4 py-2.5">
              <span className="flex shrink-0 items-center gap-2 text-sm text-white/60">
                <term.icon className="size-4 shrink-0" />
                {term.label}
              </span>
              <span className="min-w-0 truncate text-sm font-semibold text-white">{term.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Text as="p" size="sm" weight="semibold" className="text-white/50 uppercase tracking-wide">
          Your first payments
        </Text>
        <div className="mt-4 flex items-center">
          {plan.paymentDates.map((date, i) => (
            <div key={date} className="flex flex-1 flex-col items-center last:flex-none">
              <div className="flex w-full items-center">
                <span
                  className={`size-3 shrink-0 rounded-full border-2 ${
                    i < fundedPayments ? "border-white bg-white" : "border-white/30 bg-transparent"
                  }`}
                />
                {i < plan.paymentDates.length - 1 && (
                  <span className={`h-px flex-1 ${i < fundedPayments - 1 ? "bg-white" : "bg-white/20"}`} />
                )}
              </div>
              <Text as="p" size="sm" className="mt-2 text-white/50">
                {date}
              </Text>
            </div>
          ))}
        </div>
      </div>

      <Text as="p" size="sm" className="text-white/40">
        Powered by AutoPayX · Test USDC on Stellar Testnet
      </Text>
    </div>
  )
}

export { CheckoutPlanSummary }
