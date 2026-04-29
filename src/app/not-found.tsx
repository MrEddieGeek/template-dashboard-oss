import { Button } from "@/components/Button"
import { NovaLogo } from "@/components/ui/icons/NovaLogo"
import { RiArrowRightLine } from "@remixicon/react"
import Link from "next/link"
import { siteConfig } from "./siteConfig"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6">
      <Link href={siteConfig.baseLinks.home}>
        <NovaLogo className="h-8 text-fg-primary" />
      </Link>
      <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.2em] text-fg-muted">
        Status · 404
      </p>
      <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-fg-primary sm:text-4xl">
        No record at this address.
      </h1>
      <p className="mt-3 max-w-sm text-center text-sm text-fg-secondary">
        The page you tried to open doesn&rsquo;t exist or has moved. Head back
        and try a different route.
      </p>
      <Button asChild className="mt-8" variant="secondary">
        <Link href={siteConfig.baseLinks.home}>
          Return home
          <RiArrowRightLine className="ml-1.5 size-4" aria-hidden="true" />
        </Link>
      </Button>
    </div>
  )
}
