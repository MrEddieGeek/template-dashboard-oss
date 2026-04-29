import { Slot } from "@radix-ui/react-slot"
import { RiLoader2Fill } from "@remixicon/react"
import React from "react"
import { tv, type VariantProps } from "tailwind-variants"

import { cx, focusRing } from "@/lib/utils"

const buttonVariants = tv({
  base: [
    "relative inline-flex items-center justify-center whitespace-nowrap rounded-md border px-3.5 py-2 text-center text-sm font-medium transition-colors duration-100 ease-out",
    "min-h-9",
    "disabled:pointer-events-none disabled:opacity-50",
    focusRing,
  ],
  variants: {
    variant: {
      primary: [
        "border-transparent",
        "bg-[var(--accent)] text-[var(--accent-on)]",
        "hover:bg-[var(--accent-emphasis)]",
      ],
      secondary: [
        "border-rule",
        "bg-surface-1 text-fg-primary",
        "hover:bg-surface-2",
      ],
      light: [
        "border-transparent",
        "bg-surface-2 text-fg-primary",
        "hover:bg-surface-3",
      ],
      ghost: [
        "border-transparent bg-transparent text-fg-primary",
        "hover:bg-surface-2",
      ],
      destructive: [
        "border-transparent",
        "bg-[var(--negative)] text-[var(--fg-inverted)]",
        "hover:bg-[color-mix(in_oklch,var(--negative)_85%,black)]",
      ],
    },
  },
  defaultVariants: { variant: "primary" },
})

interface ButtonProps
  extends React.ComponentPropsWithoutRef<"button">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  isLoading?: boolean
  loadingText?: string
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      asChild,
      isLoading = false,
      loadingText,
      className,
      disabled,
      variant,
      children,
      ...props
    }: ButtonProps,
    forwardedRef,
  ) => {
    const Component = asChild ? Slot : "button"
    return (
      <Component
        ref={forwardedRef}
        className={cx(buttonVariants({ variant }), className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <span className="pointer-events-none flex shrink-0 items-center justify-center gap-1.5">
            <RiLoader2Fill
              className="size-4 shrink-0 animate-spin"
              aria-hidden="true"
            />
            <span className="sr-only">
              {loadingText ? loadingText : "Loading"}
            </span>
            {loadingText ? loadingText : children}
          </span>
        ) : (
          children
        )}
      </Component>
    )
  },
)

Button.displayName = "Button"

export { Button, buttonVariants, type ButtonProps }
