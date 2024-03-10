import type { Post } from '@/types/postTypes'
import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

const postsDirectory = join(process.cwd(), 'content')

/**
 * contentディレクトリ下のすべての投稿のスラッグを取得
 * @returns 投稿のスラッグの配列
 */
export const getPostSlugs = (): string[] => {
  return fs
    .readdirSync(postsDirectory, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map(({ name }) => name)
}

/**
 * 投稿のデータを取得
 * @param slug 投稿のスラッグ
 * @param fields 取得したいフィールドの配列
 * @returns 投稿のデータ
 */
export const getPostBySlug = (slug: string, fields: string[] = []): Post => {
  const fullPath = join(postsDirectory, slug, 'index.md')
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  const post: Partial<Post> = {}

  fields.forEach((field) => {
    if (field === 'slug') {
      post.slug = slug
    } else if (field === 'content') {
      post.content = content
    } else if (field === 'title') {
      post.title = data.title
    } else if (field === 'date') {
      post.date = data.date
    } else if (field === 'tags') {
      post.tags = data.tags
    }
  })

  return post as Post
}

/**
 * すべての投稿を取得
 * @param fields 取得したいフィールドの配列
 * @returns ソートされた投稿の配列
 */
export const getAllPosts = (fields: string[] = []): Post[] => {
  const slugs = getPostSlugs()
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    // 日付順にソート
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return posts
}
