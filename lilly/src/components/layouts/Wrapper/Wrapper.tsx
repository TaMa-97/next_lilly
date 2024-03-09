import React from 'react'
import { motion } from 'framer-motion'

type WrapperProps = {
  children: React.ReactNode
}

const Wrapper = ({ children }: WrapperProps) => {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ ease: 'easeOut', duration: 0.4 }}
      className="gWrapper"
    >
      {children}
    </motion.main>
  )
}

export default Wrapper
