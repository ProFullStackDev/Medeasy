import React from 'react'
import UpdatePillQuantity from '../components/UpdatePillQuantity'
import '../styles/pages/ShoppingCartPage.scss'

const ShoppingCartPage = props => {
  return (
    <div className='ShoppingCartPage'>
      <UpdatePillQuantity />
    </div>
  )
}

export default ShoppingCartPage