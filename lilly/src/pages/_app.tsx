import type { AppProps } from 'next/app'
import React from 'react'
import { AnimatePresence } from 'framer-motion'
import { useNextCssRemovalPrevention } from '@/hooks/useNextCssRemovalPrevention'
import { ThreeBackground } from '@/components/layouts/ThreeBackground'
import '@/styles/globals.scss'
import 'zenn-content-css'
import 'tocbot/dist/tocbot.css'

export default function App({ Component, pageProps, router }: AppProps) {
  useNextCssRemovalPrevention()

  return (
    <>
      <ThreeBackground />
      <AnimatePresence
        initial={false}
        mode={'wait'}
        onExitComplete={() => {
          window.scrollTo(0, 0)
        }}
      >
        <Component key={router.asPath} {...pageProps} />
      </AnimatePresence>
    </>
  )
}
