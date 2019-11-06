import React, { useEffect, useState } from 'react'

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import {
	selectInventoryProducts,
	selectInventoryCategories
} from '../redux/selectors/inventorySelectors'

import styled from 'styled-components'

import ProductsCarousel from '../components/ProductsCarousel'
import ProductList from '../components/ProductList'

// Styles
const Title = styled.h2`
	margin-top: 2rem;
	font-weight: bolder;
	font-size: 2.5rem;
	text-transform: uppercase;
	color: black;
`

const DescriptionContainer = styled.div`
	margin: 1.5rem 0;
	padding: 2rem;
	border-radius: 5px;
	width: 100%;
	min-height: 15rem;
	box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1);
	& p {
		&:not(:last-child) {
			margin-bottom: 1.5rem
		}
	}
`

const CategoryProductsPage = ({
	products,
	categories,
	match: {
		params: { conditionId }
	}
}) => {
	const [currentPageNumber, setCurrentPageNumber] = useState(1)

	const { name, description } = categories.find(cat => cat._id === conditionId)
	console.log(name, description)
	const categoryProducts = products.filter(
		product => product.category._id === conditionId
	)

	return (
		<section className="CategoryProductsPage">
			<Title>
				{name} : {categoryProducts.length} Products
			</Title>
			<ProductsCarousel
				onClick={pageNumber => setCurrentPageNumber(pageNumber)}
				currentPageNumber={currentPageNumber}
				totalPages={Math.ceil(products.length / 30)}
			/>
			<ProductList
				products={categoryProducts.slice(
					(currentPageNumber - 1) * 30,
					30 * currentPageNumber
				)}
			/>
			<ProductsCarousel
				onClick={pageNumber => setCurrentPageNumber(pageNumber)}
				currentPageNumber={currentPageNumber}
				totalPages={Math.ceil(products.length / 30)}
			/>
			<Title>Description </Title>
			<DescriptionContainer>
				{description.split(/\n/g).map((d, index) => <p>{d}</p>)}
			</DescriptionContainer>
		</section>
	)
}

const mapStateToProps = createStructuredSelector({
	products: selectInventoryProducts,
	categories: selectInventoryCategories
})

export default connect(mapStateToProps)(CategoryProductsPage)