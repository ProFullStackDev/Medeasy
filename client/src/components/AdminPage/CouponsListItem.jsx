import React from 'react'
import CustomButton from '../../components/CustomButton'

import { connect } from 'react-redux'
import { alertModal } from '../../redux/actions/alertActions'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'

const CouponListItem = ({
	onClick,
	alertModal,
	coupon: { _id, name, type, value, expiryDate },
	index
}) => {
	const handleClick = () => {
		const modalObj = {
			title: 'CONFIRM DELETION',
			subTitle: 'Are you sure that you want to delete this coupon ?',
			extraInfo: { id: _id, relation: 'coupon' }
		}
		alertModal(modalObj)
		onClick(true)
	}

	return (
		<tr>
			<td>{index + 1}</td>
			<td>{name}</td>
			<td>{type}</td>
			<td>{value} {type === 'percent' ? '%' : '$'}</td>
			<td><Moment format='DD-MM-YYYY'>{expiryDate}</Moment></td>
			<td>
				<Link to={`/admin/dashboard/edit-coupon/${_id}`}>
					<CustomButton
						extraStyle={{ padding: '.5rem 2rem' }}
						specialBgColor="#F8931A"
					>
						Edit
					</CustomButton>
				</Link>
				<CustomButton
					onClick={handleClick}
					extraStyle={{ padding: '.5rem 2rem', marginLeft: '1.5rem' }}
					specialBgColor="#D44A4A"
				>
					Delete
				</CustomButton>
			</td>
		</tr>
	)
}

export default connect(
	null,
	{ alertModal }
)(CouponListItem)
