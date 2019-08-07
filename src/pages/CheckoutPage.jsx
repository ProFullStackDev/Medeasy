import React, {useState} from 'react'
// Components
import UpdateModal from '../components/UpdateModal'
import CheckoutProgress from '../components/CheckoutPage/CheckoutProgress'
import OrderSummary from '../components/CheckoutPage/OrderSummary'
import '../styles/pages/CheckoutPage.scss'

const CheckoutPage = ({ changeOverlayState }) => {

  const [isQuantityClicked, setIsQuantityClicked] = useState(false)
  // Toggling the UpdateModal Component
  const updateModalState = () => {
    setIsQuantityClicked(true)
    changeOverlayState(true)
  }
  // Toggling the overlay
  const disableOverlay = () => {
    setIsQuantityClicked(false)
    changeOverlayState(false)
  }

  return (
    <div className='CheckoutPage'>
      { isQuantityClicked && <UpdateModal disableOverlay={disableOverlay}  title='Update Dosage' values={['5mg', '10mg']}/> }
      <div className='CheckoutPage__left'>
        <CheckoutProgress stepNumber={2} />
      </div>
      <div className='CheckoutPage__right'>
        <OrderSummary updateModalState={updateModalState} />
      </div>
    </div>
  )
}

export default CheckoutPage