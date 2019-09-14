import React from 'react'
import CartListItem from './CartListItem'
import '../../styles/components/CartList.scss'
// temporary
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

const CartList = ({ decideModalState }) => {
  return (
    <div className='CartList'>
      {/* Loop here for all the products */}
      { dummyCartProducts.map(product => <CartListItem decideModalState={decideModalState} key={product.id} product={product} />)}
    </div>
  )
}
 
export default CartList;