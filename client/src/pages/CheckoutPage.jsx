import React, { useState } from 'react'
import { Route, Redirect } from 'react-router-dom'
// Components
import UpdateModal from '../components/UpdateModal'
import CheckoutProgress from '../components/CheckoutPage/CheckoutProgress'
import OrderSummary from '../components/CheckoutPage/OrderSummary'
import CouponModal from '../components/CouponModal'
// 4 Phases components
import AccountPhase from '../components/CheckoutPage/AccountPhase'
import BillingPhase from '../components/CheckoutPage/BillingPhase'
import PaymentPhase from '../components/CheckoutPage/PaymentPhase'
import ReviewPhase from '../components/CheckoutPage/ReviewPhase'
// Redux
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import {
	selectCartProducts,
	selectCartStepProgress
} from '../redux/selectors/cartSelectors'
import { selectPaymentOrderId } from '../redux/selectors/paymentSelectors'
import { applyCoupon, removeCoupon, setCouponError } from '../redux/actions/cartActions'
import { selectCartCouponError } from '../redux/selectors/cartSelectors'

import '../styles/pages/CheckoutPage.scss'

const CheckoutPage = ({
	changeOverlayState,
	stepProgress,
	cartProducts,
	applyCoupon,
	removeCoupon,
	setCouponError,
	couponError,
	match: { url }
}) => {
	// Update Modal Values
	const [updateValues, setUpdateValues] = useState([])
	// Current Modal Value
	const [currentVal, setCurrentVal] = useState('')
	// Current Coupon Code
	const [couponName, setCouponName] = useState('')
	// Item Id
	const [itemId, setItemId] = useState('')
	// edit btn toggle state
	const [isUpdateModalClicked, setIsUpdateModalClicked] = useState(false)
	// Coupon toggle
	const [isCouponModalClicked, setIsCouponModalClicked] = useState(false)
	// Type of modal
	const [modalType, setModalType] = useState('')

	// Toggling the UpdateModal Component
	const updateModalState = (boolVal, values, itemId, currentVal, type) => {
		setIsUpdateModalClicked(boolVal)
		changeOverlayState(boolVal)
		setUpdateValues(values)
		setCurrentVal(currentVal)
		setItemId(itemId)
		setModalType(type)
	}

	// Toggle CouponModal Component
	const updateCouponState = boolVal => {
		setIsCouponModalClicked(boolVal)
		changeOverlayState(boolVal)
	}

	// Toggling the overlay
	const disableOverlay = () => {
		setIsUpdateModalClicked(false)
		setIsCouponModalClicked(false)
		changeOverlayState(false)
	}

	// Coupon change
	const handleChange = couponName => {
		setCouponError(null)
		setCouponName(couponName)
	}
	// Coupon submit
	const handleSubmit = event => {
		event.preventDefault()
		if (couponName.length === 0) setCouponError('Coupon name is required')
		applyCoupon(couponName.toUpperCase())
		setCouponName('')
	}
	const nullifyCoupon = () => {
		removeCoupon()
		setCouponName('')
	}

	if (cartProducts.length === 0) return <Redirect to="/cart" />

	return (
		<section className="CheckoutPage">
			{isUpdateModalClicked && (
				<UpdateModal
					prevVal={currentVal}
					disableOverlay={disableOverlay}
					title={`Update ${modalType === 'quantity' ? 'Quantity' : 'Dosage'}`}
					values={updateValues}
					itemId={itemId}
					type={modalType}
				/>
			)}
			{isCouponModalClicked && (
				<CouponModal
					onClick={couponName => applyCoupon(couponName.toUpperCase())}
					disableOverlay={disableOverlay}
				/>
			)}
			<div className="CheckoutPage__left">
				<CheckoutProgress stepNumber={stepProgress} />
				<Route exact path={`${url}/account`} component={AccountPhase} />
				<Route exact path={`${url}/address`} component={BillingPhase} />
				<Route
					exact
					path={`${url}/review`}
					render={routeProps => (
						<ReviewPhase
							{...routeProps}
							cartProducts={cartProducts}
							updateModalState={updateModalState}
						/>
					)}
				/>
				<Route path={`${url}/payment`} component={PaymentPhase} />
			</div>
			{stepProgress < 3 ? (
				<div className="CheckoutPage__right">
					<OrderSummary
						couponError={couponError}
						nullifyCoupon={nullifyCoupon}
						couponName={couponName}
						handleChange={handleChange}
						handleSubmit={handleSubmit}
						cartProducts={cartProducts}
						updateModalState={updateModalState}
						updateCouponState={updateCouponState}
					/>
				</div>
			) : null}
		</section>
	)
}

const mapStateToProps = createStructuredSelector({
	cartProducts: selectCartProducts,
	stepProgress: selectCartStepProgress,
	orderId: selectPaymentOrderId,
	couponError: selectCartCouponError
})

export default connect(mapStateToProps, { applyCoupon, removeCoupon, setCouponError })(CheckoutPage)
