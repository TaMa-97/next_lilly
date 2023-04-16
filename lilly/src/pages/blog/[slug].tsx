import type {
  NextPage,
  InferGetStaticPropsType,
  GetStaticPropsContext,
} from 'next'
import React, { useEffect } from 'react'
import Tocbot from 'tocbot'
import { getAllPosts, getPostBySlug } from '@/utils/api'
import markdownToHtml from '@/utils/markdownToHtml'
import CustomHead from '@/components/base/Head/CustomHead'
import Header from '@/components/base/Header/Header'
import Footer from '@/components/base/Footer/Footer'
import styles from './[slug].module.scss'

const useTocbot = () => {
  useEffect(() => {
    Tocbot.init({
      tocSelector: '#toc',
      contentSelector: '.znc',
      headingSelector: 'h1, h2, h3',
      hasInnerContainers: true,
    })

    return () => {
      Tocbot.destroy()
    }
  }, [])
}

type Props = InferGetStaticPropsType<typeof getStaticProps>

export const getStaticPaths = async () => {
  const posts = getAllPosts(['slug'])

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      }
    }),
    fallback: false,
  }
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  if (!context.params || typeof context.params.slug !== 'string') {
    // params が存在しない場合、または slug が string 型でない場合のエラーハンドリングを行います。
    // 例: 404 ページを返す
    return {
      notFound: true,
    }
  }
  const post = getPostBySlug(context.params.slug, [
    'slug',
    'title',
    'date',
    'tags',
    'content',
  ])
  // ここで変換
  const content = await markdownToHtml(post.content)

  // 変換結果をpropsとして渡す
  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  }
}

const Post: NextPage<Props> = ({ post }) => {
  useTocbot()
  const pageTitle = 'Lilly'
  const pageDescription = 'This is the Home page of Next Lilly'
  return (
    <>
      <CustomHead title={pageTitle} description={pageDescription} />
      <Header />
      <main>
        <div className="container">
          <section className={styles.myBlog}>
            <h2 className={styles.myBlog__title}>{post.title}</h2>
            <div className={styles.myBlog__head}>
              <p className={styles.myBlog__date}>{post.date}</p>
              <ul className={styles.myBlog__list}>
                {post.tags?.map((tag) => (
                  <li key={tag} className={styles.myBlog__item}>
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
            <div id="toc" className={styles.myBlog__toc}></div>
            <article>
              {/* ここでdangerouslySetInnerHTMLを使ってHTMLタグを出力する */}
              <div
                className={`znc ${styles.myZnc}`}
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </article>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Post
