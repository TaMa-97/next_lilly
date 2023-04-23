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
          <h2 className={styles.myAbout__title}>About &#129430;</h2>
        </motion.div>
        <h3 className={styles.myAbout__lead}>
          <AnimatePresence>
            <motion.span
              key="text1"
              variants={textVariants}
              initial="hidden"
              animate="visible"
            >
              Hi there &#128075;
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
        </h3>
        <div className={styles.myAbout__txtArea}>
          <p className={styles.myAbout__txtEn}>
            Born in 1997 and lives in Okayama Prefecture.
            <br />I started my career as an engineer in 2020 and currently work
            on website production and web application development.
            <br />
            My main focus is on the web front-end area, from implementation of
            components and interactions to base design and release.
            <br />
            My hobbies are tennis and sauna.
          </p>
          <p className={styles.myAbout__txtJa}>
            1997年生まれ、岡山県在住。
            <br />
            2020年にエンジニアとしてキャリアをスタートし、現在はWebサイト制作やWebアプリケーション開発を行っています。
            <br />
            Webフロントエンド領域をメインとして、コンポーネントやインタラクションの実装からベース設計、リリースまでの工程に対応しています。
            <br />
            趣味は、テニスとサウナです。
          </p>
          <Link
            href="/blog/about"
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
