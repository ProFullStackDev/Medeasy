import React from 'react'
import { Helmet } from 'react-helmet'

import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import {
  selectAuthUser,
  selectAuthGuest
} from '../redux/selectors/authSelectors'
import { ReactComponent as TickMark } from '../images/tickmark.svg'

import '../styles/pages/PaymentSuccessPage.scss'
import CustomButton from '../components/CustomButton'

const PaymentSuccessPage = ({ user, guest }) => {
  return (
    <div className='PaymentSuccessPage'>
      <Helmet>
        <title>Medeasy - Success</title>
        <meta name='description' content='Payment Complete' />
      </Helmet>
      <div className='PaymentSuccessPage__card'>
        <span className='PaymentSuccessPage__card-success'>
          <TickMark />
        </span>
        <p style={{ fontSize: '1.7rem' }}>
          Hey {user ? user.name : guest.name}
        </p>
        <h1 className='PaymentSuccessPage__message'>
          Your order is Confirmed!
        </h1>
        <p style={{ textAlign: 'center', lineHeight: 1.7, width: '60%' }}>
          We'll send you a mail now regarding the order details and also after
          the product has been shipped.
        </p>
        <p>Thank you for being a part of Medeasy!</p>
        <div style={{ marginTop: '1rem' }}>
          {user ? (
            <Link to='/profile/orders'>
              <CustomButton extraStyle={{ background: '#F8931A' }}>
                Check Status
              </CustomButton>
            </Link>
          ) : null}
          <Link to='/' style={{ marginLeft: '2rem' }}>
            <CustomButton>Return to main page</CustomButton>
          </Link>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  user: selectAuthUser,
  guest: selectAuthGuest
})

export default connect(mapStateToProps)(PaymentSuccessPage)
