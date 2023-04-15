import React from 'react'
import Link from 'next/link'
import styles from './Header.module.scss'

const Header = () => {
  return (
    <header className={styles.gHeader}>
      <div className={`container ${styles.gHeader__inner}`}>
        <div className={styles.gHeader__logo}>
          <h1 className={styles.gHeader__title}>
            <Link href="/" className={styles.gHeader__titleLink}>
              Lilly
            </Link>
          </h1>
        </div>
        <nav className={styles.gNav}>
          <ul className={styles.gNav__list}>
            <li className={styles.gNav__item}>
              <Link href="/" className={styles.gNav__link}>
                Blog
              </Link>
            </li>
            <li className={styles.gNav__item}>
              <Link href="/projects" className={styles.gNav__link}>
                Projects
              </Link>
            </li>
            <li className={styles.gNav__item}>
              <Link href="/about" className={styles.gNav__link}>
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
