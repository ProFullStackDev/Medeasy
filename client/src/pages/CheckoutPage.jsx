import React, {useState} from 'react'
// Components
import UpdateModal from '../components/UpdateModal'
import CheckoutProgress from '../components/CheckoutPage/CheckoutProgress'
import OrderSummary from '../components/CheckoutPage/OrderSummary'
// 4 Phases components
import AccountPhase from '../components/CheckoutPage/AccountPhase'
import BillingPhase from '../components/CheckoutPage/BillingPhase'
import PaymentPhase from '../components/CheckoutPage/PaymentPhase'
import ReviewPhase from '../components/CheckoutPage/ReviewPhase'

import '../styles/pages/CheckoutPage.scss'

const CheckoutPage = ({ changeOverlayState }) => {
  // CheckoutProgress stepNumber
  const [stepNumber, setStepNumber] = useState(1)
  // 4 step phase state
  const [progressPhase, setProgressPhase] = useState('account')
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

  // The Switch handler for the 4 step process
  // Currently it only handles the proceeding and not any data saving or anything .. 
  // SO Remember !!
  const proceedToNextStep = step => {
    switch (step) {
      case 1: setStepNumber(2); setProgressPhase('address'); break;
      case 2: setStepNumber(3); setProgressPhase('payment'); break;
      case 3: setStepNumber(4); setProgressPhase('review'); break;
      default: break;
    }
  }

  return (
    <section className='CheckoutPage'>
      { isQuantityClicked && <UpdateModal disableOverlay={disableOverlay}  title='Update Dosage' values={['5mg', '10mg']}/> }
      <div className='CheckoutPage__left'>
        <CheckoutProgress stepNumber={stepNumber} />
        { /* Four stages are present here. The state changes based on the clicks */ }
        { /* Show this component only if there is no user in state */ }
        { progressPhase === 'account' && <AccountPhase step={1} onClick={proceedToNextStep} /> }
        { /* If the user has filled their address in profile page means, Show them in these forms (redux) */ }
        { progressPhase === 'address' && <BillingPhase step={2} onClick={proceedToNextStep} /> }
        { /* Either we must use the custom UI component or the Braintree card component */ }
        { progressPhase === 'payment' && <PaymentPhase step={3} onClick={proceedToNextStep} /> }
        { /* This is still uncertain because a conflict rises in the data flow */ }
        { progressPhase === 'review' && <ReviewPhase step={4} onClick={proceedToNextStep} /> }
      </div>
      { progressPhase !== 'review' &&
      <div className='CheckoutPage__right'>
        <OrderSummary updateModalState={updateModalState} />
      </div>
      }
    </section>
  )
}

export default CheckoutPage