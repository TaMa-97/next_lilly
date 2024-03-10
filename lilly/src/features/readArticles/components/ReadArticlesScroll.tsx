import { motion, useScroll, useSpring } from 'framer-motion'

export const ReadArticlesScroll = () => {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress)

  return <motion.div style={{ scaleX }} className="progress-bar" />
}
