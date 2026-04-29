import Link from "next/link"
import {
  RiBarChartGroupedLine,
  RiSparkling2Line,
  RiTeamLine,
  RiFileChart2Line,
  RiArrowRightLine,
} from "@remixicon/react"
import { siteConfig } from "@/app/siteConfig"

const features = [
  {
    name: "Real-time analytics",
    description:
      "Stream events from your stack and watch dashboards update the moment data lands.",
    icon: RiBarChartGroupedLine,
  },
  {
    name: "AI-powered insights",
    description:
      "Surface anomalies, trends, and explanations automatically — no SQL required.",
    icon: RiSparkling2Line,
  },
  {
    name: "Team collaboration",
    description:
      "Share workspaces, comment on charts, and export read-only views for stakeholders.",
    icon: RiTeamLine,
  },
  {
    name: "Custom reports",
    description:
      "Compose recurring reports with the metrics you care about, deliverable by email or webhook.",
    icon: RiFileChart2Line,
  },
] as const

const metrics = [
  { value: "10K+", label: "Active teams" },
  { value: "99.9%", label: "Uptime SLA" },
  { value: "50M+", label: "Events processed daily" },
] as const

export default function LandingPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-indigo-600/30 via-violet-600/20 to-cyan-500/20"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 left-1/2 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-indigo-500/30 blur-3xl"
        />
        <div className="relative mx-auto max-w-6xl px-6 pb-24 pt-20 sm:pt-28 lg:pt-32">
          <div className="mx-auto max-w-3xl text-center animate-fadeInUp">
            <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-cyan-300">
              Nova Analytics · {siteConfig.tagline}
            </span>
            <h1 className="mt-6 font-heading text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Illuminate your data.
            </h1>
            <p className="mt-6 text-lg text-gray-300 sm:text-xl">
              Modern analytics for teams that move fast. Real-time dashboards,
              AI-powered insights, and custom reports — all in one place.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href={siteConfig.baseLinks.signup}
                className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-white px-6 py-3 text-sm font-semibold text-nova-ink shadow-sm transition hover:bg-gray-100 sm:w-auto"
              >
                Get started free
                <RiArrowRightLine className="size-4" aria-hidden="true" />
              </Link>
              <Link
                href={siteConfig.baseLinks.login}
                className="inline-flex w-full items-center justify-center rounded-md border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10 sm:w-auto"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/5 bg-white/[0.02]">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 py-12 sm:grid-cols-3">
          {metrics.map((m) => (
            <div key={m.label} className="text-center sm:text-left">
              <p className="font-heading text-3xl font-bold text-white sm:text-4xl">
                {m.value}
              </p>
              <p className="mt-1 text-sm text-gray-400">{m.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Everything you need to ship insights.
          </h2>
          <p className="mt-4 text-base text-gray-400">
            Built for product, growth, and data teams who want answers in
            seconds, not sprints.
          </p>
        </div>
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div
              key={f.name}
              className="group rounded-xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-white/20 hover:bg-white/[0.05]"
            >
              <span className="inline-flex size-10 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 text-white shadow-sm">
                <f.icon className="size-5" aria-hidden="true" />
              </span>
              <h3 className="mt-5 font-heading text-base font-semibold text-white">
                {f.name}
              </h3>
              <p className="mt-2 text-sm text-gray-400">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-white/5">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-violet-600/15 via-transparent to-indigo-600/15"
        />
        <div className="relative mx-auto max-w-3xl px-6 py-20 text-center sm:py-24">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Start with the test workspace.
          </h2>
          <p className="mt-4 text-gray-300">
            Sign up in under a minute, or sign in with the demo account to
            explore the full dashboard.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href={siteConfig.baseLinks.signup}
              className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-white px-6 py-3 text-sm font-semibold text-nova-ink shadow-sm transition hover:bg-gray-100 sm:w-auto"
            >
              Create your account
              <RiArrowRightLine className="size-4" aria-hidden="true" />
            </Link>
            <Link
              href={siteConfig.baseLinks.login}
              className="text-sm font-medium text-gray-300 hover:text-white"
            >
              Sign in instead &rarr;
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
