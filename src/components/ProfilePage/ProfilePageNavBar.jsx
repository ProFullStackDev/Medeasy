import React, { useState } from 'react'

import '../../styles/components/ProfilePageNavBar.scss'
import { ReactComponent as GpsIcon } from '../../images/gpspin.svg'
import { ReactComponent as LockIcon } from '../../images/lock.svg'
import { ReactComponent as HandBagIcon } from '../../images/bag.svg'
import { ReactComponent as CreditCardIcon } from '../../images/ccsmall.svg'
import { ReactComponent as BitCoinIcon } from '../../images/bitLogo.svg'
import { ReactComponent as PayPalIcon } from '../../images/paypalLogo.svg'

const ProfilePageNavBar = props => {
  // Selected mode for navbar
  const [selectedMode, setSelectedMode] = useState('')
  // Trigger the active
  const handleClick = event => {
    setSelectedMode(event.target.closest('li').dataset.mode)
    // Passing the mode back to the main Profile page
    
  }
  return (
    <div className='ProfilePageNavBar'>
      <div className='ProfilePageNavBar__profile'>
        <h2 className='ProfilePageNavBar__profile-title'>Profile</h2>
        <ul className='ProfilePageNavBar__profile-list'>
          <li onClick={handleClick} data-mode='manageAddress' className={`ProfilePageNavBar__profile-list--item ${ selectedMode === 'manageAddress' ? 'activeProfileTab' : '' }`}>
            <GpsIcon />
            <span>Manage Addresses</span>
          </li>
          <li onClick={handleClick} data-mode='changePass' className={`ProfilePageNavBar__profile-list--item ${ selectedMode === 'changePass' ? 'activeProfileTab' : '' }`}>
            <LockIcon />
            <span>Change Password</span>
          </li>
        </ul>
      </div>
      <div className='ProfilePageNavBar__orders'>
        <h2 className='ProfilePageNavBar__orders-title'>My Orders</h2>
        <li onClick={handleClick} data-mode='orders' className={`ProfilePageNavBar__orders-item ${ selectedMode === 'orders' ? 'activeProfileTab' : '' }`}>
          <HandBagIcon />
          <span>Orders</span>
        </li>
      </div>
      <div className='ProfilePageNavBar__payment'>
        <h2 className='ProfilePageNavBar__payment-title'>Payment Methods</h2>
        <ul className='ProfilePageNavBar__payment-list'>
          <li onClick={handleClick} data-mode='creditCard' className={`ProfilePageNavBar__payment-list--item ${ selectedMode === 'creditCard' ? 'activeProfileTab' : '' }`}>
            <CreditCardIcon />
            <span>Credit Card</span>
          </li>
          <li onClick={handleClick} data-mode='bitCoin' className={`ProfilePageNavBar__payment-list--item ${ selectedMode === 'bitCoin' ? 'activeProfileTab' : '' }`}>
            <BitCoinIcon />
            <span>Bit Coin</span>
          </li>
          <li onClick={handleClick} data-mode='paypal' className={`ProfilePageNavBar__payment-list--item ${ selectedMode === 'paypal' ? 'activeProfileTab' : '' }`}>
            <PayPalIcon />
            <span>PayPal</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default ProfilePageNavBar