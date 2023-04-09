import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import 'zenn-content-css'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
