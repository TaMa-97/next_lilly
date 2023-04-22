import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import styles from './Products.module.scss'

const Products = () => {
  return (
    <section className={styles.myProjects}>
      <div className="container">
        <motion.div
          className={styles.myProjects__head}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className={styles.myProjects__title}>Projects &#128011;</h2>
          <p className={styles.myProjects__lead}>個人的につくったもの</p>
        </motion.div>
        <ul className={styles.myProjects__list}>
          <li className={styles.myProjects__item}>
            <Link
              href="/products/lilly"
              className={styles.myProjects__link}
              scroll={false}
            >
              <div className={styles.myProjects__linkImg}>
                <img src="/images/projects/img01.svg" alt="Lilly" />
              </div>
              <div className={styles.myProjects__linkInner}>
                <p className={styles.myProjects__linkTitle}>
                  Lilly<span className={styles.myProjects__linkIcon}></span>
                </p>
              </div>
            </Link>
          </li>
          <li className={styles.myProjects__item}>
            <Link
              href="/products/tmlabo"
              className={styles.myProjects__link}
              scroll={false}
            >
              <div className={styles.myProjects__linkImg}>
                <img src="/images/projects/img02.svg" alt="tmlabo" />
              </div>
              <div className={styles.myProjects__linkInner}>
                <p className={styles.myProjects__linkTitle}>
                  tmlabo<span className={styles.myProjects__linkIcon}></span>
                </p>
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </section>
  )
}

export default Products
