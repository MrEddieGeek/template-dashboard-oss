// Tremor Raw ProgressBar [v0.0.1]

import React from "react"
import { tv, type VariantProps } from "tailwind-variants"

import { cx } from "@/lib/utils"

const progressBarVariants = tv({
  slots: {
    background: "",
    bar: "",
  },
  variants: {
    variant: {
      default: {
        background: "bg-[var(--accent-soft)]",
        bar: "bg-[var(--accent)]",
      },
      neutral: {
        background: "bg-surface-3",
        bar: "bg-fg-faint",
      },
      warning: {
        background: "bg-[var(--caution-soft)]",
        bar: "bg-[var(--caution)]",
      },
      error: {
        background: "bg-[var(--negative-soft)]",
        bar: "bg-[var(--negative)]",
      },
      success: {
        background: "bg-[var(--positive-soft)]",
        bar: "bg-[var(--positive)]",
      },
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

interface ProgressBarProps
  extends React.HTMLProps<HTMLDivElement>,
    VariantProps<typeof progressBarVariants> {
  value?: number
  max?: number
  showAnimation?: boolean
  label?: string
}

const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  (
    {
      value = 0,
      max = 100,
      label,
      showAnimation = false,
      variant,
      className,
      ...props
    }: ProgressBarProps,
    forwardedRef,
  ) => {
    const safeValue = Math.min(max, Math.max(value, 0))
    const { background, bar } = progressBarVariants({ variant })
    return (
      <div
        ref={forwardedRef}
        className={cx("flex w-full items-center", className)}
        {...props}
      >
        <div
          className={cx(
            "relative flex h-2 w-full items-center rounded-full",
            background(),
          )}
          aria-label="progress bar"
          aria-valuenow={value}
          aria-valuemax={max}
        >
          <div
            className={cx(
              "h-full flex-col rounded-full",
              bar(),
              showAnimation &&
                "transform-gpu transition-all duration-300 ease-in-out",
            )}
            style={{
              width: max ? `${(safeValue / max) * 100}%` : `${safeValue}%`,
            }}
          />
        </div>
        {label ? (
          <span
            className={cx(
              // base
              "ml-2 whitespace-nowrap text-sm font-medium leading-none tabular-nums",
              "text-fg-primary",
            )}
          >
            {label}
          </span>
        ) : null}
      </div>
    )
  },
)

ProgressBar.displayName = "ProgressBar"

export { ProgressBar, progressBarVariants, type ProgressBarProps }
