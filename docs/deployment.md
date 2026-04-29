# Deployment runbook

The repo is linked to the Vercel project `nova-analytics` (see `.vercel/project.json`). Vercel's Git integration drives all production and preview deploys.

## Environments

| Environment | Trigger                  | URL                              |
| ----------- | ------------------------ | -------------------------------- |
| Production  | push to `main`           | <https://nova.siama.mx>          |
| Preview     | open / update a PR       | `nova-analytics-<hash>.vercel.app` |
| Local       | `pnpm dev`               | <http://localhost:3000>          |

## CI/CD

- **GitHub Actions** (`.github/workflows/ci.yml`): on push and PR to `main`, runs lint → type-check → tests → production build with dummy Supabase env vars. The build step exists to catch SSG/SSR errors that don't show up in dev.
- **Vercel Git integration**: independent of Actions. On every push:
  - `main` → production deployment to <https://nova.siama.mx>.
  - any other branch with an open PR → preview deployment, URL posted on the PR.

The two pipelines run in parallel. Failing CI does **not** block Vercel from shipping. If you want hard-gating, configure Vercel's *Ignored Build Step* to consult the GitHub check, or add a Vercel deploy step that depends on the CI job.

## Environment variables

Required in every Vercel environment (Production, Preview, Development):

| Variable                          | Where to find it                          |
| --------------------------------- | ----------------------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`        | Supabase → Settings → API → Project URL   |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY`   | Supabase → Settings → API → anon (public) |

To sync them locally:

```bash
pnpm dlx vercel link        # if not already linked
pnpm dlx vercel env pull    # writes to .env.local
```

To add or rotate:

```bash
pnpm dlx vercel env add NEXT_PUBLIC_SUPABASE_URL production
```

## Custom domain

`nova.siama.mx` is configured under **Vercel → Project → Settings → Domains**. DNS lives at the `siama.mx` registrar with a CNAME pointing at Vercel's load balancer. TLS certificates are provisioned and renewed automatically by Vercel.

If the certificate ever fails to renew:

1. Verify the DNS record still resolves to Vercel.
2. Re-trigger the cert in **Project → Settings → Domains → nova.siama.mx → Refresh**.
3. If still failing, remove and re-add the domain.

## Manual deploy

You shouldn't need to, but:

```bash
pnpm dlx vercel --prod
```

## Rollback

Two options, both fast:

**Vercel UI** (recommended)

1. Open the project → **Deployments** tab.
2. Find the last known-good production deploy.
3. Click the `…` menu → **Promote to Production**.

**Git revert**

```bash
git revert <bad-sha>
git push origin main
```

This produces a new deploy with the bad change reversed. Slower than promotion but leaves a clean history.

## Health & smoke checks

After every production deploy, verify:

```bash
curl https://nova.siama.mx/api/health
# → {"status":"ok","timestamp":"…","version":"0.1.0"}
```

Then load:

- `/` — landing renders.
- `/login` — form renders, submission lands on `/dashboard` with a valid user.
- `/dashboard` — KPI cards and charts render without console errors.

If any of those fail, roll back and open an incident issue.

## Build settings

Vercel auto-detects Next.js and uses these defaults; no `vercel.json` overrides are needed:

- Install command: `pnpm install`
- Build command: `pnpm build`
- Output directory: `.next`
- Node version: 20 (matches CI)
