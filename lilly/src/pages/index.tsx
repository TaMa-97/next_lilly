import type { NextPage, InferGetStaticPropsType } from 'next'
import React from 'react'
import { getStaticProps } from '@/features/top/api/dataFetching'
import { TopBody } from '@/features/top/components'
import { CustomHead } from '@/components/layouts/Head'

export { getStaticProps }

type Props = InferGetStaticPropsType<typeof getStaticProps>

const Home: NextPage<Props> = ({ allPosts, categoryCounts }) => {
  const pageTitle = 'Lilly'
  const pageDescription = 'Personal website of Lilly.'

  return (
    <>
      <CustomHead title={pageTitle} description={pageDescription} />
      <TopBody allPosts={allPosts} categoryCounts={categoryCounts} />
    </>
  )
}

export default Home
