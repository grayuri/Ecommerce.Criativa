import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './Card.scss'
import Currency from '../../utils/Currency.ts'
import { addToCart } from '../../redux/cartReducer'
// import inTheCart from '../../utils/inTheCart'

const Card = ({ item }) => {
  const [favorite, setFavorite] = useState(false)
  // const [alreadyInCart, setAlreadyInCart] = useState(false)

  const dispatch = useDispatch()

  const productsInCart = useSelector(state => state.cart.idsInCart)
  
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

  const getDiscount = (price, oldPrice) => {
    let percent = price / oldPrice
    let discount = (1 - percent) * 100
    let discountFormated = discount.toFixed(0)

    return discountFormated
  }

  const addingToCart = () => {

    // if(!inTheCart.includes(item.id) === true) {
    // setAlreadyInCart(true)
    // inTheCart.push(item.id)
    
    if (!productsInCart.includes(item.id)) {
      addedToCartNotify()
    }
    else {
      alreadyInCartNotify()
    }
    
    return (
      dispatch(addToCart({
        id: item?.id,
        title: item?.attributes?.title,
        price: item?.attributes?.price,
        image: item?.attributes.image.data.attributes.url,
        quantity: 1
      }))
    )
    // } 
    // else {
    //   return // Toast
    // }
  }

  return (
    <div className="card">
      <div className="product-image">
        {/* {item?.attributes.isNew === true && <div className='new-tag'>Novo</div>} */}
        {/* <span className='favorite-icons'>
          {
            favorite == false 
            ? <FavoriteBorderIcon className='not-favorite'
              onClick={() => setFavorite(true)}
              sx={{ width: '32px', height: '32px' }}
            />
            : <FavoriteIcon className='favorite'
              onClick={() => setFavorite(false)}
              sx={{ width: '32px', height: '32px' }}
            />
          }
        </span> */}
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

        <Link className='link' onClick={() => window.scrollTo(0, 0)} to={`/product/${item.id}`}>
          <img src={
            import.meta.env.VITE_REACT_APP_UPLOAD_URL + item.attributes?.image?.data?.attributes?.url
          } alt="product-image" />
        </Link>
      </div>

      <Link className='link' onClick={() => window.scrollTo(0, 0)} to={`/product/${item.id}`}>
        <h2> {item?.attributes.title}</h2>
      </Link>
      <div className="price">
        {
          item?.attributes.oldPrice > item?.attributes.price
          && <span className="old-price">{Currency.format(item?.attributes.oldPrice)}</span>
        }

        <span className="current-price">{Currency.format(item?.attributes.price)}</span>

        {
          item?.attributes.oldPrice > item?.attributes.price
          && <span className="discount-tag">{getDiscount(item?.attributes.price, item?.attributes.oldPrice) + '%'}</span>
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