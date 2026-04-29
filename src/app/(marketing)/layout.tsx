import Link from "next/link"
import { siteConfig } from "@/app/siteConfig"
import { NovaLogo } from "@/components/ui/icons/NovaLogo"

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col bg-nova-ink text-gray-100">
      <header className="sticky top-0 z-40 border-b border-white/5 bg-nova-ink/70 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link
            href="/"
            aria-label={siteConfig.name}
            className="inline-flex items-center"
          >
            <NovaLogo className="h-7 text-white" />
          </Link>
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href={siteConfig.baseLinks.login}
              className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 transition hover:text-white"
            >
              Sign in
            </Link>
            <Link
              href={siteConfig.baseLinks.signup}
              className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-nova-ink shadow-sm transition hover:bg-gray-100"
            >
              Get started
            </Link>
          </div>
        </nav>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-white/5 bg-nova-ink">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
          <div className="flex items-center gap-3">
            <NovaLogo className="h-6 text-white" />
          </div>
          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights
            reserved.
          </p>
          <div className="flex items-center gap-5 text-xs text-gray-400">
            <Link href={siteConfig.baseLinks.login} className="hover:text-white">
              Sign in
            </Link>
            <Link href={siteConfig.baseLinks.signup} className="hover:text-white">
              Sign up
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
