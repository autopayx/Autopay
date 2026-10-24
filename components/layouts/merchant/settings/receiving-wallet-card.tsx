import { AppButton } from "@/components/reuseables/button"
import { Text } from "@/components/reuseables/text"

function ReceivingWalletCard({ walletAddress }: { walletAddress: string }) {
  return (
    <div className="rounded-2xl border border-border bg-white p-6">
      <Text as="h3" weight="semibold">
        Receiving wallet
      </Text>
      <Text as="p" size="sm" className="text-muted-foreground">
        Payments from every plan are sent here.
      </Text>

      <Text as="p" size="sm" weight="semibold" className="mt-4 text-muted-foreground">
        Wallet address
      </Text>
      <div className="mt-1 truncate rounded-lg bg-muted px-3 py-2 text-sm font-medium text-muted-foreground">
        {walletAddress}
      </div>

      <div className="mt-4 rounded-lg border-l-4 border-amber-400 bg-amber-50 p-3">
        <Text as="p" size="sm" weight="semibold" className="text-amber-800">
          Changing this affects future payments on all plans
        </Text>
        <Text as="p" size="sm" className="mt-1 text-amber-700/80">
          Existing subscribers will be asked to re-approve.
        </Text>
      </div>

      <AppButton variant="outline" className="mt-4 w-full rounded-full">
        Change receiving wallet
      </AppButton>
    </div>
  )
}

export { ReceivingWalletCard }
