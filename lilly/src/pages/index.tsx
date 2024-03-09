import type { NextPage, InferGetStaticPropsType } from 'next'
import React from 'react'
import { getStaticProps } from '@/features/top/api/dataFetching'
import { TopBody } from '@/features/top/components'
import { CustomHead } from '@/components/layouts/Head'
import { Header } from '@/components/layouts/Header'
import { Footer } from '@/components/layouts/Footer'

export { getStaticProps }

type Props = InferGetStaticPropsType<typeof getStaticProps>

const Home: NextPage<Props> = ({ allPosts, categoryCounts }) => {
  const pageTitle = 'Lilly'
  const pageDescription = 'Personal website of Lilly.'

  return (
    <>
      <CustomHead title={pageTitle} description={pageDescription} />
      <Header />
      <TopBody allPosts={allPosts} categoryCounts={categoryCounts} />
      <Footer />
    </>
  )
}

export default Home
