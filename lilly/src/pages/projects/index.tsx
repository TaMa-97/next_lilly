import type { NextPage } from 'next'
import CustomHead from '@/components/base/Head/CustomHead'
import Header from '@/components/base/Header/Header'
import Footer from '@/components/base/Footer/Footer'

const Home: NextPage<> = () => {
  const pageTitle = 'Projects | lilly'
  const pageDescription = 'This is the Home page of Next Lilly'
  return (
    <>
      <CustomHead title={pageTitle} description={pageDescription} />
      <Header />
      <main></main>
      <Footer />
    </>
  )
}

export default Home
