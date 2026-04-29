# Testing

We use [Vitest](https://vitest.dev/) for unit and integration-style tests. UI rendering uses [Testing Library](https://testing-library.com/) on top of jsdom. Configuration lives in `vitest.config.ts` and `src/test/setup.ts`.

## Running

```bash
pnpm test          # one-shot run (used in CI)
pnpm test:watch    # watch mode
pnpm test --coverage   # coverage report
```

CI runs `pnpm test` on every push and PR to `main`.

## What's covered today

| Suite                                           | Type        | What it asserts                                    |
| ----------------------------------------------- | ----------- | -------------------------------------------------- |
| `src/lib/auth/validation.test.ts`               | Unit        | Email/password validation rules.                   |
| `src/lib/auth/redirect.test.ts`                 | Unit        | `isSafeRelativePath` rejects open-redirect bait.   |
| `src/app/api/health/route.test.ts`              | Integration | Health route returns expected shape and version.   |

## Conventions

- **Co-locate tests** with the code they cover: `foo.ts` next to `foo.test.ts`. The exception is shared setup, which lives in `src/test/`.
- **One behaviour per `it` block.** Use `it.each` for table-driven cases (see `redirect.test.ts`).
- **No mocking the database in auth tests.** If a future test needs Supabase, hit a test project, not a mock — mock/prod divergence is how migrations break in production.
- **Don't snapshot HTML.** Snapshots rot. Assert on the specific text or role you care about.

## What still needs coverage

These are gaps worth filling, roughly in priority order:

1. **Component smoke tests** for the dashboard primitives that take user input (`DatePicker`, `Select`, `Dialog`).
2. **Middleware** — verify `/dashboard/*` redirects to `/login` for anonymous users and preserves `redirectTo`.
3. **End-to-end smoke** with Playwright: landing → signup → dashboard → sign-out, run against a preview deploy.

## Adding a new test

```ts
// src/lib/foo/foo.test.ts
import { describe, expect, it } from "vitest"
import { foo } from "./foo"

describe("foo", () => {
  it("does the thing", () => {
    expect(foo(1)).toBe(2)
  })
})
```

For React components:

```tsx
import { render, screen } from "@testing-library/react"
import { Button } from "./Button"

it("renders children", () => {
  render(<Button>Hello</Button>)
  expect(screen.getByRole("button", { name: "Hello" })).toBeInTheDocument()
})
```

`@testing-library/jest-dom` matchers are pre-registered via `src/test/setup.ts`.
