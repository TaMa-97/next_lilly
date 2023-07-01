import React from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './About.module.scss'

const About = () => {
  const textVariants = {
    hidden: { x: -50, opacity: 0, scale: 0.5, filter: 'blur(5px)' },
    visible: {
      x: 0,
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  }

  return (
    <section className={styles.myAbout}>
      <div className="container">
        <motion.div
          className={styles.myAbout__head}
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -15, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <h1 className={styles.myAbout__title}>About 🎾</h1>
        </motion.div>
        <h2 className={styles.myAbout__lead}>
          <AnimatePresence>
            <motion.span
              key="text1"
              variants={textVariants}
              initial="hidden"
              animate="visible"
            >
              Hi there{' '}
              <span className={styles.myAbout__leadIcon}>&#128075;</span>
            </motion.span>
          </AnimatePresence>
          <br />
          <AnimatePresence>
            <motion.span
              key="text2"
              variants={textVariants}
              initial="hidden"
              animate="visible"
            >
              I&apos;m a developer based in Japan.
            </motion.span>
          </AnimatePresence>
        </h2>
        <div className={styles.myAbout__txtArea}>
          <p className={styles.myAbout__txtEn}>
            Born in 1997.
            <br />I started my career as an engineer in 2020 and currently work
            on website production and web application development.
            <br />
            My main focus is on the web front-end area, from implementation of
            components and interactions to base design and release.
            <br />
            My hobbies are tennis and sauna.
          </p>
          <Link
            href="https://bento.me/tama-97"
            target="_blank"
            className={styles.myAbout__link}
            scroll={false}
          >
            Bento.me<span className={styles.myAbout__linkIcon}></span>
          </Link>
          <Link
            href="/note/about"
            className={styles.myAbout__link}
            scroll={false}
          >
            このサイトについて<span className={styles.myAbout__linkIcon}></span>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default About
