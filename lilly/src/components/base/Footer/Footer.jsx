import React from 'react'
import styles from './Footer.module.scss'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p>Copyright &copy; {new Date().getFullYear()} Lilly.</p>
      </div>
    </footer>
  )
}

export default Footer
