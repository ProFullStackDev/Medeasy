import React, { useState } from 'react'
import { Route, Redirect } from 'react-router-dom'
import AdminNavBar from '../components/AdminPage/AdminNavBar'
import { ReactComponent as Hamburger } from '../images/hamburger.svg'

import '../styles/pages/AdminDashboardPage.scss'

const AdminDashboardPage = ({ match: { url }, history }) => {
  const [navBarState, setNavBarState] = useState(true)
  return (
    <div className='AdminDashboardPage'>
      <AdminNavBar history={history} url={url} navBarState={navBarState} />
      <div className="AdminDashboardPage__main-content">
        <span className='AdminDashboardPage__hamburger' onClick={() => setNavBarState(!navBarState)}><Hamburger style={{ width: '2.5rem', height: '2.5rem' }}/></span>
        <span className='AdminDashboardPage__user'>Harish Akira</span>
        <Route exact path={`${url}`} render={() => <h1>asd</h1>} />
        <Route path={`${url}/products`} render={() => <h1>s</h1>} />
      </div>
    </div>
  )
}

export default AdminDashboardPage
