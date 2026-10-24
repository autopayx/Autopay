import Image from "next/image"
import Link from "next/link"
import { CircleCheckBig, ListChecks } from "lucide-react"
import { Navbar } from "@/components/layouts/landing/navbar"
import { AppButton } from "@/components/reuseables/button"
import { Text } from "@/components/reuseables/text"
import { AppColors } from "@/lib/app_colors"
import { AppImages } from "@/lib/app_images"

const CHECKLIST = [
  { label: "Paid in USDC", icon: CircleCheckBig },
  { label: "You approve once", icon: CircleCheckBig },
  { label: "Pause or cancel anytime", icon: ListChecks },
]

function Hero() {
  return (
    <section style={{ background: AppColors.appBackgroundColor }}>
      <Navbar />

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 pt-10 pb-20 lg:grid-cols-2 lg:gap-8 lg:px-8 lg:pt-16">
        <div className="flex flex-col items-start gap-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-white/70 px-3 py-1 text-xs text-muted-foreground">
            <span className="size-2 rounded-full bg-emerald-500" />
            Live on Stellar Testnet
          </span>

          <Text as="h1" className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Recurring payments,{" "}
            <span className="text-blue-600">powered by Stellar.</span>
          </Text>

          <Text as="p" className="max-w-md text-muted-foreground">
            Let customers subscribe once and pay in USDC automatically, with limits they
            control.
          </Text>

          <div className="flex flex-col gap-3 sm:flex-row">
            <AppButton
              render={<Link href="/onboarding" />}
              nativeButton={false}
              style={{ background: AppColors.grayBlueGradient }}
              className="text-white"
            >
              Get started
            </AppButton>
            <AppButton variant="outline" render={<Link href="/merchant/plans" />} nativeButton={false}>
              Explore checkout demo
            </AppButton>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {CHECKLIST.map(({ label, icon: Icon }) => (
              <span key={label} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Icon className="size-3.5 text-blue-600" />
                {label}
              </span>
            ))}
          </div>
        </div>

        <Image
          src={AppImages.heroImage}
          alt="AutoPayX subscription vault preview"
          width={770}
          height={598}
          priority
          className="h-auto w-full"
        />
      </div>
    </section>
  )
}

export { Hero }
