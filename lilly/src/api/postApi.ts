import type { Post } from '@/types/postTypes'
import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

const postsDirectory = join(process.cwd(), 'content')

export const getPostSlugs = (): string[] => {
  return fs
    .readdirSync(postsDirectory, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map(({ name }) => name)
}

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

export const getAllPosts = (fields: string[] = []): Post[] => {
  const slugs = getPostSlugs()
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    // 日付順にソート
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return posts
}
