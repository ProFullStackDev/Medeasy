import React, { useState, useEffect } from 'react'

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import {
	verifyPasswordToken,
	resetPassword,
	sendResetPasswordEmail
} from '../redux/actions/authActions'

import { alertUser } from '../redux/actions/alertActions'

import medeasyAuth from '../images/medeasy-auth.svg'
import formGraphic from '../images/form-graphic.svg'

import AlertMessage from '../components/AlertMessage'
import Spinner from '../components/Spinner'
import CustomFormElement from '../components/CustomFormElement'
import CustomButton from '../components/CustomButton'

const PasswordResetPage = ({
	alertUser,
	verifyPasswordToken,
	resetPassword,
	sendResetPasswordEmail,
	match: { params: { resetToken }}
}) => {
	const [verifiedState, setVerifiedState] = useState('')
	const [formState, setFormState] = useState({
		newPassword: '',
		cNewPassword: ''
	})
	const [email, setEmail] = useState('')

	const { newPassword, cNewPassword } = formState

	useEffect(() => {
		const fetchData = async () => {
			const status = await verifyPasswordToken(resetToken)
			setVerifiedState(status)
		}
		fetchData()
	}, [resetToken, verifyPasswordToken])

	const handleChange = event =>
		setFormState({ ...formState, [event.target.name]: event.target.value })
	const handlePasswordLink = event => {
		event.preventDefault()
		sendResetPasswordEmail(email)
	}

	const handlePasswordReset = event => {
		event.preventDefault()
		if (newPassword !== cNewPassword)
			alertUser('Passwords do not match', 'danger')
		else resetPassword(verifiedState, newPassword)
	}

	return (
		<div className="LoginRegisterModal-wrapper">
			{verifiedState === '' ? (
				<Spinner white={true} />
			) : (
				<div className="LoginRegisterModal">
					<div className="LoginRegisterModal__left">
						<div className="LoginRegisterModal__left-title">
							<h2 className="LoginRegisterModal__left-title--content">
								<img
									style={{ marginLeft: '1rem' }}
									src={medeasyAuth}
									alt="medeasy-logo"
								/>
								&nbsp;Password Reset
							</h2>
							<div className="LoginRegisterModal__left-title--bar"></div>
						</div>
						<img
							alt="form-graphic"
							src={formGraphic}
							className="LoginRegisterModal__left-image"
						/>
					</div>
					<div className="LoginRegisterModal__right">
						<AlertMessage />
						{!verifiedState ? (
							<form style={{ width: '100%' }} onSubmit={handlePasswordLink}>
								<CustomFormElement
									labelName="Email"
									type="email"
									required
									value={email}
									onChange={e => setEmail(e.target.value)}
									name="email"
								/>
								<CustomButton isSubmitButton>Send Reset Link</CustomButton>
							</form>
						) : (
							<form style={{ width: '100%' }} onSubmit={handlePasswordReset}>
								<CustomFormElement
									labelName="New password"
									type="password"
									required
									value={newPassword}
									onChange={handleChange}
									name="newPassword"
								/>
								<CustomFormElement
									labelName="Confirm new password"
									type="password"
									required
									value={cNewPassword}
									onChange={handleChange}
									name="cNewPassword"
								/>
								<CustomButton isSubmitButton>RESET PASSWORD</CustomButton>
							</form>
						)}
					</div>
				</div>
			)}
		</div>
	)
}

export default withRouter(connect(
	null,
	{ verifyPasswordToken, resetPassword, sendResetPasswordEmail, alertUser }
)(PasswordResetPage))
