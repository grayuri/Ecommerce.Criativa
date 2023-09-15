import React, {useState, useEffect} from 'react';
import {collection, getDocs} from 'firebase/firestore';
import Pagination from '@mui/material/Pagination';

import './List.scss';
import Card from '../../components/Card/Card';
import Loader from '../../components/Loader/Loader';
import { db } from '../../firebase-config';

const List = ({category, sort}) => {
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  
  const productsCollectionReference = collection(db, "products")

  useEffect(() => {

    setLoading(true)

    const getProducts = async () => {
      const data = await getDocs(productsCollectionReference)
      const productDoc = data.docs.map(doc => ({...doc.data(), id: doc.id}))

      setProducts(productDoc)
      setLoading(false)
    }

    getProducts()

  },[])

  const sameCategoryProducts = products.filter(product => product.category === category)

  const productsPerPage = 24
  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = sameCategoryProducts.slice(indexOfFirstProduct, indexOfLastProduct)

  const paginate = (event, value) => {
    setCurrentPage(value)
    window.scrollTo({top: 0, behavior: 'smooth'})
  }

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
      <div className="products">
        {
          loading === true
          ? (<Loader />)
          : currentProducts.map(item => (
            <Card item={item} key={item.id} />
          ))
        }
      </div>
      
      {
        sameCategoryProducts.length > productsPerPage && (
          <Pagination
            shape="rounded"
            defaultPage={1}
            count={Math.ceil(sameCategoryProducts.length / productsPerPage)}
            page={currentPage}
            onChange={paginate}
            size='large'
            color="primary"
          />
        )
      }
    </div>
  )
}

export default List