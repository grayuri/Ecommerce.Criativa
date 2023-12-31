import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {collection, getDocs} from 'firebase/firestore'

import './Products.scss'
import List from '../../components/List/List'
import Loader from '../../components/Loader/Loader'
import { db } from '../../firebase-config'

const Products = () => {
  const categoryName = useParams().id

  const [loading, setLoading] = useState(false)
  const [category, setCategory] = useState("")
  const [banner, setBanner] = useState("")
  const [sort, setSort] = useState("desc")
  
  const bannersCollectionReference = collection(db, "banners")

  useEffect(() => {

    const setBannerImage = async () => {
      setLoading(true)
      const bannerCategory = getCategoryName()
      const bannerDoc = await getBanners()
      const filteredBanner = bannerDoc.filter(banner => banner.name === bannerCategory)

      setBanner(filteredBanner[0].image)
      setLoading(false)
    }

    const setCategoryName = () => {
      if (categoryName === "brinquedos") setCategory("toys")
      else if (categoryName === "cosméticos") setCategory("cosmetics")
      else if (categoryName === "eletrônicos") setCategory("eletronics")
      else if (categoryName === "papelaria") setCategory("stationary")
      else if (categoryName === "utilidades") setCategory("utilities")
    }

    const getCategoryName = () => {
      if (categoryName === "brinquedos") return "toys"
      else if (categoryName === "cosméticos") return "cosmetics"
      else if (categoryName === "eletrônicos") return "eletronics"
      else if (categoryName === "papelaria") return "stationary"
      else if (categoryName === "utilidades") return "utilities"
    }

    const getBanners = async () => {
      const data = await getDocs(bannersCollectionReference)
      const bannerDoc = data.docs.map(doc => ({...doc.data(), id: doc.id}))
      return bannerDoc
    }
    
    setCategoryName()
    setBannerImage()
    
  },[])

  return (
    <div className='products'>
      <div className="top">
        <div className="categorie-banner">
          {
            loading === true
            ? (<Loader />)
            : (<img id="banner-image" src={banner} alt={`${category}-banner`} />)
          }
        </div>

        <h1 className="category-title">
          {categoryName}
        </h1>

        <div className="filter-item">
          <h2>Ordenar por</h2>
          <select name="prices" id="prices" onChange={(e) => setSort(e.target.value)}>
            <option 
              id="all" 
              value=""
            >
              Qualquer Preço
            </option>
            <option 
              id="lowest" 
              value="desc"
            >
              Maior Preço
            </option>
            <option 
              id="highest" 
              value="asc"
            >
              Menor Preço
            </option>
          </select>
        </div>
      </div>
      <div className="bottom">
        <List category={category} sort={sort} />
      </div>
    </div>
  )
}

export default Products