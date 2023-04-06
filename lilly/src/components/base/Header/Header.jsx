import React from 'react'
import styles from './Header.module.scss'

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <h1 className={styles.logo}>Your Logo</h1>
      </div>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <a href="/" className={styles.navLink}>
              Home
            </a>
          </li>
          <li className={styles.navItem}>
            <a href="/about" className={styles.navLink}>
              About
            </a>
          </li>
          <li className={styles.navItem}>
            <a href="/contact" className={styles.navLink}>
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
