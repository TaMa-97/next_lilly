import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import styles from './Header.module.scss'

const Header = () => {
  const router = useRouter()
  const Heading = router.pathname === '/' ? 'h1' : 'p'

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ ease: 'easeOut', duration: 1.2 }}
      className={styles.gHeader}
    >
      <div className={`container ${styles.gHeader__inner}`}>
        <div className={styles.gHeader__logo}>
          <Heading className={styles.gHeader__title}>
            <Link
              href="/"
              scroll={false}
              aria-label="Home"
              className={`${styles.gNav__link}`}
            >
              Lilly
            </Link>
          </Heading>
        </div>
        <nav className={styles.gNav}>
          <ul className={styles.gNav__list}>
            <li className={styles.gNav__item}>
              <Link
                href="/"
                scroll={false}
                className={`${styles.gNav__link} }`}
              >
                Note
              </Link>
            </li>
            <li className={styles.gNav__item}>
              <Link
                href="/read"
                scroll={false}
                className={`${styles.gNav__link} }`}
              >
                Read
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </motion.header>
  )
}

export default Header
