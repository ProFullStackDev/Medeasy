import React from 'react'
import CustomButton from '../CustomButton'
import { Link } from 'react-router-dom'

const OrdersList = ({ orders, history, url }) => {
  return (
    <table className='AdminDashboardPage__orders-table'>
      <thead>
        <tr>
          <th>S.No</th>
          <th>Order Id</th>
          <th>Ordered by</th>
          <th>Payment Method</th>
          <th>Order Status</th>
          <th>Order Amount</th>
          <th>Tracking Id</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {orders.map(
          (
            { _id, trackingId, user: { name }, totalAmount, status, method },
            index
          ) => (
            <tr key={_id}>
              <td>{index + 1}</td>
              <td>
                <Link
                  style={{ color: '#7AC7B8', fontWeight: 'bold' }}
                  to={`${url}/${_id}`}
                >
                  {_id}
                </Link>
              </td>
              <td>{name}</td>
              <td>{method}</td>
              <td
                style={{
                  color: status === 'Success' ? 'green' : 'orangered',
                  fontWeight: 'bold'
                }}
              >
                {status}
              </td>
              <td>{totalAmount}$</td>
              <td
                style={{
                  fontWeight: 'bold',
                  color: trackingId === 'nil' ? 'red' : 'green'
                }}
              >
                {trackingId}
              </td>
              <td>
                {status !== 'Pending' ? (
                  <CustomButton
                    onClick={() =>
                      history.push(`/admin/dashboard/tracking/${_id}`)
                    }
                    extraStyle={{
                      background: trackingId === 'nil' ? 'orangered' : '#7ac7b8'
                    }}
                  >
                    {trackingId === 'nil'
                      ? 'Add Tracking Id'
                      : 'Update Tracking Id'}
                  </CustomButton>
                ) : method === 'Western Union' ? (
                  <CustomButton
                    onClick={() =>
                      history.push(`/admin/dashboard/western/${_id}`)
                    }
                    extraStyle={{ background: '#f1c40f' }}
                  >
                    Process Order
                  </CustomButton>
                ) : null}{' '}
              </td>
            </tr>
          )
        )}
      </tbody>
    </table>
  )
}

export default OrdersList
