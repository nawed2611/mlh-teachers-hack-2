import type { NextPage } from 'next'
import Hero from '../components/Hero'
import Navbar from '../components/Navbar'

const Home: NextPage = () => {
  return (
    <div className="bg-[#faeee7] text-[#33272a] h-screen">
      <Navbar />
      <Hero />
    </div>
  )
}

export default Home
