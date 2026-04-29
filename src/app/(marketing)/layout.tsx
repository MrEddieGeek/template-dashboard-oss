import Link from "next/link"
import { siteConfig } from "@/app/siteConfig"
import { NovaLogo } from "@/components/ui/icons/NovaLogo"

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col bg-surface-base text-fg-primary">
      <header className="sticky top-0 z-40 border-b border-rule bg-surface-base/95">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link
            href="/"
            aria-label={siteConfig.name}
            className="inline-flex items-center"
          >
            <NovaLogo className="h-7 text-fg-primary" />
          </Link>
          <div className="flex items-center gap-5">
            <Link
              href={siteConfig.baseLinks.login}
              className="hidden font-mono text-[11px] uppercase tracking-[0.18em] text-fg-secondary transition-colors hover:text-fg-primary sm:inline"
            >
              Sign in
            </Link>
            <Link
              href={siteConfig.baseLinks.signup}
              className="inline-flex min-h-9 items-center rounded-md bg-fg-primary px-4 py-2 text-sm font-medium text-fg-inverted transition-colors hover:bg-[var(--accent)] hover:text-[var(--accent-on)]"
            >
              Get access
            </Link>
          </div>
        </nav>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-rule">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-y-6 px-6 py-10 text-sm sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-2">
            <NovaLogo className="h-6 text-fg-primary" />
            <p className="mt-3 max-w-xs text-fg-muted">
              An operational console, not a marketing landing.
            </p>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-fg-muted">
              Product
            </p>
            <ul className="mt-3 space-y-2 text-fg-secondary">
              <li>
                <Link href={siteConfig.baseLinks.login} className="hover:text-fg-primary">
                  Sign in
                </Link>
              </li>
              <li>
                <Link href={siteConfig.baseLinks.signup} className="hover:text-fg-primary">
                  Sign up
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-fg-muted">
              Status
            </p>
            <ul className="mt-3 space-y-2 text-fg-secondary">
              <li className="tabular-nums text-fg-muted">
                &copy; {new Date().getFullYear()} {siteConfig.name}
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  )
}
