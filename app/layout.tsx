'use client'
import './globals.scss'
import { Inter } from 'next/font/google'
import { NextAuthProvider } from './authprovider'
import NextNProgress from 'nextjs-progressbar';
import NProgress from "nprogress";
import { useEffect, startTransition } from 'react'

type PushStateInput = [
  data: any,
  unused: string,
  url?: string | URL | null | undefined
];

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
    <html lang="en">
      <body className={inter.className}>
        <NextNProgress options={{showSpinner: false}} color={'#d946ef'}/>
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  )
}
