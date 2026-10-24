"use client"

import Link from "next/link"
import { Check, Copy } from "lucide-react"
import { AppButton } from "@/components/reuseables/button"
import { Text } from "@/components/reuseables/text"
import { useCopyToClipboard } from "@/lib/use-copy-to-clipboard"

function CheckoutLinkCard({ checkoutLink, planCode }: { checkoutLink: string; planCode: string }) {
  const { copied, copy } = useCopyToClipboard()

  return (
    <div className="rounded-2xl border border-border bg-white p-6">
      <Text as="p" weight="semibold" size="sm">
        Checkout link for this plan
      </Text>
      <div className="mt-3 flex flex-col gap-2 sm:flex-row">
        <div className="flex flex-1 items-center rounded-lg bg-muted px-3 py-2">
          <span className="truncate font-mono text-sm text-foreground">{checkoutLink}</span>
        </div>
        <div className="flex gap-2">
          <AppButton variant="outline" className="min-w-0 rounded-full" onClick={() => copy(checkoutLink)}>
            {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
            {copied ? "Copied" : "Copy"}
          </AppButton>
          <AppButton
            variant="outline"
            nativeButton={false}
            render={<Link href={`/checkout/${planCode}`} />}
            className="min-w-0 rounded-full"
          >
            Test checkout
          </AppButton>
        </div>
      </div>
    </div>
  )
}

export { CheckoutLinkCard }
