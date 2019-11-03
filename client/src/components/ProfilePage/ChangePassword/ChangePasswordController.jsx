import React, { useState } from 'react'

import AlertMessage from '../../AlertMessage'
import CustomFormElement from '../../CustomFormElement'
import CustomButton from '../../CustomButton'
import Spinner from '../../Spinner'
import '../../../styles/components/ChangePasswordController.scss'

import { connect } from 'react-redux'
import { alertUser } from '../../../redux/actions/alertActions'
import { changePassword } from '../../../redux/actions/authActions'
import { selectProfileLoading } from '../../../redux/selectors/profileSelectors'
import { createStructuredSelector } from 'reselect'

const ChangePasswordController = ({ alertUser, loading, changePassword }) => {
	const [formState, setFormState] = useState({
		oldPassword: '',
		newPassword: '',
		cNewPassword: ''
	})

	const { oldPassword, newPassword, cNewPassword } = formState

	const handleChange = event => {
		setFormState({ ...formState, [event.target.name]: event.target.value })
	}

	const handleSubmit = event => {
		event.preventDefault()
    if (newPassword !== cNewPassword)
      alertUser('Passwords do not match', 'danger')
    else changePassword(oldPassword, newPassword)
	}

	return loading ? <Spinner /> : (
		<div className="ChangePasswordController" style={{ color: 'red' }}>
			<h2 className="ProfilePageDisplay__phase-title">Change Password</h2>
      <AlertMessage />
			<form onSubmit={handleSubmit} className="ChangePasswordController__form">
				<CustomFormElement
					labelName="Old Password"
					onChange={handleChange}
					type="password"
					name="oldPassword"
					value={oldPassword}
				/>
				<CustomFormElement
					labelName="New Password"
					onChange={handleChange}
					type="password"
					name="newPassword"
					value={newPassword}
				/>
				<CustomFormElement
					labelName="Confirm Password"
					onChange={handleChange}
					type="password"
					name="cNewPassword"
					value={cNewPassword}
				/>
				<div className="ChangePasswordController__form-buttons">
					<CustomButton
						extraStyle={{
							minWidth: '15rem',
							background: 'transparent',
							border: '1px solid #DDD7D7',
							color: '#4a4a4a'
						}}
					>
						Cancel
					</CustomButton>
					<CustomButton type="submit">Change Password</CustomButton>
				</div>
			</form>
		</div>
	)
}

const mapStateToProps = createStructuredSelector({
  loading: selectProfileLoading
})

export default connect(mapStateToProps, { alertUser, changePassword })(ChangePasswordController)
