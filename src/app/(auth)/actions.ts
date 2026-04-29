"use server"

import { redirect } from "next/navigation"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import { validateCredentials } from "@/lib/auth/validation"
import { isSafeRelativePath } from "@/lib/auth/redirect"

export async function loginAction(formData: FormData) {
  const result = validateCredentials(formData)

  if (!result.ok) {
    redirect(`/login?error=${result.error}`)
  }

  const supabase = createSupabaseServerClient()
  const { error } = await supabase.auth.signInWithPassword({
    email: result.email,
    password: result.password,
  })

  if (error) {
    redirect(`/login?error=invalid_credentials`)
  }

  const redirectTo = String(formData.get("redirectTo") ?? "/dashboard")
  redirect(isSafeRelativePath(redirectTo) ? redirectTo : "/dashboard")
}

export async function signupAction(formData: FormData) {
  const result = validateCredentials(formData)
  const confirm = String(formData.get("confirmPassword") ?? "")

  if (!result.ok) {
    redirect(`/signup?error=${result.error}`)
  }
  if (result.password !== confirm) {
    redirect(`/signup?error=password_mismatch`)
  }

  const supabase = createSupabaseServerClient()
  const { error } = await supabase.auth.signUp({
    email: result.email,
    password: result.password,
  })

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
