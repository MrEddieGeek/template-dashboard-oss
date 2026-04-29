"use client"

import { Button } from "@/components/Button"
import { cx, focusRing } from "@/lib/utils"
import { RiMore2Fill } from "@remixicon/react"

import { DropdownUserProfile } from "./DropdownUserProfile"

export const UserProfileDesktop = () => {
  return (
    <DropdownUserProfile>
      <Button
        aria-label="User settings"
        variant="ghost"
        className={cx(
          focusRing,
          "group flex min-h-11 w-full items-center justify-between rounded-md p-2 text-sm font-medium text-fg-primary hover:bg-surface-2 data-[state=open]:bg-surface-2",
        )}
      >
        <span className="flex items-center gap-3">
          <span
            className="flex size-8 shrink-0 items-center justify-center rounded-full border border-rule bg-surface-inset font-mono text-[10px] font-semibold uppercase tracking-wide text-fg-secondary"
            aria-hidden="true"
          >
            ES
          </span>
          <span>Emma Stone</span>
        </span>
        <RiMore2Fill
          className="size-4 shrink-0 text-fg-muted group-hover:text-fg-primary"
          aria-hidden="true"
        />
      </Button>
    </DropdownUserProfile>
  )
}

export const UserProfileMobile = () => {
  return (
    <DropdownUserProfile align="end">
      <Button
        aria-label="User settings"
        variant="ghost"
        className={cx(
          "group flex min-h-11 min-w-11 items-center justify-center rounded-md p-1 text-sm font-medium text-fg-primary hover:bg-surface-2 data-[state=open]:bg-surface-2",
        )}
      >
        <span
          className="flex size-8 shrink-0 items-center justify-center rounded-full border border-rule bg-surface-inset font-mono text-[10px] font-semibold uppercase tracking-wide text-fg-secondary"
          aria-hidden="true"
        >
          ES
        </span>
      </Button>
    </DropdownUserProfile>
  )
}
