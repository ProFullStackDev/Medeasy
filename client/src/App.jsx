import React from 'react'
import MainApp from './MainApp'
import AdminApp from './AdminApp'

import axios from 'axios'
import { connect } from 'react-redux'
import { logout } from './redux/actions/authActions'

const App = ({ logout }) => {
	// Logout if unathuorised access means
	axios.interceptors.response.use(
		res => res,
		err => {
			const statusCode = err.response.data.statusCode
			if (statusCode === 401) logout('Session Expired')
			return Promise.reject(err)
		}
	)

	return (
		<div className="App">
			{window.location.pathname.match(/\/admin/g) ? <AdminApp /> : <MainApp />}
		</div>
	)
}

export default connect(
	null,
	{ logout }
)(App)
