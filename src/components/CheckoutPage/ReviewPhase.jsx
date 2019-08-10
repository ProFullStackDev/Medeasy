import React from 'react'
import editBtn from '../../images/editBtn.svg'
import cardImg from '../../images/visa.svg'
import SummaryListItem from './SummaryListItem'
import PricesBreakDown from './PricesBreakDown'
import '../../styles/components/ReviewPhase.scss'

// Dummy data
const products = [{
  id: 1,
  tabletName: 'Ambien',
  distributor: 'Sanofi Aventis Ltd',
  selectedDosage: 5,
  quantity: 50,
  discountedPrice: '$300',
  originalPrice: '$360'
},
{
  id: 2,
  tabletName: 'Modalert',
  distributor: 'Pfizer Ltd',
  selectedDosage: 10,
  quantity: 50,
  discountedPrice: '$250',
  originalPrice: '$300'
}]

// We grab the address and the card details from the redux states
const ReviewPhase = (props) => {
  return (
    <div className='ReviewPhase'>
      <h2 className='ReviewPhase__order-details ReviewPhase__title'>Order Review</h2>
      <div className='ReviewPhase__details'>
        <div className='ReviewPhase__details-billing'>
        { /* Editing here is absolute craze ... After payment only confirmation must show up */}
          <h2 className='ReviewPhase__details-billing--title' style={{ fontSize: '2rem' }}>Bill To <img src={editBtn} alt='edit-btn' /></h2>
          <div className='ReviewPhase__details-billing--address' style={{ color: '#787878' }}>
            <p className='ReviewPhase__details-billing--address-name'>James Newman</p>
            <p className='ReviewPhase__details-billing--address-phonenumber'>124-198-123</p>
            <p className='ReviewPhase__details-billing--address-main'>2125 Chestnut St</p>
            <p className='ReviewPhase__details-billing--address-citystate'>San Francisco, CA</p>
            <p className='ReviewPhase__details-billing--address-countryzipcode'>US - 942178</p>
          </div>
        </div>
        <div className='ReviewPhase__details-shipping'>
          <h2 className='ReviewPhase__details-shipping--title' style={{ fontSize: '2rem' }}>Ship To <img src={editBtn} alt='edit-btn' /></h2>
          <div className='ReviewPhase__details-shipping--address' style={{ color: '#787878' }}>
            <p className='ReviewPhase__details-shipping--address-name'>James Newman</p>
            <p className='ReviewPhase__details-shipping--address-phonenumber'>124-198-123</p>
            <p className='ReviewPhase__details-shipping--address-main'>2125 Chestnut St</p>
            <p className='ReviewPhase__details-shipping--address-citystate'>San Francisco, CA</p>
            <p className='ReviewPhase__details-shipping--address-countryzipcode'>US - 942178</p>
          </div>
        </div>
        <div className='ReviewPhase__details-authentication'>
          <h2 className='ReviewPhase__details-authentication--title' style={{ fontSize: '2rem' }}>Payment Info <img src={editBtn} alt='edit-btn' /></h2>
          <div className='ReviewPhase__details-authentication--card' style={{ color: '#787878' }}>
            <p className='ReviewPhase__details-authentication--card-name'>James Newman</p>
            { /* This card img should be dynamic */ }
            <img className='ReviewPhase__details-authentication--card-type' src={cardImg} alt='cardImg' style={{ marginBottom: '5px' }}/>
            <p className='ReviewPhase__details-authentication--card-number'>VISA 4713</p>
            <p className='ReviewPhase__details-authentication--card-expiry'>06 / 21</p>
            <p className='ReviewPhase__details-authentication--card-country'>USA</p>
          </div>
        </div>
      </div>
      <h2 style={{ marginTop: '3.2rem' }} className='ReviewPhase__order-summary ReviewPhase__title'>Order Summary</h2>
      <div className='ReviewPhase__summary'>
        { products.map(product => <SummaryListItem key={product.id} product={product} /> )}
      </div>
      <PricesBreakDown />
    </div>
  )
}
 
export default ReviewPhase