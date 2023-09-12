import React, {useState, useEffect} from 'react';
import {collection, getDocs} from 'firebase/firestore'

import './List.scss';
import Card from '../../components/Card/Card';
import { db } from '../../firebase-config';

const List = ({category, sort}) => {
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

  const sameCategoryProducts = products.filter(product => product.category === category)

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