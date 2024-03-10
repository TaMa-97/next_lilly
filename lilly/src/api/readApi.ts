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

export type Read = {
  slug: string
  content?: string
  title: string
  date?: string
  tags: string[]
}

/**
 * 指定されたslugから記事の内容を取得
 * @param slug 記事のslug
 * @param fields 取得したいフィールドの配列
 * @returns 記事の内容を含むオブジェクト
 */
export const getReadBySlug = (
  slug: string,
  fields: string[] = []
): Partial<Read> => {
  const fullPath = join(readsDirectory, slug, 'index.md')
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  const items: Partial<Read> = { slug }

  fields.forEach((field) => {
    if (field === 'content') {
      items.content = content
    } else if (data[field]) {
      items[field as keyof Read] = data[field]
    }
  })

  return items
}

/**
 * すべての記事から指定したフィールドのデータを取得
 * @param fields 取得したいフィールドの配列
 * @returns 記事の配列
 */
export const getAllReads = (fields: string[] = []): Array<Partial<Read>> => {
  const slugs = getReadSlugs()
  return slugs
    .map((slug) => getReadBySlug(slug, fields))
    .sort((a, b) =>
      (a.slug as string)
        .toLowerCase()
        .localeCompare((b.slug as string).toLowerCase())
    )
}
