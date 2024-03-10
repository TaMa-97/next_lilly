import type {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
} from 'next'
import { getReadBySlug, getAllReads } from '@/utils/readApi'
import markdownToHtml from '@/utils/markdownToHtml'

export const getStaticPaths: GetStaticPaths = async () => {
  const reads = getAllReads(['slug'])

  const paths = reads.map((read) => ({
    params: { slug: read.slug },
  }))

  return {
    paths,
    fallback: false, // 存在しないslugへのアクセス時に404ページを表示
  }
}

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const slug = context.params?.slug
  if (typeof slug !== 'string') {
    return { notFound: true }
  }

  const read = getReadBySlug(slug, ['slug', 'title', 'date', 'content'])
  const content = await markdownToHtml(read.content || '')

  return {
    props: {
      read: {
        ...read,
        content,
      },
    },
  }
}
