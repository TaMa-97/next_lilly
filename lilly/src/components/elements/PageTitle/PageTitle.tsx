import React from 'react'
import { motion } from 'framer-motion'
import styles from './PageTitle.module.scss'

interface PageTitleProps {
  title: string
  lead?: string
  titleTag?: keyof JSX.IntrinsicElements
  leadTag?: keyof JSX.IntrinsicElements
}

const PageTitle = ({
  title,
  lead,
  titleTag: TitleTag = 'h2',
  leadTag: LeadTag = 'h3',
}: PageTitleProps) => {
  return (
    <motion.div
      className={styles.pageHead}
      initial={{ y: 15, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -15, opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <TitleTag className={styles.pageHead__title}>{title}</TitleTag>
      {lead && <LeadTag className={styles.pageHead__lead}>{lead}</LeadTag>}
    </motion.div>
  )
}

export default PageTitle
