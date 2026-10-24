import Link from "next/link"
import { Plus } from "lucide-react"
import { AppButton } from "@/components/reuseables/button"
import { Text } from "@/components/reuseables/text"
import { AppColors } from "@/lib/app_colors"
import { truncateAddress } from "@/lib/stellar/wallet-kit"
import type { MerchantProfile } from "@/lib/api/types"

function HeaderBanner({ merchant }: { merchant: MerchantProfile }) {
  return (
    <div
      style={{ background: AppColors.blackBlueGradient }}
      className="flex flex-col gap-4 rounded-2xl p-6 pb-16 sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="flex items-center gap-3">
        <span className="flex size-12 items-center justify-center rounded-lg bg-blue-500 font-semibold text-white">
          {merchant.initials}
        </span>
        <div>
          <Text as="p" size="sm" weight="semibold" className="text-blue-300 uppercase tracking-wide">
            Merchant
          </Text>
          <Text as="h2" weight="bold" className="text-xl text-white">
            {merchant.business_name}
          </Text>
          <Text as="p" size="sm" className="hidden text-white/60 sm:block">
            {merchant.website_url || merchant.merchant_id} · Receiving wallet {truncateAddress(merchant.receiving_wallet)}
          </Text>
        </div>
      </div>

      <div className="flex gap-2">
        <AppButton
          variant="outline"
          nativeButton={false}
          render={<Link href="/merchant/settings" />}
          className="hidden min-w-0 rounded-full border-white/30 bg-transparent text-white hover:bg-white/10 sm:flex"
        >
          Edit profile
        </AppButton>
        <AppButton
          render={<Link href="/merchant/plans/new" />}
          nativeButton={false}
          className="min-w-0 w-full rounded-full bg-white text-[#0B1F3A] hover:bg-white/90 sm:w-auto"
        >
          <Plus className="size-4" />
          Create new plan
        </AppButton>
      </div>
    </div>
  )
}

export { HeaderBanner }
