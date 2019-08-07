import React from 'react'
import '../styles/pages/CheckoutPage.scss'
import CheckoutProgress from '../components/CheckoutPage/CheckoutProgress'
const CheckoutPage = props => {
  return (
    <div className='CheckoutPage'>
      <CheckoutProgress stepNumber={2} />
    </div>
  )
}

export default CheckoutPage