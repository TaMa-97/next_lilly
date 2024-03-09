import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

type CustomHeadProps = {
  title: string
  description: string
}

const CustomHead = ({ title, description }: CustomHeadProps) => {
  const router = useRouter()
  const canonicalURL = `https://lilly-dog.dev${router.asPath}`

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="format-detection" content="telephone=no" />
      <meta property="og:locale" content="ja_JP" />
      <meta property="og:site_name" content="Lilly" />
      <meta property="og:image" content="https://lilly-dog.dev/ogimage.jpg" />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:url" content={canonicalURL} />
      <link rel="canonical" href={canonicalURL} />
      <link rel="icon" href="https://lilly-dog.dev/favicon.ico" />
    </Head>
  )
}

export default CustomHead
