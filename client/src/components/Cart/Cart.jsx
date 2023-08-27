import React, {useState} from 'react'
import { useSelector } from 'react-redux'
import CloseIcon from '@mui/icons-material/Close';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import NotificationImportantOutlinedIcon from '@mui/icons-material/NotificationImportantOutlined';

import './Cart.scss'
import CartItem from '../CartItem/CartItem';
import Currency from '../../utils/Currency';
import OrderForm from '../OrderForm/OrderForm';

const Cart = ({ setShowCart }) => {
  const [showOrderForm, setShowOrderForm] = useState(false)

  const products = useSelector(state => state.cart.products)

  return (
    <>
      <div className='cart-panel'>
        <div className="opac-layer" onClick={() => setShowCart(false)}></div>
        <div className="cart-content">
          <div className="cart-header">
            <span className="close-button">
              <CloseIcon
                cursor="pointer"
                sx={{
                  width: '32px',
                  height: '32px'
                }}
                onClick={() => setShowCart(false)}
              />
            </span>
            <span className="header-title">
              <ShoppingCartOutlinedIcon
                sx={{
                  width: '32px',
                  height: '32px'
                }}
              />
              <span>CARRINHO</span>
            </span>
          </div>

          {
            products.length === 0
              ? (
                <div className="empty-cart">
                  <NotificationImportantOutlinedIcon
                    sx={{
                      width: '32px',
                      height: '32px'
                    }}
                  />
                  <p>O seu carrinho está vazio no momento.</p>
                  <button onClick={() => setShowCart(false)}>Volte para a Loja</button>
                </div>
              )
              : (
                <>
                  {
                    <CartItem products={products} setShowCart={setShowCart} />  
                  }

                  <div className="cart-footer">
                    <div className="subtotal">
                      <h1 className="text">Subtotal:</h1>
                      <div className="text total">
                        {
                          Currency.format(products.reduce((accum, product) => accum + (product.price * product.quantity), 0))
                        }
                      </div>
                    </div>
                    <button className="checkout-button" onClick={() => setShowOrderForm(true)}>
                      FINALIZAR PEDIDO
                    </button>
                  </div>
                </>
              )
          }
        </div>
      </div>

      {
        showOrderForm === true && (<OrderForm products={products} setShowOrderForm={setShowOrderForm} />)
      }
    </>
  )
}

export default Cart