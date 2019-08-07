import React, { useState } from 'react'
import '../../styles/OrderSummary.scss'
import OrderPillListItem from './OrderPillListItem'
import CustomButton from '../CustomButton'
import fullfiled from '../../images/assurances/fullfiled.png'
// Dummy data for cart
import tablet1 from '../../images/tablet1.png'
import tablet4 from '../../images/tablet4.png'
import tablet5 from '../../images/tablet5.png'
const dummyCartProducts = [
  {
    id: 1,
    tabletImage: tablet1,
    tabletName: 'Ambien',
    distributor: 'Sanofi Aventis Ltd',
    selectedDosage: 5,
    quantity: 50,
    discountedPrice: '$300',
    originalPrice: '$360'
  },
  {
    id: 2,
    tabletImage: tablet4,
    tabletName: 'Modalert',
    distributor: 'Pfizer Ltd',
    selectedDosage: 10,
    quantity: 50,
    discountedPrice: '$250',
    originalPrice: '$300'
  },
  {
    id: 3,
    tabletImage: tablet5,
    tabletName: 'Painsoma',
    distributor: 'Parke Davis Ltd',
    selectedDosage: 10,
    quantity: 150,
    discountedPrice: '$200',
    originalPrice: '$300'
  }
]

const OrderSummary = props => {
  const [couponCode, setCouponCode] = useState('')
  const handleChange = event => setCouponCode(event.target.value)
  return (
    <div className='OrderSummary'>
      <p className='OrderSummary__title'>Order Summary</p>
      <div className='OrderSummary__allproducts'>
        { dummyCartProducts.map(product => <OrderPillListItem product={product} key={product.id} />) }
      </div>
      <div className='OrderSummary__coupon'>
        <p className='OrderSummary__coupon-title'>Discount / Coupon Code</p>
        <form className='OrderSummary__coupon-form' onSubmit={() => console.log('Do something here')}>
          <input type='text' onChange={handleChange} value={couponCode} />
          <CustomButton isSubmitButton fontSize='1.8rem'>Apply</CustomButton>
        </form>
      </div>
      <div className='OrderSummary__prices'>
        <div className='OrderSummary__prices-subtotal OrderSummary__prices--general'>
          <span className='OrderSummary__prices-subtotal-title'>Subtotal:</span>
          {/* Price must be dynamic */}
          <span className='OrderSummary__prices-subtotal-value'>$960.0</span>
        </div>
        <div className='OrderSummary__prices-savings OrderSummary__prices--general'>
          <span className='OrderSummary__prices-savings-title'>Discount:</span>
          {/* Price must be dynamic */}
          <span className='OrderSummary__prices-savings-value'>$210</span>
        </div>
        <div className='OrderSummary__prices-tax OrderSummary__prices--general'>
          <span className='OrderSummary__prices-tax-title'>Tax:</span>
          {/* Price must be dynamic */}
          <span className='OrderSummary__prices-tax-value'>$0.0</span>
        </div>
        <div className='OrderSummary__prices-shipping OrderSummary__prices--general'>
          <span className='OrderSummary__prices-shipping-title'>Discount:</span>
          {/* Price must be dynamic */}
          <span className='OrderSummary__prices-shipping-value'>
            $0.0
            <img src={fullfiled} alt='fullfiled-assurance' />
          </span>
        </div>
        <div className='OrderSummary__prices-total OrderSummary__prices--general'>
          <span className='OrderSummary__prices-total-title'>You Pay:</span>
          {/* Price must be dynamic */}
          <span className='OrderSummary__prices-total-value'>$750.0
            {/* This must be dynamic coz of uncertainty in delivery charge */}
          </span>
        </div>
      </div>
    </div>
  )
}

export default OrderSummary