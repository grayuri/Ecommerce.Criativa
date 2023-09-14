import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import CloseIcon from '@mui/icons-material/Close'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './OrderForm.scss'
import Currency from '../../utils/Currency'
import { resetCart } from '../../redux/cartReducer'

const OrderForm = ({ products, setShowOrderForm }) => {
  const [name, setName] = useState('')
  const [street, setStreet] = useState('')
  const [number, setNumber] = useState(0)
  const [neighborhood, setNeighborhood] = useState('')
  const [cep, setCep] = useState(0)
  const [city, setCity] = useState('')

  const dispatch = useDispatch()

  const fillTheFormNotify = () => {
    toast.warn('Por favor, preencha todos os campos!', {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

  const sendOrderToWhatsapp = (e) => {
    let whatsappUrl = 'https://api.whatsapp.com/send?phone=5581984269986&text='

    let templateMessage = `Olá! Meu nome é *${name.toUpperCase()}* e gostaria de fazer-lhe um pedido com os seguintes produtos: %0A%0A`

    products.forEach(item => {
      templateMessage += `.${item.quantity} UN - ${item.title}: ${Currency.format(item.price * item.quantity)} %0A`
    })

    let totalPrice = products.reduce((accum, item) => accum + (item.price * item.quantity), 0)

    templateMessage += `%0A Total: ${Currency.format(totalPrice)}`
    templateMessage += `%0A%0A . . . . . . . . . . . . . . . . . . . . %0A%0A`
    templateMessage += `Poderia informar o valor do frete desses produtos para o meu endereço atual? Listarei-o abaixo:%0A`
    templateMessage += `%0A*Rua:* ${street.toUpperCase()} %0A*Numero:* ${number} %0A*Bairro:* ${neighborhood.toUpperCase()} %0A*CEP:* ${cep} %0A*Cidade:* ${city.toUpperCase()}`


    if (
      name.length !== 0 &&
      street.length !== 0 &&
      number.length !== 0 &&
      neighborhood.length !== 0 &&
      cep.length !== 0 &&
      city.length !== 0
    ) {
      dispatch(resetCart())
      return window.location.href = (whatsappUrl + templateMessage)
    }
    else {
      return fillTheFormNotify()
    }
  }

  return (
    <div className='order-form-panel'>
      <div className="opac-layer" onClick={() => setShowOrderForm(false)}></div>

      <div className='form'>
        <CloseIcon
          className='close-icon'
          cursor="pointer"
          sx={{ width: '32px', height: '32px' }}
          onClick={() => setShowOrderForm(false)}
        />

        <h2>Por favor, Preencha os Campos</h2>

        <div className="fields">
          <div className="input-div">
            <span>Nome:</span>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              required
              placeholder='Insira o seu nome...'
            />
          </div>

          <div className="input-div">
            <span>Rua:</span>
            <input
              type="text"
              onChange={(e) => setStreet(e.target.value)}
              required
              placeholder='Ex.: Rua José Nunes da Silva'
            />
          </div>

          <div className="input-div">
            <span>Número:</span>
            <input
              type="number"
              onChange={(e) => setNumber(e.target.value)}
              required
              placeholder='Insira o número de sua residência...'
            />
          </div>

          <div className="input-div">
            <span>Bairro:</span>
            <input
              type="text"
              onChange={(e) => setNeighborhood(e.target.value)}
              required
              placeholder='Ex.: Cohab'
            />
          </div>

          <div className="input-div">
            <span>CEP:</span>
            <input
              type="number"
              onChange={(e) => setCep(e.target.value)}
              required
              maxLength={9}
              placeholder='Ex.: 54590000'
            />
          </div>

          <div className="input-div">
            <span>Cidade:</span>
            <input
              type="text"
              onChange={(e) => setCity(e.target.value)}
              required
              placeholder='Ex.: Cabo de Santo Agostinho'
            />
          </div>
        </div>

        <button onClick={(e) => sendOrderToWhatsapp()} className='send-button'>ENVIAR</button>

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
    </div>
  )
}

export default OrderForm