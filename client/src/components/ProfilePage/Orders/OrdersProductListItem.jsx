import React from 'react'
import CustomButton from '../../CustomButton'
import '../../../styles/components/OrdersProductListItem.scss'

const OrdersProductListItem = ({ product }) => {
  return (
    <div className='OrdersProductListItem'>
      <div className='OrdersProductListItem-details'>
        <img alt='product' src={ product.image }/>
        <div>
          <span style={{ fontSize: '1.4rem', fontWeight: 'bold' }}>{`${product.name}`}</span>
          <span style={{ fontSize: '1.2rem' }}>{` ${product.dosage}`}</span>
          <p style={{ fontSize: '1.2rem', color: '#7AC7B8' }}>{ product.distributor }</p>
          <p style={{ fontSize: '1.4rem' }}>{`${product.quantity} Pills`}</p>
        </div>
      </div>
      <div className='OrdersProductListItem-price'>
        <span style={{ fontSize: '1.6rem', marginBottom: '.2rem' }}>${product.price}</span>
        <CustomButton fontSize='1.2rem' specialBgColor='#F8931A'>Track Package</CustomButton>
      </div>
    </div>
  )
}

export default OrdersProductListItem