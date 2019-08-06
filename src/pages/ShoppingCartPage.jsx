import React from 'react'
import '../styles/pages/ShoppingCartPage.scss'
// components
import UpdatePillQuantity from '../components/UpdatePillQuantity'
import CustomButton from '../components/CustomButton'
import CartList from '../components/ShoppingCartPage/CartList'
// images
import cartLarge from '../images/cartLarge.svg'
import back from '../images/back.svg'
import fullfiled from '../images/assurances/fullfiled.png' // Show this only if the product is fullfiled for free delivery
// Other
import { Link } from 'react-router-dom'

const ShoppingCartPage = props => {
  return (
    <div className='ShoppingCartPage'>
      <h1 className='ShoppingCartPage__title'>
        <img className='ShoppingCartPage__title--img' src={cartLarge} alt='cart-large'/> 
        <span className='ShoppingCartPage__title--name'>Shopping Cart</span>
      </h1>
      <div className='ShoppingCartPage__main'>
        <CartList />
        <div className='ShoppingCartPage__main--price'>
          <div className='ShoppingCartPage__main--price-subtotal'>
            <span className='ShoppingCartPage__main--price-subtotal-title'>Subtotal:</span>
            {/* Price must be dynamic */}
            <span className='ShoppingCartPage__main--price-subtotal-value'>$960</span>
          </div>
          <div className='ShoppingCartPage__main--price-amount'>
            <span className='ShoppingCartPage__main--price-amount-title'>You Pay:</span>
            {/* Price must be dynamic */}
            <span className='ShoppingCartPage__main--price-amount-value'>$750
              {/* This must be dynamic coz of uncertainty in delivery */}
              <img src={fullfiled} alt='fullfiled-assurance' />
            </span>
          </div>
          <div className='ShoppingCartPage__main--price-savings'>
            <span className='ShoppingCartPage__main--price-savings-title'>You Save:</span>
            {/* Price must be dynamic */}
            <span className='ShoppingCartPage__main--price-savings-value'>$210</span>
          </div>
        </div>
        <div className='ShoppingCartPage__main--ctas'>
          <Link className='ShoppingCartPage__main--ctas-back'>
            <img src={back} alt='back-btn'/>
            <span>Continue Shopping</span>
          </Link>
          <CustomButton fontSize='2.5rem' specialBgColor='#d44a4a'>Clear Cart</CustomButton>
          <CustomButton fontSize='2.5rem'>Checkout</CustomButton>
        </div>
      </div>
    </div>
  )
}

export default ShoppingCartPage