# Architecture

A single-codebase Next.js 14 App Router application deployed on Vercel, backed by Supabase for auth.

## High-level diagram

```
┌──────────┐    HTTPS    ┌─────────────────────────────┐    REST    ┌──────────┐
│ Browser  │────────────▶│  Vercel (Next.js 14, Node)  │───────────▶│ Supabase │
│          │             │                             │            │  (Auth)  │
│  /api/*  │◀────────────│  middleware → route handler │◀───────────│          │
└──────────┘   JSON/HTML └─────────────────────────────┘            └──────────┘
                                  │
                                  └── @vercel/analytics + speed-insights → Vercel
```

## Route groups

The App Router uses parenthesised segments to group routes without affecting the URL:

- `src/app/(marketing)/` — public landing page rendered at `/`.
- `src/app/(auth)/` — `/login`, `/signup`. Public, but redirect signed-in users into the dashboard.
- `src/app/(dashboard)/` — `/dashboard/*`. Requires a Supabase session.
- `src/app/(main)/` — shared chrome / catch-all utilities.
- `src/app/api/health/` — JSON health-check route handler.

`src/app/layout.tsx` is the root layout: registers Funnel/JetBrains fonts, the `next-themes` provider, and mounts `<Analytics />` and `<SpeedInsights />` for production telemetry.

## Auth flow

1. The user submits the login form (`(auth)/login`). Validation runs through `src/lib/auth/validation.ts` (covered by tests).
2. `@supabase/ssr` exchanges credentials for a session and writes auth cookies.
3. On every subsequent request, `src/middleware.ts` calls `updateSession` (`src/lib/supabase/middleware.ts`), which refreshes the cookie if it's about to expire.
4. Protected routes under `/dashboard/*` check for an authenticated user; anonymous traffic is redirected to `/login?redirectTo=<original-path>`.
5. On sign-in success, the server reads `redirectTo` and sends the user back. The value is whitelisted by `isSafeRelativePath` (`src/lib/auth/redirect.ts`) so attackers can't pivot the redirect to an external host (`//evil.com`, `https://evil.com`, `javascript:`, …). This is enforced by `redirect.test.ts`.
6. Sign-out runs client-side via the Supabase browser client (no round-trip server action needed).

## Data flow

- Charts and KPI cards consume the static sample data in `src/data/`. The `pnpm generate` script regenerates that file. Replacing it with a live data source means swapping the import in the dashboard pages — the components themselves are data-source-agnostic.
- Recharts handles rendering; the wrappers in `src/components/LineChart.tsx` and friends provide the Nova Analytics theme.

## Styling

- Tailwind CSS 3 with a custom palette in `tailwind.config.ts`.
- Three font families wired through `next/font/google` in `src/app/layout.tsx` and exposed as CSS variables (`--font-funnel-display`, `--font-funnel-sans`, `--font-jetbrains-mono`).
- Dark mode is opt-in via `next-themes` (`attribute="class"`).

## Observability

- `GET /api/health` — synchronous, returns process version and timestamp. Use it in uptime checkers.
- `@vercel/analytics` — page views and custom events.
- `@vercel/speed-insights` — real-user Core Web Vitals.
- Vercel build/runtime logs are available in the Vercel project dashboard.

## Why Vercel + Supabase

- **Vercel**: zero-config Next.js, preview-per-PR, automatic HTTPS, edge cache, built-in analytics. Saves us from owning a CDN, build server, or TLS pipeline.
- **Supabase**: managed Postgres + auth with first-class SSR cookie handling. Keeps the auth surface small and well-tested.
