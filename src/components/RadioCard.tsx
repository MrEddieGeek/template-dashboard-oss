// Tremor Raw Radio Card [v0.0.1]

import * as RadioGroupPrimitives from "@radix-ui/react-radio-group"
import React from "react"

import { cx, focusInput, focusRing } from "@/lib/utils"

const RadioCardGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitives.Root>
>(({ className, ...props }, forwardedRef) => {
  return (
    <RadioGroupPrimitives.Root
      ref={forwardedRef}
      className={cx("grid gap-2", className)}
      {...props}
    />
  )
})

RadioCardGroup.displayName = "RadioCardGroup"

const RadioCardItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitives.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitives.Item>
>(({ className, children, ...props }, forwardedRef) => {
  return (
    <RadioGroupPrimitives.Item
      ref={forwardedRef}
      className={cx(
        // base
        "group relative w-full rounded-md border p-4 text-left transition-colors focus:outline-none",
        "bg-surface-1 border-rule",
        "data-[state=checked]:border-[var(--accent)]",
        "data-[disabled]:border-rule-soft data-[disabled]:bg-surface-2",
        focusInput,
        className,
      )}
      {...props}
    >
      {children}
    </RadioGroupPrimitives.Item>
  )
})

RadioCardItem.displayName = "RadioCardItem"

const RadioCardIndicator = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitives.Indicator>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitives.Indicator>
>(({ className, ...props }, forwardedRef) => {
  return (
    <div
      className={cx(
        // base
        "relative flex size-4 shrink-0 appearance-none items-center justify-center rounded-full border outline-none",
        "border-rule-strong bg-surface-inset",
        "group-data-[state=checked]:border-0 group-data-[state=checked]:bg-[var(--accent)]",
        "group-data-[disabled]:border-rule-soft group-data-[disabled]:bg-surface-2",
        // focus
        focusRing,
        className,
      )}
    >
      <RadioGroupPrimitives.Indicator
        ref={forwardedRef}
        className={cx("flex items-center justify-center")}
        {...props}
      >
        <div
          className={cx(
            // base
            "size-1.5 shrink-0 rounded-full",
            "bg-[var(--accent-on)]",
            "group-data-[disabled]:bg-fg-faint",
          )}
        />
      </RadioGroupPrimitives.Indicator>
    </div>
  )
})

RadioCardIndicator.displayName = "RadioCardIndicator"

export { RadioCardGroup, RadioCardIndicator, RadioCardItem }
