import { AppButton } from "@/components/reuseables/button"
import { Text } from "@/components/reuseables/text"

type BusinessForm = { businessName: string; website: string; supportEmail: string }

type BusinessStepProps = {
  form: BusinessForm
  walletAddress: string
  submitting?: boolean
  error?: string | null
  onChange: <K extends keyof BusinessForm>(key: K, value: BusinessForm[K]) => void
  onBack: () => void
  onContinue: () => void
}

function BusinessStep({ form, walletAddress, submitting, error, onChange, onBack, onContinue }: BusinessStepProps) {
  return (
    <div>
      <Text as="p" size="sm" weight="semibold" className="text-blue-600">
        Step 2 of 3
      </Text>
      <Text as="h2" weight="bold" className="mt-1 text-2xl">
        Tell us about your business
      </Text>
      <Text as="p" size="sm" className="mt-2 text-muted-foreground">
        Customers see this on your checkout page.
      </Text>

      <div className="mt-6 flex flex-col gap-4">
        <div>
          <Text as="p" size="sm" weight="semibold" className="text-muted-foreground">
            Business name
          </Text>
          <input
            value={form.businessName}
            onChange={(e) => onChange("businessName", e.target.value)}
            className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm font-medium outline-none"
          />
        </div>

        <div>
          <Text as="p" size="sm" weight="semibold" className="text-muted-foreground">
            Website
          </Text>
          <input
            value={form.website}
            onChange={(e) => onChange("website", e.target.value)}
            className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm font-medium outline-none"
          />
          <Text as="p" size="sm" className="mt-1 text-muted-foreground">
            Optional. Shown on checkout.
          </Text>
        </div>

        <div>
          <Text as="p" size="sm" weight="semibold" className="text-muted-foreground">
            Receiving wallet
          </Text>
          <div className="mt-1 truncate rounded-lg bg-muted px-3 py-2 text-sm font-medium text-muted-foreground">
            {walletAddress}
          </div>
          <Text as="p" size="sm" className="mt-1 text-muted-foreground">
            Payments are sent here. It&apos;s the wallet you just connected.
          </Text>
        </div>

        <div>
          <Text as="p" size="sm" weight="semibold" className="text-muted-foreground">
            Support email
          </Text>
          <input
            value={form.supportEmail}
            onChange={(e) => onChange("supportEmail", e.target.value)}
            placeholder="you@business.com"
            className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm font-medium outline-none"
          />
          <Text as="p" size="sm" className="mt-1 text-muted-foreground">
            Optional. Shown to customers if something goes wrong.
          </Text>
        </div>
      </div>

      {error && (
        <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3">
          <Text as="p" size="sm" className="text-red-600">
            {error}
          </Text>
        </div>
      )}

      <div className="mt-6 flex gap-2">
        <AppButton variant="outline" onClick={onBack} className="min-w-0 rounded-full">
          Back
        </AppButton>
        <AppButton
          onClick={onContinue}
          disabled={submitting}
          className="min-w-0 rounded-full bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-60"
        >
          {submitting ? "Saving..." : "Continue"}
        </AppButton>
      </div>
    </div>
  )
}

export { BusinessStep }
export type { BusinessForm }
