import { Badge } from "@/components/Badge"
import { cx } from "@/lib/utils"

import type { KpiEntryExtended } from "@/app/(dashboard)/dashboard/page"

export type CardProps = {
  title: string
  change: string
  value: string
  valueDescription: string
  subtitle: string
  ctaDescription: string
  ctaText: string
  ctaLink: string
  data: KpiEntryExtended[]
}

export function CategoryBarCard({
  title,
  change,
  value,
  valueDescription,
  subtitle,
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
        <div className="mt-6">
          <p className="font-mono text-[11px] uppercase tracking-wide text-fg-muted">
            {subtitle}
          </p>
          <div className="mt-2 flex h-1.5 items-center gap-0.5 overflow-hidden rounded-full">
            {data.map((item) => (
              <div
                key={item.title}
                className={cx(item.color, "h-full")}
                style={{ width: `${item.percentage}%` }}
              />
            ))}
          </div>
        </div>
        <ul role="list" className="mt-5 space-y-2">
          {data.map((item) => (
            <li
              key={item.title}
              className="flex items-baseline justify-between gap-3 text-sm"
            >
              <span className="flex items-center gap-2">
                <span
                  className={cx(item.color, "size-2 rounded-sm")}
                  aria-hidden="true"
                />
                <span className="text-fg-primary">{item.title}</span>
              </span>
              <span className="tabular-nums text-fg-muted">
                {item.value}
                <span className="ml-1.5 text-fg-faint">
                  {item.percentage}%
                </span>
              </span>
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
