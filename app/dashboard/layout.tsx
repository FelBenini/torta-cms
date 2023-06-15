'use client'
import SideMenu from '@/components/SideMenu'
import React from 'react'
import './dashboardstyles.scss'
import { createTheme } from '@mui/material/styles'
import { ThemeProvider } from '@emotion/react'

const theme = createTheme({
  palette: {
    primary: {
      main: '#c026d3'
    }
  }
})

const RootLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <body style={{display: 'flex', margin: 0}}>
      <SideMenu />
      <main>
        <ThemeProvider theme={theme}>
          {children}
        </ThemeProvider>
      </main>
    </body>
  )
}

export default RootLayout