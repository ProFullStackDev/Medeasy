import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import AdminCard from '../../components/AdminPage/AdminCard'
import Spinner from '../../components/Spinner'

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { fetchInventory } from '../../redux/actions/inventoryActions'

import {
  selectInventoryCoupons,
  selectInventoryOrders,
  selectInventoryProducts
} from '../../redux/selectors/inventorySelectors'

const AdminHome = ({ fetchInventory, products, orders, coupons }) => {
  useEffect(() => {
    fetchInventory()
  }, [fetchInventory])
  return !orders || !products ? (
    <Spinner white={false} />
  ) : (
    <div className='AdminDashboardPage__home'>
      <Helmet>
        <title>Medeasy - Admin Homepage</title>
        <meta name='description' content='Admin Homepage' />
      </Helmet>
      <AdminCard
        title='Total Products'
        value={products.length.toString()}
        btnRequired
        btnText='View Products'
        btnLink='products'
      />
      <AdminCard
        title='Total Orders'
        value={orders.length.toString()}
        btnRequired
        btnText='View Orders'
        btnLink='orders'
      />
      <AdminCard
        title='Total Sales'
        value={
          orders
            .filter(o => o.status === 'Success')
            .reduce((acc, order) => (acc += order.totalAmount), 0) + '$'
        }
      />
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  products: selectInventoryProducts,
  coupons: selectInventoryCoupons,
  orders: selectInventoryOrders
})

export default connect(mapStateToProps, { fetchInventory })(AdminHome)
