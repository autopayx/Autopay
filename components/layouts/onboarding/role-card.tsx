import type { LucideIcon } from "lucide-react"
import { AppButton } from "@/components/reuseables/button"
import { Text } from "@/components/reuseables/text"

type RoleCardProps = {
  icon: LucideIcon
  iconClassName: string
  title: string
  description: string
  meta?: string
  buttonLabel: string
  buttonVariant: "solid" | "outline"
  onSelect?: () => void
  disabled?: boolean
}

function RoleCard({ icon: Icon, iconClassName, title, description, meta, buttonLabel, buttonVariant, onSelect, disabled }: RoleCardProps) {
  return (
    <div className="flex flex-col rounded-2xl border border-border bg-white p-6 shadow-sm">
      <span className={`flex size-10 items-center justify-center rounded-lg text-white ${iconClassName}`}>
        <Icon className="size-5" />
      </span>
      <Text as="h3" weight="semibold" className="mt-4 text-lg">
        {title}
      </Text>
      <Text as="p" size="sm" className="mt-1 text-muted-foreground">
        {description}
      </Text>
      {meta && (
        <Text as="p" size="sm" className="mt-3 text-muted-foreground">
          {meta}
        </Text>
      )}
      <AppButton
        variant={buttonVariant === "outline" ? "outline" : "default"}
        onClick={onSelect}
        disabled={disabled}
        className={`mt-6 w-full rounded-full disabled:opacity-60 ${buttonVariant === "solid" ? "bg-blue-500 text-white hover:bg-blue-600" : ""}`}
      >
        {buttonLabel}
      </AppButton>
    </div>
  )
}

export { RoleCard }
