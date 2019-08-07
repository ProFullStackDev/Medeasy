import React, { useState } from 'react'
import '../styles/pages/ShoppingCartPage.scss'
// components
import UpdateModal from '../components/UpdateModal'
import CustomButton from '../components/CustomButton'
import CartList from '../components/ShoppingCartPage/CartList'
// images
import cartLarge from '../images/cartLarge.svg'
import back from '../images/back.svg'
import fullfiled from '../images/assurances/fullfiled.png' // Show this only if the product is fullfiled for free delivery
// Other
import { Link } from 'react-router-dom'

const ShoppingCartPage = ({ changeOverlayState }) => {
  const [isDosageClicked, setIsDosageClicked] = useState(false)
  const [isQuantityClicked, setIsQuantityClicked] = useState(false)
  const updateModalState = type => {
    type === 'quantity' ? setIsQuantityClicked(true) : setIsDosageClicked(true)
    changeOverlayState(true)
  }
  const disableOverlay = () => {
    setIsDosageClicked(false)
    setIsQuantityClicked(false)
    changeOverlayState(false)
  }
  return (
    <div className='ShoppingCartPage'>
      { /* Show modal when update button is clicked */ }
      { isDosageClicked && <UpdateModal disableOverlay={disableOverlay} title='Update Pill Quantity' values={['50 Pills', '100 Pills', '150 Pills', '200 Pills']}/> }
      { isQuantityClicked && <UpdateModal disableOverlay={disableOverlay}  title='Update Dosage' values={['5mg', '10mg']}/> }
      <h1 className='ShoppingCartPage__title'>
        <img className='ShoppingCartPage__title--img' src={cartLarge} alt='cart-large'/> 
        <span className='ShoppingCartPage__title--name'>Shopping Cart</span>
      </h1>
      <div className='ShoppingCartPage__main'>
        <CartList decideModalState={updateModalState}/>
        <div className='ShoppingCartPage__main--price'>
          <div className='ShoppingCartPage__main--price-subtotal ShoppingCartPage__main--general'>
            <span className='ShoppingCartPage__main--price-subtotal-title'>Subtotal:</span>
            {/* Price must be dynamic */}
            <span className='ShoppingCartPage__main--price-subtotal-value' style={{ fontSize: '2.5rem' }}>$960</span>
          </div>
          <div className='ShoppingCartPage__main--price-amount ShoppingCartPage__main--general'>
            <span className='ShoppingCartPage__main--price-amount-title'>You Pay:</span>
            {/* Price must be dynamic */}
            <span className='ShoppingCartPage__main--price-amount-value'>$750
              {/* This must be dynamic coz of uncertainty in delivery charge */}
              <img src={fullfiled} alt='fullfiled-assurance' />
            </span>
          </div>
          <div className='ShoppingCartPage__main--price-savings ShoppingCartPage__main--general'>
            <span className='ShoppingCartPage__main--price-savings-title'>You Save:</span>
            {/* Price must be dynamic */}
            <span className='ShoppingCartPage__main--price-savings-value' style={{ fontSize: '2.5rem' }}>$210</span>
          </div>
        </div>
        <div className='ShoppingCartPage__main--ctas'>
          <Link to='/' className='ShoppingCartPage__main--ctas-back'>
            <img src={back} alt='back-btn'/>
            <span>Continue Shopping</span>
          </Link>
          <CustomButton fontSize='2.5rem' specialBgColor='#d44a4a'>Clear Cart</CustomButton>
          <Link to='/checkout/account'><CustomButton fontSize='2.5rem'>Checkout</CustomButton></Link>
        </div>
      </div>
    </div>
  )
}

export default ShoppingCartPage