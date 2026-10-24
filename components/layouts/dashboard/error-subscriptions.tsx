import { AlertCircle } from "lucide-react"
import { AppButton } from "@/components/reuseables/button"
import { Text } from "@/components/reuseables/text"

function ErrorSubscriptions() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3 rounded-xl border border-red-200 bg-red-50 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Text as="p" weight="semibold" size="sm" className="text-red-700">
            We couldn&apos;t load your subscriptions
          </Text>
          <Text as="p" size="sm" className="text-red-600/80">
            We couldn&apos;t reach the Stellar network. Your funds and subscriptions are not affected.
          </Text>
        </div>
        <AppButton className="min-w-0 shrink-0 rounded-full bg-blue-500 text-white hover:bg-blue-600">
          Try again
        </AppButton>
      </div>

      <div className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-white p-16 text-center">
        <span className="flex size-10 items-center justify-center rounded-full bg-blue-50 text-blue-500">
          <AlertCircle className="size-5" />
        </span>
        <Text as="h3" weight="semibold" className="text-lg">
          Nothing to show right now
        </Text>
        <Text as="p" size="sm" className="text-muted-foreground">
          Check your connection, then try again.
        </Text>
      </div>
    </div>
  )
}

export { ErrorSubscriptions }
