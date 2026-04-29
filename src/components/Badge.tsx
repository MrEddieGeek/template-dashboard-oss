import React from "react"
import { tv, type VariantProps } from "tailwind-variants"
import { cx } from "@/lib/utils"

const badgeVariants = tv({
  base: cx(
    "inline-flex items-center gap-x-1 whitespace-nowrap rounded px-1.5 py-0.5 font-mono text-[11px] font-medium uppercase tracking-wide tabular-nums",
    "ring-1 ring-inset",
  ),
  variants: {
    variant: {
      default: [
        "bg-[var(--accent-soft)] text-[var(--accent-emphasis)]",
        "ring-[color-mix(in_oklch,var(--accent)_30%,transparent)]",
      ],
      neutral: [
        "bg-surface-2 text-fg-secondary",
        "ring-[var(--rule)]",
      ],
      success: [
        "bg-[var(--positive-soft)] text-[var(--positive)]",
        "ring-[color-mix(in_oklch,var(--positive)_25%,transparent)]",
      ],
      error: [
        "bg-[var(--negative-soft)] text-[var(--negative)]",
        "ring-[color-mix(in_oklch,var(--negative)_25%,transparent)]",
      ],
      warning: [
        "bg-[var(--caution-soft)] text-[var(--caution)]",
        "ring-[color-mix(in_oklch,var(--caution)_25%,transparent)]",
      ],
    },
  },
  defaultVariants: { variant: "default" },
})

interface BadgeProps
  extends React.ComponentPropsWithoutRef<"span">,
    VariantProps<typeof badgeVariants> {}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, ...props }: BadgeProps, forwardedRef) => {
    return (
      <span
        ref={forwardedRef}
        className={cx(badgeVariants({ variant }), className)}
        {...props}
      />
    )
  },
)

Badge.displayName = "Badge"

export { Badge, badgeVariants, type BadgeProps }
