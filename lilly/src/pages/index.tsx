import type { NextPage, InferGetStaticPropsType } from 'next'
import { getAllPosts } from '@/utils/api'
import CustomHead from '@/components/base/Head/CustomHead'
import Header from '@/components/base/Header/Header'
import Footer from '@/components/base/Footer/Footer'
import styles from './index.module.scss'

type Props = InferGetStaticPropsType<typeof getStaticProps>

export const getStaticProps = async () => {
  const allPosts = getAllPosts(['slug', 'title', 'date', 'tags'])

  return {
    props: { allPosts },
  }
}

const Home: NextPage<Props> = ({ allPosts }) => {
  const pageTitle = 'Lilly'
  const pageDescription = 'This is the Home page of Next Lilly'
  return (
    <>
      <CustomHead title={pageTitle} description={pageDescription} />
      <Header />
      <main>
        <section className={styles.myBlog}>
          <div className="container">
            <div className={styles.myBlog__head}>
              <h2 className={styles.myBlog__title}>Blog</h2>
              <p className={styles.myBlog__lead}>
                主に技術的なメモやTipsをゆるく投稿している場所です。
              </p>
            </div>
            <ul className={styles.myBlog__list}>
              {allPosts?.map((post) => (
                <li key={post.slug} className={styles.myBlog__item}>
                  <a
                    href={`/blog/${post.slug}`}
                    className={styles.myBlog__link}
                  >
                    <p className={styles.myBlog__linkTitle}>{post.title}</p>
                    <div className={styles.myBlog__linkInner}>
                      <ul className={styles.myBlog__linkList}>
                        {post.tags?.map((tag) => (
                          <li key={tag} className={styles.myBlog__linkItem}>
                            {tag}
                          </li>
                        ))}
                      </ul>
                      <p className={styles.myBlog__linkDate}>{post.date}</p>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default Home
