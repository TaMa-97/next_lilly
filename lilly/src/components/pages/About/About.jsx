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

  const currentWorks = [
    {
      title: 'Webサイトのフロントエンド設計',
      text: [
        '大規模プロジェクトにも対応するためのCSS設計やコンポーネントベースのアプローチを活用して、再利用可能でメンテナンス性の高い環境を目指して初期設計を行っています。',
      ],
    },
    {
      title: 'Webサイトのフロントエンド実装',
      text: [
        '設計に基づいてセマンティックなマークアップとアクセシビリティ対応を重視し、デザインを忠実に再現するWebページの制作を行っています。',
      ],
    },
    {
      title: 'コーディングガイドラインの策定',
      text: [
        'チーム全体のコーディング品質を保つため、ガイドラインの作成を行っています。',
      ],
    },
    {
      title: 'インタラクティブなアニメーション制作',
      text: [
        'アニメーションライブラリやWebGLを用いたアニメーション実装を行っています。',
      ],
    },
    {
      title: 'CMSの導入とカスタマイズ',
      text: [
        'WordPressやMovableTypeを用いてCMSをセットアップし、動的なコンテンツのテンプレートをカスタマイズしています。',
      ],
    },
    {
      title: 'パフォーマンスチューニング',
      text: [
        'Core Web Vitalsの指標をベースに課題を作成し、パフォーマンススコアを改善しています。',
      ],
    },
    {
      title: 'OSSフレームワークによるWebアプリケーション開発',
      text: [
        'Nuxt.js,Next.jsなどを用いたWebアプリケーションを開発しています。',
      ],
    },
    {
      title: 'Jamstackアーキテクチャを採用したHeadlessCMSの構築',
      text: [
        'microCMS等のクラウドベースのCMSとNext.jsのようなフレームワークを組み合わせてJamstack環境を構築し、Vercel等のホスティングサービスにデプロイしています。',
      ],
    },
    {
      title: 'Astroによる効率的なWebサイト制作',
      text: [
        '高速なWebサイトを構築するためのオールインワンWebフレームワークであるAstroを活用しています。',
      ],
    },
  ]
  const futureWorks = [
    {
      title: 'OSSフレームワークによるWebアプリケーション開発',
      text: ['特にReactとNext.jsを用いた開発に注力していきたいです。'],
    },
    {
      title: 'ReactとNext.jsのスタイリング設計',
      text: [
        'CSS-in-JSやCSS Modulesなどを用いたスタイリング設計に注力していきたいです。',
      ],
    },
    {
      title: 'デザインエンジニアリング',
      text: [
        'ユーザーエクスペリエンスを最大化するためのインタラクティブなUI設計や、アニメーションを活用したビジュアル表現にも興味を持っています。',
      ],
    },
    {
      title: 'デザインシステムの導入',
      text: [
        '一貫性のあるユーザ体験を提供するためにデザインシステムの構築に興味を持っています。',
      ],
    },
    {
      title: 'API設計と実装',
      text: [
        'API設計のベストプラクティスに基づき、効率的で安全なAPI設計と実装に興味を持っています。',
      ],
    },
    {
      title: 'バックエンドおよびインフラの構築',
      text: [
        'PHPやLaravelなどを使用したバックエンド開発、AWSやDocker等を用いたインフラの構築にも興味を持っています。',
      ],
    },
  ]

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
        </div>
        <section className={styles.myAbout__block}>
          <h3 className={styles.myAbout__subtitle}>現行フロントエンド活動</h3>
          <ul className={styles.myAbout__list}>
            {currentWorks.map((block, index) => (
              <li key={index} className={styles.myAbout__item}>
                {block.title}
                <ul className={styles.myAbout__list02}>
                  {block.text.map((text, textIndex) => (
                    <li key={textIndex} className={styles.myAbout__item02}>
                      {text}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </section>
        <section className={styles.myAbout__block}>
          <h3 className={styles.myAbout__subtitle}>
            今後の注力分野と興味のある領域
          </h3>
          <ul className={styles.myAbout__list}>
            {futureWorks.map((block, index) => (
              <li key={index} className={styles.myAbout__item}>
                {block.title}
                <ul className={styles.myAbout__list02}>
                  {block.text.map((text, textIndex) => (
                    <li key={textIndex} className={styles.myAbout__item02}>
                      {text}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </section>
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
    </section>
  )
}

export default About
