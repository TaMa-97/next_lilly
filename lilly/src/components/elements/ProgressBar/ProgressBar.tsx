import React from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import styles from './ProgressBar.module.scss'

const ProgressBar = () => {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress)

  return <motion.div style={{ scaleX }} className={styles.progressBar} />
}

export default ProgressBar
