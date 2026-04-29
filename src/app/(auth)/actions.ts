"use server"

import { redirect } from "next/navigation"
import { createSupabaseServerClient } from "@/lib/supabase/server"

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validateCredentials(formData: FormData): {
  email: string
  password: string
  error?: string
} {
  const email = String(formData.get("email") ?? "").trim().toLowerCase()
  const password = String(formData.get("password") ?? "")

  if (!email || !EMAIL_RE.test(email)) {
    return { email, password, error: "invalid_email" }
  }
  if (password.length < 8) {
    return { email, password, error: "weak_password" }
  }
  return { email, password }
}

export async function loginAction(formData: FormData) {
  const { email, password, error: validationError } =
    validateCredentials(formData)

  if (validationError) {
    redirect(`/login?error=${validationError}`)
  }

  const supabase = createSupabaseServerClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    redirect(`/login?error=invalid_credentials`)
  }

  const redirectTo = String(formData.get("redirectTo") ?? "/dashboard")
  redirect(redirectTo.startsWith("/") ? redirectTo : "/dashboard")
}

export async function signupAction(formData: FormData) {
  const { email, password, error: validationError } =
    validateCredentials(formData)
  const confirm = String(formData.get("confirmPassword") ?? "")

  if (validationError) {
    redirect(`/signup?error=${validationError}`)
  }
  if (password !== confirm) {
    redirect(`/signup?error=password_mismatch`)
  }

  const supabase = createSupabaseServerClient()
  const { error } = await supabase.auth.signUp({ email, password })

  if (error) {
    redirect(`/signup?error=signup_failed`)
  }

  redirect("/dashboard")
}

export async function signoutAction() {
  const supabase = createSupabaseServerClient()
  await supabase.auth.signOut()
  redirect("/")
}
