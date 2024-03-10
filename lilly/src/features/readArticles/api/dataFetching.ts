import { getAllReads, getReadBySlug } from '@/utils/readApi'
import markdownToHtml from '@/utils/markdownToHtml'

export async function getStaticPaths() {
  const reads = getAllReads(['slug'])

  const paths = reads.map((read) => ({
    params: { slug: read.slug },
  }))

  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const read = getReadBySlug(params.slug, ['slug', 'title', 'date', 'content'])
  const content = await markdownToHtml(read.content || '')

  return {
    props: {
      read: { ...read, content },
    },
  }
}
