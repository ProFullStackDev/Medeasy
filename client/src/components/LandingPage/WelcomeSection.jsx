import React, { useState } from 'react'

import CustomButton from '../CustomButton'
import CustomFormElement from '../CustomFormElement'
import PhoneFormElement from '../PhoneFormElement'
import AlertMessage from '../AlertMessage'

// Images
import { ReactComponent as LeftArrow } from '../../images/larrow.svg'
import { ReactComponent as RightArrow } from '../../images/rarrow.svg'
import carouselImg from '../../images/carouselimg.png'

// Redux
import { connect } from 'react-redux'
import { addQuery } from '../../redux/actions/queryActions'

const WelcomeSection = ({ addQuery }) => {
	const [formState, setFormState] = useState({
		name: '',
		phoneNumber: '',
		message: ''
	})

	const [queryStatus, setQueryStatus] = useState(null)

	const handleChange = event =>
		setFormState({ ...formState, [event.target.name]: event.target.value })
	
	const handleSubmit = async event => {
		event.preventDefault()
		const status = await addQuery(formState)
		if (status === false) setFormState({ name: '', phoneNumber: '', message: '' })
		setQueryStatus(status)
	}

	const { name, phoneNumber, message } = formState
	return (
		<div className="LandingPage__welcome">
			<div
				className="LandingPage__welcome--carousel"
				style={{ backgroundImage: `url(${carouselImg})` }}
			>
				<LeftArrow className="LandingPage__welcome--carousel-left" alt="left" />
				<RightArrow
					className="LandingPage__welcome--carousel-left"
					alt="right"
				/>
			</div>
			<div className="LandingPage__helpform">
				<AlertMessage />
				<h2 className="LandingPage__helpform-title">
					{ !queryStatus ? 'Want us to call you back ?' : 'Thank you. We will revert back shortly' }
				</h2>
				{ !queryStatus ? <form className="LandingPage__helpform-form" onSubmit={handleSubmit}>
					<CustomFormElement
						labelName="Name"
						onChange={handleChange}
						name="name"
						type="text"
						id="name"
						value={name}
						required
					/>
					<PhoneFormElement name='phoneNumber' required value={phoneNumber} onChange={handleChange} />
					<label htmlFor="message">Message</label>
					<CustomFormElement
						noLabel
						isTextArea
						value={message}
						onChange={handleChange}
						name="message"
						id="message"
						required
					/>
					<CustomButton extraStyle={{ background: '#F8931A' }} isSubmitButton fontSize="1.6rem">
						Request Callback
					</CustomButton>
				</form> : null }
			</div>
		</div>
	)
}

export default connect(null, { addQuery })(WelcomeSection)
