import React from 'react'
import closeBtn from '../../images/closeBtn.svg'
import editBtn from '../../images/editBtn.svg'

import '../../styles/components/OrderPillListItem.scss'
const OrderPillListItem = ({updateModalState, product: { tabletImage, tabletName, distributor, selectedDosage, quantity, discountedPrice, originalPrice } }) => {
  return (
    <div className='OrderPillListItem'>
      { /* This button should delete the item */ }
      <img src={closeBtn} className='OrderPillListItem__closebtn' alt='close-btn' />
      <img src={tabletImage} className='OrderPillListItem__tablet-img' alt='tablet' />
      <div className='OrderPillListItem__tablet-details'>
        <span style={{ fontSize: '1.8rem' }} className='OrderPillListItem__tablet-details--name'>{tabletName} {selectedDosage}mg</span>
        <span className='OrderPillListItem__tablet-details--distributor' style={ {fontSize: '1.4rem', color: '#7AC7B8', marginTop: '5px' } }>{distributor}</span>
        <span style={{ color: '#979797' }} className='OrderPillListItem__tablet-details--distributor-quantity'>
          { quantity } Pills
          { /* This should trigger the modal */ }
          <img src={editBtn} alt='edit-btn' onClick={updateModalState} />
        </span>
      </div>
      <div className='OrderPillListItem__tablet-price'>
        <span style={{ fontSize: '2rem', marginBottom: '1rem' }} className='OrderPillListItem__tablet-price--final'>{discountedPrice}</span>
        <div style={{ fontSize: '1.2rem'}} className='OrderPillListItem__tablet-price--original'>
          <span style={{ textDecoration: 'line-through', marginRight: '5px' }}>{originalPrice}</span>
          <span style={{ color: '#7AC7B8' }}>20% off</span>
        </div>
      </div>
    </div>
  )
}

export default OrderPillListItem
