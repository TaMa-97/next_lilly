import type {
  NextPage,
  InferGetStaticPropsType,
  GetStaticPropsContext,
} from 'next'
import React, { useEffect } from 'react'
import Tocbot from 'tocbot'
import { motion, useScroll } from 'framer-motion'
import { getAllPosts, getPostBySlug } from '@/utils/api'
import markdownToHtml from '@/utils/markdownToHtml'
import CustomHead from '@/components/base/Head/CustomHead'
import Header from '@/components/base/Header/Header'
import Footer from '@/components/base/Footer/Footer'
import styles from './[slug].module.scss'

const useTocbot = () => {
  useEffect(() => {
    Tocbot.init({
      tocSelector: '.toc-accordion',
      contentSelector: '.znc',
      headingSelector: 'h1, h2, h3',
      hasInnerContainers: true,
    })

    return () => {
      Tocbot.destroy()
    }
  }, [])
}

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
          // アコーディオンが閉じている場合、目次の高さを計算して適用する
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

    // const tocLinks = document.querySelectorAll('.toc-link')
    // tocLinks.forEach((link) => {
    //   link.addEventListener('click', closeAccordion)
    // })

    return () => {
      if (tocHeader) {
        tocHeader.removeEventListener('click', toggleAccordion)
      }
      // tocLinks.forEach((link) => {
      //   link.removeEventListener('click', closeAccordion)
      // })
    }
  }, [])
}

const ScrollAnimatedComponent = () => {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div style={{ scaleX: scrollYProgress }} className="progress-bar" />
  )
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
  useAccordion()
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
                <ul className={styles.myBlog__list}>
                  {post.tags?.map((tag) => (
                    <li key={tag} className={styles.myBlog__item}>
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
              <div id="toc" className={`${styles.myBlog__toc} toc-fixed`}>
                <p id="toc-header" className={styles.myBlog__tocTtl}>
                  もくじ
                </p>
                <div className="toc-accordion"></div>
              </div>
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
      </motion.div>
    </>
  )
}

export default Post
