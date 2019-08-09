import React from 'react'
import '../../styles/components/PaymentType.scss'

const PaymentType = ({ type, paymentImage, name, onClick, active }) => {
  const handleClick = (event) => onClick(event.target.closest('.PaymentType').dataset.type)
  return (
    <div data-type={type} className={`PaymentType ${ active ? 'activeType' : '' }`} onClick={handleClick}>
      <img src={paymentImage} className='PaymentType__image' alt='paymenttype' />
      <p style={{ fontSize: '1.2rem' }} className='PaymentType__name'>{ name }</p>
    </div>
  )
}
 
export default PaymentType;