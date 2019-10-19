import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import AdminCard from '../components/AdminCard'
import AdminModal from '../components/AdminModal'
import AdminSlider from '../components/AdminSlider'

const AdminDashboardPage = ({ match: { url } }) => {
  console.log(url)
  return (
    <div className='AdminDashboardPage'>
      <h1>Dashboard</h1>
      <AdminCard title='Total Products' value={30} btnRequired btnText='View products' />
      <AdminModal title='Confirm deletion' subTitle='Are you sure that you want to delete this product ?' />
      <AdminSlider />
      <Route exact path={`${url}`} render={renderProps => <h1>Home</h1>} />
      <Route path={`${url}/route1`} render={renderProps => <h2>Route 1</h2>} />
    </div>
  )
}

export default AdminDashboardPage
