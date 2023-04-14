import type { NextPage } from 'next'
import CustomHead from '@/components/base/Head/CustomHead'
import Header from '@/components/base/Header/Header'
import Footer from '@/components/base/Footer/Footer'
import About from '@/components/pages/About/About'

const Home: NextPage<> = () => {
  const pageTitle = 'About | lilly'
  const pageDescription = 'This is the Home page of Next Lilly'
  return (
    <>
      <CustomHead title={pageTitle} description={pageDescription} />
      <Header />
      <main>
        <About />
      </main>
      <Footer />
    </>
  )
}

export default Home
