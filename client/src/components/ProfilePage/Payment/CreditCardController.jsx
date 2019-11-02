import React, { useState } from 'react'

import { connect } from 'react-redux'
import { addUserCreditCard } from '../../../redux/actions/profileActions'

import CustomFormElement from '../../CustomFormElement'
import CustomButton from '../../CustomButton'
import '../../../styles/components/CreditCardController.scss'

const CreditCardController = ({ addUserCreditCard }) => {

	const [formState, setFormState] = useState({
		name: '',
		number: '',
		expMonth: '',
		expYear: ''
	})

	const handleSubmit = event => {
		event.preventDefault()
		// Submit the card
		console.log('Card added')
	}

	const handleChange = event => {
		setFormState({ ...formState, [event.target.name]: event.target.value })
	}

	return (
		<div className="CreditCardController">
			<h2 className="ProfilePage__phase-title">My Orders</h2>
			<form
				style={{ width: '59%', marginLeft: '7rem', marginTop: '5.2rem' }}
				className="CreditCardController__form"
				onSubmit={handleSubmit}
			>
				<CustomFormElement
					name="name"
					onChange={handleChange}
					labelName="Name on Card"
					type="text"
				/>
				<CustomFormElement
					labelName="Card Number"
					name="number"
					onChange={handleChange}
					type="number"
					max="19"
				/>
				<div
					className="CreditCardController__form-third"
					style={{ display: 'flex', justifyContent: 'space-between' }}
				>
					<CustomFormElement
						name="expMonth"
						onChange={handleChange}
						labelName="Exp. Month"
						type="number"
					/>
					<CustomFormElement
						name="expYear"
						onChange={handleChange}
						labelName="Exp. Year"
						type="number"
					/>
				</div>
				<div
					style={{
						marginTop: '4rem',
						display: 'flex',
						justifyContent: 'flex-end'
					}}
				>
					<CustomButton
						extraStyle={{
							border: '1px solid #DDD7D7',
							background: 'transparent',
							color: '#4A4A4A'
						}}
						fontSize="1.8rem"
					>
						Cancel
					</CustomButton>
					<CustomButton
						extraStyle={{ marginLeft: '2rem' }}
						fontSize="1.8rem"
						type="submit"
					>
						Add Credit Card
					</CustomButton>
				</div>
			</form>
		</div>
	)
}

export default connect(null, { addUserCreditCard })(CreditCardController)
