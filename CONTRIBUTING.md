# Contributing

Thanks for considering a contribution. This project follows a small, opinionated workflow — please read this once before opening your first PR.

## Local setup

1. Node 20+ and pnpm 10+ (`corepack enable pnpm`).
2. `pnpm install`
3. `cp .env.example .env.local` and add your Supabase keys.
4. `pnpm dev` and open <http://localhost:3000>.

## Branching

- Branch off `main`. Use a short, descriptive prefix:
  - `feat/<slug>` — new feature
  - `fix/<slug>` — bug fix
  - `chore/<slug>` — tooling, deps, refactors
  - `docs/<slug>` — docs-only changes
- Keep PRs focused. Multi-purpose branches make review slow and bisects useless.

## Commits

We use [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<optional scope>): <subject>
```

Types: `feat`, `fix`, `chore`, `docs`, `refactor`, `test`, `build`, `ci`.

Example: `feat(dashboard): add drill-down on revenue chart`.

Keep subjects under ~70 chars. Use the body for the *why*.

## Code style

- TypeScript strict; no `any` unless justified in a comment.
- Prettier + ESLint run via `pnpm lint`. CI fails on lint errors.
- Tailwind class order is enforced by `prettier-plugin-tailwindcss`.
- Components in `src/components/` are unstyled-by-default primitives — don't bake feature-specific logic into them.

## Tests

- Add or update tests for any logic change. Vitest config: `vitest.config.ts`.
- Auth-adjacent code (`src/lib/auth/**`) and API routes are required to have tests.
- Run locally before pushing:

  ```bash
  pnpm lint
  pnpm tsc --noEmit
  pnpm test
  pnpm build
  ```

## Pull requests

- Open against `main`. CI must pass.
- Fill in the PR template: summary, screenshots for UI changes, test plan.
- Vercel will post a preview URL on the PR — verify the change in that preview before requesting review.
- One approval is enough; squash-merge is the default.

## Reporting bugs / requesting features

Use the issue templates in `.github/ISSUE_TEMPLATE/`.

## Security

Do **not** file public issues for security findings. See [`SECURITY.md`](SECURITY.md).
