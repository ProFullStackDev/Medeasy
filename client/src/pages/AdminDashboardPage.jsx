import React, { useState } from 'react'
import { Route, Redirect } from 'react-router-dom'

import AdminNavBar from '../components/AdminPage/AdminNavBar'
import AdminHome from './dashboard/AdminHome'
import AdminProducts from './dashboard/AdminProducts'
import AdminOrders from './dashboard/AdminOrders'
import AdminCoupons from './dashboard/AdminCoupons'
import AdminCreateProduct from './dashboard/AdminCreateProduct'

import '../styles/pages/AdminDashboardPage.scss'
import { ReactComponent as Hamburger } from '../images/hamburger.svg'

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectAuthUser } from '../redux/selectors/authSelectors'


const AdminDashboardPage = ({ user, match: { url }, history }) => {
  const [navBarState, setNavBarState] = useState(true)
  return !user ? <Redirect to='/admin' />  : (
    <div className='AdminDashboardPage'>
      <AdminNavBar history={history} url={url} navBarState={navBarState} />
      <div className="AdminDashboardPage__main-content">
        <span className='AdminDashboardPage__hamburger' onClick={() => setNavBarState(!navBarState)}><Hamburger style={{ width: '2.5rem', height: '2.5rem' }}/></span>
        <span className='AdminDashboardPage__user'> Welcome {user.name} !</span>
        <Route exact path={`${url}`} component={AdminHome} />
        <Route path={`${url}/products`} component={AdminProducts} />
        <Route path={`${url}/orders`} component={AdminOrders} />
        <Route path={`${url}/coupons`} component={AdminCoupons} />
        <Route path={`${url}/create-product`} component={AdminCreateProduct} />
      </div>
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  user: selectAuthUser
})

export default connect(mapStateToProps)(AdminDashboardPage)
