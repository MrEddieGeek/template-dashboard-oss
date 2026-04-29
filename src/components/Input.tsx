// Tremor Raw Input [v1.0.3]

import { RiEyeFill, RiEyeOffFill, RiSearchLine } from "@remixicon/react"
import React from "react"
import { tv, type VariantProps } from "tailwind-variants"

import { cx, focusInput, focusRing, hasErrorInput } from "@/lib/utils"

const inputStyles = tv({
  base: [
    "relative block w-full appearance-none truncate rounded-md border px-3 py-2 outline-none transition-colors sm:text-sm",
    "border-rule",
    "text-fg-primary",
    "placeholder-fg-faint",
    "bg-surface-inset",
    "disabled:bg-surface-2 disabled:text-fg-faint",
    [
      "file:-my-2 file:-ml-2.5 file:cursor-pointer file:rounded-l-[5px] file:rounded-r-none file:border-0 file:px-3 file:py-2 file:outline-none focus:outline-none disabled:pointer-events-none file:disabled:pointer-events-none",
      "file:border-solid file:border-rule file:bg-surface-2 file:text-fg-secondary file:hover:bg-surface-3",
      "file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem]",
    ],
    focusInput,
    // invalid (optional)
    // "aria-[invalid=true]:dark:ring-red-400/20 aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-red-200 aria-[invalid=true]:border-red-500 invalid:ring-2 invalid:ring-red-200 invalid:border-red-500"
    // remove search cancel button (optional)
    "[&::--webkit-search-cancel-button]:hidden [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden",
  ],
  variants: {
    hasError: {
      true: hasErrorInput,
    },
    // number input
    enableStepper: {
      false:
        "[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
    },
  },
})

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputStyles> {
  inputClassName?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      inputClassName,
      hasError,
      enableStepper = true,
      type,
      ...props
    }: InputProps,
    forwardedRef,
  ) => {
    const [typeState, setTypeState] = React.useState(type)

    const isPassword = type === "password"
    const isSearch = type === "search"

    return (
      <div className={cx("relative w-full", className)}>
        <input
          ref={forwardedRef}
          type={isPassword ? typeState : type}
          className={cx(
            inputStyles({ hasError, enableStepper }),
            {
              "pl-8": isSearch,
              "pr-10": isPassword,
            },
            inputClassName,
          )}
          {...props}
        />
        {isSearch && (
          <div
            className={cx(
              // base
              "pointer-events-none absolute bottom-0 left-2 flex h-full items-center justify-center",
              "text-fg-faint",
            )}
          >
            <RiSearchLine
              className="size-[1.125rem] shrink-0"
              aria-hidden="true"
            />
          </div>
        )}
        {isPassword && (
          <div
            className={cx(
              "absolute bottom-0 right-0 flex h-full items-center justify-center px-3",
            )}
          >
            <button
              aria-label="Change password visibility"
              className={cx(
                // base
                "flex h-11 w-11 items-center justify-center rounded-sm outline-none transition-colors",
                "text-fg-faint hover:text-fg-secondary",
                focusRing,
              )}
              type="button"
              onClick={() => {
                setTypeState(typeState === "password" ? "text" : "password")
              }}
            >
              <span className="sr-only">
                {typeState === "password" ? "Show password" : "Hide password"}
              </span>
              {typeState === "password" ? (
                <RiEyeFill aria-hidden="true" className="size-5 shrink-0" />
              ) : (
                <RiEyeOffFill aria-hidden="true" className="size-5 shrink-0" />
              )}
            </button>
          </div>
        )}
      </div>
    )
  },
)

Input.displayName = "Input"

export { Input, inputStyles, type InputProps }
