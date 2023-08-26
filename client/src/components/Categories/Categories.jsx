import React from 'react';
import { Link } from 'react-router-dom';

import './Categories.scss'
// import {useFetch} from '../../hooks/useFetch.js';

const Categories = () => {
  // const {data, loading, error} = useFetch(`/products?populate=*&[filters][categories][id]=${categorieId}`)

  return (
    <div className='categories'>
      <div className="icons">
        <Link className='link' to='/products/4' onClick={() => window.scrollTo(0, 0)}>
          <img src="/icons/toys-icon.jpg" alt="toys-icon" />
          <span>Brinquedos</span>
        </Link>
      </div>
      <div className="icons">
        <Link className='link' to='/products/1' onClick={() => window.scrollTo(0, 0)}>
          <img src="/icons/cosmetics-icon.jpg" alt="cometics-icon" />
          <span>Cosméticos</span>
        </Link>
      </div>
      <div className="icons">
        <Link className='link' to='/products/2' onClick={() => window.scrollTo(0, 0)}>
          <img src="/icons/eletronics-icon.jpg" alt="eletronics-icon" />
          <span>Eletrônicos</span>
        </Link>
      </div>
      <div className="icons">
        <Link className='link' to='/products/3' onClick={() => window.scrollTo(0, 0)}>
          <img src="/icons/stationary-icon.jpg" alt="stationary-icon" />
          <span>Papelaria</span>
        </Link>
      </div>
      <div className="icons">
        <Link className='link' to='/products/5' onClick={() => window.scrollTo(0, 0)}>
          <img src="/icons/utilities-icon.jpg" alt="utilities-icon" />
          <span>Utilidades</span>
        </Link>
      </div>
    </div>
  )
}

export default Categories