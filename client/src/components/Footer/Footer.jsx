import React from 'react'
import {Link} from 'react-router-dom'
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';

import './Footer.scss'


const Footer = () => {

  const getWhatsappUrl = () => {
    return window.location.href = 'https://wa.me/send/?phone=5581984269986'
  } 
  
  const getInstagramUrl = () => {
    return window.location.href = 'https://www.instagram.com/papelariacriativa_gaibu/'
  }
  
  // const getFacebookUrl = () => {
  //   return window.location.href = 
  // }

  return (
    <div className='footer'>
      <div className="top">
        <div className="item">
          <h1>Categorias</h1>
          <Link className='link' to="/products/4" onClick={() => window.scrollTo(0, 0)}>
            <span>Brinquedos</span>
          </Link>
          <Link className='link' to="/products/1" onClick={() => window.scrollTo(0, 0)}>
            <span>Cosméticos</span>
          </Link>
          <Link className='link' to="/products/2" onClick={() => window.scrollTo(0, 0)}>
            <span>Eletrônicos</span>
          </Link>
          <Link className='link' to="/products/3" onClick={() => window.scrollTo(0, 0)}>
            <span>Papelaria</span>
          </Link>
          <Link className='link' to="/products/5" onClick={() => window.scrollTo(0, 0)}>
            <span>Utilidades</span>
          </Link>
        </div>
        <div className="item">
          <h1>Sobre Nós</h1>
          <span className='aboutSpan'>
            Sendo referência local por meio da nossa lojinha física, decidimos nos aventurar em meio as ilimitadas fronteiras virtuais para assim alcançar não somente um maior público, mas para também sermos responsáveis pela satisfação e felicidade de todos os nossos clientes. Fique à vontade para visualizar o nosso catálogo.
          </span>
        </div>
        <div className="item">
          <h1>Contato</h1> 
          <div className="socialMediaIcons">
            <WhatsAppIcon 
              cursor="pointer" 
              sx={{width: '32px', height: '32px'}} 
              onClick={() => getWhatsappUrl()}
            />
            {/* <FacebookIcon 
              cursor="pointer" 
              sx={{width: '32px', height: '32px'}} 
              onClick={() => getFacebookUrl()}
            /> */}
            <InstagramIcon 
              cursor="pointer" 
              sx={{width: '32px', height: '32px'}} 
              onClick={() => getInstagramUrl()}
            />
          </div>
        </div>
      </div>
      <div className="bottom">
        <div className="rightsReserved">
          <img src="/images/logo.png" alt="logo" />
          <span>© Copyright 2023. All rights reserved.</span>
        </div>

        <img className="payments" src="/images/payments-footer.png" alt="payments-image" />
      </div>
    </div>
  )
}

export default Footer