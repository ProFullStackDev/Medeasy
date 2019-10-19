import React from 'react'
import { Switch, Route } from 'react-router-dom'

import AdminLoginPage from './pages/AdminLoginPage'
import AdminDashboardPage from './pages/AdminDashboardPage'

const AdminApp = () => {
  return (
    <>
      <Route exact path='/admin' component={ AdminLoginPage } />
      <Route path='/admin/dashboard' component={ AdminDashboardPage } />
    </>
  )
}

export default AdminApp