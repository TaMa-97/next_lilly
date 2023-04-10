import type { NextPage } from 'next'
import CustomHead from '@/components/base/Head/CustomHead'
import Header from '@/components/base/Header/Header'
import Footer from '@/components/base/Footer/Footer'
import styles from './index.module.scss'

const Home: NextPage<> = () => {
  const pageTitle = 'Projects | lilly'
  const pageDescription = 'This is the Home page of Next Lilly'
  return (
    <>
      <CustomHead title={pageTitle} description={pageDescription} />
      <Header />
      <main>
        <section className={styles.myProjects}>
          <div className="container">
            <div className={styles.myProjects__head}>
              <h2 className={styles.myProjects__title}>Projects &#128011;</h2>
              <p className={styles.myProjects__lead}>
                個人開発置き場<br />（これまでに携わってきた案件に関しては直接お問い合わせください。）
              </p>
            </div>
            <ul className={styles.myProjects__list}>
              <li className={styles.myProjects__item}>
                <a href="/" className={styles.myProjects__link}>
                  <p className={styles.myProjects__linkTitle}>Lilly</p>
                  <div className={styles.myProjects__linkInner}>
                    <ul className={styles.myProjects__linkList}>
                      <li className={styles.myProjects__linkItem}>Next.js</li>
                      <li className={styles.myProjects__linkItem}>
                        TypeScript
                      </li>
                    </ul>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default Home
