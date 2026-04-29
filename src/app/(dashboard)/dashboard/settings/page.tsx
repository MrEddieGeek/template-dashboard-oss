import { NovaMark } from "@/components/ui/icons/NovaMark"

export default function Settings() {
  return (
    <div className="mt-4 sm:mt-6 lg:mt-10">
      <div className="my-40 flex w-full flex-col items-center justify-center text-center">
        <NovaMark className="size-20 shrink-0" />
        <h2 className="mt-6 font-heading text-lg font-semibold text-gray-900 sm:text-xl dark:text-gray-50">
          Workspace settings
        </h2>
        <p className="mt-3 max-w-md text-sm text-gray-500 dark:text-gray-400">
          Profile, billing, team, and API keys live here. We&apos;re wiring up
          the panels next.
        </p>
      </div>
    </div>
  )
}
