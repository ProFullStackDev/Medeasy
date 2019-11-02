import React, { useState } from 'react'
import { connect } from 'react-redux'
import { signUp } from '../../redux/actions/authActions'
import { alertUser } from '../../redux/actions/alertActions'

import CustomFormElement from '../../components/CustomFormElement'
import CustomButton from '../../components/CustomButton'

const RegisterModalForm = ({ signUp, alertUser }) => {
	const [formState, setFormState] = useState({
		firstName: '',
		lastName: '',
		middleName: '',
		email: '',
		password: '',
		cPassword: ''
	})

	const {
		firstName,
		lastName,
		middleName,
		email,
		password,
		cPassword
	} = formState

	const handleSubmit = event => {
		event.preventDefault()
		if (password !== cPassword) return alertUser('Passwords do not match', 'danger')
		if (password.length < 8) return alertUser('Password must be atleast 8 characters', 'danger')
		const name = `${firstName} ${middleName.length > 0 ? middleName : ''}${middleName ? ' ': ''}${lastName}`
		signUp({ name, email, password })
	}

	const handleChange = event => {
		setFormState({ ...formState, [event.target.name]: event.target.value })
	}

	return (
		<form
			onSubmit={handleSubmit}
			className="LoginRegisterModal__right-registerform"
		>
			<div className="LoginRegisterModal__right-registerform--half">
				<CustomFormElement
					name="firstName"
					type='text'
					required
					value={firstName}
					onChange={handleChange}
					labelName="First Name"
				/>
				<CustomFormElement
					name="middleName"
					value={middleName}
					onChange={handleChange}
					labelName="Middle Name"
				/>
			</div>
			<CustomFormElement
				name="lastName"
				required
				value={lastName}
				onChange={handleChange}
				labelName="Last Name"
			/>
			<CustomFormElement
				name="email"
				type='email'
				required
				value={email}
				onChange={handleChange}
				labelName="Email ID"
			/>
			<CustomFormElement
				name="password"
				type='password'
				value={password}
				onChange={handleChange}
				labelName="Choose a Password"
			/>
			<CustomFormElement
				name="cPassword"
				type='password'
				value={cPassword}
				onChange={handleChange}
				labelName="Confirm Password"
			/>
			<CustomButton type="submit">REGISTER</CustomButton>
		</form>
	)
}

export default connect(null, { signUp, alertUser })(RegisterModalForm)
