import Link from "next/link"
import { AppButton } from "@/components/reuseables/button"
import { Text } from "@/components/reuseables/text"
import { AppColors } from "@/lib/app_colors"

function FinalCta() {
  return (
    <section style={{ background: AppColors.appBackgroundColor }} className="pt-10 pb-20">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6 rounded-3xl bg-white p-12 text-center shadow-sm sm:p-16">
          <Text as="h2" className="max-w-2xl text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Recurring USDC payments, without the guesswork.
          </Text>
          <AppButton
            nativeButton={false}
            render={<Link href="/onboarding" />}
            className="rounded-full bg-[#0B1F3A] text-white hover:bg-[#0B1F3A]/90"
          >
            Get started
          </AppButton>
        </div>
      </div>
    </section>
  )
}

export { FinalCta }
