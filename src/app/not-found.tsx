import { Button } from "@/components/Button"
import { NovaLogo } from "@/components/ui/icons/NovaLogo"
import { RiArrowRightLine } from "@remixicon/react"
import Link from "next/link"
import { siteConfig } from "./siteConfig"

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <Link href={siteConfig.baseLinks.home}>
        <NovaLogo className="mt-6 h-10 text-gray-900 dark:text-gray-50" />
      </Link>
      <p className="mt-6 font-heading text-4xl font-semibold text-indigo-600 sm:text-5xl dark:text-indigo-400">
        404
      </p>
      <h1 className="mt-4 font-heading text-2xl font-semibold text-gray-900 dark:text-gray-50">
        Page not found
      </h1>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Sorry, we couldn&rsquo;t find the page you&rsquo;re looking for.
      </p>
      <Button asChild className="group mt-8" variant="light">
        <Link href={siteConfig.baseLinks.home}>
          Go to the home page
          <RiArrowRightLine
            className="ml-1.5 size-5 text-gray-900 dark:text-gray-50"
            aria-hidden="true"
          />
        </Link>
      </Button>
    </div>
  )
}
