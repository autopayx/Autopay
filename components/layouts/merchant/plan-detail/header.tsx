import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { AppButton } from "@/components/reuseables/button"
import { Text } from "@/components/reuseables/text"
import { EditPlanDialog } from "@/components/layouts/merchant/plan-detail/edit-plan-dialog"
import { ClosePlanDialog } from "@/components/layouts/merchant/plan-detail/close-plan-dialog"

type PlanDetailHeaderProps = {
  name: string
  status: "Active" | "Closed" | "Paused"
  createdDate: string
  currentPrice: string
  interval: string
  activeSubscribers: number
  onEditPrice?: (price: string) => void
  onClose?: () => void
  onReopen?: () => void
}

function PlanDetailHeader({
  name,
  status,
  createdDate,
  currentPrice,
  interval,
  activeSubscribers,
  onEditPrice,
  onClose,
  onReopen,
}: PlanDetailHeaderProps) {
  return (
    <div className="flex flex-col gap-4">
      {/* mobile: back nav */}
      <Link href="/merchant/plans" className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground sm:hidden">
        <ChevronLeft className="size-4" />
        Plan details
      </Link>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <Text as="p" size="sm" className="hidden text-muted-foreground sm:block">
          <Link href="/merchant/plans" className="hover:text-foreground">
            Plans
          </Link>{" "}
          / {name}
        </Text>
        <div className="mt-1 flex items-center gap-3">
          <Text as="h1" weight="bold" className="text-2xl">
            {name}
          </Text>
          <span
            className={`rounded-md px-2 py-0.5 text-xs font-medium ${
              status === "Active" ? "bg-emerald-50 text-emerald-700" : "bg-muted text-muted-foreground"
            }`}
          >
            {status}
          </span>
        </div>
        <Text as="p" size="sm" className="mt-1 text-muted-foreground">
          Created {createdDate}
        </Text>
      </div>

      <div className="flex gap-2">
        <EditPlanDialog
          trigger={
            <AppButton variant="outline" nativeButton={false} className="min-w-0 rounded-full">
              Edit plan
            </AppButton>
          }
          currentPrice={currentPrice}
          interval={interval}
          activeSubscribers={activeSubscribers}
          onConfirm={onEditPrice}
        />
        {status === "Closed" ? (
          <AppButton variant="outline" className="min-w-0 rounded-full" onClick={onReopen}>
            Reopen plan
          </AppButton>
        ) : (
          <ClosePlanDialog
            trigger={
              <AppButton variant="outline" nativeButton={false} className="min-w-0 rounded-full">
                <span className="sm:hidden">Close plan</span>
                <span className="hidden sm:inline">Close to new subscribers</span>
              </AppButton>
            }
            activeSubscribers={activeSubscribers}
            onConfirm={onClose}
          />
        )}
      </div>
      </div>
    </div>
  )
}

export { PlanDetailHeader }
