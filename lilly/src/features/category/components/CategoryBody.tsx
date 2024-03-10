import type { Post } from '@/types/postTypes'
import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Wrapper } from '@/components/layouts/Wrapper'
import styles from './index.module.scss'

type CategoryBodyProps = {
  posts?: Post[]
  category: string
}

const CategoryBody = ({ posts = [], category }: CategoryBodyProps) => {
  return (
    <Wrapper>
      <section className={styles.myCategory}>
        <div className="container">
          <motion.div
            className={styles.myCategory__head}
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -15, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <h1 className={styles.myCategory__title}>
              <span className={styles.myCategory__titleIcon}>Category</span>
              {category}
            </h1>
          </motion.div>

          <ul className={styles.myCategory__list}>
            {posts.map((post) => (
              <li key={post.slug} className={styles.myCategory__item}>
                <Link
                  href={`/note/${post.slug}`}
                  scroll={false}
                  className={styles.myCategory__link}
                >
                  <p className={styles.myCategory__linkTitle}>
                    {post.title}
                    <span className={styles.myCategory__linkIcon}></span>
                  </p>
                  <div className={styles.myCategory__linkInner}>
                    <ul className={styles.myCategory__linkList}>
                      {post.tags?.map((tag) => (
                        <li key={tag} className={styles.myCategory__linkItem}>
                          {tag}
                        </li>
                      ))}
                    </ul>
                    <p className={styles.myCategory__linkDate}>{post.date}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </Wrapper>
  )
}

export default CategoryBody
