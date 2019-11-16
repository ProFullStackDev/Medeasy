import React, { Fragment, useEffect } from 'react'
import '../../styles/components/OrderSummary.scss'

// Components
import OrderPillListItem from './OrderPillListItem'
import CustomButton from '../CustomButton'
import CustomFormElement from '../CustomFormElement'
import PricesBreakDown from '../CheckoutPage/PricesBreakDown'
import Spinner from '../Spinner'

import { connect } from 'react-redux'
import { selectInventoryLoading, selectInventoryCoupons } from '../../redux/selectors/inventorySelectors'
import { fetchAllCoupons } from '../../redux/actions/inventoryActions'
import { deleteCartItem } from '../../redux/actions/cartActions'
import { createStructuredSelector } from 'reselect'

import { ReactComponent as CloseIcon } from '../../images/closeBtn.svg'

const OrderSummary = ({
	handleSubmit,
	updateModalState,
	updateCouponState,
	cartProducts,
	loading,
	coupon,
	coupons,
	fetchAllCoupons,
	nullifyCoupon,
	deleteCartItem,
	handleChange,
	couponName,
	couponError,
	prices
}) => {

	const handleDelete = itemId => {
		deleteCartItem(itemId)
	}

	useEffect(() => {
		fetchAllCoupons()
	}, [fetchAllCoupons])

	console.log(coupons)

	return (
		<div className="OrderSummary">
			<p className="OrderSummary__title">Order Summary</p>
			{cartProducts.length ? (
				<Fragment>
					<div className="OrderSummary__allproducts">
						{loading ? (
							<Spinner />
						) : (
							cartProducts.map(product => (
								<OrderPillListItem
									deleteItem={handleDelete}
									updateModalState={updateModalState}
									product={product}
									key={product._id}
								/>
							))
						)}
					</div>
					{ coupons ? <div className="OrderSummary__coupon">
						<p
							style={{ display: 'inline-block', marginRight: '1rem' }}
							className="OrderSummary__coupon-title"
						>
							Discount / Coupon Code
						</p>
						{Object.keys(coupon).length === 0 ? (
							<Fragment>
								<span
									className='OrderSummary__coupon-button'
									onClick={() => updateCouponState(true)}
								>
									View coupons
								</span>
								<form
									className="OrderSummary__coupon-form"
									onSubmit={handleSubmit}
								>
									<CustomFormElement
										noStyle
										noLabel
										type="text"
										name="name"
										onChange={event => handleChange(event.target.value)}
										value={couponName.toUpperCase()}
									/>
									<CustomButton isSubmitButton fontSize="1.8rem">
										Apply
									</CustomButton>
								</form>
							</Fragment>
						) : null}
						{Object.keys(coupon).length > 0 ? (
							<p style={{ marginTop: '1rem' }}>
								Coupon applied:{' '}
								<span style={{ fontWeight: 'bold', color: '#F8931A' }}>
									{coupon.name}
								</span>
								<span
									onClick={nullifyCoupon}
									style={{ marginLeft: '1rem', cursor: 'pointer' }}
								>
									<CloseIcon style={{ width: '1.2rem', height: '1.2rem' }} />
								</span>
							</p>
						) : null}
						{couponError ? (
							<p style={{ marginTop: '1rem', color: '#D44A4A', fontWeight: 'bold' }}>
								{couponError}
							</p>
						) : null}
					</div> : null }
					<PricesBreakDown prices={prices} />
				</Fragment>
			) : (
				<Fragment>
					<h3 style={{ textAlign: 'center', marginTop: '10rem' }}>
						You have no items on cart{' '}
					</h3>
					<h3 style={{ textAlign: 'center' }}>
						Please check back after adding some
					</h3>
				</Fragment>
			)}
		</div>
	)
}

const mapStateToProps = createStructuredSelector({
	loading: selectInventoryLoading,
	coupons: selectInventoryCoupons
})

export default connect(
	mapStateToProps,
	{ deleteCartItem, fetchAllCoupons }
)(OrderSummary)
