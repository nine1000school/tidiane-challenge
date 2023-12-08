import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ReactNode } from "react"
import "./globals.css"

// eslint-disable-next-line new-cap
const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Tidiane `Monkey` Challenge",
  description: "Don't look at the result, copy monkeytype.com: you have 1h",
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
