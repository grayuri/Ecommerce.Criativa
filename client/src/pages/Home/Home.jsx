import React, { useEffect, useState } from 'react'
import {collection, getDocs} from 'firebase/firestore';

import './Home.scss'
import FeaturedProducts from '../../components/FeaturedProducts/FeaturedProducts'
import Categories from '../../components/Categories/Categories'
import Loader from '../../components/Loader/Loader';
import {db} from '../../firebase-config.js'

const Home = () => {
  const [loading, setLoading] = useState(false)
  const [banner, setBanner] = useState("")
  const [types, setTypes] = useState([])

  const typesCollectionReference = collection(db, "types")
  const bannersCollectionReference = collection(db, "banners")

  useEffect(() => {
    setLoading(true)

    const setBannerImage = async () => {
      const bannerDoc = await getBanners()
      const mainBanner = bannerDoc.filter(banner => banner.name === "main")
      setBanner(mainBanner[0].image)
      setLoading(false)
    }

    const getTypes = async () => {
      const data = await getDocs(typesCollectionReference)
      const typeDoc = data.docs.map(doc => ({...doc.data(), id: doc.id}))
      
      setTypes(typeDoc)
      setLoading(false)
    }

    const getBanners = async () => {
      const data = await getDocs(bannersCollectionReference)
      const bannerDoc = data.docs.map(doc => ({...doc.data(), id: doc.id}))
      return bannerDoc
    }

    getTypes()
    setBannerImage()

  },[])

  return (
    <div className='home'>
      <div className='top-banner'>
        {
          loading === true
          ? (<Loader />)
          : (<img id="banner-image" src={banner} alt="main-banner" />)
        }
      </div>

      <Categories />

      {
        loading === true 
        ? (<Loader />)
        : types.map(type => (
          <FeaturedProducts type={type.name} key={type.id} />
        ))
      }
    </div>
  )
}

export default Home