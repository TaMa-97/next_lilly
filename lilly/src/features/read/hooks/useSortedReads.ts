import type { Read } from '@/types/readTypes'
import { useMemo } from 'react'

export const useSortedReads = (reads: Read[]) => {
  const sortedReads = useMemo(() => {
    return reads.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )
  }, [reads])

  return sortedReads
}
