import { getAllPosts } from '@/utils/api'

export async function getStaticProps() {
  const allPosts = getAllPosts(['slug', 'title', 'date', 'tags'])

  // console.log(allPosts);

  const categoryCounts = allPosts.reduce<Record<string, number>>(
    (acc, post) => {
      post.tags.forEach((tag) => {
        if (acc[tag]) {
          acc[tag] += 1
        } else {
          acc[tag] = 1
        }
      })

      return acc
    },
    {}
  )

  return {
    props: { allPosts, categoryCounts },
  }
}
