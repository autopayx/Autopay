"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { User, Wallet } from "lucide-react"
import { Text } from "@/components/reuseables/text"
import { RoleCard } from "@/components/layouts/onboarding/role-card"
import { ConnectWalletCard } from "@/components/layouts/dashboard/connect-wallet-card"
import { useWallet } from "@/components/providers/wallet-provider"
import { usePatchGatewayProfile } from "@/lib/api/hooks/use-gateway"

function ChooseRole() {
  const router = useRouter()
  const { walletAddress } = useWallet()
  const patchProfile = usePatchGatewayProfile(walletAddress ?? "")

  async function handleSelect(role: "CUSTOMER" | "MERCHANT") {
    if (!walletAddress) return
    try {
      await patchProfile.mutateAsync(
        role === "CUSTOMER" ? { is_customer: true, active_role: "CUSTOMER" } : { is_merchant: true, active_role: "MERCHANT" }
      )
    } catch {
      // best-effort: still continue to the chosen dashboard even if the profile update fails
    }
    router.push(role === "CUSTOMER" ? "/dashboard" : "/merchant/onboarding")
  }

  return (
    <main className="flex flex-1 flex-col items-center bg-muted/30 px-6 py-16">
      <Text as="p" size="sm" weight="semibold" className="text-blue-600 uppercase tracking-wide">
        {walletAddress ? "Wallet connected" : "Connect your wallet"}
      </Text>
      <Text as="h1" className="mt-2 text-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        How will you use AutoPayX?
      </Text>
      <Text as="p" className="mt-2 max-w-md text-center text-muted-foreground">
        This wallet is new here. Pick one. You can add the other later in settings.
      </Text>

      {!walletAddress ? (
        <div className="mt-10">
          <ConnectWalletCard />
        </div>
      ) : (
        <div className="mt-10 grid w-full max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2">
          <RoleCard
            icon={User}
            iconClassName="bg-blue-500"
            title="I'm a customer"
            description="Subscribe to plans and manage them in one place."
            buttonLabel="Continue as a customer"
            buttonVariant="solid"
            disabled={patchProfile.isPending}
            onSelect={() => handleSelect("CUSTOMER")}
          />
          <RoleCard
            icon={Wallet}
            iconClassName="bg-[#0B1F3A]"
            title="I'm a merchant"
            description="Create plans and collect recurring USDC"
            buttonLabel="Open merchant dashboard"
            buttonVariant="outline"
            disabled={patchProfile.isPending}
            onSelect={() => handleSelect("MERCHANT")}
          />
        </div>
      )}

      <Text as="p" size="sm" className="mt-8 text-muted-foreground">
        Wrong wallet?{" "}
        <Link href="/onboarding" className="font-medium text-blue-600 hover:underline">
          Switch wallet
        </Link>
      </Text>
    </main>
  )
}

export { ChooseRole }
