"use client"

import Link from "next/link"
import { AppButton } from "@/components/reuseables/button"
import { Text } from "@/components/reuseables/text"
import { useWallet } from "@/components/providers/wallet-provider"
import { useGatewayProfile } from "@/lib/api/hooks/use-gateway"

function UsageCard() {
  const { walletAddress } = useWallet()
  const profileQuery = useGatewayProfile(walletAddress ?? "")
  const isMerchant = Boolean(profileQuery.data?.is_merchant)

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-2xl border border-border bg-white p-6">
        <Text as="h3" weight="semibold">
          How you use AutoPayX
        </Text>

        <div className="mt-4 flex flex-col gap-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Customer</span>
            <span className="font-semibold text-foreground">Active</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Merchant</span>
            <span className={isMerchant ? "font-semibold text-foreground" : "font-medium text-muted-foreground"}>
              {isMerchant ? "Active" : "Not set up"}
            </span>
          </div>
        </div>

        <AppButton
          variant="outline"
          nativeButton={false}
          render={<Link href={isMerchant ? "/merchant" : "/merchant/onboarding"} />}
          className="mt-4 min-w-0 w-full rounded-full"
        >
          {isMerchant ? "Go to merchant dashboard" : "Set up merchant account"}
        </AppButton>
      </div>

      <div className="rounded-xl border-l-2 border-blue-500 bg-blue-50 p-4">
        <Text as="p" size="sm" weight="semibold" className="text-foreground">
          Disconnecting doesn&apos;t cancel anything
        </Text>
        <Text as="p" size="sm" className="mt-1 text-muted-foreground">
          Your subscriptions and vaults stay on Stellar. Reconnect this wallet anytime to manage them.
        </Text>
      </div>
    </div>
  )
}

export { UsageCard }
