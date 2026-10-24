"use client"

import { useMemo } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { User, Wallet } from "lucide-react"
import { Text } from "@/components/reuseables/text"
import { RoleCard } from "@/components/layouts/onboarding/role-card"
import { ConnectWalletCard } from "@/components/layouts/dashboard/connect-wallet-card"
import { useWallet } from "@/components/providers/wallet-provider"
import { useSubscriptions } from "@/lib/api/hooks/use-subscriptions"
import { usePlans } from "@/lib/api/hooks/use-plans"
import { useMyMerchant } from "@/lib/api/hooks/use-my-merchant"
import { formatShortDate } from "@/lib/billing-format"

function WelcomeBack() {
  const router = useRouter()
  const { walletAddress } = useWallet()
  const { merchant } = useMyMerchant(walletAddress)
  const subscriptionsQuery = useSubscriptions()
  const plansQuery = usePlans()

  const mySubscriptions = useMemo(
    () => (subscriptionsQuery.data ?? []).filter((sub) => sub.customer_wallet === walletAddress),
    [subscriptionsQuery.data, walletAddress]
  )
  const merchantPlans = useMemo(
    () => (plansQuery.data ?? []).filter((plan) => plan.merchant_id === merchant?.merchant_id),
    [plansQuery.data, merchant]
  )
  const merchantSubscriptions = useMemo(
    () => (subscriptionsQuery.data ?? []).filter((sub) => sub.merchant_id === merchant?.merchant_id),
    [subscriptionsQuery.data, merchant]
  )

  const activeSubscriptions = mySubscriptions.filter((sub) => sub.status === "ACTIVE")
  const nextPayment = activeSubscriptions
    .slice()
    .sort((a, b) => new Date(a.next_payment_time).getTime() - new Date(b.next_payment_time).getTime())[0]

  if (!walletAddress) {
    return (
      <main className="flex flex-1 flex-col items-center bg-muted/30 px-6 py-16">
        <Text as="p" size="sm" weight="semibold" className="text-blue-600 uppercase tracking-wide">
          Connect your wallet
        </Text>
        <Text as="h1" className="mt-2 text-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Welcome back
        </Text>
        <div className="mt-10">
          <ConnectWalletCard />
        </div>
      </main>
    )
  }

  return (
    <main className="flex flex-1 flex-col items-center bg-muted/30 px-6 py-16">
      <Text as="p" size="sm" weight="semibold" className="text-blue-600 uppercase tracking-wide">
        Wallet connected
      </Text>
      <Text as="h1" className="mt-2 text-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        Welcome back
      </Text>
      <Text as="p" className="mt-2 max-w-md text-center text-muted-foreground">
        This wallet is a customer{merchant ? " and a merchant." : "."}
      </Text>

      <div className="mt-10 grid w-full max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2">
        <RoleCard
          icon={User}
          iconClassName="bg-blue-500"
          title="Customer"
          description="Your subscriptions and vaults."
          meta={
            nextPayment
              ? `${activeSubscriptions.length} active · next payment ${formatShortDate(nextPayment.next_payment_time)}`
              : `${activeSubscriptions.length} active`
          }
          buttonLabel="Open customer dashboard"
          buttonVariant="solid"
          onSelect={() => router.push("/dashboard")}
        />
        {merchant ? (
          <RoleCard
            icon={Wallet}
            iconClassName="bg-[#0B1F3A]"
            title={merchant.business_name}
            description="Merchant dashboard."
            meta={`${merchantPlans.length} plans · ${merchantSubscriptions.length} subscribers`}
            buttonLabel="Open merchant dashboard"
            buttonVariant="outline"
            onSelect={() => router.push("/merchant")}
          />
        ) : (
          <RoleCard
            icon={Wallet}
            iconClassName="bg-[#0B1F3A]"
            title="Become a merchant"
            description="Create plans and collect recurring USDC."
            buttonLabel="Set up merchant account"
            buttonVariant="outline"
            onSelect={() => router.push("/merchant/onboarding")}
          />
        )}
      </div>

      <Text as="p" size="sm" className="mt-8 text-muted-foreground">
        Wrong wallet?{" "}
        <Link href="/onboarding" className="font-medium text-blue-600 hover:underline">
          Switch wallet
        </Link>
      </Text>
    </main>
  )
}

export { WelcomeBack }
