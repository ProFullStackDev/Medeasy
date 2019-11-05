import React from 'react'
import { Link } from 'react-router-dom'
import CustomButton from '../CustomButton'

const OrdersList = ({ orders }) => {
	return (
		<table className="AdminDashboardPage__orders-table">
			<thead>
				<tr>
					<th>S.No</th>
					<th>Order Id</th>
					<th>Ordered by</th>
					<th>Order Status</th>
					<th>Order Amount</th>
					<th>Tracking Id</th>
					<th>Action</th>
				</tr>
			</thead>
			<tbody>
				{orders.map(({_id, trackingId, user: { name }, totalAmount, status}, index) => (
					<tr key={_id}>
          <td>{index + 1}</td>
          <td>{_id}</td>
          <td>{name}</td>
          <td style={{ color: status === 'Success' ? 'green' : 'orangered', fontWeight: 'bold' }}>{status}</td>
          <td>{totalAmount}$</td>
					<td style={{ fontWeight: 'bold', color: trackingId === 'nil' ? 'red': 'green' }}>{trackingId}</td>
					<Link to={`/admin/dashboard/tracking/${_id}`}><CustomButton extraStyle={{ background: trackingId === 'nil' ? 'orangered' : '#7ac7b8' }}>{ trackingId === 'nil' ? 'Add Tracking Id' : 'Update Tracking Id' }</CustomButton></Link>
        </tr>
				))}
			</tbody>
		</table>
	)
}

export default OrdersList
