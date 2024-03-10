import type { NextPage, InferGetStaticPropsType } from 'next'
import React from 'react'
import {
  getStaticPaths,
  getStaticProps,
} from '@/features/note/api/dataFetching'
import { NoteBody } from '@/features/note/components'
import { CustomHead } from '@/components/layouts/Head'
import { Header } from '@/components/layouts/Header'
import { Footer } from '@/components/layouts/Footer'

export { getStaticPaths, getStaticProps }

type Props = InferGetStaticPropsType<typeof getStaticProps>

const NotePage: NextPage<Props> = ({ post }) => {
  return (
    <>
      <CustomHead title={`${post.title} | lilly`} description={post.title} />
      <Header />
      <NoteBody post={post} />
      <Footer />
    </>
  )
}

export default NotePage
