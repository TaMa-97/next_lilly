import type { GetStaticPaths } from 'next'
import { getAllPosts } from '@/utils/api'

export const getStaticPaths: GetStaticPaths = async () => {
  const allPosts = getAllPosts(['tags'])
  const categories = Array.from(new Set(allPosts.flatMap((post) => post.tags)))

  const paths = categories.map((category) => ({
    params: { category },
  }))

  return { paths, fallback: false }
}

export const getStaticProps = async ({ params }) => {
  const category = typeof params.category === 'string' ? params.category : ''
  const allPosts = getAllPosts(['slug', 'title', 'tags', 'date'])
  const posts = allPosts
    .filter((post) => post.tags.includes(category))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return {
    props: { posts },
  }
}
