import React from 'react'
import OrdersList from './OrdersList'
// Temporary data for the orders
import tablet1 from '../../../images/tablet4.png'
import tablet2 from '../../../images/tablet5.png'

const orders = [
  {
    orderNumber: 10001,
    products: [{
      id: 1,
      name: 'Ambien',
      dosage: '5mg',
      distributor: 'Sanofi Aventis',
      quantity: 50,
      price: 300,
      image: tablet1
    },
    {
      id: 2,
      name: 'Painosoma',
      dosage: '10mg',
      distributor: 'Pfizer',
      quantity: 100,
      price: 250,
      image: tablet2
    }],
    invoiceValue: 550
  },
  {
    orderNumber: 10002,
    products: [{
      id: 1,
      name: 'Ambien',
      dosage: '5mg',
      distributor: 'Sanofi Aventis',
      quantity: 50,
      price: 300,
      image: tablet1
    },
    {
      id: 2,
      name: 'Painosoma',
      dosage: '10mg',
      distributor: 'Pfizer',
      quantity: 100,
      price: 250,
      image: tablet2
    }],
    invoiceValue: 550
  },
  {
    orderNumber: 10003,
    products: [{
      id: 1,
      name: 'Ambien',
      dosage: '5mg',
      distributor: 'Sanofi Aventis',
      quantity: 50,
      price: 300,
      image: tablet1
    },
    {
      id: 2,
      name: 'Painosoma',
      dosage: '10mg',
      distributor: 'Pfizer',
      quantity: 100,
      price: 250,
      image: tablet2
    }],
    invoiceValue: 550
  }
]

const OrdersController = props => {
  return (
    <div className='OrdersController'>
      <h2 className='ProfilePage__phase-title'>My Orders</h2>
      <OrdersList orders={orders} />
    </div>
  )
}

export default OrdersController