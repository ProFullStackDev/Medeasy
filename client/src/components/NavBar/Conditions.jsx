import React from 'react'
import { Link } from 'react-router-dom'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import {
	selectInventoryProducts,
	selectInventoryCategories
} from '../../redux/selectors/inventorySelectors'
import '../../styles/components/NavBarDropdown.scss'

const Conditions = ({ products, conditions, onClick }) => {
	return (
		<div className="Conditions">
			{conditions.map(condition => (
				<ul key={condition._id} className="Conditions__list">
					<Link
						onClick={onClick}
						to={`/condition/${condition._id}`}
						className="Conditions__list-title"
					>
						{condition.name}
					</Link>
						{products
							.filter(
								product => product.category._id.toString() === condition._id
							)
							.map(product => (
								<Link
									className="Conditions__list-item"
									onClick={onClick}
									to={`/product/${product._id}`}
									key={product._id}
								>
									{product.name}
								</Link>
							))}
				</ul>
			))}
		</div>
	)
}

const mapStateToProps = createStructuredSelector({
	products: selectInventoryProducts,
	conditions: selectInventoryCategories
})

export default connect(mapStateToProps)(Conditions)
