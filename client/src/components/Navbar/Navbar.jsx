import React, { useState } from 'react';
import {Link} from 'react-router-dom'
import { useSelector } from 'react-redux';
import Headroom from 'react-headroom'
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

import './Navbar.scss'
import Cart from '../Cart/Cart'
import Search from '../Search/Search'

const Navbar = () => {
  const [showCart, setShowCart] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const products = useSelector(state => state.cart.products)

  return (
    <>
      <Headroom className='hdr'>
        <nav className="navbar">
          <div className="wrapper">
            <div className="left">
              <Link to="/" onClick={() => window.scrollTo(0, 0)}>
                <img className="logo" src="/images/logo.png" alt="logo" />
              </Link>
            </div>
          
            <div className="right">
              <div className="icons">
                <SearchIcon 
                  cursor="pointer" 
                  onClick={(e) => setShowSearch(true)}
                  sx={{
                    width: '32px',
                    height: '32px'
                  }}
                />
                
                <div className="cartIcon">
                  <ShoppingCartOutlinedIcon 
                    cursor="pointer" 
                    onClick={(e) => setShowCart(true)}
                    sx={{
                      width: '32px',
                      height: '32px'
                    }}
                  />
                  <span>{products.length}</span>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </Headroom>
      {showCart && <Cart setShowCart={setShowCart} />}
      {showSearch && <Search setShowSearch={setShowSearch} />}
    </>
  )
}

export default Navbar