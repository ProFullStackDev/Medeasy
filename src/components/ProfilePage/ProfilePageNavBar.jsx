import React from 'react'

import '../../styles/components/ProfilePageNavBar.scss'
import { ReactComponent as GpsIcon } from '../../images/gpspin.svg'
import { ReactComponent as LockIcon } from '../../images/lock.svg'
import { ReactComponent as HandBagIcon } from '../../images/bag.svg'
import { ReactComponent as CreditCardIcon } from '../../images/ccsmall.svg'
import { ReactComponent as BitCoinIcon } from '../../images/bitLogo.svg'
import { ReactComponent as PayPalIcon } from '../../images/paypalLogo.svg'

const ProfilePageNavBar = props => {
  return (
    <div className='ProfilePageNavBar'>
      <div className='ProfilePageNavBar__profile'>
        <h2 className='ProfilePageNavBar__profile-title'>Profile</h2>
        <ul className='ProfilePageNavBar__profile-list'>
          <li className='ProfilePageNavBar__profile-list--item'>
            <GpsIcon />
            <span>Manage Address</span>
          </li>
          <li className='ProfilePageNavBar__profile-list--item'>
            <LockIcon />
            <span>Change Password</span>
          </li>
        </ul>
      </div>
      <div className='ProfilePageNavBar__orders'>
        <h2 className='ProfilePageNavBar__orders-title'>My Orders</h2>
        <li className='ProfilePageNavBar__orders-item'>
          <HandBagIcon />
          <span>Orders</span>
        </li>
      </div>
      <div className='ProfilePageNavBar__payment'>
        <h2 className='ProfilePageNavBar__payment-title'>Payment Methods</h2>
        <ul className='ProfilePageNavBar__payment-list'>
          <li className='ProfilePageNavBar__payment-list--item'>
            <CreditCardIcon />
            <span>Credit Card</span>
          </li>
          <li className='ProfilePageNavBar__payment-list--item'>
            <BitCoinIcon />
            <span>Bit Coin</span>
          </li>
          <li className='ProfilePageNavBar__payment-list--item'>
            <PayPalIcon />
            <span>PayPal</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default ProfilePageNavBar