import type { NextPage, InferGetStaticPropsType } from 'next'
import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { CSSTransition } from 'react-transition-group'
import { getAllPosts } from '@/utils/api'
import CustomHead from '@/components/base/Head/CustomHead'
import Header from '@/components/base/Header/Header'
import Footer from '@/components/base/Footer/Footer'
import styles from './index.module.scss'

type Props = InferGetStaticPropsType<typeof getStaticProps>

export const getStaticProps = async () => {
  const allPosts = getAllPosts(['slug', 'title', 'date', 'tags'])

  const categoryCounts = allPosts.reduce<Record<string, number>>(
    (acc, post) => {
      post.tags.forEach((tag) => {
        if (acc[tag]) {
          acc[tag] += 1
        } else {
          acc[tag] = 1
        }
      })

      return acc
    },
    {}
  )

  return {
    props: { allPosts, categoryCounts },
  }
}

const Home: NextPage<Props> = ({ allPosts, categoryCounts }) => {
  const pageTitle = 'Lilly'
  const pageDescription =
    'Lillyの個人サイトです。This is the Home page of Lilly'

  // 投稿を日付で降順に並べ替える
  const sortedPosts = allPosts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  // アコーディオンの開閉状態を管理
  const [isOpen, setIsOpen] = useState(false)

  // アコーディオンの開閉を切り替える関数
  const toggleAccordion = () => {
    setIsOpen(!isOpen)
  }

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
          <section className={styles.myBlog}>
            <div className="container">
              <motion.div
                className={styles.myBlog__head}
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -15, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <h2 className={styles.myBlog__title}>Blog &#x1f680;</h2>
                <p className={styles.myBlog__lead}>
                  主に技術的なメモやTipsをゆるく投稿している場所です。
                </p>
              </motion.div>
              {/* <ul className={styles.myBlog__catList}>
                <li className={styles.myBlog__catItem}>
                  <Link
                    href="#"
                    className={styles.myBlog__catItemLink}
                    scroll={false}
                  >
                    &#127758; ALL
                  </Link>
                </li>
                <li className={styles.myBlog__catItem}>
                  <Link
                    href="#"
                    className={styles.myBlog__catItemLink}
                    scroll={false}
                  >
                    &#127758; ALL
                  </Link>
                </li>
                <li className={styles.myBlog__catItem}>
                  <Link
                    href="#"
                    className={styles.myBlog__catItemLink}
                    scroll={false}
                  >
                    &#127758; ALL
                  </Link>
                </li>
                <li className={styles.myBlog__catItem}>
                  <Link
                    href="#"
                    className={styles.myBlog__catItemLink}
                    scroll={false}
                  >
                    &#127758; ALL
                  </Link>
                </li>
              </ul> */}
              <div className={styles.myBlog__catArea}>
                <button
                  className={`${styles.myBlog__catItemButton} ${
                    isOpen ? styles.open : ''
                  }`}
                  onClick={toggleAccordion}
                >
                  Category
                </button>
                <CSSTransition
                  in={isOpen}
                  timeout={300}
                  classNames={{
                    enter: styles.enter,
                    enterActive: styles.enterActive,
                    exit: styles.exit,
                    exitActive: styles.exitActive,
                  }}
                  unmountOnExit
                >
                  <ul
                    className={`${styles.myBlog__subCatList} ${
                      isOpen ? styles.myBlog__subCatListOpen : ''
                    }`}
                  >
                    {Object.entries(categoryCounts).map(([category, count]) => (
                      <li key={category} className={styles.myBlog__subCatItem}>
                        <Link href={`/category/${category}`}>
                          {category} ({count})
                        </Link>
                      </li>
                    ))}
                  </ul>
                </CSSTransition>
              </div>
              <ul className={styles.myBlog__list}>
                {sortedPosts?.map((post) => (
                  <li key={post.slug} className={styles.myBlog__item}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className={styles.myBlog__link}
                      scroll={false}
                    >
                      <p className={styles.myBlog__linkTitle}>
                        {post.title}
                        <span className={styles.myBlog__linkIcon}></span>
                      </p>
                      <div className={styles.myBlog__linkInner}>
                        <ul className={styles.myBlog__linkList}>
                          {post.tags?.map((tag) => (
                            <li key={tag} className={styles.myBlog__linkItem}>
                              {tag}
                            </li>
                          ))}
                        </ul>
                        <p className={styles.myBlog__linkDate}>{post.date}</p>
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
    </>
  )
}

export default Home
