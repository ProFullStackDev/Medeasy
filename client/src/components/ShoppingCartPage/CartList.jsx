import React from 'react'
import CartListItem from './CartListItem'
import '../../styles/components/CartList.scss'

const dummyCartProducts = []

const CartList = ({ decideModalState }) => {
  return (
    <div className='CartList'>
      {/* Loop here for all the products */}
      { dummyCartProducts.map(product => <CartListItem decideModalState={decideModalState} key={product.id} product={product} />)}
    </div>
  )
}
 
export default CartList;