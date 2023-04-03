import { NextPage, InferGetStaticPropsType } from 'next'
import { getAllPosts } from '@/utils/api'

type Props = InferGetStaticPropsType<typeof getStaticProps>

export const getStaticProps = async () => {
  const allPosts = getAllPosts(['slug', 'title', 'date', 'tags'])

  return {
    props: { allPosts },
  }
}

const Home: NextPage<Props> = ({ allPosts }) => (
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
)

export default Home
