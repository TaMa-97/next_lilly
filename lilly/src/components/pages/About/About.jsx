import React from 'react'
import styles from './About.module.scss'

const About = () => {
  return (
    <section className={styles.myAbout}>
      <div className="container">
        <div className={styles.myAbout__head}>
          <h2 className={styles.myAbout__title}>About &#129430;</h2>
        </div>
        <h3 className={styles.myAbout__lead}>
          Hi there &#128075;
          <br />
          I&apos;m a developer based in Japan.
        </h3>
        <div className={styles.myAbout__txtArea}>
          <p className={styles.myAbout__txtEn}>
            Born in Okayama, Japan in 1997.
            <br />
            I design and implement web front-end UI components and interactions
            at my company. I enjoy working with JavaScript library and crafting
            beautiful front-end experiences.
            <br /> I&apos;m busy with playing tennis!, sauna, and radio, and
            watching soccer.
          </p>
          <p className={styles.myAbout__txtJa}>
            1997 年岡山県生まれ。
            <br /> Web フロントエンドの UI
            コンポーネントやインタラクションの設計・実装を行っています。JavaScript
            ライブラリを操作して、美しいフロントエンドエクスペリエンスを作成することを楽しんでいます。
            <br />
            テニス、サウナ、ラジオ、サッカー観戦で大忙しです。
          </p>
        </div>
      </div>
    </section>
  )
}

export default About
