import type { InferGetStaticPropsType, NextPage } from 'next'
import React from 'react'
import {
  getStaticPaths,
  getStaticProps,
} from '@/features/readArticles/api/dataFetching'
import { ReadArticlesBody } from '@/features/readArticles/components'
import { CustomHead } from '@/components/layouts/Head'
import { Header } from '@/components/layouts/Header'
import { Footer } from '@/components/layouts/Footer'

export { getStaticPaths, getStaticProps }

type Props = InferGetStaticPropsType<typeof getStaticProps>

const ReadArticlePage: NextPage<Props> = ({ read }) => {
  return (
    <>
      <CustomHead title={`${read.title} | lilly`} description={read.title} />
      <Header />
      <ReadArticlesBody read={read} />
      <Footer />
    </>
  )
}

export default ReadArticlePage
