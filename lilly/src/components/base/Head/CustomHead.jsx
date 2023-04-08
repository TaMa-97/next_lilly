import React from 'react'
import Head from 'next/head'

const CustomHead = ({ title, description }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="format-detection" content="telephone=no" />
      <meta property="og:locale" content="ja_JP" />
      <meta property="og:site_name" content="Lilly" />
      <meta property="og:image" content="/ogimage.png" />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:url" content="" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  )
}

export default CustomHead
