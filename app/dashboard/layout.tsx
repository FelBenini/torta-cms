import SideMenu from '@/components/SideMenu'
import React from 'react'

const RootLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <body>
      <SideMenu />
      {children}
    </body>
  )
}

export default RootLayout