import SideMenu from '@/components/SideMenu'
import React from 'react'
import './dashboardstyles.scss'
import "@fontsource/inter"
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

const RootLayout = async ({
  children,
}: {
  children: React.ReactNode
}) => {
  const session = await getServerSession()
  if (!session) {
    redirect('/')
  }
  return (
    <body style={{ display: 'flex', margin: 0 }} className={inter.className}>
      <SideMenu />
      <main>
          {children}
      </main>
    </body>
  )
}

export default RootLayout