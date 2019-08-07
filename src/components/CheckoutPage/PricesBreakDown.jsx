import React from 'react'
import fullfiled from '../../images/assurances/fullfiled.png'
import '../../styles/components/PricesBreakDown.scss'

const PricesBreakDown = props => {
  return (
    <div className='PricesBreakDown'>
      <div className='PricesBreakDown-subtotal PricesBreakDown--general'>
        <span className='PricesBreakDown-subtotal-title'>Subtotal:</span>
        {/* Price must be dynamic */}
        <span className='PricesBreakDown-subtotal-value'>$960.0</span>
      </div>
      <div className='PricesBreakDown-savings PricesBreakDown--general'>
        <span className='PricesBreakDown-savings-title'>Discount:</span>
        {/* Price must be dynamic */}
        <span className='PricesBreakDown-savings-value'>$210.0</span>
      </div>
      <div className='PricesBreakDown-tax PricesBreakDown--general'>
        <span className='PricesBreakDown-tax-title'>Tax:</span>
        {/* Price must be dynamic */}
        <span className='PricesBreakDown-tax-value'>$0.0</span>
      </div>
      <div className='PricesBreakDown-shipping PricesBreakDown--general'>
        <span className='PricesBreakDown-shipping-title'>Shipping:</span>
        {/* Price must be dynamic */}
        <span className='PricesBreakDown-shipping-value'>
          $0.0
          <img src={fullfiled} alt='fullfiled-assurance' />
        </span>
      </div>
      <div className='PricesBreakDown-total PricesBreakDown--general'>
        <span className='PricesBreakDown-total-title'>Total:</span>
        {/* Price must be dynamic */}
        <span className='PricesBreakDown-total-value'>$750.0
          {/* This must be dynamic coz of uncertainty in delivery charge */}
        </span>
      </div>
    </div>
  )
}
 
export default PricesBreakDown;