import React, {useEffect, useState} from 'react';
import {collection, getDocs} from 'firebase/firestore';
import { Link } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';

import './Search.scss'
import Currency from '../../utils/Currency'
import { db } from '../../firebase-config';

const Search = ({ setShowSearch }) => {
  const [products, setProducts] = useState([])
  const [query, setQuery] = useState("")

  const productsCollectionReference = collection(db, "products")

  useEffect(() => {

    const getProducts = async () => {
      const data = await getDocs(productsCollectionReference)
      const productDoc = data.docs.map(doc => ({...doc.data(), id: doc.id}))
      setProducts(productDoc)
    }

    getProducts()

  },[document.querySelector('.search-results')])

  let searchedProducts = products.filter(product => product.title.toLowerCase().includes(query))
  
  if (!query.length) { searchedProducts = [] }

  const insertProductLink = (id) => `product/${id}`

  return (
    <div className='search-modal'>
      <div className="form-field">
        <input
          type="text"
          autoFocus
          placeholder='Pesquise algum produto...'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <CloseIcon
          className='close-icon'
          onClick={() => setShowSearch(false)}
          cursor="pointer"
          sx={{
            width: '32px',
            height: '32px'
          }}
        />
      </div>

      <div className="search-results-content">
        <div className="search-results">
          {
            searchedProducts.map(item => (
              <Link 
                to={insertProductLink(item.id)} 
                key={item.id} 
                className="link" 
                onClick={() => {
                  setShowSearch(false)
                  window.scrollTo(0, 0)
                }}
              >
                <div className="search-result-item">
                  <div className="image-container">
                    <img src={item.image} alt="product-image" />
                  </div>

                  <div className="product-details">
                    <p className="name"> {item.title}</p>
                    <p className='price'> {Currency.format(item.price)} </p>
                  </div>
                </div>
              </Link>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Search