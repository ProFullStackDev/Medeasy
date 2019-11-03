import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Redirect, Route } from 'react-router-dom'
import { selectAuthUser } from '../redux/selectors/authSelectors'

const PrivateRoute = ({ component: Component, user, ...otherProps }) => (
	<Route
		{...otherProps}
		render={props =>
			!user ? <Redirect to="/login" /> : <Component {...props} />
		}
	/>
)

const mapStateToProps = createStructuredSelector({
	user: selectAuthUser
})

export default connect(mapStateToProps)(PrivateRoute)
