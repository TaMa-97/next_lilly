import { getAllReads } from '@/utils/readApi'

export const getStaticProps = async () => {
  const allReads = await getAllReads(['slug', 'title', 'date'])

  return {
    props: { allReads },
  }
}
