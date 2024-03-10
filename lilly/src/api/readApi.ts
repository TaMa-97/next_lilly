import type { Read } from '@/types/readTypes'
import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

const readsDirectory = join(process.cwd(), 'read')

/**
 * read'ディレクトリ下のすべてのディレクトリ名を取得
 * @returns ディレクトリ名の配列
 */
export const getReadSlugs = (): string[] => {
  const allDirents = fs.readdirSync(readsDirectory, { withFileTypes: true })
  return allDirents
    .filter((dirent) => dirent.isDirectory())
    .map(({ name }) => name)
}

/**
 * 指定されたslugから記事の内容を取得
 * @param slug 記事のslug
 * @param fields 取得したいフィールドの配列
 * @returns 記事の内容を含むオブジェクト
 */
export const getReadBySlug = (slug: string, fields: string[] = []): Read => {
  const fullPath = join(readsDirectory, slug, 'index.md')
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  const items: Partial<Read> = {}

  fields.forEach((field) => {
    if (field === 'slug') {
      items.slug = slug
    } else if (field === 'content') {
      items.content = content
    } else {
      if (typeof data[field] !== 'undefined') {
        items[field as keyof Read] = data[field]
      }
    }
  })

  return {
    slug: items.slug ?? '',
    title: items.title ?? '無題',
    date: items.date ?? '不明',
    content: items.content ?? '',
  }
}

/**
 * すべての記事から指定したフィールドのデータを取得
 * @param fields 取得したいフィールドの配列
 * @returns 記事の配列
 */
export const getAllReads = (fields: string[] = []): Read[] => {
  const slugs = getReadSlugs()
  const reads = slugs.map((slug) => getReadBySlug(slug, fields))
  return reads.sort((a, b) => a.slug.localeCompare(b.slug))
}
