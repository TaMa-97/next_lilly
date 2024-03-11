import type { Post } from '@/types/postTypes'
import React from 'react'
import Link from 'next/link'
import { CSSTransition } from 'react-transition-group'
import { PageTitle } from '@/components/elements/PageTitle'
import { Wrapper } from '@/components/layouts/Wrapper'
import styles from '../styles/index.module.scss'
import { useAccordion } from '../hooks/useAccordion'
import { useSortedPosts } from '../hooks/useSortedPosts'

type Props = {
  allPosts: Post[]
  categoryCounts: Record<string, number>
}

const TopBody = ({ allPosts, categoryCounts }: Props) => {
  const sortedPosts = useSortedPosts(allPosts)
  const { isOpen, toggleAccordion } = useAccordion()

  return (
    <Wrapper>
      <section className={styles.myBlog}>
        <div className="container">
          <PageTitle
            title="Notebook 🚀"
            lead="主に技術的なメモやTipsをゆるく投稿している場所です。"
          />
          <div className={styles.myBlog__catArea}>
            <button
              className={`${styles.myBlog__catItemButton} ${
                isOpen ? styles.open : ''
              }`}
              onClick={toggleAccordion}
            >
              Category
            </button>
            <CSSTransition
              in={isOpen}
              timeout={300}
              classNames={{
                enter: styles.enter,
                enterActive: styles.enterActive,
                exit: styles.exit,
                exitActive: styles.exitActive,
              }}
              unmountOnExit
            >
              <ul
                className={`${styles.myBlog__subCatList} ${
                  isOpen ? styles.myBlog__subCatListOpen : ''
                }`}
              >
                {Object.entries(categoryCounts).map(([category, count]) => (
                  <li key={category} className={styles.myBlog__subCatItem}>
                    <Link href={`/category/${category}`} scroll={false}>
                      {category} ({count})
                    </Link>
                  </li>
                ))}
              </ul>
            </CSSTransition>
          </div>
          <ul className={styles.myBlog__list}>
            {sortedPosts?.map((post: Post) => (
              <li key={post.slug} className={styles.myBlog__item}>
                <Link
                  href={`/note/${post.slug}`}
                  className={styles.myBlog__link}
                  scroll={false}
                >
                  <p className={styles.myBlog__linkTitle}>
                    {post.title}
                    <span className={styles.myBlog__linkIcon}></span>
                  </p>
                  <div className={styles.myBlog__linkInner}>
                    <ul className={styles.myBlog__linkList}>
                      {post.tags?.map((tag: string) => (
                        <li key={tag} className={styles.myBlog__linkItem}>
                          {tag}
                        </li>
                      ))}
                    </ul>
                    <p className={styles.myBlog__linkDate}>{post.date}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </Wrapper>
  )
}

export default TopBody
