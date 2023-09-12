import React, { useEffect, useState } from 'react'
import {collection, getDocs} from 'firebase/firestore'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './FeaturedProducts.scss'
import Card from '../Card/Card'
import { db } from '../../firebase-config'

const FeaturedProducts = ({type}) => {
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

  const addedToCartNotify = () => {
    return (
      toast.success('Produto adicionado ao carrinho!', {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
    )
  }

  const alreadyInCartNotify = () => {
    return (
      toast.warn('Produto já está no carrinho!', {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
    )
  }
  
  const sameTypeProducts = products.filter(product => product.type === type)

  return (
    <div className='featured-products'>
      <div className="top">
        <h1> {type} </h1>
      </div>
      <div className="bottom">
        { 
          sameTypeProducts.map(item => (
            <Card 
              item={item} 
              key={item.id} 
              addedToCartNotify={addedToCartNotify}
              alreadyInCartNotify={alreadyInCartNotify}
            />
          )) 
        }
      </div>
        <ToastContainer
          className="toast"
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
    </div>
  )
}

export default FeaturedProducts