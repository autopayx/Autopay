"use client"

import Link from "next/link"
import { Check, Copy } from "lucide-react"
import { AppButton } from "@/components/reuseables/button"
import { Text } from "@/components/reuseables/text"
import { useCopyToClipboard } from "@/lib/use-copy-to-clipboard"

function SuccessStep({ planName, planCode, checkoutLink }: { planName: string; planCode: string; checkoutLink: string }) {
  const { copied, copy } = useCopyToClipboard()

  return (
    <div className="flex flex-1 items-center justify-center p-6">
      <div className="flex w-full max-w-md flex-col items-center gap-4 rounded-2xl border border-border bg-white p-8 text-center">
        <span className="flex size-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <Check className="size-5" />
        </span>
        <Text as="h1" weight="bold" className="text-xl">
          {planName} is now live
        </Text>
        <Text as="p" size="sm" className="text-muted-foreground">
          Share this checkout link with your customers. It belongs to this plan only.
        </Text>

        <div className="w-full text-left">
          <Text as="p" size="sm" weight="semibold" className="text-muted-foreground">
            Checkout link:
          </Text>
          <div className="mt-1 flex items-center gap-2">
            <div className="flex-1 truncate rounded-lg bg-muted px-3 py-2 font-mono text-sm text-foreground">
              {checkoutLink}
            </div>
            <AppButton
              variant="outline"
              className="min-w-0 shrink-0 rounded-full"
              onClick={() => copy(checkoutLink)}
            >
              {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
              {copied ? "Copied" : "Copy"}
            </AppButton>
          </div>
        </div>

        <div className="flex w-full flex-col gap-2">
          <AppButton
            render={<Link href={`/checkout/${planCode}`} />}
            nativeButton={false}
            className="w-full rounded-full bg-blue-500 text-white hover:bg-blue-600"
          >
            Test checkout
          </AppButton>
          <AppButton
            variant="outline"
            render={<Link href={`/merchant/plans/${planCode}`} />}
            nativeButton={false}
            className="w-full rounded-full"
          >
            View plan
          </AppButton>
        </div>

        <Text as="p" size="sm" className="text-muted-foreground">
          You can find this link on the plan page or in checkout.
        </Text>
      </div>
    </div>
  )
}

export { SuccessStep }
