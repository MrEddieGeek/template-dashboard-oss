import type { SVGProps } from "react"

export const NovaMark = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 64 64"
    fill="none"
    aria-hidden="true"
    {...props}
  >
    <rect width="64" height="64" rx="14" fill="#0F172A" />
    <path
      d="M16 50 L16 14 L46 50 L46 14"
      stroke="#6366F1"
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="50" cy="16" r="4.5" fill="#06B6D4" />
  </svg>
)
