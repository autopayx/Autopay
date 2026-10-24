import { AppButton } from "@/components/reuseables/button"
import { Text } from "@/components/reuseables/text"

type NoticeBannerProps = { title: string; description: string; actionLabel: string }

function NoticeBanner({ title, description, actionLabel }: NoticeBannerProps) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border-l-4 border-amber-400 bg-amber-50 p-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <Text as="p" size="sm" weight="semibold" className="text-amber-800">
          {title}
        </Text>
        <Text as="p" size="sm" className="text-amber-700/80">
          {description}
        </Text>
      </div>
      <AppButton variant="outline" className="min-w-0 shrink-0 rounded-full">
        {actionLabel}
      </AppButton>
    </div>
  )
}

export { NoticeBanner }
