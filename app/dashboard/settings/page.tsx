import { ConnectedWalletCard } from "@/components/layouts/dashboard/settings/connected-wallet-card";
import { RemindersCard } from "@/components/layouts/dashboard/settings/reminders-card";
import { UsageCard } from "@/components/layouts/dashboard/settings/usage-card";
import { Text } from "@/components/reuseables/text";

export default function SettingsPage() {
  return (
    <div className="flex w-full flex-col gap-6">
      <div>
        <Text as="h1" weight="bold" className="text-2xl">
          Wallet &amp; Account
        </Text>
        <Text as="p" size="sm" className="mt-1 text-muted-foreground">
          Your wallet is your sign in.
        </Text>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
        <div className="flex flex-col gap-6">
          <ConnectedWalletCard />
          <RemindersCard />
        </div>
        <UsageCard />
      </div>
    </div>
  );
}
