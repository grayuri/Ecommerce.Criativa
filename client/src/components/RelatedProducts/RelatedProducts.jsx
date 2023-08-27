import React from 'react'

import './RelatedProducts.scss'
import { allProducts } from '../../../../warehouse/allProducts';
import Card from '../Card/Card';

const RelatedProducts = ({subcategory, category, id}) => {

  const sameSubcategoryProducts = allProducts.filter( product => 
    ((product.subCategory === subcategory) 
    || (product.category === category)) 
    && (product.id !== id)
  )
  const firstSixteenProducts = sameSubcategoryProducts.splice(0,15)

  console.log(sameSubcategoryProducts)

  return (
    <div className='related-products'>
      <h1>Produtos Relacionados</h1>
      <div className="bottom">
        {
          firstSixteenProducts.map(item => (
            <Card item={item} key={item.id} />
          ))
        }
      </div>
    </div>
  )
}

export default RelatedProducts