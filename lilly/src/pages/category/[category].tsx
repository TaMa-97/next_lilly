import type { NextPage, InferGetStaticPropsType } from 'next'
import React from 'react'
import { useRouter } from 'next/router'
import {
  getStaticPaths,
  getStaticProps,
} from '@/features/category/api/dataFetching'
import { CategoryBody } from '@/features/category/components'
import { CustomHead } from '@/components/layouts/Head'
import { Header } from '@/components/layouts/Header'
import { Footer } from '@/components/layouts/Footer'

export { getStaticPaths, getStaticProps }

const CategoryPage: NextPage<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ posts }) => {
  const router = useRouter()
  const category = router.query.category as string

  return (
    <>
      <CustomHead
        title={`${category} | Lilly`}
        description={`${category} Articles Page of Lilly.`}
      />
      <Header />
      <CategoryBody posts={posts} category={category} />
      <Footer />
    </>
  )
}

export default CategoryPage
