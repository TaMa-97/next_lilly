import type { AppProps } from 'next/app'
import React from 'react'
import '@/styles/globals.scss'
import 'zenn-content-css'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
