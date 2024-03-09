import type { Post } from '@/types/postTypes'
import { useMemo } from 'react'

export const useSortedPosts = (posts: Post[]) => {
  const sortedPosts = useMemo(() => {
    return posts.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )
  }, [posts])

  return sortedPosts
}
