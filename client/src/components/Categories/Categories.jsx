import React from 'react';
import { Link } from 'react-router-dom';

import './Categories.scss'

const Categories = () => {
  return (
    <div className='categories'>
      <div className="icons">
        <Link className='link' to='/products/brinquedos' onClick={() => window.scrollTo(0, 0)}>
          <img src="/icons/toys-icon.jpg" alt="toys-icon" />
          <span>Brinquedos</span>
        </Link>
      </div>

      <div className="icons">
        <Link className='link' to='/products/cosméticos' onClick={() => window.scrollTo(0, 0)}>
          <img src="/icons/cosmetics-icon.jpg" alt="cometics-icon" />
          <span>Cosméticos</span>
        </Link>
      </div>

      <div className="icons">
        <Link className='link' to='/products/eletrônicos' onClick={() => window.scrollTo(0, 0)}>
          <img src="/icons/eletronics-icon.jpg" alt="eletronics-icon" />
          <span>Eletrônicos</span>
        </Link>
      </div>

      <div className="icons">
        <Link className='link' to='/products/papelaria' onClick={() => window.scrollTo(0, 0)}>
          <img src="/icons/stationary-icon.jpg" alt="stationary-icon" />
          <span>Papelaria</span>
        </Link>
      </div>
      
      <div className="icons">
        <Link className='link' to='/products/utilidades' onClick={() => window.scrollTo(0, 0)}>
          <img src="/icons/utilities-icon.jpg" alt="utilities-icon" />
          <span>Utilidades</span>
        </Link>
      </div>
    </div>
  )
}

export default Categories