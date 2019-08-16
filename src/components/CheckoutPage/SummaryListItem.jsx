import React from 'react'
import { ReactComponent as EditBtnIcon } from '../../images/editBtn.svg'
import { ReactComponent as CloseBtnIcon } from '../../images/closeBtn.svg'
import '../../styles/components/SummaryListItem.scss'
const SummaryListItem = (props) => {
  const { tabletName, distributor, selectedDosage, quantity, discountedPrice, originalPrice } = props.product
  return (
    <div className='SummaryListItem'>
      <div className='SummaryListItem__product'>
        <h3 style={{ fontSize: '1.8rem', color: '#000' }} className='SummaryListItem__product-name'>
          { tabletName }
        </h3>
        <span style={{ fontSize: '1.2rem' }} className='SummaryListItem__product-distributor'>{ distributor }</span>
      </div>
      <span className='SummaryListItem__dosage'>
        { `${selectedDosage} mg` } <EditBtnIcon alt='editbtn' />
      </span>
      <span className='SummaryListItem__quantity'>
        { `${quantity} Pills` } <EditBtnIcon alt='editbtn' />
      </span>
      <div className='SummaryListItem__price'>
        { /* Discount is calculated */ }
        <p style={{ fontSize: '2rem' }}>{ discountedPrice }</p>
        <p className='SummaryListItem__price-original'>
          <span style={{ fontSize: '1rem', textDecoration: 'line-through' }}>{ originalPrice }</span>
          <span className='SummaryListItem__price-original--discount' style={{ fontSize: '1rem' }}>20% off</span>
        </p>
      </div>
      <CloseBtnIcon style={{ cursor: 'pointer' }} alt='delete-product' />
    </div>
  )
}
 
export default SummaryListItem