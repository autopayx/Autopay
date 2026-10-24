import { Link2 } from "lucide-react"
import { Text } from "@/components/reuseables/text"

function EmptySubscriptions() {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-white p-16 text-center">
      <span className="flex size-10 items-center justify-center rounded-full bg-blue-50 text-blue-500">
        <Link2 className="size-5" />
      </span>
      <Text as="h3" weight="semibold" className="text-lg">
        No subscriptions yet
      </Text>
      <Text as="p" size="sm" className="max-w-sm text-muted-foreground">
        Subscriptions start from a merchant&apos;s checkout link. When you subscribe, it will show up here.
      </Text>
    </div>
  )
}

export { EmptySubscriptions }
