import type { Metadata } from "next"
import { ThemeProvider } from "next-themes"
import { Inter, Plus_Jakarta_Sans } from "next/font/google"
import "./globals.css"
import { siteConfig } from "./siteConfig"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jakarta",
  weight: ["500", "600", "700", "800"],
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  keywords: [
    "analytics",
    "dashboard",
    "data",
    "saas",
    "metrics",
    "real-time analytics",
    "business intelligence",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jakarta.variable}`}
      suppressHydrationWarning
    >
      <body className="overflow-y-scroll scroll-auto bg-white font-sans antialiased selection:bg-indigo-100 selection:text-indigo-700 dark:bg-gray-950">
        <ThemeProvider defaultTheme="system" attribute="class">
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
