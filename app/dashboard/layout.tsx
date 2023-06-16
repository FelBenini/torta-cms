'use client'
import SideMenu from '@/components/SideMenu'
import React from 'react'
import './dashboardstyles.scss'
import "@fontsource/inter"
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

const RootLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {

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