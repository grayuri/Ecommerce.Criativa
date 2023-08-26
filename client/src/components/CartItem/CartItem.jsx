import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

import './CartItem.scss'
import Currency from '../../utils/Currency';
import QuantityButtons from '../QuantityButton/QuantityButtons';
import { removeItem } from '../../redux/cartReducer';
// import inTheCart from '../../utils/inTheCart';

const CartItem = ({products}) => {

  const dispatch = useDispatch()

  const removingItemFromCart = (id) => {
    // let itemIndex = inTheCart.indexOf(id)
    // inTheCart.splice(itemIndex, 1)
    dispatch(removeItem(id))
  }

  return (
    <div className='cart-products'>
      {
        products.map(item => (
          <div className="cart-product" key={item.id}>
            <div className="image-container">
              <img src={import.meta.env.VITE_REACT_APP_UPLOAD_URL + item.image} alt="product-image" />
            </div>
            <div className="product-details">
              <Link to="/product/1" className="link">
                <p className="name"> {item.title}</p>
              </Link>
              {/* 
              <div className="quantity-buttons">
                <QuantityButtons quantities={item.quantity}/>
              </div> 
              */}
              <div className="text">
                <span>{item.quantity}</span>
                <span> x </span>
                <span>{Currency.format(item.price)}</span>
                <span>: </span>
                <span>{Currency.format(item.price * item.quantity)}</span>
              </div>
            </div>
            <div className="remove-product">
              <CloseOutlinedIcon cursor="pointer" onClick={() => removingItemFromCart(item.id)} />
            </div>
          </div>
          ))
        }
    </div>
  )
}
export default CartItem