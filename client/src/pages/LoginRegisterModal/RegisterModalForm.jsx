import React, { useState } from 'react'
import CustomFormElement from '../../components/CustomFormElement'
import CustomButton from '../../components/CustomButton'

const RegisterModalForm = () => {
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
				value={lastName}
				onChange={handleChange}
				labelName="Last Name"
			/>
			<CustomFormElement
				name="email"
				value={email}
				onChange={handleChange}
				labelName="Email ID"
			/>
			<CustomFormElement
				name="password"
				value={password}
				onChange={handleChange}
				labelName="Choose a Password"
			/>
			<CustomFormElement
				name="cPassword"
				value={cPassword}
				onChange={handleChange}
				labelName="Confirm Password"
			/>
			<CustomButton type="submit">REGISTER</CustomButton>
		</form>
	)
}

export default RegisterModalForm
