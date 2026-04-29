import { Badge } from "@/components/Badge"
import { ProgressBar } from "@/components/ProgressBar"

import { KpiEntry } from "@/app/(dashboard)/dashboard/page"

export type CardProps = {
  title: string
  change: string
  value: string
  valueDescription: string
  ctaDescription: string
  ctaText: string
  ctaLink: string
  data: KpiEntry[]
}

export function ProgressBarCard({
  title,
  change,
  value,
  valueDescription,
  ctaDescription,
  ctaText,
  ctaLink,
  data,
}: CardProps) {
  return (
    <section className="flex flex-col justify-between">
      <div>
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-fg-muted">
            {title}
          </h3>
          <Badge variant="neutral">{change}</Badge>
        </div>
        <p className="mt-3 flex items-baseline gap-2">
          <span className="font-display text-3xl font-semibold tabular-nums text-fg-primary">
            {value}
          </span>
          <span className="text-sm text-fg-muted">{valueDescription}</span>
        </p>
        <ul role="list" className="mt-6 space-y-4">
          {data.map((item) => (
            <li key={item.title}>
              <p className="flex justify-between text-sm">
                <span className="text-fg-secondary">{item.title}</span>
                <span className="tabular-nums text-fg-primary">
                  {item.current}
                  <span className="text-fg-muted">
                    {" / "}
                    {item.allowed}
                    {item.unit}
                  </span>
                </span>
              </p>
              <ProgressBar
                value={item.percentage}
                className="mt-2 [&>*]:h-1"
              />
            </li>
          ))}
        </ul>
      </div>
      <p className="mt-6 text-xs text-fg-muted">
        {ctaDescription}{" "}
        <a
          href={ctaLink}
          className="font-medium text-fg-primary underline-offset-4 hover:underline"
        >
          {ctaText}
        </a>
      </p>
    </section>
  )
}
