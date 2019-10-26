import React from 'react'
import CouponsListItem from './CouponsListItem'

const CouponsList = ({ coupons, onClick }) => {
	return (
		<table className="AdminDashboardPage__coupons-table">
			<thead>
				<tr>
					<th>S.No</th>
					<th>Name</th>
					<th>Type</th>
					<th>Value</th>
					<th>Expires At</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				{coupons.map((coupon, index) => (
					<CouponsListItem onClick={onClick} key={coupon._id} coupon={coupon} index={index} />
				))}
			</tbody>
		</table>
	)
}

export default CouponsList
