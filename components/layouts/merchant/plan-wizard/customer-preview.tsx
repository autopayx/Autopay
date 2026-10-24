import { Text } from "@/components/reuseables/text"
import { AppColors } from "@/lib/app_colors"

type CustomerPreviewProps = {
  merchantName: string
  planName: string
  price: number
  billingInterval: string
  minAllowance: number
  expires: string
}

function CustomerPreview({ merchantName, planName, price, billingInterval, minAllowance, expires }: CustomerPreviewProps) {
  return (
    <div className="flex flex-col gap-4">
      <Text as="p" size="sm" weight="semibold" className="text-muted-foreground uppercase tracking-wide">
        Customer preview
      </Text>

      <div style={{ background: AppColors.blackBlueGradient }} className="rounded-2xl p-5">
        <Text as="p" size="sm" className="text-white/50 uppercase tracking-wide">
          Membership plan
        </Text>
        <Text as="p" weight="bold" className="mt-2 text-lg text-white">
          {planName || "Untitled plan"}
        </Text>
        <p className="mt-1 flex items-baseline gap-1">
          <span className="text-2xl font-bold text-white">{price.toFixed(2)}</span>
          <span className="text-sm font-medium text-white/70">USDC / {billingInterval.toLowerCase()}</span>
        </p>
      </div>

      <div className="rounded-xl bg-blue-50 p-4">
        <Text as="p" size="sm" className="text-foreground">
          Customers will read: <span className="font-semibold">{merchantName}</span> can take{" "}
          <span className="font-semibold">{price.toFixed(2)} USDC</span> every{" "}
          <span className="font-semibold">{billingInterval.toLowerCase()}</span>, up to{" "}
          <span className="font-semibold">{minAllowance.toFixed(2)} USDC</span> in total, until{" "}
          <span className="font-semibold">{expires}</span>.
        </Text>
      </div>

      <div className="rounded-xl border-l-2 border-blue-500 bg-blue-50 p-4">
        <Text as="p" size="sm" weight="semibold" className="text-foreground">
          Editing a plan later
        </Text>
        <Text as="p" size="sm" className="mt-1 text-muted-foreground">
          Changes to price or interval apply to new subscribers. Existing subscribers keep what they approved, and
          are asked to re-approve any change.
        </Text>
      </div>
    </div>
  )
}

export { CustomerPreview }
