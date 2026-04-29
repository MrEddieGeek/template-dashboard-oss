const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export type ValidationError = "invalid_email" | "weak_password"

export type CredentialValidation =
  | { ok: true; email: string; password: string }
  | { ok: false; error: ValidationError; email: string; password: string }

export function validateCredentials(formData: FormData): CredentialValidation {
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase()
  const password = String(formData.get("password") ?? "")

  if (!email || !EMAIL_RE.test(email)) {
    return { ok: false, error: "invalid_email", email, password }
  }
  if (password.length < 8) {
    return { ok: false, error: "weak_password", email, password }
  }
  return { ok: true, email, password }
}
