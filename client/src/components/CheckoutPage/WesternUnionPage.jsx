import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet'

import { connect } from 'react-redux'
import { fetchOrderByUserId } from '../../redux/actions/inventoryActions'
import { acceptWesternUnion } from '../../redux/actions/paymentActions'
import { createStructuredSelector } from 'reselect'
import { selectInventoryOrder } from '../../redux/selectors/inventorySelectors'
import { selectProfileLoading } from '../../redux/selectors/profileSelectors'
import {
  selectAuthUser,
  selectAuthGuest
} from '../../redux/selectors/authSelectors'

import Spinner from '../Spinner'
import CustomButton from '../CustomButton'

const WesternUnionPage = ({
  fetchOrderByUserId,
  acceptWesternUnion,
  order,
  user,
  guest,
  isSame,
  amount,
  loading
}) => {
  const orderId = localStorage.getItem('orderId')
  const id = user ? user._id : guest._id

  useEffect(() => {
    fetchOrderByUserId(orderId, id)
  }, [fetchOrderByUserId, orderId, id])

  return !order || loading ? (
    <Spinner />
  ) : (
    <div>
      <Helmet>
        <title>Medeasy - Payment</title>
        <meta name='description' content='Pay with Western Union' />
      </Helmet>
      <h3 style={{ textAlign: 'center' }}>Pay through Western Union.</h3>
      <p
        style={{ textAlign: 'center', fontWeight: 'bold', margin: '1.5rem 0' }}
      >
        {!isSame
          ? `10% OFF applied. Amount Payable - $${amount}`
          : `Sorry. Minimum Order amount is 200 $ to be eligible for discount. Amount Payable - $${amount}`}
      </p>
      <p style={{ fontSize: '1.7rem', lineHeight: 2 }}>
        Please read the following statements.
      </p>
      <p style={{ fontSize: '1.7rem', lineHeight: 2 }}>
        1) Confirm this Order, if you wish to pay via Western Union by clicking
        below.
      </p>
      <p style={{ fontSize: '1.7rem', lineHeight: 2 }}>
        2) You will recieve an email regarding the instructions on processing
        through Western Union.
      </p>
      <CustomButton
        extraStyle={{ marginTop: '2.5rem' }}
        onClick={() => acceptWesternUnion(orderId)}
      >
        Confirm Order
      </CustomButton>
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  order: selectInventoryOrder,
  user: selectAuthUser,
  guest: selectAuthGuest,
  loading: selectProfileLoading
})

export default connect(mapStateToProps, {
  fetchOrderByUserId,
  acceptWesternUnion
})(WesternUnionPage)
