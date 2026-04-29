# Changelog

All notable changes to Nova Analytics are documented here. The format is loosely based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the project follows [Semantic Versioning](https://semver.org/) once it leaves `0.x`.

## [Unreleased]

### Added
- Vercel Analytics + Speed Insights wired into the root layout.
- Custom domain: <https://nova.siama.mx> (replacing the default `*.vercel.app` subdomain).
- `CONTRIBUTING.md`, `SECURITY.md`, `CHANGELOG.md`.
- Extended documentation under `docs/` (architecture, deployment, testing).
- Pull request template.

### Changed
- README expanded with table of contents, project structure, monitoring section, and badges.

## [0.1.0] — 2026-04

### Added
- Marketing landing page, login/signup flows, protected dashboard with KPI cards, charts, and detail view.
- Supabase email/password auth via `@supabase/ssr`; session refresh middleware.
- Open-redirect-hardened `redirectTo` handling (`isSafeRelativePath`).
- Client-side sign-out via the Supabase browser client.
- `GET /api/health` endpoint returning `{ status, timestamp, version }`.
- Vitest suite covering auth validation, redirect safety, and the health route.
- GitHub Actions CI: lint, type-check, test, build.
- Vercel deploy configuration.
