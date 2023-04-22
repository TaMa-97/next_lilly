import type { NextPage, InferGetStaticPropsType } from 'next'
import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { getAllPosts } from '@/utils/api'
import CustomHead from '@/components/base/Head/CustomHead'
import Header from '@/components/base/Header/Header'
import Footer from '@/components/base/Footer/Footer'
import styles from './index.module.scss'

type Props = InferGetStaticPropsType<typeof getStaticProps>

export const getStaticProps = async () => {
  const allPosts = getAllPosts(['slug', 'title', 'date', 'tags'])

  return {
    props: { allPosts },
  }
}

const Home: NextPage<Props> = ({ allPosts }) => {
  const pageTitle = 'Lilly'
  const pageDescription = 'This is the Home page of Next Lilly'
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        // exit={{ opacity: 0 }}
        transition={{ ease: 'easeOut' }}
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
              <ul className={styles.myBlog__catList}>
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
              </ul>
              <ul className={styles.myBlog__list}>
                {allPosts?.map((post) => (
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
