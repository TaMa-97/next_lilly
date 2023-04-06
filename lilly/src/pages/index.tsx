import { NextPage, InferGetStaticPropsType } from 'next'
import { getAllPosts } from '@/utils/api'
import Header from '@/components/base/Header/Header'
import Footer from '@/components/base/Footer/Footer'

type Props = InferGetStaticPropsType<typeof getStaticProps>

export const getStaticProps = async () => {
  const allPosts = getAllPosts(['slug', 'title', 'date', 'tags'])

  return {
    props: { allPosts },
  }
}

const Home: NextPage<Props> = ({ allPosts }) => (
  <>
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

export default Home
