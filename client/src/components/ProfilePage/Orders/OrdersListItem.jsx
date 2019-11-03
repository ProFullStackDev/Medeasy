import React, { useState } from 'react'
import { ReactComponent as PlusIcon } from '../../../images/plus-icon.svg'
import { ReactComponent as MinusIcon } from '../../../images/minus.svg'
import OrdersProductList from './OrdersProductList'
import '../../../styles/components/OrdersListItem.scss'


const OrdersListItem = ({ order }) => {
  const [expandedMode, setExpandedMode] = useState(false)
  // If the expanded Mode is true then hide all the products and show only the order number
  const markup = (
    expandedMode ? 
      <p style={{ fontSize: '2rem', paddingLeft: '3rem' }} className='OrdersListItem__order-ordernumber'>{`Order #${order.orderNumber}`}</p>
      :
      <React.Fragment>
        <div className='OrdersListItem__order'>
          <p style={{ fontSize: '2rem' }} className='OrdersListItem__order-ordernumber'>{`Order #${order.orderNumber}`}</p>
          <OrdersProductList products={ order.products } />
        </div>
        <div className='OrdersListItem__price'>
          <p className='OrdersListItem__price-value' style={{ color: '4A4A4A', fontSize: '2.2rem' }}>{`$${order.invoiceValue}`}</p>
        </div>
      </React.Fragment>
  )
  return (
    <div className='OrdersListItem'>
      { markup }
      <div className='OrdersListItem__icon'>
        { expandedMode ? 
          <span style={{ cursor: 'pointer' }} onClick={() => setExpandedMode(false)}><PlusIcon /></span>:
          <span style={{ cursor: 'pointer' }} onClick={() => setExpandedMode(true)}><MinusIcon /></span> }
      </div>
    </div>
  )
}

export default OrdersListItem