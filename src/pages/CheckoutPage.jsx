import React from 'react'
import CheckoutProgress from '../components/CheckoutPage/CheckoutProgress'
import OrderSummary from '../components/CheckoutPage/OrderSummary'
import '../styles/pages/CheckoutPage.scss'
const CheckoutPage = props => {
  return (
    <div className='CheckoutPage'>
      <div className='CheckoutPage__left'>
        <CheckoutProgress stepNumber={2} />
      </div>
      <div className='CheckoutPage__right'>
        <OrderSummary />
      </div>
    </div>
  )
}

export default CheckoutPage