import type { GetStaticPaths, GetStaticProps } from 'next'
import type { Post } from '@/utils/api'
import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { getAllPosts } from '@/utils/api'
import CustomHead from '@/components/base/Head/CustomHead'
import Header from '@/components/base/Header/Header'
import Footer from '@/components/base/Footer/Footer'
import LoadingSpinner from '@/components/elements/LoadingSpinner/LoadingSpinner'
import styles from './index.module.scss'

// TagPage コンポーネントのpropsを定義
type TagPageProps = {
  posts: Post[]
}

// タグページのメインコンポーネント
const TagPage: React.FC<TagPageProps> = ({ posts }) => {
  // useRouter を使ってルーティング情報を取得
  const router = useRouter()
  const { category } = router.query

  const pageTitle = 'Lilly'
  const pageDescription =
    'Lillyの個人サイトです。This is the Home page of Lilly'

  // タグと関連する投稿を表示
  return (
    <>
      {category ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ ease: 'easeOut', duration: 0.25 }}
          className="modWrapper"
        >
          <CustomHead title={pageTitle} description={pageDescription} />
          <Header />
          <main>
            <section className={styles.myTag}>
              <div className="container">
                <motion.div
                  className={styles.myTag__head}
                  initial={{ y: 15, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -15, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <h2 className={styles.myTag__title}>
                    <span className={styles.myTag__titleIcon}>Category</span>
                    {category}
                  </h2>
                </motion.div>

                <ul className={styles.myTag__list}>
                  {posts.map((post) => (
                    <li key={post.slug} className={styles.myTag__item}>
                      <Link
                        href={`/blog/${post.slug}`}
                        className={styles.myTag__link}
                        scroll={false}
                      >
                        <p className={styles.myTag__linkTitle}>
                          {post.title}
                          <span className={styles.myTag__linkIcon}></span>
                        </p>
                        <div className={styles.myTag__linkInner}>
                          <ul className={styles.myTag__linkList}>
                            {post.tags?.map((tag) => (
                              <li key={tag} className={styles.myTag__linkItem}>
                                {tag}
                              </li>
                            ))}
                          </ul>
                          <p className={styles.myTag__linkDate}>{post.date}</p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </main>
          <Footer />
        </motion.div>
      ) : (
        <LoadingSpinner />
      )}
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
  const category = params.category as string
  const posts = allPosts.filter((post) => post.tags.includes(category))

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
      category: tag,
    },
  }))

  // 生成するパスと、fallback オプションを指定
  return {
    paths,
    fallback: false,
  }
}

export default TagPage
