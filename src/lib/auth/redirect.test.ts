import { describe, expect, it } from "vitest"
import { isSafeRelativePath } from "./redirect"

describe("isSafeRelativePath", () => {
  it.each([
    ["/dashboard"],
    ["/dashboard/details"],
    ["/dashboard/settings?tab=billing"],
    ["/a"],
  ])("accepts safe relative path %j", (path) => {
    expect(isSafeRelativePath(path)).toBe(true)
  })

  it.each([
    ["//evil.com", "protocol-relative URL"],
    ["//evil.com/path", "protocol-relative URL with path"],
    ["/\\evil.com", "backslash-prefixed (some browsers normalize)"],
    ["https://evil.com", "absolute URL"],
    ["http://evil.com", "absolute URL"],
    ["javascript:alert(1)", "javascript scheme"],
    ["dashboard", "missing leading slash"],
    ["", "empty"],
    [" /dashboard", "leading whitespace"],
  ])("rejects %j (%s)", (path) => {
    expect(isSafeRelativePath(path)).toBe(false)
  })
})
