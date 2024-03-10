import type { Post } from '@/types/postTypes'
import React from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { useTocbot } from '@/hooks/useTocbot'
import { Wrapper } from '@/components/layouts/Wrapper'
import styles from './index.module.scss'

type NoteBodyProps = {
  post: Post
}

export const NoteBody = ({ post }: NoteBodyProps) => {
  useTocbot()

  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress)

  return (
    <Wrapper>
      <motion.div style={{ scaleX }} className="progress-bar" />
      <div className="container">
        <section className={styles.myBlog}>
          <motion.h1
            className={styles.myBlog__title}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {post.title}
          </motion.h1>
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
          <div id="toc" className={`${styles.myBlog__toc}`}>
            <p id="toc-header" className={styles.myBlog__tocTtl}>
              もくじ
            </p>
            <div className="toc-wrapper"></div>
          </div>
          <article>
            <div
              className={`znc ${styles.myZnc}`}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>
        </section>
      </div>
    </Wrapper>
  )
}

export default NoteBody
