import { describe, expect, it } from "vitest"
import { GET } from "./route"
import pkg from "../../../../package.json"

describe("GET /api/health", () => {
  it("returns ok with timestamp and version", async () => {
    const res = GET()
    expect(res.status).toBe(200)

    const body = await res.json()
    expect(body.status).toBe("ok")
    expect(body.version).toBe(pkg.version)
    expect(() => new Date(body.timestamp).toISOString()).not.toThrow()
    expect(new Date(body.timestamp).toString()).not.toBe("Invalid Date")
  })
})
