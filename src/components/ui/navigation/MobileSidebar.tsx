import { siteConfig } from "@/app/siteConfig"
import { Button } from "@/components/Button"
import {
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/Drawer"
import { NovaLogo } from "@/components/ui/icons/NovaLogo"
import { cx, focusRing } from "@/lib/utils"
import {
  RiHome2Line,
  RiLinkM,
  RiListCheck,
  RiMenuLine,
  RiSettings5Line,
} from "@remixicon/react"
import Link from "next/link"
import { usePathname } from "next/navigation"

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

export default function MobileSidebar() {
  const pathname = usePathname()
  const isActive = (itemHref: string) => {
    if (itemHref === siteConfig.baseLinks.dashboard) {
      return pathname === itemHref
    }
    return pathname === itemHref || pathname.startsWith(itemHref + "/")
  }
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          variant="ghost"
          aria-label="Open navigation"
          className="group flex min-h-11 min-w-11 items-center justify-center rounded-md p-2 text-sm font-medium hover:bg-surface-2 data-[state=open]:bg-surface-2"
        >
          <RiMenuLine className="size-5 shrink-0" aria-hidden="true" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="sm:max-w-lg">
        <DrawerHeader>
          <DrawerTitle className="sr-only">{siteConfig.name}</DrawerTitle>
          <NovaLogo className="h-7 text-fg-primary" />
        </DrawerHeader>
        <DrawerBody>
          <nav
            aria-label="core mobile navigation links"
            className="flex flex-1 flex-col space-y-10"
          >
            <ul role="list" className="space-y-1">
              {navigation.map((item) => {
                const active = isActive(item.href)
                return (
                  <li key={item.name}>
                    <DrawerClose asChild>
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className={cx(
                          active
                            ? "bg-surface-2 text-fg-primary"
                            : "text-fg-secondary hover:bg-surface-2 hover:text-fg-primary",
                          "flex min-h-11 items-center gap-x-2.5 rounded-md px-3 py-2 text-base font-medium transition-colors sm:text-sm",
                          focusRing,
                        )}
                      >
                        <item.icon
                          className={cx(
                            "size-5 shrink-0",
                            active ? "text-[var(--accent)]" : "text-fg-faint",
                          )}
                          aria-hidden="true"
                        />
                        {item.name}
                      </Link>
                    </DrawerClose>
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
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}
