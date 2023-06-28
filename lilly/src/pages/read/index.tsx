import type { NextPage, InferGetStaticPropsType } from 'next'
import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { getAllReads } from '@/utils/readApi'
import CustomHead from '@/components/base/Head/CustomHead'
import Header from '@/components/base/Header/Header'
import Footer from '@/components/base/Footer/Footer'
import styles from './index.module.scss'

type Props = InferGetStaticPropsType<typeof getStaticProps>

export const getStaticProps = async () => {
  const allReads = getAllReads(['slug', 'title', 'date'])

  return {
    props: { allReads },
  }
}

const Reads: NextPage<Props> = ({ allReads }) => {
  const pageTitle = 'Reading list | lilly'
  const pageDescription = 'lillyのReading listページです。'

  const sortedReads = allReads.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ ease: 'easeOut', duration: 0.25 }}
        className="gWrapper"
      >
        <CustomHead title={pageTitle} description={pageDescription} />
        <Header />
        <main>
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
                {sortedReads?.map((read) => (
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
        </main>
        <Footer />
      </motion.div>
    </>
  )
}

export default Reads
