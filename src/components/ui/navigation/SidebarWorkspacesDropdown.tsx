"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/Dropdown"
import { cx, focusInput } from "@/lib/utils"
import { RiArrowRightSLine, RiExpandUpDownLine } from "@remixicon/react"
import React from "react"
import { ModalAddWorkspace } from "./ModalAddWorkspace"

const workspaces = [
  {
    value: "acme-corp",
    name: "Acme Corp",
    initials: "AC",
    role: "Member",
    color: "bg-[var(--accent)] text-[var(--accent-on)]",
  },
  // Add more workspaces...
]

export const WorkspacesDropdownDesktop = () => {
  const [dropdownOpen, setDropdownOpen] = React.useState(false)
  const [hasOpenDialog, setHasOpenDialog] = React.useState(false)
  const dropdownTriggerRef = React.useRef<null | HTMLButtonElement>(null)
  const focusRef = React.useRef<null | HTMLButtonElement>(null)

  const handleDialogItemSelect = () => {
    focusRef.current = dropdownTriggerRef.current
  }

  const handleDialogItemOpenChange = (open: boolean) => {
    setHasOpenDialog(open)
    if (open === false) {
      setDropdownOpen(false)
    }
  }
  return (
    <>
      {/* sidebar (lg+) */}
      <DropdownMenu
        open={dropdownOpen}
        onOpenChange={setDropdownOpen}
        modal={false}
      >
        <DropdownMenuTrigger asChild>
          <button
            className={cx(
              "flex min-h-11 w-full items-center gap-x-2.5 rounded-md border border-rule bg-surface-1 p-2 text-sm transition-colors hover:bg-surface-2",
              focusInput,
            )}
          >
            <span
              className="flex aspect-square size-8 items-center justify-center rounded bg-[var(--accent)] p-2 font-mono text-[10px] font-semibold uppercase tracking-wide text-[var(--accent-on)]"
              aria-hidden="true"
            >
              AC
            </span>
            <div className="flex w-full items-center justify-between gap-x-4 truncate">
              <div className="truncate text-left">
                <p className="truncate whitespace-nowrap text-sm font-medium text-fg-primary">
                  Acme Corp
                </p>
                <p className="whitespace-nowrap font-mono text-[10px] uppercase tracking-wide text-fg-muted">
                  Member
                </p>
              </div>
              <RiExpandUpDownLine
                className="size-4 shrink-0 text-fg-muted"
                aria-hidden="true"
              />
            </div>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          hidden={hasOpenDialog}
          onCloseAutoFocus={(event) => {
            if (focusRef.current) {
              focusRef.current.focus()
              focusRef.current = null
              event.preventDefault()
            }
          }}
        >
          <DropdownMenuGroup>
            <DropdownMenuLabel>
              Workspaces ({workspaces.length})
            </DropdownMenuLabel>
            {workspaces.map((workspace) => (
              <DropdownMenuItem key={workspace.value}>
                <div className="flex w-full items-center gap-x-2.5">
                  <span
                    className={cx(
                      workspace.color,
                      "flex aspect-square size-8 items-center justify-center rounded p-2 font-mono text-[10px] font-semibold uppercase tracking-wide",
                    )}
                    aria-hidden="true"
                  >
                    {workspace.initials}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-fg-primary">
                      {workspace.name}
                    </p>
                    <p className="font-mono text-[10px] uppercase tracking-wide text-fg-muted">
                      {workspace.role}
                    </p>
                  </div>
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <ModalAddWorkspace
            onSelect={handleDialogItemSelect}
            onOpenChange={handleDialogItemOpenChange}
            itemName="Add workspace"
          />
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export const WorkspacesDropdownMobile = () => {
  const [dropdownOpen, setDropdownOpen] = React.useState(false)
  const [hasOpenDialog, setHasOpenDialog] = React.useState(false)
  const dropdownTriggerRef = React.useRef<null | HTMLButtonElement>(null)
  const focusRef = React.useRef<null | HTMLButtonElement>(null)

  const handleDialogItemSelect = () => {
    focusRef.current = dropdownTriggerRef.current
  }

  const handleDialogItemOpenChange = (open: boolean) => {
    setHasOpenDialog(open)
    if (open === false) {
      setDropdownOpen(false)
    }
  }
  return (
    <>
      {/* sidebar (xs-lg) */}
      <DropdownMenu
        open={dropdownOpen}
        onOpenChange={setDropdownOpen}
        modal={false}
      >
        <DropdownMenuTrigger asChild>
          <button className="flex min-h-11 items-center gap-x-1.5 rounded-md p-2 hover:bg-surface-2 focus:outline-none">
            <span
              className={cx(
                "flex aspect-square size-8 items-center justify-center rounded bg-[var(--accent)] p-2 font-mono text-[10px] font-semibold uppercase tracking-wide text-[var(--accent-on)]",
              )}
              aria-hidden="true"
            >
              AC
            </span>
            <RiArrowRightSLine
              className="size-4 shrink-0 text-fg-muted"
              aria-hidden="true"
            />
            <div className="flex w-full items-center justify-between gap-x-3 truncate">
              <p className="truncate whitespace-nowrap text-sm font-medium text-fg-primary">
                Retail analytics
              </p>
              <RiExpandUpDownLine
                className="size-4 shrink-0 text-fg-muted"
                aria-hidden="true"
              />
            </div>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="!min-w-72"
          hidden={hasOpenDialog}
          onCloseAutoFocus={(event) => {
            if (focusRef.current) {
              focusRef.current.focus()
              focusRef.current = null
              event.preventDefault()
            }
          }}
        >
          <DropdownMenuGroup>
            <DropdownMenuLabel>
              Workspaces ({workspaces.length})
            </DropdownMenuLabel>
            {workspaces.map((workspace) => (
              <DropdownMenuItem key={workspace.value}>
                <div className="flex w-full items-center gap-x-2.5">
                  <span
                    className={cx(
                      workspace.color,
                      "flex size-8 items-center justify-center rounded p-2 text-xs font-medium text-white",
                    )}
                    aria-hidden="true"
                  >
                    {workspace.initials}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-fg-primary">
                      {workspace.name}
                    </p>
                    <p className="font-mono text-[10px] uppercase tracking-wide text-fg-muted">
                      {workspace.role}
                    </p>
                  </div>
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <ModalAddWorkspace
            onSelect={handleDialogItemSelect}
            onOpenChange={handleDialogItemOpenChange}
            itemName="Add workspace"
          />
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
