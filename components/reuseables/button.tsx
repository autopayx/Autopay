import { Button as UIButton } from "@/components/ui/button"
import { cn } from "cn"
import type { ComponentProps } from "react"

type AppButtonProps = ComponentProps<typeof UIButton>

// enforces the AutoPayX design spec's min button dimensions (195.62 x 44, 8px radius, 1px border)
function AppButton({ className, ...props }: AppButtonProps) {
  return (
    <UIButton
      className={cn(
        "min-h-11 min-w-[195.62326049804688px] rounded-lg border opacity-100",
        className
      )}
      {...props}
    />
  )
}

export { AppButton }
