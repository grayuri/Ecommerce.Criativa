import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './Product.scss';
import RelatedProducts from '../../components/RelatedProducts/RelatedProducts';
import useFetch from '../../hooks/useFetch';
import Currency from '../../utils/Currency';
import { addToCart } from '../../redux/cartReducer';
// import inTheCart from '../../utils/inTheCart';

const Product = () => {
  const id = useParams().id
  const [favorite, setFavorite] = useState(false)
  const [quantity, setQuantity] = useState(1)

  const dispatch = useDispatch()

  const productsInCart = useSelector(state => state.cart.idsInCart)

  const { data, loading, error } = useFetch(
    `/products/${id}?populate=*`
  )

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
    if (!productsInCart.includes(data.id)) {
      addedToCartNotify()
    }
    else {
      alreadyInCartNotify()
    }

    return (
      dispatch(addToCart({
        id: data?.id,
        title: data?.attributes?.title,
        price: data?.attributes?.price,
        image: data?.attributes.image.data.attributes.url,
        quantity
      }))
    )
  }

  return (
    <div className="product-page">
      <div className='product-details'>
        <div className="left">
          <img src={
            import.meta.env.VITE_REACT_APP_UPLOAD_URL + data?.attributes?.image?.data?.attributes?.url
          } alt="product-image" />
        </div>
        <div className="right">
          <h1 className='product-title'>
            {data?.attributes?.title}
          </h1>
          <div className="product-price">
            {
              data?.attributes?.oldPrice > data?.attributes?.price
                ? (
                  <>
                    <span className="old-price"> {Currency.format(data?.attributes?.oldPrice)} </span>
                    <span className="current-price"> {Currency.format(data?.attributes?.price)} </span>
                    <span className="discount-tag"> {
                      getDiscount(data?.attributes?.price, data?.attributes?.oldPrice)}%
                    </span>
                  </>
                )
                : (
                  <span className="current-price"> {Currency.format(data?.attributes?.price)} </span>
                )
            }
          </div>
          <p className="product-description">
            {data?.attributes?.description}
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi quidem id, corporis dolorum dolores expedita possimus accusamus laboriosam voluptas minima omnis libero, sapiente tenetur totam fugit dolore unde! Porro, atque. <br />
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Optio iure numquam deleniti beatae aspernatur? Porro, quos eveniet unde cumque quo voluptate corrupti optio eaque illo sit sint alias et ex.
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores nesciunt accusamus exercitationem placeat consectetur earum commodi fugiat assumenda minima? Modi veniam ad blanditiis praesentium perferendis aut distinctio voluptate velit quis.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam cum deserunt ex velit? Fugit fugiat unde maxime. Quas illum, qui, ad minus, libero non quia omnis doloribus excepturi similique ex.
          </p>
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

          {/* <div className="wishlist-button">
            {
              favorite == false
                ? <FavoriteBorderIcon className='not-favorite'
                  onClick={() => setFavorite(true)}
                  cursor="pointer"
                  sx={{ width: '32px', height: '32px' }}
                />
                : <FavoriteIcon className='favorite'
                  onClick={() => setFavorite(false)}
                  cursor="pointer"
                  sx={{ width: '32px', height: '32px' }}
                />
            }
            Adicionar aos Favoritos
          </div> */}

          <hr />
          <div className="category-information">
            <span>Categoria: </span>
            <span>{data?.attributes?.type}</span>
          </div>
          {/* <div className="share-product">
            <span>Compartilhar: </span>
            <div className="social-media-icons">
              <WhatsAppIcon cursor="pointer" onClick={() => getWhatsappUrl()} />
              <FacebookIcon cursor="pointer" />
              <InstagramIcon cursor="pointer" onClick={() => getInstagramUrl()} />
            </div>
          </div> */}
        </div>
      </div>
      <RelatedProducts />
    </div>
  )
}

export default Product