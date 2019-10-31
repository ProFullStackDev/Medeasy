import React from 'react'
import MainApp from './MainApp'
import AdminApp from './AdminApp'
import PasswordResetPage from './pages/PasswordResetPage'

import axios from 'axios'
import { connect } from 'react-redux'
import { logout } from './redux/actions/authActions'
import { Route, Switch } from 'react-router-dom'

const App = ({ logout }) => {
	// Logout if unathuorised access means
	axios.interceptors.response.use(
		res => res,
		err => {
			const statusCode = err.response.data.statusCode
			const method = err.response.data.method
			if ((statusCode === 401 || statusCode === 403) && method === undefined)
				logout('Session Expired')
			return Promise.reject(err)
		}
	)

	return (
		<div className="App">
			<Switch>
				<Route exact path='/password/reset/:resetToken' component={PasswordResetPage} />
				{window.location.pathname.match(/\/admin/g) ? <AdminApp /> : <MainApp />}
			</Switch>
		</div>
	)
}

/* 
	{window.location.pathname.match(/\/admin/g) ? (
				<AdminApp />
			) : window.location.pathname.match(/\/password\/reset/g) ? (
				<PasswordResetPage />
			) : (
				<MainApp />
			)}
*/

export default connect(
	null,
	{ logout }
)(App)
