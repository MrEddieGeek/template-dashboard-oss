# Nova Analytics

> Illuminate Your Data.

Modern analytics dashboard built on Next.js, TypeScript, Tailwind CSS, and Supabase. Real-time charts, KPI cards, drill-down detail views, a marketing landing page, and a JSON health endpoint — all in one project, deployed on Vercel at **[nova.siama.mx](https://nova.siama.mx)**.

[![CI](https://github.com/MrEddieGeek/template-dashboard-oss/actions/workflows/ci.yml/badge.svg)](https://github.com/MrEddieGeek/template-dashboard-oss/actions/workflows/ci.yml)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6)
![Tailwind](https://img.shields.io/badge/Tailwind-3-38bdf8)
![License](https://img.shields.io/badge/license-Apache%202.0-blue)

---

## Table of contents

- [Stack](#stack)
- [Features](#features)
- [Project structure](#project-structure)
- [Getting started](#getting-started)
- [Environment variables](#environment-variables)
- [Auth](#auth)
- [Routes](#routes)
- [Scripts](#scripts)
- [Testing](#testing)
- [Deployment](#deployment)
- [Monitoring & analytics](#monitoring--analytics)
- [Documentation](#documentation)
- [Contributing](#contributing)
- [Security](#security)
- [License](#license)

---

## Stack

- **Framework**: Next.js 14 (App Router) + React 18 + TypeScript
- **Styling**: Tailwind CSS 3 with the Nova Analytics palette (Funnel Display for headings, Funnel Sans for body, JetBrains Mono for code)
- **Charts & primitives**: Recharts, Radix UI, Remix Icons
- **Auth**: Supabase (email/password) via `@supabase/ssr`
- **Testing**: Vitest + Testing Library + jsdom
- **Analytics & RUM**: `@vercel/analytics` + `@vercel/speed-insights`
- **Deploy**: Vercel (Git-integrated previews + production)

## Features

- Marketing landing page (`/`) with public access.
- Email/password sign-in and sign-up flows backed by Supabase.
- Authenticated dashboard with charts, KPI cards, and a drill-down detail view.
- Open-redirect-hardened auth flow (`isSafeRelativePath`) covered by tests.
- JSON health-check endpoint at `/api/health`.
- CI on every push and PR (lint → type-check → test → build) via GitHub Actions.
- Production deploys on every merge to `main`, preview deploys on every PR (Vercel).

## Project structure

```
src/
├─ app/                    # Next.js App Router
│  ├─ (auth)/              # /login, /signup
│  ├─ (dashboard)/         # protected /dashboard/*
│  ├─ (marketing)/         # public landing
│  ├─ api/health/          # health endpoint
│  ├─ layout.tsx           # root layout, fonts, analytics
│  └─ siteConfig.ts        # site metadata
├─ components/             # UI primitives (Button, Dialog, …)
├─ lib/
│  ├─ auth/                # validation + safe-redirect helpers
│  └─ supabase/            # browser/server/middleware clients
├─ middleware.ts           # session refresh + protected routes
└─ test/setup.ts           # Vitest setup
.github/workflows/ci.yml   # CI pipeline
docs/                      # extended documentation
```

## Getting started

> Requires Node 20+ and pnpm 10+ (`corepack enable pnpm`).

```bash
pnpm install
cp .env.example .env.local      # then edit with your Supabase keys
pnpm dev
```

Open <http://localhost:3000>.

## Environment variables

Copy `.env.example` to `.env.local` and fill in:

| Variable                          | Required | Description                                     |
| --------------------------------- | -------- | ----------------------------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`        | yes      | Supabase project URL (`Settings → API`).        |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY`   | yes      | Supabase anon (public) key.                     |

Vercel Analytics and Speed Insights are auto-provisioned by Vercel; no env vars needed.

## Auth

Email/password against Supabase. By default Supabase requires email confirmation on signup — for local demo flows you can disable that under `Authentication → Providers → Email → Confirm email` so signed-up users land on the dashboard immediately.

`src/middleware.ts` refreshes the Supabase session on every request and redirects unauthenticated traffic on protected routes back to `/login`.

### Demo credentials

Pre-seed a test user in Supabase (`Authentication → Users → Add user`):

| Email                       | Password         |
| --------------------------- | ---------------- |
| `admin@novaanalytics.io`    | `NovaDemo2025!`  |

## Routes

| Path           | Auth | Description                              |
| -------------- | ---- | ---------------------------------------- |
| `/`            | —    | Marketing landing page                   |
| `/login`       | —    | Sign-in form                             |
| `/signup`      | —    | Sign-up form                             |
| `/dashboard`   | yes  | KPI overview + charts                    |
| `/dashboard/details`  | yes | Drill-down detail view             |
| `/dashboard/settings` | yes | Account & workspace settings        |
| `/api/health`  | —    | `{ status, timestamp, version }` JSON    |

## Scripts

| Command            | Description                         |
| ------------------ | ----------------------------------- |
| `pnpm dev`         | Run the dev server                  |
| `pnpm build`       | Production build                    |
| `pnpm start`       | Serve the production build locally  |
| `pnpm lint`        | Lint with the Next.js ESLint preset |
| `pnpm test`        | Run the Vitest suite once           |
| `pnpm test:watch`  | Vitest in watch mode                |
| `pnpm generate`    | Regenerate sample data              |

## Testing

Vitest + Testing Library, configured in `vitest.config.ts` with `src/test/setup.ts` registering jest-dom matchers. Current suites:

- `src/lib/auth/validation.test.ts` — email/password validation rules.
- `src/lib/auth/redirect.test.ts` — open-redirect hardening (`isSafeRelativePath`).
- `src/app/api/health/route.test.ts` — health endpoint contract.

Run all of them:

```bash
pnpm test
```

## Deployment

The repo is linked to the Vercel project `nova-analytics`. Vercel's Git integration handles:

- **Production**: every push to `main` → <https://nova.siama.mx>.
- **Previews**: every pull request → unique `*.vercel.app` URL.

CI (`.github/workflows/ci.yml`) runs lint, type-check, tests, and a production build with dummy Supabase env vars, on push and PR to `main`.

To deploy manually:

```bash
pnpm dlx vercel --prod
```

See [`docs/deployment.md`](docs/deployment.md) for the full runbook (env var management, custom domain, rollback).

## Monitoring & analytics

- **Health**: `GET /api/health` returns `{ status: "ok", timestamp, version }`. Wire it into any uptime checker (UptimeRobot, BetterStack, …).
- **Vercel Analytics**: page-view tracking via `@vercel/analytics/next`, mounted in `src/app/layout.tsx`.
- **Vercel Speed Insights**: real-user Core Web Vitals via `@vercel/speed-insights/next`, mounted in the same root layout.

Both are zero-config on Vercel and only collect data in production deploys.

## Documentation

- [`docs/architecture.md`](docs/architecture.md) — request lifecycle, auth flow, route groups.
- [`docs/deployment.md`](docs/deployment.md) — Vercel project, env vars, custom domain, rollback.
- [`docs/testing.md`](docs/testing.md) — what's covered, conventions, how to add tests.
- [`CONTRIBUTING.md`](CONTRIBUTING.md) — branch/commit conventions, local setup, review checklist.
- [`SECURITY.md`](SECURITY.md) — vulnerability disclosure policy.
- [`CHANGELOG.md`](CHANGELOG.md) — notable changes.

## Contributing

See [`CONTRIBUTING.md`](CONTRIBUTING.md). Short version: branch off `main`, keep commits scoped, run `pnpm lint && pnpm test && pnpm build` before opening a PR.

## Security

Please **do not** open public issues for security findings. See [`SECURITY.md`](SECURITY.md) for the disclosure process.

## License

Built on top of the open-source [`tremorlabs/template-dashboard-oss`](https://github.com/tremorlabs/template-dashboard-oss) starter (Apache 2.0). UI primitives retain their original attribution headers in source. See [`LICENSE.md`](LICENSE.md).
