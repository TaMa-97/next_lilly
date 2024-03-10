import type { GetStaticPaths, GetStaticProps } from 'next'
import { getAllPosts } from '@/utils/api'

export const getStaticPaths: GetStaticPaths = async () => {
  const allPosts = getAllPosts(['tags'])
  const categories = Array.from(new Set(allPosts.flatMap((post) => post.tags)))

  const paths = categories.map((category) => ({
    params: { category },
  }))

  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params || typeof params.category !== 'string') {
    return { notFound: true }
  }

  const allPosts = getAllPosts(['slug', 'title', 'tags', 'date'])
  const posts = allPosts
    .filter((post) => post.tags.includes(params.category))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  // console.log(posts)

  return { props: { posts } }
}
