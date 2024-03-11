import type { Read } from '@/types/readTypes'
import { motion } from 'framer-motion'
import React from 'react'
import { useTocbot } from '@/hooks/useTocbot'
import { Wrapper } from '@/components/layouts/Wrapper'
import { ReadArticlesScroll } from './ReadArticlesScroll'
import styles from '../styles/index.module.scss'

type ReadArticlesBodyProps = {
  read: Read
}

const ReadArticlesBody = ({ read }: ReadArticlesBodyProps) => {
  useTocbot()

  return (
    <Wrapper>
      <ReadArticlesScroll />
      <div className="container">
        <section className={styles.myBlog}>
          <motion.h1
            className={styles.myBlog__title}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {read.title}
          </motion.h1>
          <div className={styles.myBlog__head}>
            <p className={styles.myBlog__date}>{read.date}</p>
          </div>
          <div id="toc" className={`${styles.myBlog__toc} toc-fixed`}>
            <p id="toc-header" className={styles.myBlog__tocTtl}>
              もくじ
            </p>
            <div className="toc-wrapper"></div>
          </div>
          <article>
            <div
              className={`znc ${styles.myZnc}`}
              dangerouslySetInnerHTML={{ __html: read.content }}
            />
          </article>
        </section>
      </div>
    </Wrapper>
  )
}

export default ReadArticlesBody
