import React from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'

const ProgressBar = () => {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress)

  return <motion.div style={{ scaleX }} className="progressBar" />
}

export default ProgressBar
