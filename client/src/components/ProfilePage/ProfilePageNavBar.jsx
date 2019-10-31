import React from 'react'
import { NavLink } from 'react-router-dom'

import '../../styles/components/ProfilePageNavBar.scss'
import { ReactComponent as GpsIcon } from '../../images/gpspin.svg'
import { ReactComponent as LockIcon } from '../../images/lock.svg'
import { ReactComponent as HandBagIcon } from '../../images/bag.svg'
import { ReactComponent as CreditCardIcon } from '../../images/ccsmall.svg'
import { ReactComponent as BitCoinIcon } from '../../images/bitLogo.svg'
import { ReactComponent as PayPalIcon } from '../../images/paypalLogo.svg'

const ProfilePageNavBar = () => {
  return (
    <div className='ProfilePageNavBar'>
      <div className='ProfilePageNavBar__profile'>
        <h2 className='ProfilePageNavBar__profile-title'>Profile</h2>
        <ul className='ProfilePageNavBar__profile-list'>
          <NavLink to='/profile/address' className='ProfilePageNavBar__profile-list--item' activeClassName='activeProfileTab'>
            <GpsIcon />
            <span>Manage Addresses</span>
          </NavLink>
          <NavLink to='/profile/password-change' className='ProfilePageNavBar__profile-list--item' activeClassName='activeProfileTab'>
            <LockIcon />
            <span>Change Password</span>
          </NavLink>
        </ul>
      </div>
      <div className='ProfilePageNavBar__orders'>
        <h2 className='ProfilePageNavBar__orders-title'>My Orders</h2>
        <NavLink to='/profile/orders' className='ProfilePageNavBar__profile-list--item' activeClassName='activeProfileTab'>
          <HandBagIcon />
          <span>Orders</span>
        </NavLink >
      </div>
      <div className='ProfilePageNavBar__payment'>
        <h2 className='ProfilePageNavBar__payment-title'>Payment Methods</h2>
        <ul className='ProfilePageNavBar__payment-list'>
          <NavLink to='/profile/card' className='ProfilePageNavBar__profile-list--item' activeClassName='activeProfileTab'>
            <CreditCardIcon />
            <span>Credit Card</span>
          </NavLink>
          <NavLink to='/profile/bitcoin' className='ProfilePageNavBar__profile-list--item' activeClassName='activeProfileTab'>
            <BitCoinIcon />
            <span>Bit Coin</span>
          </NavLink>
          <NavLink to='/profile/paypal' className='ProfilePageNavBar__profile-list--item' activeClassName='activeProfileTab'>
            <PayPalIcon />
            <span>PayPal</span>
          </NavLink>
        </ul>
      </div>
    </div>
  )
}

export default ProfilePageNavBar