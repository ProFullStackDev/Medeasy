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

const PaymentConfimedPage = ({ user, guest }) => {
  return (
    <div className='PaymentSuccessPage'>
      <Helmet>
        <title>Medeasy - Order Confirmed</title>
        <meta name='description' content='Order Confirmed via Western Union' />
      </Helmet>
      <div className='PaymentSuccessPage__card'>
        <span className='PaymentSuccessPage__card-success'>
          <TickMark />
        </span>
        <p style={{ fontSize: '1.7rem', marginTop: '1rem' }}>
          Hey {user ? user.name : guest.name}
        </p>
        <h1 className='PaymentSuccessPage__message'>
          Your order is placed successfully!
        </h1>
        <p style={{ textAlign: 'center', lineHeight: 1.7, width: '60%' }}>
          We'll send you a mail for further steps.
        </p>
        <p>Thank you for being a part of Medeasy!</p>
        <div style={{ marginTop: '1rem' }}>
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

export default connect(mapStateToProps)(PaymentConfimedPage)
