import Link from "next/link"
import { signupAction } from "../actions"

const ERROR_MESSAGES: Record<string, string> = {
  invalid_email: "That email address didn't parse. Check the format.",
  weak_password: "Password must be at least 8 characters.",
  password_mismatch: "Passwords don't match.",
  signup_failed: "We couldn't create that account. Try a different email.",
}

export default function SignupPage({
  searchParams,
}: {
  searchParams: { error?: string }
}) {
  const errorMessage = searchParams.error
    ? ERROR_MESSAGES[searchParams.error] ?? "Something went wrong."
    : null

  return (
    <div className="rounded-lg border border-rule bg-surface-1 p-8">
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-fg-muted">
        Nova / New workspace
      </p>
      <h1 className="mt-3 font-display text-2xl font-semibold text-fg-primary">
        Set up your account.
      </h1>

      <form action={signupAction} className="mt-8 space-y-5">
        <div>
          <label
            htmlFor="email"
            className="block font-mono text-[11px] uppercase tracking-wider text-fg-muted"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="mt-1.5 block min-h-11 w-full rounded-md border border-rule bg-surface-inset px-3 py-2 text-sm text-fg-primary outline-none transition-colors focus:border-[var(--accent)] focus:ring-2 focus:ring-accent"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block font-mono text-[11px] uppercase tracking-wider text-fg-muted"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            minLength={8}
            className="mt-1.5 block min-h-11 w-full rounded-md border border-rule bg-surface-inset px-3 py-2 text-sm text-fg-primary outline-none transition-colors focus:border-[var(--accent)] focus:ring-2 focus:ring-accent"
          />
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="block font-mono text-[11px] uppercase tracking-wider text-fg-muted"
          >
            Confirm password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            required
            minLength={8}
            className="mt-1.5 block min-h-11 w-full rounded-md border border-rule bg-surface-inset px-3 py-2 text-sm text-fg-primary outline-none transition-colors focus:border-[var(--accent)] focus:ring-2 focus:ring-accent"
          />
        </div>

        {errorMessage && (
          <p
            role="alert"
            className="rounded-md border border-[color-mix(in_oklch,var(--negative)_30%,transparent)] bg-[var(--negative-soft)] px-3 py-2 text-sm text-[var(--negative)]"
          >
            {errorMessage}
          </p>
        )}

        <button
          type="submit"
          className="flex min-h-11 w-full items-center justify-center rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-medium text-[var(--accent-on)] transition-colors hover:bg-[var(--accent-emphasis)] focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-surface-1"
        >
          Create account
        </button>
      </form>

      <p className="mt-8 border-t border-rule-soft pt-5 text-sm text-fg-muted">
        Already have one?{" "}
        <Link
          href="/login"
          className="font-medium text-fg-primary underline-offset-4 hover:underline"
        >
          Sign in
        </Link>
      </p>
    </div>
  )
}
