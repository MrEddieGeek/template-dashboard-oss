import Link from "next/link"
import { loginAction } from "../actions"

const ERROR_MESSAGES: Record<string, string> = {
  invalid_email: "Please enter a valid email address.",
  weak_password: "Password must be at least 8 characters.",
  invalid_credentials: "Invalid email or password.",
}

export default function LoginPage({
  searchParams,
}: {
  searchParams: { error?: string; redirectTo?: string }
}) {
  const errorMessage = searchParams.error
    ? ERROR_MESSAGES[searchParams.error] ?? "Something went wrong."
    : null

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-50">
        Sign in to Nova Analytics
      </h1>
      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
        Illuminate your data.
      </p>

      <form action={loginAction} className="mt-6 space-y-4">
        <input
          type="hidden"
          name="redirectTo"
          value={searchParams.redirectTo ?? "/dashboard"}
        />

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-900 dark:text-gray-100"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-900 dark:text-gray-100"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            minLength={8}
            className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
          />
        </div>

        {errorMessage && (
          <p
            role="alert"
            className="text-sm text-red-600 dark:text-red-400"
          >
            {errorMessage}
          </p>
        )}

        <button
          type="submit"
          className="w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
        >
          Sign in
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
        Don&apos;t have an account?{" "}
        <Link
          href="/signup"
          className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
        >
          Create one
        </Link>
      </p>
    </div>
  )
}
