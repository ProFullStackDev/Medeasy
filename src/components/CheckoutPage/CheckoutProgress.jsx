import React from 'react'
import '../../styles/components/CheckoutProgress.scss'

const CheckoutProgress = ({ stepNumber }) => {
  return (
    <div className="CheckoutProgress" style={{ maxWidth: stepNumber === 4 ? '100%' : '60rem' }}>
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
        <h3 className='title1 title'>Account</h3>
        <h3 className='title2 title'>Billing & Shipping</h3>
        <h3 className='title3 title'>Payment</h3>
        <h3 className='title4 title'>Review</h3>
      </div>
    </div>
  )
}

export default CheckoutProgress