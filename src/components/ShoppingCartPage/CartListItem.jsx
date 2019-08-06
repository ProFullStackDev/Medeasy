import React from 'react'
import editBtn from '../../images/editBtn.svg'
import closeBtn from '../../images/closeBtn.svg'
import '../../styles/components/CartListItem.scss'


const CartListItem = ({ decideModalState, product: { tabletImage, tabletName, distributor, selectedDosage, quantity, discountedPrice, originalPrice } }) => {
  return (
    <div className='CartListItem'>
      <img src={tabletImage} alt='tablet' className='CartListItem__tabletimage' />
      <div className='CartListItem__details'>
        <p className='CartListItem__details-name' style={{ fontSize: '2.5rem' }}>{tabletName}</p>
        <a href='www' className='CartListItem__details-distributor' style={{ fontSize: '1.4rem' }}>{distributor}</a>
      </div>
      <div className='CartListItem__dosage'>
        <span className='CartListItem__dosage-value'>{selectedDosage}mg</span>
        <img src={editBtn} alt='editbtn' onClick={() => decideModalState('dosage')} />
      </div>
      <div className='CartListItem__quantity'>
        <span className='CartListItem__quantity-value'>{quantity} Pills</span>
        <img src={editBtn} alt='editbtn' onClick={() => decideModalState('quantity')} />
      </div>
      <div className='CartListItem__price'>
        <p className='CartListItem__price--final'>{ discountedPrice }</p>
        <div className='CartListItem__price--prev'>
          <span style={{ textDecoration: 'line-through', marginRight: '5px' }}>{ originalPrice }</span>
          {/* Discount percent is dynamic */}
          <span className='CartListItem__price--discount'>20% off</span>
        </div>
      </div>
      <img className='CartListItem__delete' src={closeBtn} alt='delete-item' />
    </div>
  )
}

export default CartListItem