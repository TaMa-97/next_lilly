import React from 'react'
import styles from './Footer.module.scss'

const Footer = () => {
  return (
    <footer className={styles.gFooter}>
      <div className={styles.gFooter__inner}>
        <p className={styles.gFooter__copy}>
          &copy;lilly_{new Date().getFullYear()}.
        </p>
      </div>
    </footer>
  )
}

export default Footer
