import React from 'react'
import { ReactComponent as CloseBtnIcon } from '../../images/closeBtn.svg'
import { ReactComponent as EditBtnIcon } from '../../images/editBtn.svg'

import '../../styles/components/OrderPillListItem.scss'
const OrderPillListItem = ({updateModalState, deleteItem, product: { _id: itemId, image, name, product: { quantities }, attributes: { dosage, quantity }, price }}) => {
  return (
    <div className='OrderPillListItem'>
      { /* This button should delete the item */ }
      <span onClick={() => deleteItem(itemId)} style={{ cursor: 'pointer', display: 'flex' }}><CloseBtnIcon className='OrderPillListItem__closebtn' alt='close-btn' /></span>
      <img src={image} className='OrderPillListItem__tablet-img' alt='tablet' />
      <div className='OrderPillListItem__tablet-details'>
        <span style={{ fontSize: '1.8rem' }} className='OrderPillListItem__tablet-details--name'>{name} {dosage}</span>
        {/* <span className='OrderPillListItem__tablet-details--distributor' style={ {fontSize: '1.4rem', color: '#7AC7B8', marginTop: '5px' } }>{distributor}</span> */}
        <span style={{ color: '#979797' }} className='OrderPillListItem__tablet-details--distributor-quantity'>
          { quantity } Pills
          { /* This should trigger the modal */ }
          <span style={{ cursor: 'pointer', display: 'flex' }} onClick={() => updateModalState(true, quantities.map(q => `${q} Pills`, quantity), itemId, `${quantity} Pills`, 'quantity')}><EditBtnIcon alt='edit-btn' /></span>
        </span>
      </div>
      <div className='OrderPillListItem__tablet-price'>
        <span style={{ fontSize: '2rem', marginBottom: '1rem' }} className='OrderPillListItem__tablet-price--final'>$ {price}</span>
        {/* <div style={{ fontSize: '1.2rem'}} className='OrderPillListItem__tablet-price--original'>
          <span style={{ textDecoration: 'line-through', marginRight: '5px' }}>{originalPrice}</span>
          <span style={{ color: '#7AC7B8' }}>20% off</span>
        </div> */}
      </div>
    </div>
  )
}

export default OrderPillListItem
