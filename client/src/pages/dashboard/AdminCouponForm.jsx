import React, { useState, useEffect } from 'react'

import { connect } from 'react-redux'
import moment from 'moment'
import { createStructuredSelector } from 'reselect'
import {
	selectInventoryLoading,
	selectInventoryCoupon
} from '../../redux/selectors/inventorySelectors'
import {
	addCoupon,
	fetchCouponById,
	updateCoupon
} from '../../redux/actions/inventoryActions'

import CustomButton from '../../components/CustomButton'
import CustomFormElement from '../../components/CustomFormElement'
import Spinner from '../../components/Spinner'

const AdminCouponForm = ({
	loading,
	addCoupon,
	updateCoupon,
	coupon,
	fetchCouponById,
	match: {
		url,
		params: { couponId }
	}
}) => {
	const pageTitle =
		url === '/admin/dashboard/add-coupon' ? 'Add a coupon' : 'Edit coupon'

	useEffect(() => {
		const fetchData = async () => {
			if (url === `/admin/dashboard/edit-coupon/${couponId}`) {
				const {
					name,
					description,
					type,
					value,
					expiresAt
				} = await fetchCouponById(couponId)
				setFormState({
					name,
					description,
					type,
					value,
					expiresAt: moment(expiresAt).format('YYYY-MM-DD')
				})
			}
		}
		fetchData()
	}, [couponId, fetchCouponById, url])

	const [formState, setFormState] = useState({
		name: '',
		type: '',
		value: '',
		description: '',
		expiresAt: ''
	})

	const { name, type, value, description, expiresAt } = formState

	const handleSubmit = event => {
		event.preventDefault()
		if (url === `/admin/dashboard/edit-coupon/${couponId}`)
			updateCoupon(formState, couponId)
		else addCoupon(formState)
	}

	const handleChange = event =>
		setFormState({ ...formState, [event.target.name]: event.target.value })

	return loading ? (
		<Spinner white={false} />
	) : url === `/admin/dashboard/edit-coupon/${couponId}` && !coupon ? (
		<Spinner white={false} />
	) : (
		<div style={{ width: '80%' }} className="AdminDashboardPage__coupon-form">
			<h2>{pageTitle}</h2>
			<form onSubmit={handleSubmit}>
				<CustomFormElement
					required
					type="text"
					name="name"
					value={name}
					onChange={handleChange}
					placeholder="Coupon Name"
				/>

				<select required name="type" value={type} onChange={handleChange}>
					<option value="" defaultValue disabled>
						Coupon Type
					</option>
					<option value="percent">Percentage</option>
					<option value="price">Price</option>
				</select>

				<CustomFormElement
					required
					type="number"
					placeholder="Coupon Value"
					name="value"
					value={value}
					onChange={handleChange}
				/>
				<CustomFormElement
					isTextArea
					type="text"
					name="description"
					value={description}
					onChange={handleChange}
					placeholder="Coupon Description"
				/>
				<input
					type="date"
					required
					value={expiresAt}
					name="expiresAt"
					placeholder="Expiry Date"
					onChange={handleChange}
				/>
				<CustomButton extraStyle={{ width: '100%' }} isSubmitButton>
					{url === `/admin/dashboard/edit-coupon/${couponId}`
						? 'Edit coupon'
						: 'Add coupon'}
				</CustomButton>
			</form>
		</div>
	)
}

const mapStateToProps = createStructuredSelector({
	loading: selectInventoryLoading,
	coupon: selectInventoryCoupon
})

export default connect(
	mapStateToProps,
	{ addCoupon, fetchCouponById, updateCoupon }
)(AdminCouponForm)
