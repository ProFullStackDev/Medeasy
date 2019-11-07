import React from 'react'
import CartListItem from './CartListItem'
import '../../styles/components/CartList.scss'

const CartList = ({ decideModalState, cartProducts, onDelete }) => {
	return (
		<div className="CartList">
			{/* Loop here for all the products */}
			{cartProducts.map(product => (
				<CartListItem
        onDelete={onDelete}
					decideModalState={decideModalState}
					key={product._id}
					cartProduct={product}
				/>
			))}
		</div>
	)
}

export default CartList
