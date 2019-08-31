import React from 'react'
import OrdersListItem from './OrdersListItem'

const OrdersList = ({ orders }) => {
  return (
    <div className='OrdersList'>
      { orders.map(order => <OrdersListItem key={order.orderNumber} order={ order } />) }
    </div>
  )
}

export default OrdersList