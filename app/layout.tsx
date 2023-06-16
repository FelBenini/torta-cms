import './globals.scss'
import { Inter } from 'next/font/google'
import { NextAuthProvider } from './authprovider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'tortaCMS',
  description: 'torta Content Management System',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  )
}
