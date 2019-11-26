import React, { useEffect } from 'react'
import { Redirect, Route, Switch, NavLink } from 'react-router-dom'
// Components
import Spinner from '../Spinner'
import CreditCardPage from './CreditCardPage'
import PaypalPage from './PaypalPage'
import BitcoinPage from './BitcoinPage'
import WesternUnionPage from './WesternUnionPage'
// Images
import paypalImg from '../../images/paypal.svg'
import cardImg from '../../images/credit-card.svg'
import bitcoinImg from '../../images/bitcoin.svg'
import westernUnion from '../../images/westernUnion.png'
// Redux
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { setStepProgress } from '../../redux/actions/cartActions'
import {
  fetchRazorpayOrderId,
  fetchCoinbaseOrderId,
  fetchPaypalOrderId,
  chargePaypal
} from '../../redux/actions/paymentActions'
import {
  selectPaymentOrderId,
  selectPaymentPaypalOrderId,
  selectPaymentRazorpayOrderId,
  selectPaymentCoinbaseHostedUrl
} from '../../redux/selectors/paymentSelectors'
import { selectInventoryLoading } from '../../redux/selectors/inventorySelectors'
import { selectProfileLoading } from '../../redux/selectors/profileSelectors'
import {
  selectCartProducts,
  selectCartBillingAddress,
  selectCartShippingAddress,
  selectCartCoupon
} from '../../redux/selectors/cartSelectors'

import '../../styles/components/PaymentPhase.scss'
import '../../styles/components/PaymentType.scss'

const PaymentPhase = ({
  orderId,
  rzpOrderId,
  coinbaseHostedUrl,
  cartCoupon,
  chargePaypal,
  loading,
  proLoading,
  setStepProgress,
  products,
  fetchCoinbaseOrderId,
  fetchRazorpayOrderId,
  fetchPaypalOrderId,
  match: { url }
}) => {
  const subTotal = products.reduce((acc, p) => (acc += parseInt(p.subTotal)), 0)

  const totalAmount =
    subTotal -
    (Object.keys(cartCoupon).length > 0
      ? cartCoupon.type === 'percent'
        ? subTotal * (cartCoupon.value / 100)
        : cartCoupon.value
      : 0)

  const bitWuTotalAmount =
    subTotal >= 200 ? subTotal - subTotal * 0.1 : subTotal

  useEffect(() => {
    setStepProgress(4)
  }, [setStepProgress])

  if (!orderId) return <Redirect to='/checkout/review' />

  return (
    <div className='PaymentPhase'>
      <h2 className='PaymentPhase__title'>Payment Information</h2>
      <ul className='PaymentPhase__types'>
        <NavLink
          to={`${url}/card`}
          className='PaymentType'
          activeClassName='activeType'
        >
          <img src={cardImg} className='PaymentType__image' alt='paymenttype' />
          <p style={{ fontSize: '1.5rem' }} className='PaymentType__name'>
            Credit Card
          </p>
        </NavLink>
        <NavLink
          to={`${url}/paypal`}
          className='PaymentType'
          activeClassName='activeType'
        >
          <img
            src={paypalImg}
            className='PaymentType__image'
            alt='paymenttype'
          />
          <p style={{ fontSize: '1.5rem' }} className='PaymentType__name'>
            Paypal
          </p>
        </NavLink>
        <NavLink
          to={`${url}/bitcoin`}
          className='PaymentType'
          activeClassName='activeType'
        >
          <img
            src={bitcoinImg}
            className='PaymentType__image'
            alt='paymenttype'
          />
          <p style={{ fontSize: '1.5rem' }} className='PaymentType__name'>
            Bitcoin
          </p>
        </NavLink>
        <NavLink
          to={`${url}/western-union`}
          className='PaymentType'
          activeClassName='activeType'
        >
          <img
            src={westernUnion}
            className='PaymentType__image'
            alt='paymenttype'
          />
          <p style={{ fontSize: '1.5rem' }} className='PaymentType__name'>
            Western Union
          </p>
        </NavLink>
      </ul>
      {loading ? (
        <Spinner />
      ) : (
        <Switch>
          <Route
            exact
            path={`${url}/card`}
            render={routeProps => (
              <CreditCardPage
                {...routeProps}
                fetchRazorpayOrderId={fetchRazorpayOrderId}
                orderId={orderId}
                razorPayOrderId={rzpOrderId}
                amount={totalAmount}
              />
            )}
          />
          <Route
            exact
            path={`${url}/paypal`}
            render={routeProps => (
              <PaypalPage
                fetchPaypalOrderId={fetchPaypalOrderId}
                chargePaypal={chargePaypal}
                {...routeProps}
                orderId={orderId}
                amount={totalAmount}
              />
            )}
          />
          <Route
            exact
            path={`${url}/bitcoin`}
            render={routeProps => (
              <BitcoinPage
                url={coinbaseHostedUrl}
                proLoading={proLoading}
                {...routeProps}
                orderId={orderId}
                amount={bitWuTotalAmount}
                isSame={subTotal === bitWuTotalAmount}
              />
            )}
          />
          <Route
            exact
            path={`${url}/western-union`}
            amount={bitWuTotalAmount}
            render={routeProps => <WesternUnionPage {...routeProps} amount={bitWuTotalAmount} isSame={subTotal === bitWuTotalAmount}/>}
          />
        </Switch>
      )}
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  cartCoupon: selectCartCoupon,
  billingAddress: selectCartBillingAddress,
  shippingAddress: selectCartShippingAddress,
  orderId: selectPaymentOrderId,
  rzpOrderId: selectPaymentRazorpayOrderId,
  ppOrderId: selectPaymentPaypalOrderId,
  coinbaseHostedUrl: selectPaymentCoinbaseHostedUrl,
  loading: selectInventoryLoading,
  proLoading: selectProfileLoading,
  products: selectCartProducts
})

export default connect(mapStateToProps, {
  setStepProgress,
  fetchCoinbaseOrderId,
  fetchRazorpayOrderId,
  fetchPaypalOrderId,
  chargePaypal
})(PaymentPhase)
