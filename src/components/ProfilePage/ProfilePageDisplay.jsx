import React from 'react'
import AddressChangeController from './AddressChange/AddressChangeController'
import ChangePasswordController from './ChangePassword/ChangePasswordController'
import OrdersController from './Orders/OrdersController'
import CreditCardController from './Payment/CreditCardController'

const ProfilePageDisplay = ({ currentMode }) => {
  let mode = null
  switch (currentMode) {
    case 'manageAddress': mode = <AddressChangeController />; break
    case 'changePassword': mode = <ChangePasswordController />; break
    case 'orders': mode = <OrdersController />; break
    case 'creditCard': mode = <CreditCardController />; break
    default: break
  }
  return (
    <div className='ProfilePageDisplay' style={ profilePageDisplayStyles }>
      { /* Depends on what the user clicks in the navbar */ }
      { mode }
    </div>
  )
}

const profilePageDisplayStyles = {
  position: 'relative',
  flex: 1,
  marginLeft: '4rem',
  minHeight: '65.4rem',
  borderRadius: '1rem',
  padding: '2.5rem',
  boxShadow: '0 0 .5rem 1px rgba(0, 0, 0, .1)'
}

export default ProfilePageDisplay