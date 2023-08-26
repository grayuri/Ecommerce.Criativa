import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

import './Products.scss'
import List from '../../components/List/List'

const Products = () => {
  const categorieId = parseInt(useParams().id)
  const [sort, setSort] = useState("desc")
  
  const getCategoryName = () => {
    let categoryName = ''

    switch (categorieId) {
      case 1:
        categoryName = 'Cosméticos'
        return categoryName
        break
      case 2:
        categoryName = 'Eletrônicos'
        return categoryName
        break
      case 3:
        categoryName = 'Papelaria'
        return categoryName
        break
      case 4:
        categoryName = 'Brinquedos'
        return categoryName
        break
      case 5:
        categoryName = 'Utilidades'
        return categoryName
        break
    }
  }

  const getBannerImage = () => {
    let banner = ''

    switch (categorieId) {
      case 1:
        banner = 'https://images.pexels.com/photos/3018845/pexels-photo-3018845.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        return banner
        break
      case 2:
        banner = 'https://images.pexels.com/photos/6804466/pexels-photo-6804466.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        return banner
        break
      case 3:
        banner = 'https://images.pexels.com/photos/2078147/pexels-photo-2078147.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        return banner
        break
      case 4:
        banner = 'https://images.pexels.com/photos/220137/pexels-photo-220137.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        return banner
        break
      case 5:
        banner = 'https://images.pexels.com/photos/5217778/pexels-photo-5217778.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        return banner
        break
    }
  }

  return (
    <div className='products'>
      <div className="top">
        <div className="categorie-banner">
          <img src={getBannerImage()} alt="" />
        </div>

        <h1 className="category-title">
          {getCategoryName()}
        </h1>

        <div className="filter-item">
          <h2>Ordenar por</h2>
          <select name="prices" id="prices" onChange={(e) => setSort(e.target.value)}>
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
        <List categorieId={categorieId} sort={sort} />
      </div>
    </div>
  )
}

export default Products