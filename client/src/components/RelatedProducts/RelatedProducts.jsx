import React, { useEffect, useState } from 'react'
import {collection, getDocs} from 'firebase/firestore'

import './RelatedProducts.scss'
import Card from '../Card/Card';
import { db } from '../../firebase-config';

const RelatedProducts = ({subcategory, category, id}) => {
  const [products, setProducts] = useState([])

  const productsCollectionReference = collection(db, "products")

  useEffect(() => {

    const getProducts = async () => {
      const data = await getDocs(productsCollectionReference)
      const productDoc = data.docs.map(doc => ({...doc.data(), id: doc.id}))
      setProducts(productDoc)
    }
    getProducts()

  },[])

  const sameSubcategoryProducts = products.filter( product => 
    (product.subcategory === subcategory) && (product.id !== id) && (product.category === category)
  )
  const firstSixteenProducts = sameSubcategoryProducts.splice(0,15)

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