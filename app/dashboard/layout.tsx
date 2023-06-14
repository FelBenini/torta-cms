import SideMenu from '@/components/SideMenu'
import React from 'react'
import './dashboardstyles.scss'

const RootLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <body style={{display: 'flex', margin: 0}}>
      <SideMenu />
      <main>
        {children}
      </main>
    </body>
  )
}

export default RootLayout