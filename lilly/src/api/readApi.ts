import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

const readsDirectory = join(process.cwd(), 'read')

export const getReadSlugs = (): string[] => {
  const allDirents = fs.readdirSync(readsDirectory, { withFileTypes: true })
  return allDirents
    .filter((dirent) => dirent.isDirectory())
    .map(({ name }) => name)
}

export type Read = {
  slug: string
  content?: string
  title: string
  date?: string
  tags: string[]
}

export const getReadBySlug = (
  slug: string,
  fields: string[] = []
): Partial<Read> => {
  const fullPath = join(readsDirectory, slug, 'index.md')

  if (!fs.existsSync(fullPath)) {
    console.warn(`File not found: ${fullPath}`)

    return {}
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  const items: Partial<Read> = {}

  fields.forEach((field) => {
    if (field === 'slug') {
      items.slug = slug
    } else if (field === 'content') {
      items.content = content
    } else if (['title', 'date', 'tags'].includes(field)) {
      items[field as keyof Read] = data[field]
    }
  })

  return items
}

export const getAllReads = (fields: string[] = []): Array<Partial<Read>> => {
  const slugs = getReadSlugs()
  return slugs
    .map((slug) => getReadBySlug(slug, fields))
    .sort((a, b) => a.slug.toLowerCase().localeCompare(b.slug.toLowerCase()))
}
