import Link from "next/link"
import { AppButton } from "@/components/reuseables/button"
import { Text } from "@/components/reuseables/text"

function CompleteStep({
  businessName,
  walletAddress,
  merchantId,
}: {
  businessName: string
  walletAddress: string
  merchantId: string
}) {
  const rows = [
    { label: "Business", value: businessName },
    { label: "Receiving wallet", value: walletAddress },
    { label: "Merchant ID", value: merchantId },
    { label: "Network", value: "Stellar Testnet" },
  ]

  return (
    <div>
      <Text as="p" size="sm" weight="semibold" className="text-blue-600">
        Step 3 of 3
      </Text>
      <Text as="h2" weight="bold" className="mt-1 text-2xl">
        {businessName} is set up
      </Text>
      <Text as="p" size="sm" className="mt-2 text-muted-foreground">
        Next, create a plan. Each plan gets its own checkout link.
      </Text>

      <div className="mt-6 flex flex-col divide-y divide-border rounded-2xl border border-border p-4">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between gap-3 py-2.5 text-sm">
            <span className="shrink-0 text-muted-foreground">{row.label}</span>
            <span className="min-w-0 truncate font-semibold text-foreground">{row.value}</span>
          </div>
        ))}
      </div>

      <AppButton
        render={<Link href="/merchant/plans/new" />}
        nativeButton={false}
        className="mt-6 w-full rounded-full bg-blue-500 text-white hover:bg-blue-600"
      >
        Create your first plan
      </AppButton>

      <Link href="/merchant" className="mt-3 block text-center text-sm font-medium text-blue-600 hover:underline">
        Skip, go to dashboard
      </Link>
    </div>
  )
}

export { CompleteStep }
