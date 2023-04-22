import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import styles from './About.module.scss'

const About = () => {
  return (
    <section className={styles.myAbout}>
      <div className="container">
        <motion.div
          className={styles.myAbout__head}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className={styles.myAbout__title}>About &#129430;</h2>
        </motion.div>
        <h3 className={styles.myAbout__lead}>
          Hi there &#128075;
          <br />
          I&apos;m a developer based in Japan.
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
