import React from 'react'
import ProductListItem from './ProductListItem'

const ProductList = ({ products, onClick }) => {
	return (
		<table className="AdminDashboardPage__products-table">
			<thead>
				<tr>
					<th>S.No</th>
					<th>Name</th>
					<th>Dosage</th>
					<th>Quantity</th>
					<th>Stock Availablity</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				{products.map((product, index) => (
					<ProductListItem onClick={onClick} key={product._id} product={product} index={index} />
				))}
			</tbody>
		</table>
	)
}

export default ProductList
