import type {
  NextPage,
  InferGetStaticPropsType,
  GetStaticPropsContext,
} from 'next'
import React, { useEffect } from 'react'
import Tocbot from 'tocbot'
import { motion, useScroll } from 'framer-motion'
import { getAllReads, getReadBySlug } from '@/utils/readApi'
import markdownToHtml from '@/utils/markdownToHtml'
import CustomHead from '@/components/base/Head/CustomHead'
import Header from '@/components/base/Header/Header'
import Footer from '@/components/base/Footer/Footer'
import styles from './[slug].module.scss'

/**
 * コンポーネントがマウントされたときにTocbotを初期化し、
 * アンマウントされたときにTocbotを破棄
 */
const useTocbot = () => {
  useEffect(() => {
    Tocbot.init({
      tocSelector: '.toc-accordion',
      contentSelector: '.znc',
      headingSelector: 'h1, h2',
      hasInnerContainers: true,
    })

    return () => {
      Tocbot.destroy()
    }
  }, [])
}

/**
 * アコーディオンの開閉状態
 */
const useAccordion = () => {
  useEffect(() => {
    const tocHeader = document.getElementById('toc-header')
    const tocContainer = document.querySelector('.toc-accordion')

    const closeAccordion = () => {
      const htmlElement = tocContainer as HTMLElement
      htmlElement.style.height = '0px'
      if (tocHeader) {
        tocHeader.classList.remove('open')
      }
    }

    const toggleAccordion = () => {
      if (tocContainer) {
        const htmlElement = tocContainer as HTMLElement
        if (htmlElement.style.height === '0px' || !htmlElement.style.height) {
          const scrollHeight = htmlElement.scrollHeight
          htmlElement.style.height = `${scrollHeight}px`
          if (tocHeader) {
            tocHeader.classList.add('open')
          }
        } else {
          closeAccordion()
        }
      }
    }

    if (tocHeader) {
      tocHeader.addEventListener('click', toggleAccordion)
    }

    return () => {
      if (tocHeader) {
        tocHeader.removeEventListener('click', toggleAccordion)
      }
    }
  }, [])
}

/**
 * スクロールバー表示
 */
const ScrollAnimatedComponent = () => {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div style={{ scaleX: scrollYProgress }} className="progress-bar" />
  )
}

type Props = InferGetStaticPropsType<typeof getStaticProps>

/**
 * ビルド時に全ページのパスを取得
 */
export const getStaticPaths = async () => {
  const posts = getAllReads(['slug'])

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

/**
 * slugに基づいてビルド時に投稿データを取得
 */
export const getStaticProps = async (context: GetStaticPropsContext) => {
  if (!context.params || typeof context.params.slug !== 'string') {
    return {
      notFound: true,
    }
  }
  const post = getReadBySlug(context.params.slug, [
    'slug',
    'title',
    'date',
    'content',
  ])
  const content = await markdownToHtml(post.content)

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  }
}

/**
 * 個々の投稿ページをレンダリング
 * @param {object} post - 投稿データ
 */
const Post: NextPage<Props> = ({ post }) => {
  useTocbot() // Tocbotの設定
  useAccordion() // アコーディオンの設定
  const pageTitle = post.title
  const pageDescription = post.title
  return (
    <>
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
          <ScrollAnimatedComponent />
          <div className="container">
            <section className={styles.myBlog}>
              <motion.h2
                className={styles.myBlog__title}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {post.title}
              </motion.h2>
              <div className={styles.myBlog__head}>
                <p className={styles.myBlog__date}>{post.date}</p>
              </div>
              <div id="toc" className={`${styles.myBlog__toc} toc-fixed`}>
                <p id="toc-header" className={styles.myBlog__tocTtl}>
                  もくじ
                </p>
                <div className="toc-accordion"></div>
              </div>
              <article>
                <div
                  className={`znc ${styles.myZnc}`}
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </article>
            </section>
          </div>
        </main>
        <Footer />
      </motion.div>
    </>
  )
}

export default Post
