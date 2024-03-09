import { useMemo } from 'react'

export const useSortedPosts = (posts) => {
  const sortedPosts = useMemo(() => {
    return posts.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )
  }, [posts])

  return sortedPosts
}
