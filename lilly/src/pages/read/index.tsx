import type { NextPage, InferGetStaticPropsType } from 'next'
import React from 'react'
import { getStaticProps } from '@/features/read/api/dataFetching'
import { ReadBody } from '@/features/read/components'
import { CustomHead } from '@/components/layouts/Head'

export { getStaticProps }

type Props = InferGetStaticPropsType<typeof getStaticProps>

const Reads: NextPage<Props> = ({ allReads }) => {
  const pageTitle = 'Reading list | Lilly'
  const pageDescription = '主に読んだ記事や本などをまとめていくための場所です。'

  return (
    <>
      <CustomHead title={pageTitle} description={pageDescription} />
      <ReadBody allReads={allReads} />
    </>
  )
}

export default Reads
