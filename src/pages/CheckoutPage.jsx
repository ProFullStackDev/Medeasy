import React, {useState} from 'react'
// Components
import UpdateModal from '../components/UpdateModal'
import CheckoutProgress from '../components/CheckoutPage/CheckoutProgress'
import OrderSummary from '../components/CheckoutPage/OrderSummary'
// 4 Phases components
import AccountPhase from '../components/CheckoutPage/AccountPhase'
import BillingPhase from '../components/CheckoutPage/BillingPhase'
import PaymentPhase from '../components/CheckoutPage/PaymentPhase'

import '../styles/pages/CheckoutPage.scss'

const CheckoutPage = ({ changeOverlayState }) => {
  // CheckoutProgress stepNumber
  const [stepNumber, setStepNumber] = useState(3)
  // 4 step phase state
  const [progressPhase, setProgressPhase] = useState('payment')
  // edit btn toggle state
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
        <CheckoutProgress stepNumber={stepNumber} />
        { /* Four stages are present here. The state changes based on the clicks */ }
        { /* Show this component only if there is no user in state */ }
        { progressPhase === 'account' && <AccountPhase /> }
        { /* If the user has filled their address in profile page means, Show them in these forms (redux) */ }
        { progressPhase === 'address' && <BillingPhase /> }
        { progressPhase === 'payment' && <PaymentPhase /> }
      </div>
      <div className='CheckoutPage__right'>
        <OrderSummary updateModalState={updateModalState} />
      </div>
    </div>
  )
}

export default CheckoutPage