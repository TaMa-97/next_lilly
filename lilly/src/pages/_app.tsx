import type { AppProps } from 'next/app'
import Script from 'next/script'
import React from 'react'
import { AnimatePresence } from 'framer-motion'
import { useNextCssRemovalPrevention } from '@/hooks/useNextCssRemovalPrevention'
import { ThreeBackground } from '@/components/layouts/ThreeBackground'
import { Header } from '@/components/layouts/Header'
import { Footer } from '@/components/layouts/Footer'
import '@/styles/globals.scss'
import 'zenn-content-css'
import 'tocbot/dist/tocbot.css'

export default function App({ Component, pageProps, router }: AppProps) {
  useNextCssRemovalPrevention()

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtm.js?id=GTM-N9C56QC`}
      />
      <Script id="gtm-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'GTM-N9C56QC');
        `}
      </Script>
      <ThreeBackground />
      <Header />
      <AnimatePresence
        initial={true}
        mode={'wait'}
        onExitComplete={() => {
          window.scrollTo(0, 0)
        }}
      >
        <Component key={router.asPath} {...pageProps} />
      </AnimatePresence>
      <Footer />
    </>
  )
}
