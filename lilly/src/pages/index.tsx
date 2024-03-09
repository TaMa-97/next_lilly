import type { NextPage, InferGetStaticPropsType } from 'next'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { getAllPosts } from '@/utils/api'
import { TopBody } from '@/features/top/components'
import CustomHead from '@/components/base/Head/CustomHead'
import Header from '@/components/base/Header/Header'
import Footer from '@/components/base/Footer/Footer'

type Props = InferGetStaticPropsType<typeof getStaticProps>

export const getStaticProps = async () => {
  const allPosts = getAllPosts(['slug', 'title', 'date', 'tags'])

  const categoryCounts = allPosts.reduce<Record<string, number>>(
    (acc, post) => {
      post.tags.forEach((tag) => {
        if (acc[tag]) {
          acc[tag] += 1
        } else {
          acc[tag] = 1
        }
      })

      return acc
    },
    {}
  )

  return {
    props: { allPosts, categoryCounts },
  }
}

const Home: NextPage<Props> = ({ allPosts, categoryCounts }) => {
  const pageTitle = 'Lilly'
  const pageDescription = 'Personal website of Lilly.'

  // 投稿を日付で降順に並べ替える
  const sortedPosts = allPosts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  // アコーディオンの開閉状態を管理
  const [isOpen, setIsOpen] = useState(false)

  // アコーディオンの開閉を切り替える関数
  const toggleAccordion = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ ease: 'easeOut', duration: 0.25 }}
        className="gWrapper"
      >
        <CustomHead title={pageTitle} description={pageDescription} />
        <Header />
        <main>
          <TopBody
            sortedPosts={sortedPosts}
            categoryCounts={categoryCounts}
            isOpen={isOpen}
            toggleAccordion={toggleAccordion}
          />
        </main>
        <Footer />
      </motion.div>
    </>
  )
}

export default Home
