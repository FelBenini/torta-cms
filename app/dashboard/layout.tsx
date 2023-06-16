'use client'
import SideMenu from '@/components/SideMenu'
import React from 'react'
import './dashboardstyles.scss'
import { createTheme } from '@mui/material/styles'
import { ThemeProvider } from '@emotion/react'
import "@fontsource/inter"
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

const theme = createTheme({
  typography: {
    fontFamily: 'Inter',
    button: {
      fontWeight: 600,
      fontSize: 16
    }
  },
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
    <body style={{ display: 'flex', margin: 0 }} className={inter.className}>
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