export default function Settings() {
  const sections = [
    {
      key: "profile",
      label: "Profile",
      description: "Display name, email, and notification preferences.",
    },
    {
      key: "billing",
      label: "Billing",
      description: "Plan, invoice history, and seat count.",
    },
    {
      key: "team",
      label: "Team",
      description: "Members, roles, and pending invitations.",
    },
    {
      key: "api",
      label: "API keys",
      description: "Issue, rotate, and revoke service tokens.",
    },
  ] as const

  return (
    <div className="space-y-10">
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-fg-muted">
          Section / Workspace
        </p>
        <h1 className="mt-2 font-display text-2xl font-semibold tracking-tight text-fg-primary sm:text-3xl">
          Settings
        </h1>
        <p className="mt-2 max-w-prose text-sm text-fg-secondary">
          Workspace administration for your account. Changes apply across every
          connected dashboard.
        </p>
      </div>

      <ul className="divide-y divide-rule-soft border-y border-rule-soft">
        {sections.map((s) => (
          <li
            key={s.key}
            className="flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
          >
            <div className="sm:w-44">
              <p className="font-mono text-[11px] uppercase tracking-wide text-fg-muted">
                {s.label}
              </p>
            </div>
            <p className="flex-1 text-sm text-fg-secondary">{s.description}</p>
            <span className="font-mono text-[11px] uppercase tracking-wide text-fg-faint">
              Coming
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
