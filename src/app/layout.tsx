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
      <body className={roboto.className + " bg-gray-900 flex items-center justify-center h-screen"}>
        <h1 className="font-bold text-white text-3xl">Ignite Shop</h1>
        {children}
      </body>
    </html>
  )
}
