import React from 'react'
import '../styles/components/PaymentBrands.scss'

import cardTouch from '../images/cardtouch.png'
import masterCard from '../images/mastercard.png'
import visa from '../images/visa.png'
import discover from '../images/discover.png'
import bitcoin from '../images/bitcoin.png'
import americanExpress from '../images/american.png'

const PaymentBrands = props => {
  return (
    <div className='PaymentBrands'>
      <img className='PaymentBrands__cardTouch' src={cardTouch} alt='card-touch' />
      <div className='PaymentBrands__cards'>
        <h1 className='PaymentBrands__cards--title' style={ { fontSize: 40, fontWeight: 'normal' }}>Buy Easy, Pay Easy. We Accept</h1>
        <div className='PaymentBrands__cards--images'>
          <img className='PaymentBrands__cards--images--1' src={masterCard} alt='mastercard' />
          <img className='PaymentBrands__cards--images--2' src={americanExpress} alt='american-express' />
          <img className='PaymentBrands__cards--images--3' src={visa} alt='visa' />
          <img className='PaymentBrands__cards--images--4' src={discover} alt='discover' />
          <img className='PaymentBrands__cards--images--5' src={bitcoin} alt='bitcoin' />
        </div>
      </div>
    </div>
  )
}
 
export default PaymentBrands;