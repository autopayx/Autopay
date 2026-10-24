import { cn } from "cn"
import { cva, type VariantProps } from "class-variance-authority"
import type { ComponentPropsWithoutRef, ElementType } from "react"

const textVariants = cva("font-sans text-foreground", {
  variants: {
    size: {
      xs: "text-xs",
      sm: "text-sm",
      base: "text-base",
      lg: "text-lg",
      xl: "text-xl",
      "2xl": "text-2xl",
      "3xl": "text-3xl",
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
  },
  defaultVariants: {
    size: "base",
    weight: "normal",
  },
})

type TextOwnProps<T extends ElementType> = {
  as?: T
} & VariantProps<typeof textVariants>

type TextProps<T extends ElementType> = TextOwnProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof TextOwnProps<T>>

// polymorphic text primitive, defaults to <p> rendered in Inter via the --font-sans var
function Text<T extends ElementType = "p">({
  as,
  size,
  weight,
  className,
  ...props
}: TextProps<T>) {
  const Component = as || "p"
  return (
    <Component
      className={cn(textVariants({ size, weight, className }))}
      {...props}
    />
  )
}

export { Text, textVariants }
