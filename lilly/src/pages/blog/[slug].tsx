import type { NextPage, InferGetStaticPropsType } from 'next'
import { getAllPosts, getPostBySlug } from '@/utils/api'
import markdownToHtml from '@/utils/markdownToHtml'
import CustomHead from '@/components/base/Head/CustomHead'
import Header from '@/components/base/Header/Header'
import Footer from '@/components/base/Footer/Footer'
import styles from './[slug].module.scss'

type Props = InferGetStaticPropsType<typeof getStaticProps>

export const getStaticPaths = async () => {
  const posts = getAllPosts(['slug'])

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      }
    }),
    fallback: false,
  }
}

export const getStaticProps = async ({ params }: any) => {
  const post = getPostBySlug(params.slug, [
    'slug',
    'title',
    'date',
    'tags',
    'content',
  ])
  // ここで変換
  const content = await markdownToHtml(post.content)

  // 変換結果をpropsとして渡す
  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  }
}

const Post: NextPage<Props> = ({ post }) => {
  const pageTitle = 'Lilly'
  const pageDescription = 'This is the Home page of Next Lilly'
  return (
    <>
      <CustomHead title={pageTitle} description={pageDescription} />
      <Header />
      <main>
        <div className="container">
          <section className={styles.myBlog}>
            <h2 className={styles.myBlog__title}>{post.title}</h2>
            <div className={styles.myBlog__head}>
              <p className={styles.myBlog__date}>{post.date}</p>
              <ul className={styles.myBlog__list}>
                {post.tags?.map((tag) => (
                  <li key={tag} className={styles.myBlog__item}>
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
            <article>
              {/* ここでdangerouslySetInnerHTMLを使ってHTMLタグを出力する */}
              <div
                className={`znc ${styles.myZnc}`}
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </article>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Post
