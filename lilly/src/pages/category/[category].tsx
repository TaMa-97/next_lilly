import type { NextPage, InferGetStaticPropsType } from 'next'
import React from 'react'
import { useRouter } from 'next/router'
import {
  getStaticPaths,
  getStaticProps,
} from '@/features/category/api/dataFetching'
import { CategoryBody } from '@/features/category/components'
import { CustomHead } from '@/components/layouts/Head'

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
      <CategoryBody posts={posts} category={category} />
    </>
  )
}

export default CategoryPage
