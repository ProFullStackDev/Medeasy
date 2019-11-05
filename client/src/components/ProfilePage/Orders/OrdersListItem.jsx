import React, { useState } from 'react'
import { ReactComponent as PlusIcon } from '../../../images/plus-icon.svg'
import { ReactComponent as MinusIcon } from '../../../images/minus.svg'
import OrdersProductList from './OrdersProductList'
import '../../../styles/components/OrdersListItem.scss'

const OrdersListItem = ({
	order: { _id, totalAmount, products, trackingId }
}) => {
	const [expandedMode, setExpandedMode] = useState(false)
	// If the expanded Mode is true then hide all the products and show only the order number
	const markup = expandedMode ? (
		<p
			style={{ fontSize: '2rem', paddingLeft: '3rem' }}
			className="OrdersListItem__order-ordernumber"
		>{`Order #${_id}`}</p>
	) : (
		<React.Fragment>
			<div className="OrdersListItem__order">
				<p
					style={{ fontSize: '2rem' }}
					className="OrdersListItem__order-ordernumber"
				>{`Order #${_id}`}</p>
				<OrdersProductList products={products} />
			</div>
			<div className="OrdersListItem__price">
				<p
					className="OrdersListItem__price-value"
					style={{ color: '4A4A4A', fontSize: '2.2rem' }}
				>{`$${totalAmount}`}</p>
				{trackingId === 'nil' ? (
					<p
						className="OrdersListItem__price-tracking"
						style={{ color: '#7AC7B8', marginTop: '1rem', textAlign: 'center' }}
					>
						We will email your Tracking Id in{' '}
						<p style={{ color: 'red', fontWeight: 'bold' }}> 2 - 3 business days</p>
					</p>
				) : (
					<p
						className="OrdersListItem__price-tracking"
						style={{ color: '#7AC7B8', marginTop: '1rem', textAlign: 'center' }}
					>
						Your tracking id is{' '}
						<p style={{ color: 'red', fontWeight: 'bold' }}>{trackingId}</p>
						<br />
						<p style={{ color: '#333' }}>
							Track you shipment{' '}
							<a
								target="_blank"
								rel="noopener noreferrer"
								style={{ color: '#7AC7B8', fontWeight: 'bold' }}
								href={`https://t.17track.net/en#nums=${trackingId}`}
							>
								here
							</a>
						</p>
					</p>
				)}
			</div>
		</React.Fragment>
	)
	return (
		<div className="OrdersListItem">
			{markup}
			<div className="OrdersListItem__icon">
				{expandedMode ? (
					<span
						style={{ cursor: 'pointer' }}
						onClick={() => setExpandedMode(false)}
					>
						<PlusIcon />
					</span>
				) : (
					<span
						style={{ cursor: 'pointer' }}
						onClick={() => setExpandedMode(true)}
					>
						<MinusIcon />
					</span>
				)}
			</div>
		</div>
	)
}

export default OrdersListItem
