import React, { Fragment } from 'react'
import { Switch, Route, Link, Redirect } from 'react-router-dom'
import AdminLogin from './pages/admin/AdminLogin'

const AdminApp = () => {
  return (
    <Switch>
      <Route exact path='/admin' component={AdminLogin} />
    </Switch>
  )
}

export default AdminApp