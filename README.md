# Nova Analytics

> Illuminate Your Data.

Modern analytics dashboard built on Next.js, TypeScript, Tailwind CSS, and Supabase. Real-time charts, KPI cards, drill-down detail views, and a marketing landing page — all in one project, ready to deploy on Vercel.

## Stack

- **Framework**: Next.js 14 (App Router) + React 18 + TypeScript
- **Styling**: Tailwind CSS 3 with a custom Nova Analytics palette (Plus Jakarta Sans for headings, Inter for body)
- **Charts & primitives**: Recharts, Radix UI, Remix Icons
- **Auth**: Supabase (email/password) via `@supabase/ssr`
- **Deploy target**: Vercel

## Getting started

1. **Install dependencies** (pnpm preferred — `corepack enable pnpm` if you don't have it):

   ```bash
   pnpm install
   ```

2. **Create a Supabase project** at [supabase.com](https://supabase.com), then copy the project URL and anon key from `Settings → API`.

3. **Set environment variables**. Copy `.env.example` to `.env.local` and fill in your values:

   ```bash
   cp .env.example .env.local
   # then edit .env.local
   ```

   Required variables:

   | Variable                          | Description                              |
   | --------------------------------- | ---------------------------------------- |
   | `NEXT_PUBLIC_SUPABASE_URL`        | Your Supabase project URL                |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY`   | Your Supabase anon (public) API key      |

4. **Run the dev server**:

   ```bash
   pnpm dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

## Auth setup

Email/password auth runs against Supabase. By default Supabase requires email confirmation on signup. For the demo you can disable that in `Authentication → Providers → Email → Confirm email` so signed-up users land in the dashboard immediately.

### Demo credentials

Pre-seed a test user in Supabase (`Authentication → Users → Add user`):

| Email                       | Password         |
| --------------------------- | ---------------- |
| `admin@novaanalytics.io`    | `NovaDemo2025!`  |

## Routes

| Path        | Description                              |
| ----------- | ---------------------------------------- |
| `/`         | Marketing landing page (public)          |
| `/login`    | Sign-in form                             |
| `/signup`   | Sign-up form                             |
| `/dashboard`| Authenticated dashboard (protected)      |
| `/api/health` | JSON health check                      |

Middleware redirects any unauthenticated request to `/dashboard/*` back to `/login`.

## Deployment

Recommended: import the repo into Vercel and set the two `NEXT_PUBLIC_SUPABASE_*` environment variables in the project settings. Vercel detects Next.js automatically and sets up HTTPS + preview deploys with no extra config.

```bash
# or via CLI
pnpm dlx vercel --prod
```

## Scripts

| Command         | Description                            |
| --------------- | -------------------------------------- |
| `pnpm dev`      | Run the dev server                     |
| `pnpm build`    | Production build                       |
| `pnpm start`    | Serve the production build locally     |
| `pnpm lint`     | Lint with the Next.js ESLint preset    |
| `pnpm test`     | Run the Vitest suite                   |

## License

This project is built on top of the open-source [`tremorlabs/template-dashboard-oss`](https://github.com/tremorlabs/template-dashboard-oss) starter (Apache 2.0). UI primitives retain their original attribution headers in source.
