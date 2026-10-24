"use client"

import { useEffect, useState } from "react"
import { AppButton } from "@/components/reuseables/button"
import { Text } from "@/components/reuseables/text"
import { BusinessProfileCard } from "@/components/layouts/merchant/settings/business-profile-card"
import { ReceivingWalletCard } from "@/components/layouts/merchant/settings/receiving-wallet-card"
import { DeveloperCard } from "@/components/layouts/merchant/settings/developer-card"
import { WalletCard } from "@/components/layouts/merchant/settings/wallet-card"
import { useMerchantContext } from "@/components/providers/merchant-provider"
import { usePatchMerchant } from "@/lib/api/hooks/use-merchants"
import { truncateAddress } from "@/lib/stellar/wallet-kit"

function MerchantSettingsForm() {
  const { merchant } = useMerchantContext()
  const patchMerchant = usePatchMerchant(merchant?.merchant_id ?? "")
  const [form, setForm] = useState({ businessName: "", website: "", supportEmail: "" })

  useEffect(() => {
    if (!merchant) return
    setForm({
      businessName: merchant.business_name,
      website: merchant.website_url ?? "",
      supportEmail: merchant.support_email ?? "",
    })
  }, [merchant])

  function handleChange(key: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function handleSave() {
    if (!merchant) return
    patchMerchant.mutate({
      business_name: form.businessName,
      website_url: form.website,
      support_email: form.supportEmail,
    })
  }

  if (!merchant) return null

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Text as="h1" weight="bold" className="text-2xl">
            Merchant settings
          </Text>
          <Text as="p" size="sm" className="mt-1 text-muted-foreground">
            Details shown to customers at checkout
          </Text>
        </div>

        <div className="hidden gap-2 sm:flex">
          <AppButton variant="outline" className="min-w-0 rounded-full">
            Cancel
          </AppButton>
          <AppButton
            onClick={handleSave}
            disabled={patchMerchant.isPending}
            className="min-w-0 rounded-full bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-60"
          >
            {patchMerchant.isPending ? "Saving..." : "Save changes"}
          </AppButton>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
        <div className="flex flex-col gap-6">
          <BusinessProfileCard
            businessName={form.businessName}
            website={form.website}
            supportEmail={form.supportEmail}
            onChange={handleChange}
          />
          <ReceivingWalletCard walletAddress={truncateAddress(merchant.receiving_wallet)} />
        </div>
        <div className="flex flex-col gap-6">
          <DeveloperCard merchantId={merchant.merchant_id} walletAddress={truncateAddress(merchant.wallet_address)} />
          <WalletCard />
        </div>
      </div>

      <AppButton
        onClick={handleSave}
        disabled={patchMerchant.isPending}
        className="w-full rounded-full bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-60 sm:hidden"
      >
        {patchMerchant.isPending ? "Saving..." : "Save changes"}
      </AppButton>
    </div>
  )
}

export { MerchantSettingsForm }
