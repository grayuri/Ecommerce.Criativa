import React from 'react'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useDispatch } from 'react-redux';

import './Card.scss'
import Currency from '../../utils/Currency.ts'
import { addToCart } from '../../redux/cartReducer'

const Card = ({ item, addedToCartNotify, alreadyInCartNotify}) => {
  const dispatch = useDispatch()

  const productsInCart = useSelector(state => state.cart.idsInCart)
  
  

  const getDiscount = (price, oldPrice) => {
    let percent = price / oldPrice
    let discount = (1 - percent) * 100
    let discountFormated = discount.toFixed(0)

    return discountFormated
  }

  const addingToCart = () => {
    if (!productsInCart.includes(item.id)) {
      addedToCartNotify()
    }
    else {
      alreadyInCartNotify()
    }
    return (
      dispatch(addToCart({
        id: item.id,
        title: item.title,
        price: item.price,
        image: item.image,
        quantity: 1
      }))
    )
  }

  return (
    <div className="card">
      <div className="product-image">

        <Link className='link' onClick={() => window.scrollTo(0, 0)} to={`/product/${item.id}`}>
          <img src={item.image} alt="product-image" />
        </Link>
      </div>

      <Link className='link' onClick={() => window.scrollTo(0, 0)} to={`/product/${item.id}`}>
        <h2> {item.title}</h2>
      </Link>
      <div className="price">
        {
          item.oldPrice > item.price
          && <span className="old-price">{Currency.format(item.oldPrice)}</span>
        }

        <span className="current-price">{Currency.format(item.price)}</span>

        {
          item.oldPrice > item.price
          && <span className="discount-tag">{getDiscount(item.price, item.oldPrice) + '%'}</span>
        }
      </div>
      <div className="button-to-cart" onClick={() => addingToCart()}>
        <AddShoppingCartIcon />
        CARRINHO
      </div>
    </div>
  )
}

export default Card