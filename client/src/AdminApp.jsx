import React from 'react'
import { Switch, Route } from 'react-router-dom'

import AdminLoginPage from './pages/AdminLoginPage'
import AdminDashboardPage from './pages/AdminDashboardPage'

import axios from 'axios'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectAuthAccessToken } from './redux/selectors/authSelectors'

const AdminApp = ({ accessToken }) => {
  if (accessToken) axios.defaults.headers.common['Authorization'] = accessToken
  return (
    <Switch>
      <Route exact path='/admin' component={ AdminLoginPage } />
      <Route path='/admin/dashboard' component={ AdminDashboardPage } />
    </Switch>
  )
}

const mapStateToProps = createStructuredSelector({
  accessToken: selectAuthAccessToken
})

export default connect(mapStateToProps)(AdminApp)