export default function Details() {
  return (
    <div className="space-y-10">
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-fg-muted">
          Section / Drill-down
        </p>
        <h1 className="mt-2 font-display text-2xl font-semibold tracking-tight text-fg-primary sm:text-3xl">
          Details
        </h1>
        <p className="mt-2 max-w-prose text-sm text-fg-secondary">
          Per-metric breakdowns, anomaly slices, and CSV exports surface here.
          Pick a metric in the overview to drill in, or open a saved view from
          your shortcuts.
        </p>
      </div>

      <section
        aria-labelledby="next-actions"
        className="rounded-lg border border-rule bg-surface-1 p-6"
      >
        <h2
          id="next-actions"
          className="font-mono text-[11px] uppercase tracking-[0.18em] text-fg-muted"
        >
          Next actions
        </h2>
        <ul className="mt-3 divide-y divide-rule-soft">
          <li className="flex items-baseline justify-between gap-4 py-3 text-sm">
            <span className="text-fg-primary">
              Pick a metric from Overview to populate this view
            </span>
            <span className="font-mono text-[11px] uppercase tracking-wide text-fg-muted">
              Pending
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-4 py-3 text-sm">
            <span className="text-fg-primary">
              Configure CSV export schedule
            </span>
            <span className="font-mono text-[11px] uppercase tracking-wide text-fg-muted">
              Pending
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-4 py-3 text-sm">
            <span className="text-fg-primary">
              Subscribe to anomaly alerts on this slice
            </span>
            <span className="font-mono text-[11px] uppercase tracking-wide text-fg-muted">
              Pending
            </span>
          </li>
        </ul>
      </section>
    </div>
  )
}
