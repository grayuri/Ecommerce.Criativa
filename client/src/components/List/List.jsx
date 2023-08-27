import React from 'react';

import './List.scss';
import Card from '../../components/Card/Card';
import {allProducts} from '../../../../warehouse/allProducts'

const List = ({categorieId, sort}) => {

  const getCategorieName = () => {
    switch(categorieId) {
      case 1: 
      return "cosmetics"
      break

      case 2: 
      return "eletronics"
      break

      case 3: 
      return "stationary"
      break

      case 4: 
      return "toys"
      break

      case 5: 
      return "utilities"
      break
    }
  }
  
  const categorieName = getCategorieName()
  
  const sameCategoryProducts = allProducts.filter(product => product.category === categorieName)

  const sortHigherProductsPrice = () => {
    sameCategoryProducts.sort((a,b) => a.price - b.price)
  }

  const sortLowestProductsPrice = () => {
    sameCategoryProducts.sort((a,b) => b.price - a.price)
  }

  if (sort === "asc") { sortHigherProductsPrice() }
  else { sortLowestProductsPrice() }

  return (
    <div className='list'>
      {
        sameCategoryProducts.map(item => (
          <Card item={item} key={item.id} />
        ))
      }
    </div>
  )
}

export default List