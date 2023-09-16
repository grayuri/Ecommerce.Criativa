import React, { useState, useEffect } from 'react'
import {doc, getDoc} from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './Product.scss';
import RelatedProducts from '../../components/RelatedProducts/RelatedProducts';
import Currency from '../../utils/Currency';
import Loader from '../../components/Loader/Loader';
import { addToCart } from '../../redux/cartReducer';
import {db} from '../../firebase-config.js';

const Product = () => {
  const id = useParams().id
  const [loading, setLoading] = useState(false)
  const [product, setProduct] = useState({})
  const [quantity, setQuantity] = useState(1)

  const dispatch = useDispatch()

  const productsInCart = useSelector(state => state.cart.idsInCart)

  useEffect(() => {
    setLoading(true)

    const getProduct = async () => {
      const productReference = doc(db, "products", id)
      const productDoc = await getDoc(productReference).then(
        doc => ({...doc.data(), id: doc.id})
      )
      setProduct(productDoc)
      setLoading(false)
    }

    getProduct()

  },[id])

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
    if (!productsInCart.includes(id)) {
      addedToCartNotify()
    }
    else {
      alreadyInCartNotify()
    }

    return (
      dispatch(addToCart({
        id: id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity
      }))
    )
  }

  return (
    <div className="product-page">
      {
        loading === true
        ? (<Loader sizeOf={124} allSize={true} />)
        : (
          <>
                <div className='product-details'>
              <div className="left">
                <img src={product.image} alt="product-image" />
              </div>

              <div className="right">
                <h1 className='product-title'>
                  {product.title}
                </h1>

                <div className="product-price">
                  {
                    product.oldPrice > product.price
                    ? (
                      <p>
                        <span className="old-price"> {Currency.format(product.oldPrice)}</span>
                        <br/>
                        <span className="current-price"> {Currency.format(product.price)} </span>
                        <span className="discount-tag"> {getDiscount(product.price, product.oldPrice)}%</span>
                      </p>
                    )
                    : (
                      <span className="current-price"> {Currency.format(product.price)} </span>
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

                <p className="product-description" dangerouslySetInnerHTML={{__html: product.description}}></p>

                <hr />

                <div className="category-information">
                  <span>Categoria: </span>
                  <span>{getCategoryName(product.category)}</span>
                </div>
              </div>
            </div>

            <RelatedProducts id={product.id} subcategory={product.subcategory} category={product.category} />
          </>
        )
      }
    </div>
  )
}

export default Product