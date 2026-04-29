/*
 * Chart palette — semantic, OKLCH-driven via CSS variables.
 *
 * Keys are intentional series labels rather than color names so consumers
 * pick by role ("primary" series for the dominant metric, "compare" for
 * the previous-period overlay) rather than reaching for indigo/violet/cyan.
 */

export type ColorUtility = "bg" | "stroke" | "fill" | "text"

export const chartColors = {
  primary: {
    bg: "bg-[var(--chart-1)]",
    stroke: "[stroke:var(--chart-1)]",
    fill: "[fill:var(--chart-1)]",
    text: "text-[var(--chart-1)]",
  },
  compare: {
    bg: "bg-[var(--fg-muted)]",
    stroke: "[stroke:var(--fg-muted)]",
    fill: "[fill:var(--fg-muted)]",
    text: "text-[var(--fg-muted)]",
  },
  positive: {
    bg: "bg-[var(--chart-2)]",
    stroke: "[stroke:var(--chart-2)]",
    fill: "[fill:var(--chart-2)]",
    text: "text-[var(--chart-2)]",
  },
  steel: {
    bg: "bg-[var(--chart-3)]",
    stroke: "[stroke:var(--chart-3)]",
    fill: "[fill:var(--chart-3)]",
    text: "text-[var(--chart-3)]",
  },
  ochre: {
    bg: "bg-[var(--chart-4)]",
    stroke: "[stroke:var(--chart-4)]",
    fill: "[fill:var(--chart-4)]",
    text: "text-[var(--chart-4)]",
  },
  mauve: {
    bg: "bg-[var(--chart-5)]",
    stroke: "[stroke:var(--chart-5)]",
    fill: "[fill:var(--chart-5)]",
    text: "text-[var(--chart-5)]",
  },
  slate: {
    bg: "bg-[var(--chart-6)]",
    stroke: "[stroke:var(--chart-6)]",
    fill: "[fill:var(--chart-6)]",
    text: "text-[var(--chart-6)]",
  },
} as const satisfies {
  [color: string]: { [key in ColorUtility]: string }
}

export type AvailableChartColorsKeys = keyof typeof chartColors

export const AvailableChartColors: AvailableChartColorsKeys[] = Object.keys(
  chartColors,
) as Array<AvailableChartColorsKeys>

export const constructCategoryColors = (
  categories: string[],
  colors: AvailableChartColorsKeys[],
): Map<string, AvailableChartColorsKeys> => {
  const categoryColors = new Map<string, AvailableChartColorsKeys>()
  categories.forEach((category, index) => {
    categoryColors.set(category, colors[index % colors.length])
  })
  return categoryColors
}

export const getColorClassName = (
  color: AvailableChartColorsKeys,
  type: ColorUtility,
): string => {
  const fallback = chartColors.compare
  return chartColors[color]?.[type] ?? fallback[type]
}

export const getYAxisDomain = (
  autoMinValue: boolean,
  minValue: number | undefined,
  maxValue: number | undefined,
) => {
  const minDomain = autoMinValue ? "auto" : (minValue ?? 0)
  const maxDomain = maxValue ?? "auto"
  return [minDomain, maxDomain]
}

export function hasOnlyOneValueForKey(
  array: any[],
  keyToCheck: string,
): boolean {
  const val: any[] = []
  for (const obj of array) {
    if (Object.prototype.hasOwnProperty.call(obj, keyToCheck)) {
      val.push(obj[keyToCheck])
      if (val.length > 1) return false
    }
  }
  return true
}
