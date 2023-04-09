import React from 'react'
import PoweredByVercel from 'powered-by-vercel'
import styles from './Footer.module.scss'

const Footer = () => {
  return (
    <footer className={styles.gFooter}>
      <div className={`container ${styles.gFooter__inner}`}>
        <p className={styles.gFooter__copy}>
          &copy;lilly_{new Date().getFullYear()}.
        </p>
        <div className={styles.gFooter__logo}>
          <PoweredByVercel />
        </div>
      </div>
    </footer>
  )
}

export default Footer
