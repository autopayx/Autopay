import Link from "next/link"
import { Plus, FileText } from "lucide-react"
import { AppButton } from "@/components/reuseables/button"
import { Text } from "@/components/reuseables/text"

function MerchantEmptyState() {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-white p-10 text-center">
      <span className="flex size-10 items-center justify-center rounded-full bg-blue-50 text-blue-500">
        <FileText className="size-5" />
      </span>
      <Text as="h3" weight="semibold" className="text-lg">
        Create your first plan
      </Text>
      <Text as="p" size="sm" className="max-w-sm text-muted-foreground">
        A plan sets the price, interval and a spending limit. Each plan gets its own checkout link to share.
      </Text>
      <AppButton
        render={<Link href="/merchant/plans/new" />}
        nativeButton={false}
        className="mt-2 w-full max-w-xs rounded-full bg-blue-500 text-white hover:bg-blue-600"
      >
        <Plus className="size-4" />
        Create new plan
      </AppButton>
    </div>
  )
}

export { MerchantEmptyState }
