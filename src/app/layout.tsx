import type { Metadata } from "next"
import { Roboto } from "next/font/google"
import Image from "next/image"
import logo from '../assets/logo.png'
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
      <body className={roboto.className + " bg-gray-900 h-screen flex flex-col justify-center items-start"}  cz-shortcut-listen="true">
       <header className="pt-8 w-full max-w-[1180px] mx-auto">
        <Image width={130} height={52} src={logo} alt="Logo Ignite Shop" />
       </header>
        {children}
      </body>
    </html>
  )
}
