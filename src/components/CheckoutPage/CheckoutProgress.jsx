import React from 'react'
import '../../styles/components/CheckoutProgress.scss'

const CheckoutProgress = ({ stepNumber }) => {
  return (
    <div className="CheckoutProgress">
      <div className="lines">
        <div className={`line1 ${stepNumber === 2 || stepNumber === 3 || stepNumber === 4 ? 'progressed' : '' }`}></div>
        <div className={`line2 ${stepNumber === 3 || stepNumber === 4 ? 'progressed' : '' }`}></div>
        <div className={`line3 ${stepNumber === 4 ? 'progressed' : '' }`}></div>
      </div>
      <div className="circles">
        <div className={`circle ${stepNumber === 1 || stepNumber === 2 || stepNumber === 3 || stepNumber === 4 ? 'progressed' : '' }`}></div>
        <div className={`circle ${stepNumber === 2 || stepNumber === 3 || stepNumber === 4 ? 'progressed' : '' }`}></div>
        <div className={`circle ${stepNumber === 3 || stepNumber === 4 ? 'progressed' : '' }`}></div>
        <div className={`circle ${stepNumber === 4 ? 'progressed' : '' }`}></div>
      </div>
      <div className="titles">
        <h3 className='title1'>Account</h3>
        <h3 className='title2'>Billing & Shipping</h3>
        <h3 className='title3'>Payment</h3>
        <h3 className='title4'>Review</h3>
      </div>
    </div>
  )
}

export default CheckoutProgress