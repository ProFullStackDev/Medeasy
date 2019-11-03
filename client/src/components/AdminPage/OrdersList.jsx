import React from 'react'
import Moment from 'react-moment'

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
				</tr>
			</thead>
			<tbody>
				{orders.map(({_id, createdAt, user: { name }, totalAmount, status}, index) => (
					<tr key={_id}>
          <td>{index + 1}</td>
          <td>{_id}</td>
          <td><Moment format='DD-MM-YYYY'>{createdAt}</Moment></td>
          <td>{name}</td>
          <td style={{ color: status === 'Success' ? 'green' : 'orangered', fontWeight: 'bold' }}>{status}</td>
          <td>{totalAmount}$</td>
        </tr>
				))}
			</tbody>
		</table>
	)
}

export default OrdersList
