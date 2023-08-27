import React, { useEffect, useState } from 'react'
import axios from "axios"

import './FeaturedProducts.scss'
import Card from '../Card/Card'
import useFetch from '../../hooks/useFetch'
import {allProducts} from '../../../../warehouse/allProducts'


const FeaturedProducts = ({type}) => {

  const sameTypeProducts = allProducts.filter(product => product.type === type)

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
        { sameTypeProducts.map(item => (<Card item={item} key={item.id} />)) }
      </div>
    </div>
  )
}

export default FeaturedProducts