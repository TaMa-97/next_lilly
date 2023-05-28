import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

// 'read' ディレクトリのパス
const readsDirectory = join(process.cwd(), 'read')

/**
 * 'read' ディレクトリ下のすべてのディレクトリ名（slugs）を取得
 * @returns ディレクトリ名の配列
 */
export const getReadSlugs = () => {
  // 'read' ディレクトリ下のファイル名とディレクトリ名を取得
  const allDirents = fs.readdirSync(readsDirectory, { withFileTypes: true })

  // ディレクトリ名をフィルタして返す
  return allDirents
    .filter((dirent) => dirent.isDirectory())
    .map(({ name }) => name)
}

/**
 * 与えられたslugから記事の内容を取得して返す
 * @param slug 記事のslug
 * @param fields 取得したいデータのフィールド名（slug | content | title | tags）
 * @returns 指定したフィールドのデータを持つオブジェクト
 */
export const getReadBySlug = (slug: string, fields: string[] = []) => {
  // ファイルを読み込む
  const fullPath = join(readsDirectory, slug, 'index.md')
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  // 返すデータの構造を定義
  type Item = {
    slug: string
    content: string
    title: string
    date: string
    tags: string[]
  }

  // 返すデータの初期値を設定
  const items: Item = {
    slug: '',
    content: '',
    title: '',
    date: '',
    tags: [],
  }

  // 指定されたフィールドのデータを設定
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = slug
    }
    if (field === 'content') {
      items[field] = content
    }

    if (field === 'title' || field === 'date' || field === 'tags') {
      items[field] = data[field]
    }
  })

  return items
}

/**
 * すべての記事から指定したフィールドのデータを取得
 * @param fields 取得したいデータのフィールド名（slug | content | title | tags）
 * @returns 指定したフィールドのデータを持つすべての記事の配列
 */
export const getAllReads = (fields: string[] = []) => {
  const slugs = getReadSlugs()
  const reads = slugs
    .map((slug) => getReadBySlug(slug, fields))
    // 辞書順でソート
    .sort((a, b) => {
      const slugA = a.slug.toString().toLowerCase()
      const slugB = b.slug.toString().toLowerCase()

      if (slugA > slugB) {
        return 1
      } else if (slugB > slugA) {
        return -1
      } else {
        return 0
      }
    })

  return reads
}

/**
 * 記事の型定義
 * @typedef {Object} Read
 * @property {string} slug - 記事のslug
 * @property {string} [content] - 記事の本文
 * @property {string} title - 記事のタイトル
 * @property {string} [date] - 記事の作成日付
 * @property {string[]} tags - 記事のタグ
 */
export type Read = {
  slug: string
  content?: string
  title: string
  date?: string
  tags: string[]
}
