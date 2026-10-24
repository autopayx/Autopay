import Link from "next/link"
import { AppButton } from "@/components/reuseables/button"
import { Text } from "@/components/reuseables/text"
import { AppColors } from "@/lib/app_colors"

function PickYourWayIn() {
  return (
    <section style={{ background: AppColors.appBackgroundColor }} className="py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Text as="p" size="sm" weight="semibold" className="text-center text-blue-600 uppercase tracking-wide">
          Built for both sides
        </Text>
        <Text as="h2" className="mt-2 text-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Pick your way in
        </Text>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div id="merchants" className="flex flex-col rounded-2xl border border-border bg-white p-8 shadow-sm">
            <Text as="h3" weight="semibold" className="text-xl">
              For merchants
            </Text>
            <Text as="p" size="sm" className="mt-2 text-muted-foreground">
              Collect recurring USDC without a card processor.
            </Text>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-muted p-4">
                <Text as="p" size="sm" className="text-muted-foreground">
                  Active subscribers
                </Text>
                <Text as="p" weight="semibold" className="mt-1 text-lg">
                  148
                </Text>
              </div>
              <div className="rounded-lg bg-muted p-4">
                <Text as="p" size="sm" className="text-muted-foreground">
                  Collected, 30 days
                </Text>
                <Text as="p" weight="semibold" className="mt-1 text-lg">
                  3,600 USDC
                </Text>
              </div>
            </div>

            <AppButton
              nativeButton={false}
              render={<Link href="/merchant/onboarding" />}
              className="mt-6 w-full rounded-full bg-[#0B1F3A] text-white hover:bg-[#0B1F3A]/90"
            >
              Start accepting payments
            </AppButton>
          </div>

          <div id="customers" className="flex flex-col rounded-2xl border border-border bg-white p-8 shadow-sm">
            <Text as="h3" weight="semibold" className="text-xl">
              For customers
            </Text>
            <Text as="p" size="sm" className="mt-2 text-muted-foreground">
              Know the most that can ever be charged. Pause or cancel anytime.
            </Text>

            <div className="mt-8 rounded-lg bg-muted p-4">
              <Text as="p" size="sm" className="text-muted-foreground">
                Next payment · Oct 28
              </Text>
              <Text as="p" weight="semibold" className="mt-1 text-lg">
                25.00 USDC
              </Text>
              <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-border">
                <div className="h-full w-1/4 rounded-full bg-blue-500" />
              </div>
              <Text as="p" size="sm" className="mt-2 text-muted-foreground">
                75.00 of 300.00 USDC allowance used
              </Text>
            </div>

            <AppButton
              variant="outline"
              nativeButton={false}
              render={<Link href="/dashboard" />}
              className="mt-6 w-full rounded-full"
            >
              Open a customer dashboard
            </AppButton>
          </div>
        </div>
      </div>
    </section>
  )
}

export { PickYourWayIn }
