import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom'
import CloseIcon from '@mui/icons-material/Close';

import './Search.scss'
import useFetch from '../../hooks/useFetch'
import Currency from '../../utils/Currency'

const Search = ({ setShowSearch }) => {
  const [query, setQuery] = useState("")

  const navigate = useNavigate()

  const onChange = (e) => {
    setQuery(e.target.value)
  }

  let {data, loading, error} = useFetch(`/products?populate=*&filters[title][$contains]=${query}`)

  if(query.length === 0) { data=[] }

  const insertProductLink = (id) => `product/${id}`

  return (
    <div className='search-modal'>
      <div className="form-field">
        <input
          type="text"
          autoFocus
          placeholder='Pesquise algum produto...'
          value={query}
          onChange={onChange}
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
            data.map(item => (
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
                    <img src={
                      import.meta.env.VITE_REACT_APP_UPLOAD_URL + item.attributes.image.data.attributes.url
                    } alt="product-image" />
                  </div>
                  <div className="product-details">
                    <p className="name"> {item.attributes.title}</p>
                    <p className='price'> {Currency.format(item.attributes.price)} </p>
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