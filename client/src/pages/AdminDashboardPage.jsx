import React, { useState } from 'react'
import { Route, Redirect } from 'react-router-dom'

import AdminNavBar from '../components/AdminPage/AdminNavBar'
import AlertMessage from '../components/AlertMessage'
import AdminModal from '../components/AdminPage/AdminModal'

import AdminHome from './dashboard/AdminHome'
import AdminProducts from './dashboard/AdminProducts'
import { AdminFeaturedProducts } from './dashboard/AdminFeaturedProducts'
import AdminOrders from './dashboard/AdminOrders'
import AdminOrderDetail from './dashboard/AdminOrderDetail'
import AdminCoupons from './dashboard/AdminCoupons'
import AdminCategories from './dashboard/AdminCategories'
import AdminCreateProduct from './dashboard/AdminCreateProduct'
import AdminEditProduct from './dashboard/AdminEditProduct'
import AdminCouponForm from './dashboard/AdminCouponForm'
import AdminCategoriesForm from './dashboard/AdminCategoriesForm'
import WesternUnionProcess from './dashboard/WesternUnionProcess'

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
        <Route exact path={`${url}/products`} render={routeProps => <AdminProducts {...routeProps} onClick={boolVal => setModalState(boolVal)} />} />
        <Route exact path={`${url}/orders`} render={routeProps => <AdminOrders {...routeProps} onClick={boolVal => setModalState(boolVal)} />} />
        <Route exact path={`${url}/orders/:orderId`} component={AdminOrderDetail} />
        <Route exact path={`${url}/coupons`} render={routeProps => <AdminCoupons {...routeProps} onClick={boolVal => setModalState(boolVal)} />} />
        <Route exact path={`${url}/categories`} render={routeProps => <AdminCategories {...routeProps} onClick={boolVal => setModalState(boolVal)} />} />
        <Route exact path={`${url}/add-product`} component={AdminCreateProduct} />
        <Route exact path={`${url}/product/featured`} component={AdminFeaturedProducts} />
        <Route exact path={`${url}/add-coupon`} component={AdminCouponForm} />
        <Route exact path={`${url}/add-category`} component={AdminCategoriesForm} />
        <Route exact path={`${url}/tracking/:orderId`} component={AdminOrderForm} />
        <Route exact path={`${url}/western/:orderId`} component={WesternUnionProcess} />
        <Route exact path={`${url}/edit-product/:productId`} component={AdminEditProduct} />
        <Route exact path={`${url}/edit-coupon/:couponId`} component={AdminCouponForm} />
        <Route exact path={`${url}/edit-category/:categoryId`} component={AdminCategoriesForm} />
      </div>
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  user: selectAuthUser
})

export default connect(mapStateToProps)(AdminDashboardPage)
