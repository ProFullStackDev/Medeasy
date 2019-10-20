import React, { useEffect } from 'react'
import AdminCard from '../../components/AdminPage/AdminCard'

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { fetchAllProducts } from '../../redux/actions/inventoryActions'

const AdminHome = ({ fetchAllProducts }) => {
  useEffect(() => {
    fetchAllProducts()
  }, [])
  return (
    <div className='AdminDashboardPage__home'>
      <AdminCard title='Total Products' value={20} btnRequired btnText='View Products' btnLink='products' />
      <AdminCard title='Total Orders' value={30} btnRequired btnText='View Orders' btnLink='orders' />
      <AdminCard title='Total Sales' value={1234} />
    </div>
  )
}

const mapStateToProps = createStructuredSelector({

})

export default connect(mapStateToProps, { fetchAllProducts })(AdminHome)
