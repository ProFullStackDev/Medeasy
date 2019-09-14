import React from 'react'
import OrdersProductListItem from './OrdersProductListItem'

const OrdersProductList = ({ products }) => {
  return (
    <div className='OrdersProductList'>
      { products.map(product => <OrdersProductListItem product={product} key={product.id} />) }
    </div>
  )
}

export default OrdersProductList