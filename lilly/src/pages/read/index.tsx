import type { NextPage, InferGetStaticPropsType } from 'next'
import React from 'react'
import { getStaticProps } from '@/features/read/api/dataFetching'
import { ReadBody } from '@/features/read/components'
import { CustomHead } from '@/components/layouts/Head'
import { Header } from '@/components/layouts/Header'
import { Footer } from '@/components/layouts/Footer'

export { getStaticProps }

type Props = InferGetStaticPropsType<typeof getStaticProps>

const Reads: NextPage<Props> = ({ allReads }) => {
  const pageTitle = 'Reading list | Lilly'
  const pageDescription = '主に読んだ記事や本などをまとめていくための場所です。'

  return (
    <>
      <CustomHead title={pageTitle} description={pageDescription} />
      <Header />
      <ReadBody allReads={allReads} />
      <Footer />
    </>
  )
}

export default Reads
