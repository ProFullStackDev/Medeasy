import React, { useEffect } from 'react'
import styled from 'styled-components'

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import {
	selectInventoryLoading,
	selectInventoryOrder
} from '../../redux/selectors/inventorySelectors'
import { fetchOrderById } from '../../redux/actions/inventoryActions'

import Spinner from '../../components/Spinner'
import ProductsTitle from '../../components/ProductsTitle'

const OrderDetailContainer = styled.div``

const ProductListContainer = styled.div`
	padding: 1.5rem 2rem;
	max-height: 60vh;
	overflow: auto;
	background: white;
	border-radius: 5px;
	box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1);
	margin-top: 1rem;
`
const ProductListItemContainer = styled.div`
	display: flex;
	justify-content: space-between;
	color: black;
	font-weight: bold;
`

const AdminOrderDetail = ({
	loading,
	order,
	fetchOrderById,
	match: {
		params: { orderId }
	}
}) => {
	useEffect(() => {
		fetchOrderById(orderId)
	}, [fetchOrderById, orderId])
	return !order || loading ? (
		<Spinner />
	) : (
		<OrderDetailContainer>
			<h2 style={{ marginBottom: '2rem' }}>Order number: {orderId}</h2>
			<ProductsTitle />
			<ProductListContainer>
				{order.products.map(
					(
						{ _id, name, attributes: { dosage, quantity }, subTotal },
						index
					) => (
						<ProductListItemContainer key={_id}>
							<p>{index + 1}</p>
							<p>{name}</p>
							<p>{dosage}</p>
							<p>{quantity}</p>
							<p>{subTotal}</p>
						</ProductListItemContainer>
					)
				)}
			</ProductListContainer>
			<h3
				style={{
					display: 'flex',
					justifyContent: 'flex-end',
					marginTop: '2rem',
					fontWeight: 'bold'
				}}
			>
				Total Amount: $ {order.totalAmount}
			</h3>
		</OrderDetailContainer>
	)
}

const mapStateToProps = createStructuredSelector({
	order: selectInventoryOrder,
	loading: selectInventoryLoading
})

export default connect(
	mapStateToProps,
	{ fetchOrderById }
)(AdminOrderDetail)
