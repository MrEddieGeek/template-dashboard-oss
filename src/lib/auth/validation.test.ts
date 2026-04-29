import { describe, expect, it } from "vitest"
import { validateCredentials } from "./validation"

function fd(fields: Record<string, string>): FormData {
  const f = new FormData()
  for (const [k, v] of Object.entries(fields)) f.set(k, v)
  return f
}

describe("validateCredentials", () => {
  it("accepts a well-formed email and 8+ char password", () => {
    const r = validateCredentials(
      fd({ email: "user@example.com", password: "abcdefgh" }),
    )
    expect(r.ok).toBe(true)
    if (r.ok) {
      expect(r.email).toBe("user@example.com")
      expect(r.password).toBe("abcdefgh")
    }
  })

  it("normalizes email to lowercase and trims surrounding whitespace", () => {
    const r = validateCredentials(
      fd({ email: "  USER@Example.COM  ", password: "abcdefgh" }),
    )
    expect(r.ok).toBe(true)
    if (r.ok) expect(r.email).toBe("user@example.com")
  })

  it.each([
    ["", "missing"],
    ["not-an-email", "no @"],
    ["foo@bar", "no TLD"],
    ["foo@.com", "empty domain"],
    ["@example.com", "no local part"],
  ])("rejects invalid email %j (%s)", (email) => {
    const r = validateCredentials(fd({ email, password: "abcdefgh" }))
    expect(r.ok).toBe(false)
    if (!r.ok) expect(r.error).toBe("invalid_email")
  })

  it("rejects passwords shorter than 8 characters", () => {
    const r = validateCredentials(
      fd({ email: "user@example.com", password: "short" }),
    )
    expect(r.ok).toBe(false)
    if (!r.ok) expect(r.error).toBe("weak_password")
  })

  it("treats missing fields as invalid email", () => {
    const r = validateCredentials(new FormData())
    expect(r.ok).toBe(false)
    if (!r.ok) expect(r.error).toBe("invalid_email")
  })
})
