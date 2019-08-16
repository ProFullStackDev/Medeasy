import React from 'react'
import { ReactComponent as EditBtnIcon } from '../../images/editBtn.svg'
import { ReactComponent as CloseBtnIcon } from '../../images/closeBtn.svg'
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
        <span onClick={() => decideModalState('dosage')}><EditBtnIcon alt='editbtn'/></span>
      </div>
      <div className='CartListItem__quantity'>
        <span className='CartListItem__quantity-value'>{quantity} Pills</span>
        <span onClick={() => decideModalState('quantity')}><EditBtnIcon alt='editbtn'/></span>
      </div>
      <div className='CartListItem__price'>
        <p className='CartListItem__price--final'>{ discountedPrice }</p>
        <div className='CartListItem__price--prev'>
          <span style={{ textDecoration: 'line-through', marginRight: '5px' }}>{ originalPrice }</span>
          {/* Discount percent is dynamic */}
          <span className='CartListItem__price--discount'>20% off</span>
        </div>
      </div>
      <span><CloseBtnIcon alt='delete-item' className='CartListItem__delete' /></span>
    </div>
  )
}

export default CartListItem