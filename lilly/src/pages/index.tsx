import type { NextPage, InferGetStaticPropsType } from 'next'
import { getAllPosts } from '@/utils/api'
import CustomHead from '@/components/base/Head/CustomHead'
import Header from '@/components/base/Header/Header'
import Footer from '@/components/base/Footer/Footer'

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
        <ul>
          {allPosts?.map((post) => (
            <li key={post.slug}>
              <a href={`/blog/${post.slug}`}>
                <p>{post.title}</p>
              </a>
              <p>{post.date}</p>
              <ul>
                {post.tags?.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </>
  )
}

export default Home
