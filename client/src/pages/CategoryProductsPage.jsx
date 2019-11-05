import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { fetchAllProducts } from '../redux/actions/inventoryActions'
import {
	selectInventoryProducts,
	selectInventoryCategories
} from '../redux/selectors/inventorySelectors'

import ProductsCarousel from '../components/ProductsCarousel'
import ProductList from '../components/ProductList'
import Spinner from '../components/Spinner'

const CategoryProductsPage = ({
	products,
	categories,
	fetchAllProducts,
	match: {
		params: { conditionId }
	}
}) => {
	useEffect(() => {
		if (!products) fetchAllProducts()
	}, [fetchAllProducts, products])

	const categoryName = categories.find(cat => cat._id === conditionId).name

	const [currentPageNumber, setCurrentPageNumber] = useState(1)

	return !products ? (
		<Spinner />
	) : (
		<section style={{ minHeight: '60vh' }} className="CategoryProductsPage">
			<h2 className="CategoryProductsPage__title">
				{categoryName} :{' '}
				{
					products.filter(product => product.category._id === conditionId)
						.length
				}{' '}
				Products
			</h2>
			<ProductsCarousel
				onClick={pageNumber => setCurrentPageNumber(pageNumber)}
				currentPageNumber={currentPageNumber}
				totalPages={Math.ceil(products.length / 30)}
			/>
			<ProductList
				products={products
					.filter(product => product.category._id === conditionId)
					.slice((currentPageNumber - 1) * 30, 30 * currentPageNumber)}
			/>
		</section>
	)
}

const mapStateToProps = createStructuredSelector({
	products: selectInventoryProducts,
	categories: selectInventoryCategories
})

export default connect(
	mapStateToProps,
	{ fetchAllProducts }
)(CategoryProductsPage)
