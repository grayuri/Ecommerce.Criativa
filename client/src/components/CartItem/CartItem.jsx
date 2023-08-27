import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

import './CartItem.scss'
import Currency from '../../utils/Currency';
import { removeItem } from '../../redux/cartReducer';

const CartItem = ({products, setShowCart}) => {
  const dispatch = useDispatch()

  const removingItemFromCart = (id) => {
    dispatch(removeItem(id))
  }

  const goToProductPage = (id) => {
    return '/product/' + id
  }

  return (
    <div className='cart-products'>
      {
        products.map(item => (
          <div className="cart-product" key={item.id}>
            <div className="image-container">
              <img src={item.image} alt="product-image" />
            </div>

            <div className="product-details">
              <Link to={goToProductPage(item.id)} className="link" onClick={() => setShowCart(false)}>
                <p className="name"> {item.title}</p>
              </Link>

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