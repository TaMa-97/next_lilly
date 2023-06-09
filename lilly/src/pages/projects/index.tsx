import type { NextPage } from 'next'
import React from 'react'
import { motion } from 'framer-motion'
import CustomHead from '@/components/base/Head/CustomHead'
import Header from '@/components/base/Header/Header'
import Footer from '@/components/base/Footer/Footer'
import Products from '@/components/pages/Products/Products'

const Home: NextPage = () => {
  const pageTitle = 'Projects | lilly'
  const pageDescription = 'This is the Home page of Next Lilly'
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
          <Products />
        </main>
        <Footer />
      </motion.div>
    </>
  )
}

export default Home
