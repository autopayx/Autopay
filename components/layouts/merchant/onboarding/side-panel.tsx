import { RefreshCw } from "lucide-react"
import { Text } from "@/components/reuseables/text"
import { AppColors } from "@/lib/app_colors"
import { STEPS } from "@/components/layouts/merchant/onboarding/data"

function OnboardingSidePanel({ step }: { step: number }) {
  return (
    <div style={{ background: AppColors.blackBlueGradient }} className="flex flex-col justify-between p-8 lg:min-h-screen">
      <div>
        <div className="flex items-center gap-2">
          <span className="flex size-7 items-center justify-center rounded-lg bg-blue-500 text-white">
            <RefreshCw className="size-3.5" />
          </span>
          <Text as="span" weight="bold" className="text-white">
            AutoPayX
          </Text>
        </div>

        <Text as="h1" weight="bold" className="mt-8 text-2xl text-white">
          Set up recurring USDC payments in minutes.
        </Text>
        <Text as="p" size="sm" className="mt-2 text-white/60">
          Create a plan, share one link, and get paid on schedule.
        </Text>

        <div className="mt-10 flex flex-col gap-6">
          {STEPS.map((item, i) => {
            const stepNumber = i + 1
            const done = stepNumber < step
            const active = stepNumber === step
            return (
              <div key={item.title} className="flex items-start gap-3">
                <span
                  className={`flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                    done || active ? "bg-blue-500 text-white" : "border border-white/30 text-white/50"
                  }`}
                >
                  {done ? "✓" : stepNumber}
                </span>
                <div>
                  <Text as="p" weight="semibold" size="sm" className={active || done ? "text-white" : "text-white/50"}>
                    {item.title}
                  </Text>
                  <Text as="p" size="sm" className="text-white/40">
                    {item.description}
                  </Text>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <Text as="p" size="sm" className="text-white/40">
        Stellar Testnet · No real funds are used.
      </Text>
    </div>
  )
}

export { OnboardingSidePanel }
