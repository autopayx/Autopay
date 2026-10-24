"use client"

import { Switch } from "@/components/ui/switch"
import { Text } from "@/components/reuseables/text"
import { useWallet } from "@/components/providers/wallet-provider"
import { useGatewayProfile, usePatchGatewayProfile } from "@/lib/api/hooks/use-gateway"
import type { AccountProfile } from "@/lib/api/types"

const REMINDERS: Array<{ key: keyof AccountProfile; label: string; description: string }> = [
  { key: "notify_vault_running_low", label: "Vault running low", description: "Before a payment would be skipped" },
  { key: "notify_payment_skipped_or_failed", label: "Payment skipped or failed", description: "When a payment does not go through" },
  { key: "notify_authorization_ending", label: "Authorization ending", description: "Before an authorization expires" },
  { key: "notify_payment_receipts", label: "Payment receipts", description: "Every successful payment" },
]

function ReminderToggle({
  label,
  description,
  checked,
  onCheckedChange,
}: {
  label: string
  description: string
  checked: boolean
  onCheckedChange: (checked: boolean) => void
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div>
        <Text as="p" weight="semibold" size="sm">
          {label}
        </Text>
        <Text as="p" size="sm" className="text-muted-foreground">
          {description}
        </Text>
      </div>
      <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  )
}

function RemindersCard() {
  const { walletAddress } = useWallet()
  const profileQuery = useGatewayProfile(walletAddress ?? "")
  const patchProfile = usePatchGatewayProfile(walletAddress ?? "")

  return (
    <div className="rounded-2xl border border-border bg-white p-6">
      <Text as="h3" weight="semibold">
        Reminders
      </Text>
      <Text as="p" size="sm" className="text-muted-foreground">
        Shown in your dashboard.
      </Text>

      <div className="mt-2 flex flex-col divide-y divide-border">
        {REMINDERS.map((reminder) => (
          <ReminderToggle
            key={reminder.key}
            label={reminder.label}
            description={reminder.description}
            checked={Boolean(profileQuery.data?.[reminder.key])}
            onCheckedChange={(checked) => patchProfile.mutate({ [reminder.key]: checked })}
          />
        ))}
      </div>
    </div>
  )
}

export { RemindersCard }
