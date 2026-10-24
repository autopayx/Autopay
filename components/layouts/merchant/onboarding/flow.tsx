"use client"

import { useState } from "react"
import { OnboardingSidePanel } from "@/components/layouts/merchant/onboarding/side-panel"
import { ConnectStep } from "@/components/layouts/merchant/onboarding/connect-step"
import { BusinessStep, type BusinessForm } from "@/components/layouts/merchant/onboarding/business-step"
import { CompleteStep } from "@/components/layouts/merchant/onboarding/complete-step"
import { useWallet } from "@/components/providers/wallet-provider"
import { truncateAddress } from "@/lib/stellar/wallet-kit"
import { useCreateMerchant } from "@/lib/api/hooks/use-merchants"

function OnboardingFlow() {
  const { walletAddress, connect } = useWallet()
  const [step, setStep] = useState(1)
  const [merchantId, setMerchantId] = useState<string | null>(null)
  const [businessError, setBusinessError] = useState<string | null>(null)
  const [form, setForm] = useState<BusinessForm>({
    businessName: "",
    website: "",
    supportEmail: "",
  })
  const createMerchant = useCreateMerchant()

  function handleChange<K extends keyof BusinessForm>(key: K, value: BusinessForm[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  async function handleConnect(walletId: string) {
    await connect(walletId)
    setStep(2)
  }

  async function handleContinueFromBusiness() {
    if (!walletAddress) return
    setBusinessError(null)
    try {
      const merchant = await createMerchant.mutateAsync({
        wallet_address: walletAddress,
        receiving_wallet: walletAddress,
        business_name: form.businessName,
        website_url: form.website || undefined,
        support_email: form.supportEmail || undefined,
      })
      setMerchantId(merchant.merchant_id)
      setStep(3)
    } catch {
      setBusinessError("Couldn't save your business profile. Please try again.")
    }
  }

  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      <OnboardingSidePanel step={step} />

      <div className="flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          {step === 1 && <ConnectStep onConnect={handleConnect} />}
          {step === 2 && (
            <BusinessStep
              form={form}
              walletAddress={walletAddress ? truncateAddress(walletAddress) : ""}
              submitting={createMerchant.isPending}
              error={businessError}
              onChange={handleChange}
              onBack={() => setStep(1)}
              onContinue={handleContinueFromBusiness}
            />
          )}
          {step === 3 && merchantId && (
            <CompleteStep
              businessName={form.businessName}
              walletAddress={walletAddress ? truncateAddress(walletAddress) : ""}
              merchantId={merchantId}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export { OnboardingFlow }
