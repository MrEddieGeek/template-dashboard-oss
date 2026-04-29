import type { SVGProps } from "react"

export const NovaLogo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 220 44"
    fill="none"
    aria-label="Nova Analytics"
    {...props}
  >
    <g>
      <path
        d="M8 36 L8 8 L34 36 L34 8"
        stroke="#6366F1"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="37" cy="10" r="3.5" fill="#06B6D4" />
    </g>
    <text
      x="50"
      y="29"
      fontFamily="var(--font-jakarta), 'Plus Jakarta Sans', system-ui, sans-serif"
      fontWeight="700"
      fontSize="22"
      letterSpacing="-0.02em"
      fill="currentColor"
    >
      Nova Analytics
    </text>
  </svg>
)
