import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { CSSTransition } from 'react-transition-group'
import styles from './index.module.scss'

type Props = {
  sortedPosts: any[]
  categoryCounts: Record<string, number>
  isOpen: boolean
  toggleAccordion: () => void
}

const TopBody = ({
  sortedPosts,
  categoryCounts,
  isOpen,
  toggleAccordion,
}: Props) => {
  return (
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
            <h2 className={styles.myBlog__title}>Notebook &#x1f680;</h2>
            <h3 className={styles.myBlog__lead}>
              主に技術的なメモやTipsをゆるく投稿している場所です。
            </h3>
          </motion.div>
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
                    <Link href={`/category/${category}`} scroll={false}>
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
                  href={`/note/${post.slug}`}
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
  )
}

export default TopBody
