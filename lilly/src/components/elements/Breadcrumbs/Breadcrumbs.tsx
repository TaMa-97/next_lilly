import React from 'react'
import Link from 'next/link'
import styles from './Breadcrumbs.module.scss'

type BreadcrumbsProps = {
  breadcrumbs: Array<{
    title: string
    path?: string
  }>
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ breadcrumbs = [] }) => (
  <nav className={styles.breadcrumbs}>
    <ul className={styles.breadcrumbs__list}>
      {breadcrumbs.map((breadcrumb, index) => (
        <li key={index} className={styles.breadcrumbs__item}>
          {/* breadcrumbにpathがある場合リンクを表示 */}
          {breadcrumb.path ? (
            <Link href={breadcrumb.path}>
              <a className={styles.breadcrumbs__link}>{breadcrumb.title}</a>
            </Link>
          ) : (
            // ない場合テキストを表示
            <span className={styles.breadcrumbs__link}>{breadcrumb.title}</span>
          )}
          {/* 最後のbreadcrumb以外に表示 */}
          {index < breadcrumbs.length - 1 && (
            <span className={styles.breadcrumbs__separator}>›</span>
          )}
        </li>
      ))}
    </ul>
  </nav>
)

export default Breadcrumbs
