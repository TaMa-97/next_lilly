import type { Read } from '@/types/readTypes'
import React from 'react'
import Link from 'next/link'
import { PageTitle } from '@/components/elements/pageTitle'
import { Wrapper } from '@/components/layouts/Wrapper'
import styles from '../styles/index.module.scss'
import { useSortedReads } from '../hooks/useSortedReads'

type ReadBodyProps = {
  allReads: Read[]
}

const ReadBody = ({ allReads }: ReadBodyProps) => {
  const sortedReads = useSortedReads(allReads)

  return (
    <Wrapper>
      <section className={styles.myRead}>
        <div className="container">
          <PageTitle
            title="Reading list 📖"
            lead="主に読んだ記事や本などをまとめていくための場所です。"
            titleTag="h1"
            leadTag="h2"
          />
          <ul className={styles.myRead__list}>
            {sortedReads.map((read) => (
              <li key={read.slug} className={styles.myRead__item}>
                <Link
                  href={`/read/${read.slug}`}
                  className={styles.myRead__link}
                  scroll={false}
                >
                  <h3 className={styles.myRead__linkHead}>
                    <span className={styles.myRead__linkTitle}>
                      {read.title}
                    </span>
                    <span className={styles.myRead__linkIcon}></span>
                  </h3>
                  <div className={styles.myRead__linkFoot}>
                    <p className={styles.myRead__linkDate}>{read.date}</p>
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

export default ReadBody
