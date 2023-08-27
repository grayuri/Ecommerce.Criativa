import React, { useState, useRef } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './Product.scss';
import RelatedProducts from '../../components/RelatedProducts/RelatedProducts';
import Currency from '../../utils/Currency';
import { addToCart } from '../../redux/cartReducer';
import { allProducts } from '../../../../warehouse/allProducts';

const Product = () => {
  const id = useParams().id
  const [quantity, setQuantity] = useState(1)

  const dispatch = useDispatch()

  const productsInCart = useSelector(state => state.cart.idsInCart)

  const filteredProduct = allProducts.filter(product => product.id == id)

  const specificProduct = filteredProduct[0]

  const getCategoryName = (category) => {
    let categoryName = ''

    switch (category) {
      case 'cosmetics':
        categoryName = 'Cosméticos'
        return categoryName
        break
      case 'eletronics':
        categoryName = 'Eletrônicos'
        return categoryName
        break
      case 'stationary':
        categoryName = 'Papelaria'
        return categoryName
        break
      case 'toys':
        categoryName = 'Brinquedos'
        return categoryName
        break
      case 'utilities':
        categoryName = 'Utilidades'
        return categoryName
        break
    }
  }

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

  const decrementQuantity = () => {
    if (quantity === 1) return
    return setQuantity(quantity => quantity - 1)
  }

  const incrementQuantity = () => {
    return setQuantity(quantity => quantity + 1)
  }

  const getDiscount = (price, oldPrice) => {
    let percent = price / oldPrice
    let discount = (1 - percent) * 100
    let discountFormated = discount.toFixed(0)

    return discountFormated
  }

  const addingToCart = () => {
    if (!productsInCart.includes(specificProduct.id)) {
      addedToCartNotify()
    }
    else {
      alreadyInCartNotify()
    }

    return (
      dispatch(addToCart({
        id: specificProduct.id,
        title: specificProduct.title,
        price: specificProduct.price,
        image: specificProduct.image,
        quantity
      }))
    )
  }

  return (
    <div className="product-page">
      <div className='product-details'>
        <div className="left">
          <img src={specificProduct.image} alt="product-image" />
        </div>

        <div className="right">
          <h1 className='product-title'>
            {specificProduct.title}
          </h1>

          <div className="product-price">
            {
              specificProduct.oldPrice > specificProduct.price
              ? (
                <>
                  <span className="old-price"> {Currency.format(specificProduct.oldPrice)} </span>
                  <span className="current-price"> {Currency.format(specificProduct.price)} </span>
                  <span className="discount-tag"> {getDiscount(specificProduct.price, specificProduct.oldPrice)}%</span>
                </>
              )
              : (
                <span className="current-price"> {Currency.format(specificProduct.price)} </span>
              )
            }
          </div>

          <div className="add-to-cart-buttons">
            <div className="quantity">
              <button onClick={(e) => decrementQuantity()}>-</button>
              <button>{quantity}</button>
              <button onClick={(e) => incrementQuantity()}>+</button>
            </div>

            <div className="add-to-cart" onClick={() => addingToCart()}>
              <AddShoppingCartIcon />
              Adicionar ao Carrinho
            </div>

            <ToastContainer
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
          </div>

          <p className="product-description" dangerouslySetInnerHTML={{__html: specificProduct.description}}></p>

          <hr />

          <div className="category-information">
            <span>Categoria: </span>
            <span>{getCategoryName(specificProduct.category)}</span>
          </div>
        </div>
      </div>

      <RelatedProducts id={specificProduct.id} subcategory={specificProduct.subcategory} category={specificProduct.category} />
    </div>
  )
}

export default Product