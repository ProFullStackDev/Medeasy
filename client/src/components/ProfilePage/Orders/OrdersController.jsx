import React, { useEffect } from 'react'

import OrdersList from './OrdersList'
import Spinner from '../../Spinner'
import AlertMessage from '../../AlertMessage'

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { fetchUserOrders } from '../../../redux/actions/profileActions'
import {
	selectProfileOrders,
	selectProfileLoading
} from '../../../redux/selectors/profileSelectors'

const OrdersController = ({ orders, loading, fetchUserOrders }) => {
	useEffect(() => {
		fetchUserOrders()
	}, [fetchUserOrders])

	return loading ? (
		<Spinner />
	) : (
		<div className="OrdersController">
			<h2 className="ProfilePage__phase-title">My Orders</h2>
			<AlertMessage />
			{orders.length > 0 ? (
				<OrdersList orders={orders} />
			) : (
				<div className="AddressChangeMain__noaddress">
					<p className="AddressChangeMain__noaddress-text">
						You don’t have any orders.
						<br />
						Feel free to check back once you make an order up.
					</p>
				</div>
			)}
		</div>
	)
}

const mapStateToProps = createStructuredSelector({
	orders: selectProfileOrders,
	loading: selectProfileLoading
})

export default connect(
	mapStateToProps,
	{ fetchUserOrders }
)(OrdersController)
