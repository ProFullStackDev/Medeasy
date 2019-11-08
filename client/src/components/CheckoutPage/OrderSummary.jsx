import React, { useState, Fragment } from 'react'
import '../../styles/components/OrderSummary.scss'

// Components
import OrderPillListItem from './OrderPillListItem'
import CustomButton from '../CustomButton'
import CustomFormElement from '../CustomFormElement'
import PricesBreakDown from '../CheckoutPage/PricesBreakDown'
import Spinner from '../Spinner'

import { connect } from 'react-redux'
import { selectInventoryLoading } from '../../redux/selectors/inventorySelectors'
import { deleteCartItem } from '../../redux/actions/cartActions'
import { createStructuredSelector } from 'reselect'

const OrderSummary = ({
	updateModalState,
	cartProducts,
	loading,
	deleteCartItem
}) => {
	const prices = {
		subTotal: cartProducts.reduce(
			(acc, product) => (acc += parseInt(product.subTotal)),
			0
		),
		shippingPrice: 0,
		tax: 0,
		discount: 0
	}
	const [couponCode, setCouponCode] = useState('')
	const handleChange = event => setCouponCode(event.target.value)

	const handleDelete = itemId => {
		deleteCartItem(itemId)
	}

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
					<div className="OrderSummary__coupon">
						<p className="OrderSummary__coupon-title">Discount / Coupon Code</p>
						<form
							className="OrderSummary__coupon-form"
							onSubmit={() => console.log('Do something here')}
						>
							<CustomFormElement
								noStyle
								noLabel
								type="text"
								onChange={handleChange}
								value={couponCode}
							/>
							<CustomButton isSubmitButton fontSize="1.8rem">
								Apply
							</CustomButton>
						</form>
					</div>
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
	loading: selectInventoryLoading
})

export default connect(
	mapStateToProps,
	{ deleteCartItem }
)(OrderSummary)
