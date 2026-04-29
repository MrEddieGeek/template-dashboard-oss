import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: "selector",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        surface: {
          base: "var(--surface-base)",
          1: "var(--surface-1)",
          2: "var(--surface-2)",
          3: "var(--surface-3)",
          inset: "var(--surface-inset)",
        },
        fg: {
          primary: "var(--fg-primary)",
          secondary: "var(--fg-secondary)",
          muted: "var(--fg-muted)",
          faint: "var(--fg-faint)",
          inverted: "var(--fg-inverted)",
        },
        rule: {
          DEFAULT: "var(--rule)",
          strong: "var(--rule-strong)",
          soft: "var(--rule-soft)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          emphasis: "var(--accent-emphasis)",
          soft: "var(--accent-soft)",
          on: "var(--accent-on)",
        },
        positive: {
          DEFAULT: "var(--positive)",
          soft: "var(--positive-soft)",
        },
        negative: {
          DEFAULT: "var(--negative)",
          soft: "var(--negative-soft)",
        },
        caution: {
          DEFAULT: "var(--caution)",
          soft: "var(--caution-soft)",
        },
        chart: {
          1: "var(--chart-1)",
          2: "var(--chart-2)",
          3: "var(--chart-3)",
          4: "var(--chart-4)",
          5: "var(--chart-5)",
          6: "var(--chart-6)",
        },
      },
      fontFamily: {
        sans: ["var(--font-funnel-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-funnel-display)", "system-ui", "sans-serif"],
        mono: [
          "var(--font-jetbrains-mono)",
          "ui-monospace",
          "SFMono-Regular",
          "monospace",
        ],
      },
      ringColor: {
        accent: "var(--accent-ring)",
      },
      boxShadow: {
        // intentional, restrained — not generic AI drop-shadows
        rise: "0 1px 0 0 var(--rule-soft), 0 1px 2px -1px oklch(0% 0 0 / 0.06)",
        well: "inset 0 1px 0 0 var(--rule-soft)",
      },
      keyframes: {
        hide: { from: { opacity: "1" }, to: { opacity: "0" } },
        slideDownAndFade: {
          from: { opacity: "0", transform: "translateY(-4px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideLeftAndFade: {
          from: { opacity: "0", transform: "translateX(4px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        slideUpAndFade: {
          from: { opacity: "0", transform: "translateY(4px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideRightAndFade: {
          from: { opacity: "0", transform: "translateX(-4px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        dialogOverlayShow: { from: { opacity: "0" }, to: { opacity: "1" } },
        dialogContentShow: {
          from: {
            opacity: "0",
            transform: "translate(-50%, -48%) scale(0.98)",
          },
          to: { opacity: "1", transform: "translate(-50%, -50%) scale(1)" },
        },
        drawerSlideLeftAndFade: {
          from: { opacity: "0", transform: "translateX(24px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        fadeInUp: {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        // tight ease-out-quart for small UI; longer for surfaces
        hide: "hide 120ms cubic-bezier(0.5, 1, 0.89, 1)",
        slideDownAndFade:
          "slideDownAndFade 140ms cubic-bezier(0.5, 1, 0.89, 1)",
        slideLeftAndFade:
          "slideLeftAndFade 140ms cubic-bezier(0.5, 1, 0.89, 1)",
        slideUpAndFade: "slideUpAndFade 140ms cubic-bezier(0.5, 1, 0.89, 1)",
        slideRightAndFade:
          "slideRightAndFade 140ms cubic-bezier(0.5, 1, 0.89, 1)",
        // larger surfaces want ease-out-expo, settle slower
        drawerSlideLeftAndFade:
          "drawerSlideLeftAndFade 280ms cubic-bezier(0.16, 1, 0.3, 1)",
        dialogOverlayShow:
          "dialogOverlayShow 200ms cubic-bezier(0.5, 1, 0.89, 1)",
        dialogContentShow:
          "dialogContentShow 240ms cubic-bezier(0.16, 1, 0.3, 1)",
        fadeInUp: "fadeInUp 480ms cubic-bezier(0.16, 1, 0.3, 1) both",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
}
export default config
