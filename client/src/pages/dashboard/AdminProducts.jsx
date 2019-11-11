import React, { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectInventoryProducts } from '../../redux/selectors/inventorySelectors'
import { fetchAllProducts } from '../../redux/actions/inventoryActions'

import Spinner from '../../components/Spinner'
import CustomButton from '../../components/CustomButton'
import ProductList from '../../components/AdminPage/ProductList'
import AdminCarousel from '../../components/AdminPage/AdminCarousel'

const AdminProducts = ({ products, fetchAllProducts, onClick }) => {
	// If there are no products on state, means fetch them
	useEffect(() => {
		fetchAllProducts()
	}, [fetchAllProducts])

	const [pageNumber, setPageNumber] = useState(1)
	const handleClick = page => setPageNumber(page)

	return !products ? (
		<Spinner white={false} />
	) : (
		<div className="AdminDashboardPage__products">
			<div className="AdminDashboardPage__products-info">
				<h2>ALL PRODUCTS</h2>
				<Link to="/admin/dashboard/add-product">
					<CustomButton>Add product</CustomButton>
				</Link>
				<Link><CustomButton>Select Featured Products</CustomButton></Link>
			</div>
			<ProductList
				onClick={onClick}
				products={products.slice((pageNumber - 1) * 10, 10 * pageNumber)}
			/>
			<AdminCarousel
				onClick={handleClick}
				totalPages={Math.ceil(products.length / 10)}
				currentPageNumber={pageNumber}
			/>
		</div>
	)
}

const mapStateToProps = createStructuredSelector({
	products: selectInventoryProducts
})

export default connect(
	mapStateToProps,
	{ fetchAllProducts }
)(AdminProducts)
