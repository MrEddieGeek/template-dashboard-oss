"use client"
import { CategoryBarCard } from "@/components/ui/overview/DashboardCategoryBarCard"
import { ChartCard } from "@/components/ui/overview/DashboardChartCard"
import { Filterbar } from "@/components/ui/overview/DashboardFilterbar"
import { ProgressBarCard } from "@/components/ui/overview/DashboardProgressBarCard"
import { overviews } from "@/data/overview-data"
import { OverviewData } from "@/data/schema"
import { cx } from "@/lib/utils"
import { subDays, toDate } from "date-fns"
import React from "react"
import { DateRange } from "react-day-picker"

export type PeriodValue = "previous-period" | "last-year" | "no-comparison"

const categories: {
  title: keyof OverviewData
  type: "currency" | "unit"
}[] = [
  {
    title: "Data Processed",
    type: "unit",
  },
  {
    title: "API Calls",
    type: "unit",
  },
  {
    title: "Queries",
    type: "unit",
  },
  {
    title: "Revenue",
    type: "currency",
  },
  {
    title: "Sign Ups",
    type: "unit",
  },
  {
    title: "Active Sessions",
    type: "unit",
  },
]

export type KpiEntry = {
  title: string
  percentage: number
  current: number
  allowed: number
  unit?: string
}

const data: KpiEntry[] = [
  {
    title: "Data Processed",
    percentage: 48.1,
    current: 48.1,
    allowed: 100,
    unit: "M",
  },
  {
    title: "API Calls",
    percentage: 78.3,
    current: 78.3,
    allowed: 100,
    unit: "M",
  },
  {
    title: "Storage",
    percentage: 26,
    current: 5.2,
    allowed: 20,
    unit: "GB",
  },
]

const data2: KpiEntry[] = [
  {
    title: "Weekly active users",
    percentage: 21.7,
    current: 21.7,
    allowed: 100,
    unit: "%",
  },
  {
    title: "Total users",
    percentage: 70,
    current: 28,
    allowed: 40,
  },
  {
    title: "Uptime",
    percentage: 98.3,
    current: 98.3,
    allowed: 100,
    unit: "%",
  },
]

export type KpiEntryExtended = Omit<
  KpiEntry,
  "current" | "allowed" | "unit"
> & {
  value: string
  color: string
}

const data3: KpiEntryExtended[] = [
  {
    title: "Base tier",
    percentage: 68.1,
    value: "$200",
    color: "bg-[var(--chart-1)]",
  },
  {
    title: "On-demand charges",
    percentage: 20.8,
    value: "$61.1",
    color: "bg-[var(--chart-4)]",
  },
  {
    title: "Caching",
    percentage: 11.1,
    value: "$31.9",
    color: "bg-[var(--fg-faint)]",
  },
]

const overviewsDates = overviews.map((item) => toDate(item.date).getTime())
const maxDate = toDate(Math.max(...overviewsDates))

export default function Overview() {
  const [selectedDates, setSelectedDates] = React.useState<
    DateRange | undefined
  >({
    from: subDays(maxDate, 30),
    to: maxDate,
  })

  return (
    <>
      <section aria-labelledby="current-billing-cycle">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-fg-muted">
          Section / Billing
        </p>
        <h1
          id="current-billing-cycle"
          className="mt-2 scroll-mt-10 font-display text-2xl font-semibold tracking-tight text-fg-primary sm:text-3xl"
        >
          Current cycle
        </h1>
        <div className="mt-8 grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 xl:grid-cols-3">
          <ProgressBarCard
            title="Usage"
            change="+0.2%"
            value="68.1%"
            valueDescription="of allowed capacity"
            ctaDescription="Monthly usage resets in 12 days."
            ctaText="Manage plan"
            ctaLink="#"
            data={data}
          />
          <ProgressBarCard
            title="Workspace"
            change="+2.9%"
            value="21.7%"
            valueDescription="weekly active users"
            ctaDescription="Add up to 20 members on the free plan."
            ctaText="Invite users"
            ctaLink="#"
            data={data2}
          />
          <CategoryBarCard
            title="Costs"
            change="-1.4%"
            value="$293.5"
            valueDescription="current billing cycle"
            subtitle="Composition"
            ctaDescription="Set hard caps in"
            ctaText="cost spend management"
            ctaLink="#"
            data={data3}
          />
        </div>
      </section>
      <section aria-labelledby="usage-overview">
        <div
          className="sticky top-0 z-20 -mx-4 mt-16 flex items-baseline justify-between gap-4 border-b border-rule bg-surface-base px-4 py-4 sm:-mx-6 sm:px-6 lg:-mx-10 lg:px-10"
        >
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-fg-muted">
              Section / Metrics
            </p>
            <h2
              id="usage-overview"
              className="mt-1 font-display text-xl font-semibold tracking-tight text-fg-primary sm:text-2xl"
            >
              Overview
            </h2>
          </div>
          <Filterbar
            maxDate={maxDate}
            minDate={new Date(2024, 0, 1)}
            selectedDates={selectedDates}
            onDatesChange={(dates) => setSelectedDates(dates)}
          />
        </div>
        <div
          className={cx(
            "mt-10 grid grid-cols-1 gap-x-10 gap-y-12 md:grid-cols-2 xl:grid-cols-3",
          )}
        >
          {categories.map((category) => {
            return (
              <ChartCard
                key={category.title}
                title={category.title}
                type={category.type}
                selectedDates={selectedDates}
                selectedPeriod={"last-year"}
              />
            )
          })}
        </div>
      </section>
    </>
  )
}
