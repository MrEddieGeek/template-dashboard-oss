import Link from "next/link"
import { RiArrowRightLine } from "@remixicon/react"
import { siteConfig } from "@/app/siteConfig"

const capabilities = [
  {
    label: "01",
    title: "Real-time read-outs",
    body: "Stream events from your stack and watch the readouts move. No five-minute polling, no stale dashboards. The cursor is the cursor.",
  },
  {
    label: "02",
    title: "Drill-down without warm-up",
    body: "Open a metric, drill straight to the underlying slice, export a CSV. The path from chart to row is one click — not a query, not a request to data.",
  },
  {
    label: "03",
    title: "Anomaly markers, not magic",
    body: "Flag inflections we can show you the math for. We mark, you decide; the explanations stay legible to the analyst, not just the model.",
  },
  {
    label: "04",
    title: "Reports on a schedule",
    body: "Compose recurring reports against your saved metrics. Webhook, email, or download — your routine, not a vendor's.",
  },
] as const

const sampleSeries = [12, 18, 22, 19, 28, 34, 31, 38, 44, 41, 48, 56, 52, 60, 67]

function HeroPlot() {
  // small inline SVG chart so the hero shows the product's voice — not a screenshot mock,
  // not a fake metric trio. left-aligned, honest typography, no gradient fill.
  const w = 720
  const h = 220
  const padX = 0
  const padY = 8
  const maxV = Math.max(...sampleSeries)
  const stepX = (w - padX * 2) / (sampleSeries.length - 1)
  const points = sampleSeries.map((v, i) => {
    const x = padX + i * stepX
    const y = h - padY - ((v / maxV) * (h - padY * 2))
    return `${x},${y}`
  })
  const path = `M ${points.join(" L ")}`
  const last = points[points.length - 1].split(",")
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      role="img"
      aria-label="Sample throughput series, last fifteen intervals"
      className="block w-full"
    >
      <defs>
        <pattern id="grid" width="48" height="44" patternUnits="userSpaceOnUse">
          <path
            d="M 48 0 L 0 0 0 44"
            fill="none"
            stroke="var(--rule-soft)"
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <rect width={w} height={h} fill="url(#grid)" />
      <path
        d={path}
        fill="none"
        stroke="var(--accent)"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx={last[0]}
        cy={last[1]}
        r="3.5"
        fill="var(--accent)"
        stroke="var(--surface-base)"
        strokeWidth="2"
      />
    </svg>
  )
}

export default function LandingPage() {
  return (
    <>
      {/* Hero — left-aligned editorial statement + a small live-feeling readout. No gradient. No glow. */}
      <section className="border-b border-rule">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-x-12 gap-y-12 px-6 py-20 sm:py-24 lg:grid-cols-12 lg:gap-y-0 lg:py-28">
          <div className="lg:col-span-7">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-fg-muted">
              Nova / Operational analytics · v0.1
            </p>
            <h1 className="mt-6 max-w-xl font-display text-4xl font-semibold leading-[1.05] tracking-tight text-fg-primary sm:text-5xl lg:text-6xl">
              An operations console for people who watch the numbers, not the
              quarterly slide.
            </h1>
            <p className="mt-6 max-w-lg text-base text-fg-secondary sm:text-lg">
              {siteConfig.description}
            </p>
            <div className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <Link
                href={siteConfig.baseLinks.signup}
                className="inline-flex min-h-11 items-center gap-2 rounded-md bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-[var(--accent-on)] transition-colors hover:bg-[var(--accent-emphasis)]"
              >
                Open a workspace
                <RiArrowRightLine className="size-4" aria-hidden="true" />
              </Link>
              <Link
                href={siteConfig.baseLinks.login}
                className="inline-flex min-h-11 items-center text-sm font-medium text-fg-primary underline-offset-4 hover:underline"
              >
                Sign in to an existing one
              </Link>
            </div>
          </div>

          <aside
            aria-label="Sample readout"
            className="lg:col-span-5"
          >
            <div className="rounded-md border border-rule bg-surface-1 p-5 shadow-rise">
              <div className="flex items-baseline justify-between">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-fg-muted">
                  api/throughput · 15m
                </p>
                <p className="font-mono text-[11px] tabular-nums text-[var(--positive)]">
                  +14.3%
                </p>
              </div>
              <p className="mt-3 font-display text-3xl font-semibold tabular-nums text-fg-primary">
                12,480
                <span className="ml-2 text-base font-normal text-fg-muted">
                  req/min
                </span>
              </p>
              <div className="mt-5">
                <HeroPlot />
              </div>
              <dl className="mt-5 grid grid-cols-3 gap-x-2 border-t border-rule-soft pt-3 text-xs tabular-nums">
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-wide text-fg-muted">
                    p50
                  </dt>
                  <dd className="mt-1 text-fg-primary">42 ms</dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-wide text-fg-muted">
                    p95
                  </dt>
                  <dd className="mt-1 text-fg-primary">186 ms</dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-wide text-fg-muted">
                    err
                  </dt>
                  <dd className="mt-1 text-fg-primary">0.04%</dd>
                </div>
              </dl>
            </div>
          </aside>
        </div>
      </section>

      {/* Capabilities — numbered editorial list, not a card grid. asymmetric column widths. */}
      <section className="border-b border-rule">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
          <div className="grid grid-cols-1 gap-x-12 gap-y-3 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-fg-muted">
                §1 Capabilities
              </p>
              <h2 className="mt-3 max-w-sm font-display text-3xl font-semibold leading-tight tracking-tight text-fg-primary sm:text-4xl">
                Built for the analyst on shift, not the buyer at the demo.
              </h2>
            </div>
            <ol className="lg:col-span-8">
              {capabilities.map((c, i) => (
                <li
                  key={c.label}
                  className={
                    i === 0
                      ? "grid grid-cols-[3rem_1fr] items-baseline gap-x-6 border-t border-rule py-8 sm:grid-cols-[4rem_1fr]"
                      : "grid grid-cols-[3rem_1fr] items-baseline gap-x-6 border-t border-rule-soft py-8 sm:grid-cols-[4rem_1fr]"
                  }
                >
                  <span className="font-mono text-[11px] tabular-nums text-fg-faint">
                    {c.label}
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-fg-primary">
                      {c.title}
                    </h3>
                    <p className="mt-2 max-w-prose text-fg-secondary">
                      {c.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* CTA — a typographic statement, not a centered hero clone */}
      <section>
        <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
          <div className="grid grid-cols-1 gap-x-12 gap-y-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-fg-muted">
                §2 Get started
              </p>
              <p className="mt-4 max-w-2xl font-display text-2xl font-medium leading-snug tracking-tight text-fg-primary sm:text-3xl">
                Spin up a workspace, connect one source, and have a real
                read-out by lunch. No procurement call. No demo.
              </p>
            </div>
            <div className="flex items-end gap-4 lg:col-span-5">
              <Link
                href={siteConfig.baseLinks.signup}
                className="inline-flex min-h-11 items-center gap-2 rounded-md bg-fg-primary px-5 py-2.5 text-sm font-medium text-fg-inverted transition-colors hover:bg-[var(--accent)] hover:text-[var(--accent-on)]"
              >
                Open a workspace
                <RiArrowRightLine className="size-4" aria-hidden="true" />
              </Link>
              <Link
                href={siteConfig.baseLinks.login}
                className="inline-flex min-h-11 items-center text-sm font-medium text-fg-secondary underline-offset-4 hover:text-fg-primary hover:underline"
              >
                Or sign in &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
