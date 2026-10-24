import { Eye, Lock, Receipt, RefreshCw } from "lucide-react"
import { Text } from "@/components/reuseables/text"
import { AppColors } from "@/lib/app_colors"

// curved dashed line connecting a card to the next one, which sits lower ("down") or higher ("up")
function Connector({ direction }: { direction: "down" | "up" }) {
  const path = direction === "down" ? "M2 16 C 40 16, 24 84, 62 84" : "M2 84 C 40 84, 24 16, 62 16"
  const dotCy = direction === "down" ? 84 : 16

  return (
    <div className={`hidden w-16 shrink-0 self-center lg:block ${direction === "down" ? "-mt-10" : "mt-10"}`}>
      <svg width='64' height='100' viewBox='0 0 64 100' fill='none'>
        <path d={path} stroke='#93C5FD' strokeWidth='2' strokeDasharray='5 5' />
        <circle cx='62' cy={dotCy} r='4' fill='#3B82F6' />
      </svg>
    </div>
  )
}

function StepNumber({ value }: { value: string }) {
  return <span className="text-5xl font-bold text-foreground/10">{value}</span>
}

function HowItWorks() {
  return (
    <section id="how-it-works" style={{ background: AppColors.appBackgroundColor }} className="py-20">
      <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
        <Text as="p" size="sm" weight="semibold" className="text-blue-600 uppercase tracking-wide">
          How it works
        </Text>
        <Text as="h2" className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Four steps. One approval.
        </Text>

        <div className="mt-12 flex flex-col items-center gap-6 lg:flex-row lg:items-start lg:justify-center lg:gap-0">
          <div className="flex h-[408px] w-full flex-col rounded-2xl border border-border bg-white p-6 text-left shadow-sm lg:w-64">
            <div className="mb-8 flex items-start justify-between">
              <span className="flex size-10 items-center justify-center rounded-lg bg-blue-500 text-white">
                <Receipt className="size-5" />
              </span>
              <StepNumber value="01" />
            </div>
            <Text as="h3" weight="semibold" className="text-lg">
              Merchant creates a plan
            </Text>
            <Text as="p" size="sm" className="mt-2 text-muted-foreground">
              Set the price, billing interval and spending cap.
            </Text>
            <div className="mt-auto flex gap-2 border-t border-border pt-4">
              <span className="rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground">25 USDC</span>
              <span className="rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground">Monthly</span>
            </div>
          </div>

          <Connector direction="down" />

          <div className="flex h-[408px] w-full flex-col rounded-2xl border border-border bg-white p-6 text-left shadow-sm lg:mt-20 lg:w-64">
            <div className="mb-8 flex items-start justify-between">
              <span className="flex size-10 items-center justify-center rounded-lg bg-blue-500 text-white">
                <Eye className="size-5" />
              </span>
              <StepNumber value="02" />
            </div>
            <Text as="h3" weight="semibold" className="text-lg">
              Customer reviews the terms
            </Text>
            <Text as="p" size="sm" className="mt-2 text-muted-foreground">
              They see exactly what they&apos;re approving before connecting a wallet.
            </Text>
            <div className="mt-auto border-t border-border pt-4">
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="size-1.5 rounded-full bg-emerald-500" />
                Nothing is charged yet
              </span>
            </div>
          </div>

          <Connector direction="up" />

          <div className="relative flex h-[408px] w-full flex-col rounded-2xl bg-[#0B1F3A] p-6 text-left shadow-lg lg:w-64">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-blue-500 px-3 py-1 text-xs font-medium whitespace-nowrap text-white">
              The one approval
            </span>
            <div className="mb-8 flex items-start justify-between">
              <span className="flex size-10 items-center justify-center rounded-lg bg-blue-500 text-white">
                <Lock className="size-5" />
              </span>
              <span className="text-5xl font-bold text-white/10">03</span>
            </div>
            <Text as="h3" weight="semibold" className="text-lg text-white">
              Fund a vault, approve once
            </Text>
            <Text as="p" size="sm" className="mt-2 text-white/60">
              No signing for every renewal.
            </Text>
            <div className="mt-auto flex flex-col gap-2 pt-4">
              <div className="flex gap-1">
                {Array.from({ length: 12 }).map((_, i) => (
                  <span
                    key={i}
                    className={`h-1.5 flex-1 rounded-full ${i < 3 ? "bg-blue-500" : "bg-white/15"}`}
                  />
                ))}
              </div>
              <Text as="p" size="sm" className="text-white/60">
                3 of 12 payments funded
              </Text>
            </div>
          </div>

          <Connector direction="down" />

          <div className="flex h-[408px] w-full flex-col rounded-2xl border border-border bg-white p-6 text-left shadow-sm lg:mt-20 lg:w-64">
            <div className="mb-8 flex items-start justify-between">
              <span className="flex size-10 items-center justify-center rounded-lg bg-blue-500 text-white">
                <RefreshCw className="size-5" />
              </span>
              <StepNumber value="04" />
            </div>
            <Text as="h3" weight="semibold" className="text-lg">
              Payments run automatically
            </Text>
            <Text as="p" size="sm" className="mt-2 text-muted-foreground">
              Pause, cancel, or withdraw unspent funds anytime.
            </Text>
            <div className="mt-auto border-t border-border pt-4">
              <span className="inline-flex items-center rounded-md border-l-2 border-emerald-500 bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700">
                Next: Oct 28
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export { HowItWorks }
