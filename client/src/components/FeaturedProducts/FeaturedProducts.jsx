import React, { useEffect, useState } from 'react'
import axios from "axios"

import './FeaturedProducts.scss'
import Card from '../Card/Card'
import useFetch from '../../hooks/useFetch'


const FeaturedProducts = ({type}) => {

  const {data, loading, error} = useFetch(`/products?populate=*&[filters][type][$eq]=${type}`)

  const getTypeName = () => {
    if (type === 'featured') {
      return 'destaque'
    }
    else if(type === 'trending') {
      return 'alta'
    }
    
  }

  return (
    <div className='featured-products'>
      <div className="top">
        <h1> Produtos em {getTypeName()} </h1>
      </div>
      <div className="bottom">
        {
          error 
            ? "Somethin went wrong..." 
            : (loading 
              ? "loading"
              : data.map(item => (
                  <Card item={item} key={item.id} />
                )))
        }
      </div>
    </div>
  )
}

export default FeaturedProducts