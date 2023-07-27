'use client'
import './globals.scss'
import { Inter } from 'next/font/google'
import { NextAuthProvider } from './authprovider'
import NextNProgress from 'nextjs-progressbar';
import NProgress from "nprogress";
import { useEffect } from 'react'
import { ThemeProvider } from '@emotion/react'
import { createTheme } from '@mui/material';

type PushStateInput = [
  data: any,
  unused: string,
  url?: string | URL | null | undefined
];

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
      main: '#c026d3',
    },
    secondary: {
      main: '#6b7280',
    },
    warning: {
      main: '#e11d48',
    }
  }
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  useEffect(() => {
    NProgress.configure({ showSpinner: false });

    const handleAnchorClick = (event: MouseEvent) => {
      const currentTarget = event.currentTarget as HTMLAnchorElement
      const targetUrl = currentTarget.href;
      const currentUrl = location.href;
      if (targetUrl !== currentUrl && targetUrl !== `${currentUrl}#` && currentTarget.target !== 'blank') {
        NProgress.start();
      }
    };

    const handleMutation: MutationCallback = () => {
      const anchorElements = document.querySelectorAll("a");
      anchorElements.forEach((anchor) =>
        anchor.addEventListener("click", handleAnchorClick)
      );
    };

    const mutationObserver = new MutationObserver(handleMutation);
    mutationObserver.observe(document, { childList: true, subtree: true });

    window.history.pushState = new Proxy(window.history.pushState, {
      apply: (target, thisArg, argArray: PushStateInput) => {
        NProgress.done();
        return target.apply(thisArg, argArray);
      },
    });
  });

  return (
    <html lang="en">
      <body className={inter.className}>
        <NextNProgress options={{ showSpinner: false }} color={'#d946ef'} />
        <NextAuthProvider>
          <ThemeProvider theme={theme}>
            {children}
          </ThemeProvider>
        </NextAuthProvider>
      </body>
    </html>
  )
}
