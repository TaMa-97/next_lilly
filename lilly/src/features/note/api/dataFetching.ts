import type {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
} from 'next'
import markdownToHtml from '@/api/markdownToHtml'
import { getPostBySlug, getAllPosts } from '@/api/postApi'

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllPosts(['slug'])
  return {
    paths: posts.map((post) => ({ params: { slug: post.slug } })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const slug = context.params?.slug
  if (typeof slug !== 'string') {
    return { notFound: true }
  }
  const post = getPostBySlug(slug, ['slug', 'title', 'date', 'tags', 'content'])
  const content = await markdownToHtml(post.content || '')
  return {
    props: {
      post: { ...post, content },
    },
  }
}
