import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import { useRouter } from 'next/router'

const CustomHead = ({ title, description }) => {
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
      <meta property="og:image" content="/ogimage.png" />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:url" content={canonicalURL} />
      <link rel="canonical" href={canonicalURL} />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  )
}

CustomHead.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
}

export default CustomHead
