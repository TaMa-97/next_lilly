import type { GetStaticPaths, GetStaticProps } from 'next'
import type { Post } from '@/utils/api'
import React from 'react'
import { useRouter } from 'next/router'
import { getAllPosts } from '@/utils/api'

// TagPage コンポーネントのpropsを定義
type TagPageProps = {
  posts: Post[]
}

// タグページのメインコンポーネント
const TagPage: React.FC<TagPageProps> = ({ posts }) => {
  // useRouter を使ってルーティング情報を取得
  const router = useRouter()
  const { tag } = router.query

  // タグと関連する投稿を表示
  return (
    <>
      <h1>Tag: {tag}</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <a href={`/blog/${post.slug}`}>{post.title}</a>
          </li>
        ))}
      </ul>
    </>
  )
}

// getStaticProps で静的生成時にデータを取得
export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params) {
    return {
      notFound: true,
    }
  }

  // すべての投稿を取得し、指定されたタグを含む投稿を絞り込む
  const allPosts = getAllPosts(['slug', 'title', 'tags'])
  const tag = params.tag as string
  const posts = allPosts.filter((post) => post.tags.includes(tag))

  // 絞り込まれた投稿をpropsとして渡す
  return {
    props: {
      posts,
    },
  }
}

// getStaticPaths で静的生成するパスを指定
export const getStaticPaths: GetStaticPaths = async () => {
  // すべての投稿からタグを取得し、重複を除く
  const allPosts = getAllPosts(['tags'])
  const tags = Array.from(new Set(allPosts.flatMap((post) => post.tags)))

  // 各タグに対応するパスを生成
  const paths = tags.map((tag) => ({
    params: {
      tag,
    },
  }))

  // 生成するパスと、fallback オプションを指定
  return {
    paths,
    fallback: false,
  }
}

export default TagPage
