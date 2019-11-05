import React, { useState } from 'react'

import { connect } from 'react-redux'

import CustomButton from '../../components/CustomButton'
import CustomFormElement from '../../components/CustomFormElement'
import { addTrackingId } from '../../redux/actions/inventoryActions'

const AdminCouponForm = ({
	match: {
		params: { orderId }
  },
  addTrackingId
}) => {
	const pageTitle = 'Update Tracking Id'

	const [trackingId, setTrackingId] = useState('')

	const handleSubmit = event => {
		event.preventDefault()
		if (
			window.confirm(
				'This change will intimate the Customer. Confirm updating Tracking Id ?'
			)
		)
			addTrackingId(trackingId, orderId)
	}

	const handleChange = event => setTrackingId(event.target.value)

	return (
		<div style={{ width: '80%' }} className="AdminDashboardPage__coupon-form">
			<h2>{pageTitle}</h2>
			<form onSubmit={handleSubmit}>
				<CustomFormElement
					required
					type="text"
					name="trackingId"
					value={trackingId}
					onChange={handleChange}
					placeholder="Package Tracking Id"
				/>
				<CustomButton extraStyle={{ width: '100%' }} isSubmitButton>
					Update Tracking Id
				</CustomButton>
			</form>
		</div>
	)
}

export default connect(
	null,
	{ addTrackingId }
)(AdminCouponForm)
