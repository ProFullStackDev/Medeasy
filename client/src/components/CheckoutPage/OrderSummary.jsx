import React, { useState } from 'react'
import '../../styles/components/OrderSummary.scss'

// Components
import OrderPillListItem from './OrderPillListItem'
import CustomButton from '../CustomButton'
import CustomFormElement from '../CustomFormElement'
import PricesBreakDown from '../CheckoutPage/PricesBreakDown'

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