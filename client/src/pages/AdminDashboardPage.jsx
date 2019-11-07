import React, { useState } from 'react'
import { Route, Redirect } from 'react-router-dom'

import AdminNavBar from '../components/AdminPage/AdminNavBar'
import AdminHome from './dashboard/AdminHome'
import AdminProducts from './dashboard/AdminProducts'
import AdminOrders from './dashboard/AdminOrders'
import AdminCoupons from './dashboard/AdminCoupons'
import AdminCategories from './dashboard/AdminCategories'
import AdminCreateProduct from './dashboard/AdminCreateProduct'
import AdminEditProduct from './dashboard/AdminEditProduct'
import AdminCouponForm from './dashboard/AdminCouponForm'
import AdminCategoriesForm from './dashboard/AdminCategoriesForm'
import AlertMessage from '../components/AlertMessage'
import AdminModal from '../components/AdminPage/AdminModal'

import '../styles/pages/AdminDashboardPage.scss'
import { ReactComponent as Hamburger } from '../images/hamburger.svg'

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectAuthUser } from '../redux/selectors/authSelectors'
import AdminOrderForm from './dashboard/AdminOrderForm'


const AdminDashboardPage = ({ user, match: { url }, history }) => {
  
  const [navBarState, setNavBarState] = useState(true)
  const [modalState, setModalState] = useState(false)

  return !user ? <Redirect to='/admin' />  : (
    <div className='AdminDashboardPage active'>
      <div style={{ display: `${modalState ? 'block' : 'none'}`}} className="AdminDashboardPage__overlay">
        <AdminModal onClick={boolVal => setModalState(boolVal)} />
      </div>
      <AdminNavBar history={history} url={url} navBarState={navBarState} />
      <div className="AdminDashboardPage__main-content">
        <span className='AdminDashboardPage__hamburger' onClick={() => setNavBarState(!navBarState)}><Hamburger style={{ width: '2.5rem', height: '2.5rem' }}/></span>
        <span className='AdminDashboardPage__user'> Welcome {user.name} !</span>
        <AlertMessage />
        <Route exact path={`${url}`} component={AdminHome} />
        <Route path={`${url}/products`} render={routeProps => <AdminProducts {...routeProps} onClick={boolVal => setModalState(boolVal)} />} />
        <Route path={`${url}/orders`} render={routeProps => <AdminOrders {...routeProps} onClick={boolVal => setModalState(boolVal)} />} />
        <Route path={`${url}/coupons`} render={routeProps => <AdminCoupons {...routeProps} onClick={boolVal => setModalState(boolVal)} />} />
        <Route path={`${url}/categories`} render={routeProps => <AdminCategories {...routeProps} onClick={boolVal => setModalState(boolVal)} />} />
        <Route path={`${url}/add-product`} component={AdminCreateProduct} />
        <Route path={`${url}/add-coupon`} component={AdminCouponForm} />
        <Route path={`${url}/add-category`} component={AdminCategoriesForm} />
        <Route path={`${url}/tracking/:orderId`} component={AdminOrderForm} />
        <Route path={`${url}/edit-product/:productId`} component={AdminEditProduct} />
        <Route path={`${url}/edit-coupon/:couponId`} component={AdminCouponForm} />
        <Route path={`${url}/edit-category/:categoryId`} component={AdminCategoriesForm} />
      </div>
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  user: selectAuthUser
})

export default connect(mapStateToProps)(AdminDashboardPage)
