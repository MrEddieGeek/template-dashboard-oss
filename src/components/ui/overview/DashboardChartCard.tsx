"use client"

import { PeriodValue } from "@/app/(dashboard)/dashboard/page"
import { Badge } from "@/components/Badge"
import { LineChart } from "@/components/LineChart"
import { overviews } from "@/data/overview-data"
import { OverviewData } from "@/data/schema"
import { cx, formatters, percentageFormatter } from "@/lib/utils"
import {
  eachDayOfInterval,
  formatDate,
  interval,
  isWithinInterval,
} from "date-fns"
import * as React from "react"
import { DateRange } from "react-day-picker"
import { getPeriod } from "./DashboardFilterbar"

export type CardProps = {
  title: keyof OverviewData
  type: "currency" | "unit"
  selectedDates: DateRange | undefined
  selectedPeriod: PeriodValue
  isThumbnail?: boolean
}

const formattingMap = {
  currency: formatters.currency,
  unit: formatters.unit,
}

export const getBadgeType = (value: number) => {
  if (value > 0) {
    return "success"
  } else if (value < 0) {
    if (value < -50) {
      return "warning"
    }
    return "error"
  } else {
    return "neutral"
  }
}

export function ChartCard({
  title,
  type,
  selectedDates,
  selectedPeriod,
  isThumbnail,
}: CardProps) {
  const formatter = formattingMap[type]

  const { chartData, value, previousValue, evolution } = React.useMemo(() => {
    const selectedDatesInterval =
      selectedDates?.from && selectedDates?.to
        ? interval(selectedDates.from, selectedDates.to)
        : null
    const allDatesInInterval =
      selectedDates?.from && selectedDates?.to
        ? eachDayOfInterval(interval(selectedDates.from, selectedDates.to))
        : null
    const prevDates = getPeriod(selectedDates)
    const prevDatesInterval =
      prevDates?.from && prevDates?.to
        ? interval(prevDates.from, prevDates.to)
        : null

    const data = overviews
      .filter((o) =>
        selectedDatesInterval
          ? isWithinInterval(o.date, selectedDatesInterval)
          : true,
      )
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

    const prevData = overviews
      .filter((o) =>
        prevDatesInterval ? isWithinInterval(o.date, prevDatesInterval) : false,
      )
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

    const chartData = allDatesInInterval?.map((date, index) => {
      const overview = data[index]
      const prevOverview = prevData[index]
      const value = (overview?.[title] as number) || null
      const previousValue = (prevOverview?.[title] as number) || null
      return {
        title,
        date,
        formattedDate: formatDate(date, "dd/MM/yyyy"),
        value,
        previousDate: prevOverview?.date,
        previousFormattedDate: prevOverview
          ? formatDate(prevOverview.date, "dd/MM/yyyy")
          : null,
        previousValue:
          selectedPeriod !== "no-comparison" ? previousValue : null,
        evolution:
          selectedPeriod !== "no-comparison" && value && previousValue
            ? (value - previousValue) / previousValue
            : undefined,
      }
    })

    const value =
      chartData?.reduce((acc, item) => acc + (item.value || 0), 0) || 0
    const previousValue =
      chartData?.reduce(
        (acc, item) => acc + (item.previousValue || 0),
        0,
      ) || 0
    const evolution =
      selectedPeriod !== "no-comparison" && previousValue
        ? (value - previousValue) / previousValue
        : 0

    return { chartData, value, previousValue, evolution }
  }, [title, selectedDates, selectedPeriod])

  const categories =
    selectedPeriod === "no-comparison" ? ["value"] : ["value", "previousValue"]

  return (
    <div className={cx("transition-colors")}>
      <div className="flex items-baseline justify-between gap-x-2">
        <div className="flex items-baseline gap-x-2">
          <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-fg-muted">
            {title}
          </h3>
          {selectedPeriod !== "no-comparison" && (
            <Badge variant={getBadgeType(evolution)}>
              {percentageFormatter(evolution)}
            </Badge>
          )}
        </div>
      </div>
      <div className="mt-3 flex items-baseline justify-between">
        <p className="font-display text-2xl font-semibold tabular-nums text-fg-primary">
          {formatter(value)}
        </p>
        {selectedPeriod !== "no-comparison" && (
          <p className="text-sm tabular-nums text-fg-muted">
            from {formatter(previousValue)}
          </p>
        )}
      </div>
      <LineChart
        className="mt-6 h-32"
        data={chartData || []}
        index="formattedDate"
        colors={["primary", "compare"]}
        startEndOnly={true}
        valueFormatter={(value) => formatter(value as number)}
        showYAxis={false}
        showLegend={false}
        categories={categories}
        showTooltip={isThumbnail ? false : true}
        autoMinValue
      />
    </div>
  )
}
