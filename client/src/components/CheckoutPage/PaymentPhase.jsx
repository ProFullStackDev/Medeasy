import React, { useEffect } from 'react'
import { Redirect, Route, Switch, NavLink } from 'react-router-dom'
// Components
import Spinner from '../Spinner'
import { CreditCardPage } from './CreditCardPage'
import { PaypalPage } from './PaypalPage'
import { BitcoinPage } from './BitcoinPage'
// Images
import paypalImg from '../../images/paypal.svg'
import cardImg from '../../images/credit-card.svg'
import bitcoinImg from '../../images/bitcoin.svg'
// Redux
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { setStepProgress } from '../../redux/actions/cartActions'
import {
	fetchRazorpayOrderId,
	fetchCoinbaseOrderId,
	fetchPaypalOrderId
} from '../../redux/actions/paymentActions'
import { fetchUserCreditCards } from '../../redux/actions/profileActions'
import { selectProfileCards } from '../../redux/selectors/profileSelectors'
import { selectAuthUser } from '../../redux/selectors/authSelectors'
import {
	selectPaymentOrderId,
	selectPaymentPaypalOrderId,
	selectPaymentRazorpayOrderId,
	selectPaymentCoinbaseChargeCode
} from '../../redux/selectors/paymentSelectors'
import { selectInventoryLoading } from '../../redux/selectors/inventorySelectors'
import { selectCartProducts, selectCartBillingAddress, selectCartShippingAddress } from '../../redux/selectors/cartSelectors'

import '../../styles/components/PaymentPhase.scss'
import '../../styles/components/PaymentType.scss'

const PaymentPhase = ({
	user,
	cards,
	orderId,
	rzpOrderId,
	ppOrderId, 
	coinbaseCharge,
	shippingAddress,
	billingAddress,
	loading,
	setStepProgress,
	products,
	fetchCoinbaseOrderId,
	fetchRazorpayOrderId,
	fetchPaypalOrderId,
	fetchUserCreditCards,
	match: { url }
}) => {
	const totalAmount = products.reduce(
		(acc, p) => (acc += parseInt(p.subTotal)),
		0
	)

	useEffect(() => {
		setStepProgress(4)
		if (user) fetchUserCreditCards()
	}, [setStepProgress, fetchUserCreditCards, user])

	if (!orderId) return <Redirect to="/checkout/review" />
	if (!shippingAddress || !billingAddress) return <Redirect to='/checkout/address' />

	return (
		<div className="PaymentPhase">
			<h2 className="PaymentPhase__title">Payment Information</h2>
			<ul className="PaymentPhase__types">
				<NavLink
					to={`${url}/card`}
					className="PaymentType"
					activeClassName="activeType"
				>
					<img src={cardImg} className="PaymentType__image" alt="paymenttype" />
					<p style={{ fontSize: '1.2rem' }} className="PaymentType__name">
						Credit Card
					</p>
				</NavLink>
				<NavLink
					to={`${url}/paypal`}
					className="PaymentType"
					activeClassName="active"
				>
					<img
						src={paypalImg}
						className="PaymentType__image"
						alt="paymenttype"
					/>
					<p style={{ fontSize: '1.2rem' }} className="PaymentType__name">
						Paypal
					</p>
				</NavLink>
				<NavLink
					to={`${url}/bitcoin`}
					className="PaymentType"
					activeClassName="active"
				>
					<img
						src={bitcoinImg}
						className="PaymentType__image"
						alt="paymenttype"
					/>
					<p style={{ fontSize: '1.2rem' }} className="PaymentType__name">
						Bitcoin
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
								user={user}
								cards={cards}
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
								fetchCoinbaseOrderId={fetchCoinbaseOrderId}
								{...routeProps}
								orderId={orderId}
								amount={totalAmount}
							/>
						)}
					/>
				</Switch>
			)}
		</div>
	)
}

const mapStateToProps = createStructuredSelector({
	user: selectAuthUser,
	cards: selectProfileCards,
	billingAddress: selectCartBillingAddress,
	shippingAddress: selectCartShippingAddress,
	orderId: selectPaymentOrderId,
	rzpOrderId: selectPaymentRazorpayOrderId,
	ppOrderId: selectPaymentPaypalOrderId,
	coinbaseCharge: selectPaymentCoinbaseChargeCode,
	loading: selectInventoryLoading,
	products: selectCartProducts
})

export default connect(
	mapStateToProps,
	{
		setStepProgress,
		fetchCoinbaseOrderId,
		fetchRazorpayOrderId,
		fetchPaypalOrderId,
		fetchUserCreditCards
	}
)(PaymentPhase)
