import React, { useEffect, Fragment } from 'react'
import { Redirect, Link } from 'react-router-dom'

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectCartProducts } from '../../redux/selectors/cartSelectors'
import { selectInventoryLoading } from '../../redux/selectors/inventorySelectors'
import {
	selectAuthUser,
	selectAuthCheckoutRole
} from '../../redux/selectors/authSelectors'
import {
	selectCartBillingAddress,
	selectCartShippingAddress,
	selectCartCoupon
} from '../../redux/selectors/cartSelectors'
import {
	setStepProgress,
	deleteCartItem
} from '../../redux/actions/cartActions'
import { createOrder } from '../../redux/actions/paymentActions'

import PricesBreakDown from './PricesBreakDown'
import SummaryListItem from './SummaryListItem'
import Spinner from '../Spinner'
import CustomButton from '../CustomButton'
import ProductsTitle from '../ProductsTitle'

import { ReactComponent as EditBtnIcon } from '../../images/editBtn.svg'
import '../../styles/components/ReviewPhase.scss'

// We grab the address and the card details from the redux states
const ReviewPhase = ({
	setStepProgress,
	billingAddress,
	shippingAddress,
	user,
	invLoading,
	checkoutRole,
	createOrder,
	updateModalState,
	deleteCartItem,
	cartProducts: products,
	coupon
}) => {
	useEffect(() => {
		setStepProgress(3)
	}, [setStepProgress])

	if (!checkoutRole || (!user && checkoutRole === 'user'))
		return <Redirect to="/checkout/account" />
	if (!billingAddress || !shippingAddress)
		return <Redirect to="/checkout/address" />

		const subTotal = products.reduce(
			(acc, product) => (acc += parseInt(product.subTotal)),
			0
		)
		const prices = {
			subTotal,
			shippingPrice: 0,
			tax: 0,
			discount:
				Object.keys(coupon).length > 0
					? coupon.type === 'percent'
						? Math.round(subTotal * (parseInt(coupon.value) / 100))
						: parseInt(coupon.value)
					: 0
		}

	const processOrder = () => {
		createOrder(billingAddress, shippingAddress)
	}

	return (
		<div style={{ position: 'relative' }} className="ReviewPhase">
			<h2 className="ReviewPhase__order-details ReviewPhase__title">
				Order Review
			</h2>
			<div className="ReviewPhase__details">
				<div className="ReviewPhase__details-billing">
					{/* Editing here is absolute craze ... After payment only confirmation must show up */}
					<h2
						className="ReviewPhase__details-billing--title"
						style={{ fontSize: '2rem' }}
					>
						Bill To{' '}
						<Link to="/checkout/address">
							<EditBtnIcon alt="edit-btn" />
						</Link>
					</h2>
					<div
						className="ReviewPhase__details-billing--address"
						style={{ color: '#787878' }}
					>
						<p className="ReviewPhase__details-billing--address-name">
							{billingAddress.name}
						</p>
						<p className="ReviewPhase__details-billing--address-phonenumber">
							{billingAddress.phNumber}
						</p>
						<p className="ReviewPhase__details-billing--address-main">
							{billingAddress.address1}
						</p>
						<p className="ReviewPhase__details-billing--address-citystate">
							{billingAddress.city}, {billingAddress.state}
						</p>
						<p className="ReviewPhase__details-billing--address-countryzipcode">
							US - {billingAddress.postalCode}
						</p>
					</div>
				</div>
				<div className="ReviewPhase__details-shipping">
					<h2
						className="ReviewPhase__details-shipping--title"
						style={{ fontSize: '2rem' }}
					>
						Ship To{' '}
						<Link to="/checkout/address">
							<EditBtnIcon alt="edit-btn" />
						</Link>
					</h2>
					<div
						className="ReviewPhase__details-shipping--address"
						style={{ color: '#787878' }}
					>
						<p className="ReviewPhase__details-shipping--address-name">
							{shippingAddress.name}
						</p>
						<p className="ReviewPhase__details-shipping--address-phonenumber">
							{shippingAddress.phNumber}
						</p>
						<p className="ReviewPhase__details-shipping--address-main">
							{shippingAddress.address1}
						</p>
						<p className="ReviewPhase__details-shipping--address-citystate">
							{shippingAddress.city}, {shippingAddress.state}
						</p>
						<p className="ReviewPhase__details-shipping--address-countryzipcode">
							US - {shippingAddress.postalCode}
						</p>
					</div>
				</div>
			</div>
			<h2
				style={{ margin: '3.2rem 0' }}
				className="ReviewPhase__order-summary ReviewPhase__title"
			>
				Order Summary
			</h2>
			<ProductsTitle width={'85%'} />
			<div style={{ position: 'relative', minHeight: '20vh' }}>
				{invLoading ? (
					<Spinner />
				) : products.length > 0 ? (
					<Fragment>
						<div className="ReviewPhase__summary">
							{products.map((product, index) => (
								<SummaryListItem
									index={index}
									key={product._id}
									deleteItem={itemId => deleteCartItem(itemId)}
									updateModalState={updateModalState}
									product={product}
								/>
							))}
						</div>
						<PricesBreakDown prices={prices} />
					</Fragment>
				) : (
					<h2 style={{ textAlign: 'center', marginTop: '3rem' }}>
						There are no products in cart. Feel free to add some items and check
						back later
					</h2>
				)}
			</div>
			{products.length > 0 ? (
				<CustomButton onClick={processOrder}>Proceed To Payment</CustomButton>
			) : null}
		</div>
	)
}

const mapStateToProps = createStructuredSelector({
	user: selectAuthUser,
	checkoutRole: selectAuthCheckoutRole,
	shippingAddress: selectCartShippingAddress,
	billingAddress: selectCartBillingAddress,
	cartProduct: selectCartProducts,
	coupon: selectCartCoupon,
	invLoading: selectInventoryLoading
})

export default connect(
	mapStateToProps,
	{ setStepProgress, deleteCartItem, createOrder }
)(ReviewPhase)
