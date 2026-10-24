"use client"

import { useState } from "react"
import Link from "next/link"
import { AppButton } from "@/components/reuseables/button"
import { Text } from "@/components/reuseables/text"
import { CreateStep, type PlanFormErrors, type PlanFormState } from "@/components/layouts/merchant/plan-wizard/create-step"
import { ReviewStep } from "@/components/layouts/merchant/plan-wizard/review-step"
import { SuccessStep } from "@/components/layouts/merchant/plan-wizard/success-step"
import { CustomerPreview } from "@/components/layouts/merchant/plan-wizard/customer-preview"
import { DEFAULT_PLAN } from "@/components/layouts/merchant/plan-wizard/data"
import { useMerchantContext } from "@/components/providers/merchant-provider"
import { useCreatePlan } from "@/lib/api/hooks/use-plans"
import { truncateAddress } from "@/lib/stellar/wallet-kit"
import { buildCheckoutUrl } from "@/lib/checkout-url"
import type { BillingInterval, SubscriptionPlan } from "@/lib/api/types"

type WizardStep = "create" | "review" | "success"

const INTERVAL_SECONDS: Record<string, number> = { Monthly: 30 * 24 * 60 * 60, Yearly: 365 * 24 * 60 * 60 }
const INTERVAL_ENUM: Record<string, BillingInterval> = { Monthly: "MONTHLY", Yearly: "YEARLY" }

function PlanWizard() {
  const { merchant } = useMerchantContext()
  const createPlan = useCreatePlan()
  const [step, setStep] = useState<WizardStep>("create")
  const [form, setForm] = useState<PlanFormState>(DEFAULT_PLAN)
  const [errors, setErrors] = useState<PlanFormErrors>({})
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [createdPlan, setCreatedPlan] = useState<SubscriptionPlan | null>(null)

  function handleChange<K extends keyof PlanFormState>(key: K, value: PlanFormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function handleReview() {
    const nextErrors: PlanFormErrors = {}
    if (!form.planName.trim()) nextErrors.planName = "Enter a name customers will recognize."
    if (!(form.price > 0)) nextErrors.price = "Price must be greater than 0."

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    setStep("review");
  }

  async function handleSave() {
    if (!merchant) return
    setSubmitError(null)

    const startsDate = new Date(form.starts)
    const expiresDate = new Date(form.expires)
    const starts_at = Number.isNaN(startsDate.getTime()) ? new Date().toISOString() : startsDate.toISOString()
    const expires_at = Number.isNaN(expiresDate.getTime()) ? null : expiresDate.toISOString()

    try {
      const plan = await createPlan.mutateAsync({
        merchant_id: merchant.merchant_id,
        name: form.planName,
        description: form.description || undefined,
        amount_usdc: form.price.toFixed(7),
        billing_interval: INTERVAL_ENUM[form.billingInterval] ?? "MONTHLY",
        interval_seconds: INTERVAL_SECONDS[form.billingInterval] ?? 2592000,
        max_spending_limit: form.minAllowance.toFixed(7),
        starts_at,
        expires_at,
        receiving_wallet: merchant.receiving_wallet,
      })
      setCreatedPlan(plan)
      setStep("success")
    } catch {
      setSubmitError("Couldn't create the plan. Please try again.")
    }
  }

  if (step === "success" && createdPlan) {
    return <SuccessStep planName={createdPlan.name} planCode={createdPlan.plan_code} checkoutLink={buildCheckoutUrl(createdPlan.plan_code)} />;
  }

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Text as="p" size="sm" className="text-muted-foreground">
            <Link href="/merchant/plans" className="hover:text-foreground">
              Plans
            </Link>{" "}
            / New plan{step === "review" && " / Review"}
          </Text>
          <Text as="h1" weight="bold" className="mt-1 text-2xl">
            {step === "create" ? "Create a plan" : "Review your plan"}
          </Text>
          <Text as="p" size="sm" className="mt-1 text-muted-foreground">
            {step === "create"
              ? "Set the price and limits customers will approve."
              : "Check the details. Customers will approve exactly this."}
          </Text>
        </div>

        <div className="flex gap-2">
          {step === "create" ? (
            <>
              <AppButton
                variant="outline"
                render={<Link href="/merchant/plans" />}
                nativeButton={false}
                className="min-w-0 rounded-full"
              >
                Cancel
              </AppButton>
              <AppButton onClick={handleReview} className="min-w-0 rounded-full bg-blue-500 text-white hover:bg-blue-600">
                Review plan
              </AppButton>
            </>
          ) : (
            <>
              <AppButton variant="outline" onClick={() => setStep("create")} className="min-w-0 rounded-full">
                Back
              </AppButton>
              <AppButton
                onClick={handleSave}
                disabled={createPlan.isPending}
                className="min-w-0 rounded-full bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-60"
              >
                {createPlan.isPending ? "Saving..." : "Save changes"}
              </AppButton>
            </>
          )}
        </div>
      </div>

      {submitError && (
        <div className="rounded-lg border-l-4 border-red-400 bg-red-50 px-4 py-2.5">
          <Text as="p" size="sm" weight="semibold" className="text-red-700">
            {submitError}
          </Text>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
        {step === "create" ? (
          <CreateStep form={form} errors={errors} onChange={handleChange} />
        ) : (
          <ReviewStep form={form} paidTo={merchant ? truncateAddress(merchant.receiving_wallet) : ""} onEdit={() => setStep("create")} />
        )}
        <CustomerPreview
          merchantName={merchant?.business_name ?? ""}
          planName={form.planName}
          price={form.price}
          billingInterval={form.billingInterval}
          minAllowance={form.minAllowance}
          expires={form.expires}
        />
      </div>
    </div>
  );
}

export { PlanWizard };
