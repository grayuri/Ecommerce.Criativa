import React from 'react'

import './Home.scss'
import FeaturedProducts from '../../components/FeaturedProducts/FeaturedProducts'
import Categories from '../../components/Categories/Categories'

const Home = () => {
  return (
    <div className='home'>
      <div className='top-banner'>
        <img src='https://images.pexels.com/photos/168866/pexels-photo-168866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' alt="top-banner" />
      </div>
      <Categories />
      <FeaturedProducts type="featured" />
      <FeaturedProducts type="trending" />
    </div>
  )
}

export default Home