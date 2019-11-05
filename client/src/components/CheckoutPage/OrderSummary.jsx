import React, { useState } from 'react'
import '../../styles/components/OrderSummary.scss'

// Components
import OrderPillListItem from './OrderPillListItem'
import CustomButton from '../CustomButton'
import CustomFormElement from '../CustomFormElement'
import PricesBreakDown from '../CheckoutPage/PricesBreakDown'

const dummyCartProducts = []

const OrderSummary = ({ updateModalState }) => {
  // Coupon code state and making a controlled component
  const [couponCode, setCouponCode] = useState('')
  const handleChange = event => setCouponCode(event.target.value)
  return (
    <div className='OrderSummary'>
      <p className='OrderSummary__title'>Order Summary</p>
      <div className='OrderSummary__allproducts'>
        { dummyCartProducts.map(product => <OrderPillListItem updateModalState={updateModalState} product={product} key={product.id} />) }
      </div>
      <div className='OrderSummary__coupon'>
        <p className='OrderSummary__coupon-title'>Discount / Coupon Code</p>
        <form className='OrderSummary__coupon-form' onSubmit={() => console.log('Do something here')}>
          <CustomFormElement noStyle noLabel type='text' onChange={handleChange} value={couponCode} />
          <CustomButton isSubmitButton fontSize='1.8rem'>Apply</CustomButton>
        </form>
      </div>
      { /* Here the total price should come */ }
      <PricesBreakDown />
    </div>
  )
}

export default OrderSummary