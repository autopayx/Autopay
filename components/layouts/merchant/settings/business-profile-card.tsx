import { Text } from "@/components/reuseables/text"

type BusinessProfileCardProps = {
  businessName: string
  website: string
  supportEmail: string
  onChange: (key: "businessName" | "website" | "supportEmail", value: string) => void
}

function BusinessProfileCard({ businessName, website, supportEmail, onChange }: BusinessProfileCardProps) {
  return (
    <div className="rounded-2xl border border-border bg-white p-6">
      <Text as="h3" weight="semibold">
        Business profile
      </Text>

      <div className="mt-4 flex flex-col gap-4">
        <div>
          <Text as="p" size="sm" weight="semibold" className="text-muted-foreground">
            Business name
          </Text>
          <input
            value={businessName}
            onChange={(e) => onChange("businessName", e.target.value)}
            className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm font-medium outline-none"
          />
        </div>
        <div>
          <Text as="p" size="sm" weight="semibold" className="text-muted-foreground">
            Website
          </Text>
          <input
            value={website}
            onChange={(e) => onChange("website", e.target.value)}
            className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm font-medium outline-none"
          />
        </div>
        <div>
          <Text as="p" size="sm" weight="semibold" className="text-muted-foreground">
            Support email
          </Text>
          <input
            value={supportEmail}
            onChange={(e) => onChange("supportEmail", e.target.value)}
            className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm font-medium outline-none"
          />
        </div>
      </div>
    </div>
  )
}

export { BusinessProfileCard }
