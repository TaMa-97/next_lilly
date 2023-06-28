import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from './Header.module.scss'

const Header = () => {
  const router = useRouter()

  const isActiveLink = (path) => {
    return (
      router.pathname === path ||
      (path === '/' &&
        (router.pathname.startsWith('/note/') ||
          router.pathname.startsWith('/category/')))
    )
  }

  const Heading = router.pathname === '/' ? 'h1' : 'p'

  return (
    <header className={styles.gHeader}>
      <div className={`container ${styles.gHeader__inner}`}>
        <div className={styles.gHeader__logo}>
          <Heading className={styles.gHeader__title}>
            <Link href="/" className={styles.gHeader__titleLink} scroll={false}>
              Lilly
            </Link>
          </Heading>
        </div>
        <nav className={styles.gNav}>
          <ul className={styles.gNav__list}>
            <li className={styles.gNav__item}>
              <Link
                href="/"
                className={`${styles.gNav__link} ${
                  isActiveLink('/') ? styles.gNav__linkActive : ''
                }`}
                scroll={false}
              >
                Note
              </Link>
            </li>
            <li className={styles.gNav__item}>
              <Link
                href="/read"
                className={`${styles.gNav__link} ${
                  isActiveLink('/read') ? styles.gNav__linkActive : ''
                }`}
                scroll={false}
              >
                Read
              </Link>
            </li>
            <li className={styles.gNav__item}>
              <Link
                href="/about"
                className={`${styles.gNav__link} ${
                  isActiveLink('/about') ? styles.gNav__linkActive : ''
                }`}
                scroll={false}
              >
                About
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
