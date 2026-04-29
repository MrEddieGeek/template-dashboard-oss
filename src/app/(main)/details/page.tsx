import { NovaMark } from "@/components/ui/icons/NovaMark"

export default function Example() {
  return (
    <>
      <h1 className="font-heading text-lg font-semibold text-gray-900 sm:text-xl dark:text-gray-50">
        Details
      </h1>
      <div className="mt-4 sm:mt-6 lg:mt-10">
        <div className="my-40 flex w-full flex-col items-center justify-center text-center">
          <NovaMark className="size-20 shrink-0" />
          <h2 className="mt-6 font-heading text-lg font-semibold sm:text-xl">
            Drill-down view
          </h2>
          <p className="mt-3 max-w-md text-sm text-gray-500 dark:text-gray-400">
            Per-metric detail tables, breakdowns, and exports plug in here.
          </p>
        </div>
      </div>
    </>
  )
}
