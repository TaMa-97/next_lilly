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
        (router.pathname.startsWith('/blog/') ||
          router.pathname.startsWith('/category/')))
    )
  }

  return (
    <header className={styles.gHeader}>
      <div className={`container ${styles.gHeader__inner}`}>
        <div className={styles.gHeader__logo}>
          <h1 className={styles.gHeader__title}>
            <Link href="/" className={styles.gHeader__titleLink} scroll={false}>
              Lilly
            </Link>
          </h1>
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
                Blog
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
