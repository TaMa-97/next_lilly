import type { Read } from '@/types/readTypes'
import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Wrapper } from '@/components/layouts/Wrapper'
import styles from './index.module.scss'
import { useSortedReads } from '../hooks/useSortedReads'

type ReadBodyProps = {
  allReads: Read[]
}

const ReadBody = ({ allReads }: ReadBodyProps) => {
  const sortedReads = useSortedReads(allReads)

  return (
    <Wrapper>
      <section className={styles.myRead}>
        <div className="container">
          <motion.div
            className={styles.myRead__head}
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -15, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <h1 className={styles.myRead__title}>Reading list 📖</h1>
            <h2 className={styles.myRead__lead}>
              主に読んだ記事や本などをまとめていくための場所です。
            </h2>
          </motion.div>
          <ul className={styles.myRead__list}>
            {sortedReads.map((read) => (
              <li key={read.slug} className={styles.myRead__item}>
                <Link
                  href={`/read/${read.slug}`}
                  className={styles.myRead__link}
                  scroll={false}
                >
                  <h3 className={styles.myRead__linkHead}>
                    <span className={styles.myRead__linkTitle}>
                      {read.title}
                    </span>
                    <span className={styles.myRead__linkIcon}></span>
                  </h3>
                  <div className={styles.myRead__linkFoot}>
                    <p className={styles.myRead__linkDate}>{read.date}</p>
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

export default ReadBody
