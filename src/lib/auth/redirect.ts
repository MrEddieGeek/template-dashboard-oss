export function isSafeRelativePath(value: string): boolean {
  if (typeof value !== "string" || value.length === 0) return false
  if (!value.startsWith("/")) return false
  if (value.startsWith("//")) return false
  if (value.startsWith("/\\")) return false
  return true
}
