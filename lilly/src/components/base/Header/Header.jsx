import React from 'react'
import styles from './Header.module.scss'

const Header = () => {
  return (
    <header className={styles.gHeader}>
      <div className={`container ${styles.gHeader__inner}`}>
        <div className={styles.gHeader__logo}>
          <h1 className={styles.gHeader__title}>
            <a href="/" className={styles.gHeader__titleLink}>
              Lilly
            </a>
          </h1>
        </div>
        <nav className={styles.gNav}>
          <ul className={styles.gNav__list}>
            <li className={styles.gNav__item}>
              <a href="/" className={styles.gNav__link}>
                Blog
              </a>
            </li>
            <li className={styles.gNav__item}>
              <a href="/projects" className={styles.gNav__link}>
                Projects
              </a>
            </li>
            <li className={styles.gNav__item}>
              <a href="/photo" className={styles.gNav__link}>
                Photo
              </a>
            </li>
            <li className={styles.gNav__item}>
              <a href="/about" className={styles.gNav__link}>
                About
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
