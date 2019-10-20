import React from 'react'
import { Switch, Route } from 'react-router-dom'

import AdminLoginPage from './pages/AdminLoginPage'
import AdminDashboardPage from './pages/AdminDashboardPage'

const AdminApp = () => {
  return (
    <Switch>
      <Route exact path='/admin' component={ AdminLoginPage } />
      <Route path='/admin/dashboard' component={ AdminDashboardPage } />
    </Switch>
  )
}

export default AdminApp