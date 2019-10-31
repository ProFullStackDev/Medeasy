import React from 'react'
import ProfilePageNavBar from '../components/ProfilePage/ProfilePageNavBar'
import ProfilePageDisplay from '../components/ProfilePage/ProfilePageDisplay'
import { Route } from 'react-router-dom'

import '../styles/pages/ProfilePage.scss'

const ProfilePage = ({ match: { url } }) => {
	return (
		<section className="ProfilePage">
			<ProfilePageNavBar />
			<Route
				path={`${url}/address`}
				render={() => <ProfilePageDisplay currentMode='manageAddress' />}
			/>
      <Route
				path={`${url}/password-change`}
				render={() => <ProfilePageDisplay currentMode='changePassword' />}
			/>
      <Route
				path={`${url}/orders`}
				render={() => <ProfilePageDisplay currentMode='orders' />}
			/>
      <Route
				path={`${url}/card`}
				render={() => <ProfilePageDisplay currentMode='creditCard' />}
			/>
      <Route
				path={`${url}/bitcoin`}
				render={() => <ProfilePageDisplay currentMode='bitcoin' />}
			/>
      <Route
				path={`${url}/paypal`}
				render={() => <ProfilePageDisplay currentMode='paypal' />}
			/>
		</section>
	)
}

export default ProfilePage
