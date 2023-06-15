'use client'
import SideMenu from '@/components/SideMenu'
import React, { useEffect, startTransition } from 'react'
import './dashboardstyles.scss'
import { createTheme } from '@mui/material/styles'
import { ThemeProvider } from '@emotion/react'
import NProgress from "nprogress";
import NextNProgress from 'nextjs-progressbar';
import { useSearchParams, usePathname } from 'next/navigation'

type PushStateInput = [
  data: any,
  unused: string,
  url?: string | URL | null | undefined
];

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

  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    NProgress.configure({ showSpinner: false });

    const handleAnchorClick = (event: MouseEvent) => {
      const targetUrl = (event.currentTarget as HTMLAnchorElement).href;
      const currentUrl = location.href;
      if (targetUrl !== currentUrl) {
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
    <body style={{ display: 'flex', margin: 0 }}>
      <NextNProgress options={{showSpinner: false}} color={'#db2777'}/>
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