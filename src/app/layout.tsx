import type { Metadata } from "next"
import { Roboto } from "next/font/google"

import "./globals.css"

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
})

export const metadata: Metadata = {
  title: "Ignite Shop",
  description: "Loja virtual de camisetas da Rocketseat",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={roboto.className}>
        <h1>Ignite Shop</h1>
        {children}
      </body>
    </html>
  )
}
