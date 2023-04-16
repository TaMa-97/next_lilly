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
            <br />I design and implement web front-end components and
            interactions.
            <br />I enjoy creating beautiful and easy-to-use user interfaces.
            <br />I love Next.js and Jamstack technology.
            <br />
            My hobbies are tennis and sauna.
          </p>
          <p className={styles.myAbout__txtJa}>
            1997年岡山県生まれ。
            <br />
            Webフロントエンドのコンポーネントやインタラクションの設計・実装を行っています。
            <br />
            美しく使いやすいユーザーインターフェースを作成することを楽しんでいます。
            <br />
            Next.jsやJamstack技術が好きです。
            <br />
            趣味は、テニスとサウナです。
          </p>
        </div>
      </div>
    </section>
  )
}

export default About
