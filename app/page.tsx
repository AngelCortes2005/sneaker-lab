import React from 'react'
import Shoes from '../components/three-js/shoe'
import Hero from '../components/Hero'
import Features from '../components/Features'
import FeaturedProducts from '../components/FeaturedProducts'
import Categories from '../components/Categories'
import Newsletter from '../components/NewsLetter'
import Footer from '../components/layout/Footer'

const page = () => {
  return (
    <div className=''>
      <Hero />
      <Features />
      <FeaturedProducts />
      <Categories />
      <Newsletter />
      <Footer />
    </div>
  )
}

export default page