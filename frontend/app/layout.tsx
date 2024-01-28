import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from './Components/Navbar/Navbar'
import Footer from './Components/Footer/Footer'
import { Toaster } from 'react-hot-toast'
import PathHeader from './Utils/PathHeader/PathHeader'
import { usePathname } from 'next/navigation'
import Providers from './Store/Provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'E-Commerce',
  description: 'Ecommerce',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Providers>
      <html lang="en">
        <body className="flex flex-col">
          <Navbar />
          {children}
          {/* <Footer /> */}
          <Toaster position='top-right' />
        </body>
      </html>
    </Providers>
  )
}
