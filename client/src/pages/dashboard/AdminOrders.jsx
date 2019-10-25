import React, { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectInventoryOrders } from '../../redux/selectors/inventorySelectors'
import { fetchAllOrders } from '../../redux/actions/inventoryActions'

import Spinner from '../../components/Spinner'
import CustomButton from '../../components/CustomButton'
import ProductList from '../../components/AdminPage/ProductList'
import AdminCarousel from '../../components/AdminPage/AdminCarousel'

const Adminorders = ({ orders, fetchAllOrders, onClick }) => {
	// If there are no orders on state, means fetch them
	useEffect(() => {
		if (!orders) fetchAllOrders()
	}, [orders, fetchAllOrders])

	const [pageNumber, setPageNumber] = useState(1)
	const handleClick = page => setPageNumber(page)

	return !orders ? (
		<Spinner />
	) : (
		<div className="AdminDashboardPage__orders">
			<div className="AdminDashboardPage__orders-info">
				<h2>ALL orders</h2>
				<Link to="/admin/dashboard/add-order">
					<CustomButton>Add product</CustomButton>
				</Link>
			</div>
			<ProductList
				onClick={onClick}
				orders={orders.slice((pageNumber - 1) * 10, 10 * pageNumber)}
			/>
			<AdminCarousel
				onClick={handleClick}
				totalPages={Math.ceil(orders.length / 10)}
				currentPageNumber={pageNumber}
			/>
		</div>
	)
}

const mapStateToProps = createStructuredSelector({
	orders: selectInventoryOrders
})

export default connect(
	mapStateToProps,
	{ fetchAllOrders }
)(Adminorders)
