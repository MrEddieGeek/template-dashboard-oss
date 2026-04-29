"use client"
import { siteConfig } from "@/app/siteConfig"
import { NovaLogo } from "@/components/ui/icons/NovaLogo"
import { cx, focusRing } from "@/lib/utils"
import {
  RiHome2Line,
  RiLinkM,
  RiListCheck,
  RiSettings5Line,
} from "@remixicon/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import MobileSidebar from "./MobileSidebar"
import {
  WorkspacesDropdownDesktop,
  WorkspacesDropdownMobile,
} from "./SidebarWorkspacesDropdown"
import { UserProfileDesktop, UserProfileMobile } from "./UserProfile"

const navigation = [
  { name: "Dashboard", href: siteConfig.baseLinks.dashboard, icon: RiHome2Line },
  { name: "Details", href: siteConfig.baseLinks.details, icon: RiListCheck },
  { name: "Settings", href: siteConfig.baseLinks.settings, icon: RiSettings5Line },
] as const

const shortcuts = [
  { name: "Add new user", href: "#", icon: RiLinkM },
  { name: "Workspace usage", href: "#", icon: RiLinkM },
  { name: "Cost spend control", href: "#", icon: RiLinkM },
  { name: "Overview – Rows written", href: "#", icon: RiLinkM },
] as const

export function Sidebar() {
  const pathname = usePathname()
  const isActive = (itemHref: string) => {
    if (itemHref === siteConfig.baseLinks.dashboard) {
      return pathname === itemHref
    }
    return pathname === itemHref || pathname.startsWith(itemHref + "/")
  }
  return (
    <>
      {/* sidebar (lg+) */}
      <nav className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <aside className="flex grow flex-col gap-y-6 overflow-y-auto border-r border-rule bg-surface-1 p-4">
          <Link
            href={siteConfig.baseLinks.home}
            aria-label={siteConfig.name}
            className="px-1 py-1"
          >
            <NovaLogo className="h-7 text-fg-primary" />
          </Link>
          <WorkspacesDropdownDesktop />
          <nav
            aria-label="core navigation links"
            className="flex flex-1 flex-col space-y-10"
          >
            <ul role="list" className="space-y-0.5">
              {navigation.map((item) => {
                const active = isActive(item.href)
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cx(
                        active
                          ? "bg-surface-2 text-fg-primary"
                          : "text-fg-secondary hover:bg-surface-2 hover:text-fg-primary",
                        "flex min-h-11 items-center gap-x-2.5 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                        focusRing,
                      )}
                    >
                      <item.icon
                        className={cx(
                          "size-4 shrink-0",
                          active ? "text-[var(--accent)]" : "text-fg-faint",
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  </li>
                )
              })}
            </ul>
            <div>
              <span className="font-mono text-[10px] uppercase tracking-wider text-fg-muted">
                Shortcuts
              </span>
              <ul aria-label="shortcuts" role="list" className="mt-2 space-y-0.5">
                {shortcuts.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={cx(
                        "flex min-h-11 items-center gap-x-2.5 rounded-md px-3 py-2 text-sm text-fg-secondary transition-colors hover:bg-surface-2 hover:text-fg-primary",
                        focusRing,
                      )}
                    >
                      <item.icon
                        className="size-4 shrink-0 text-fg-faint"
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
          <div className="mt-auto">
            <UserProfileDesktop />
          </div>
        </aside>
      </nav>
      {/* top navbar (xs-lg) */}
      <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center justify-between border-b border-rule bg-surface-1 px-2 sm:gap-x-6 sm:px-4 lg:hidden">
        <WorkspacesDropdownMobile />
        <div className="flex items-center gap-1 sm:gap-2">
          <UserProfileMobile />
          <MobileSidebar />
        </div>
      </div>
    </>
  )
}
