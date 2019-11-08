import React, { useState, useEffect, Fragment } from 'react'

import { Redirect } from 'react-router-dom'
import validator from 'validator'

import { connect } from 'react-redux'
import { selectProfileLoading } from '../../redux/selectors/profileSelectors'
import { createStructuredSelector } from 'reselect'
import { fetchUserAddresses } from '../../redux/actions/profileActions'
import {
	setStepProgress,
	cacheAddress,
	storeGuestDetails,
} from '../../redux/actions/cartActions'
import {
	selectAuthUser,
	selectAuthCheckoutRole
} from '../../redux/selectors/authSelectors'
import { alertUser } from '../../redux/actions/alertActions'
import { setCheckoutRole } from '../../redux/actions/authActions'

import CustomRadioButton from '../CustomRadioButton'
import CustomButton from '../CustomButton'
import CredentialsForm from './CredentialsForm'
import Spinner from '../Spinner'
import AlertMessage from '../AlertMessage'

import '../../styles/components/BillingPhase.scss'

const BillingPhase = ({
	setStepProgress,
	setCheckoutRole,
	user,
	checkoutRole,
	loading,
	fetchUserAddresses,
	cacheAddress,
	alertUser,
	storeGuestDetails,
	history
}) => {
	useEffect(() => {
		setStepProgress(2)
		if (checkoutRole === 'user')
			fetchUserAddresses().then(addresses => {
				if (addresses.length) {
					const {
						name,
						mode,
						addressLine1,
						addressLine2,
						city,
						state,
						postalCode,
						country,
						phNumber,
						faxNumber
					} = addresses[0]
					setBillingFormState({
						fName: name.split(' ')[0],
						mName: name.split(' ').length === 3 ? name.split(' ')[1] : '',
						lName:
							name.split(' ').length === 3
								? name.split(' ')[2]
								: name.split(' ')[1],
						mode,
						address1: addressLine1,
						address2: addressLine2,
						city,
						state,
						postalCode,
						country,
						phNumber: String(phNumber),
						faxNumber
					})
				}
			})
	}, [setStepProgress, fetchUserAddresses, checkoutRole])

	const [mode, setMode] = useState('yes')
	const [billingFormState, setBillingFormState] = useState({
		fName: '',
		lName: '',
		mName: '',
		email: '',
		mode: '',
		address1: '',
		address2: '',
		city: '',
		state: '',
		postalCode: '',
		country: 'United States of America',
		phNumber: '',
		faxNumber: ''
	})

	const [shippingFormState, setShippingFormState] = useState({
		fName: '',
		lName: '',
		mName: '',
		email: '',
		mode: '',
		address1: '',
		address2: '',
		city: '',
		state: '',
		postalCode: '',
		country: 'United States of America',
		phNumber: '',
		faxNumber: ''
	})

	if (user && !checkoutRole) setCheckoutRole('user')
	if ((!user && !checkoutRole)) return <Redirect to="/checkout/account" />

	const handleShippingChange = event =>
		setShippingFormState({
			...shippingFormState,
			[event.target.name]: event.target.value
		})
	const handleBillingChange = event =>
		setBillingFormState({
			...billingFormState,
			[event.target.name]: event.target.value
		})

	const handleClick = async () => {
		if (billingFormState.fName === '')
			return alertUser('Billing address First name is required', 'danger')
		if (billingFormState.lName === '')
			return alertUser('Billing address Last name is required', 'danger')
		if (billingFormState.city === '')
			return alertUser('Billing address City is required', 'danger')
		if (billingFormState.state === '')
			return alertUser('Billing address State is required', 'danger')
		if (billingFormState.phNumber === '')
			return alertUser('Billing address Phone number is required', 'danger')
		if (
			!billingFormState.phNumber.match(
				/^(1\s?)?((\([0-9]{3}\))|[0-9]{3})[\s]?[\0-9]{3}[\s]?[0-9]{4}$/g
			)
		)
			return alertUser('Billing address phone number is invalid', 'danger')
		if (billingFormState.address1 === '')
			return alertUser('Billing address is required', 'danger')
		if (billingFormState.postalCode === '')
			return alertUser('Billing address postal code is required', 'danger')
		if (billingFormState.postalCode.length > 5)
			return alertUser('Billing Address Postal Code is Invalid', 'danger')
		if (mode === 'no') {
			if (shippingFormState.fName === '')
				return alertUser('Shipping address First name is required', 'danger')
			if (shippingFormState.lName === '')
				return alertUser('Shipping address Last name is required', 'danger')
			if (shippingFormState.city === '')
				return alertUser('Shipping address City is required', 'danger')
			if (shippingFormState.state === '')
				return alertUser('Shipping address State is required', 'danger')
			if (shippingFormState.phNumber === '')
				return alertUser('Shipping address Phone number is required', 'danger')
			if (
				!shippingFormState.phNumber.match(
					/^(1\s?)?((\([0-9]{3}\))|[0-9]{3})[\s]?[\0-9]{3}[\s]?[0-9]{4}$/g
				)
			)
				return alertUser('Shipping address phone number is invalid', 'danger')
			if (shippingFormState.address1 === '')
				return alertUser('Shipping address is required', 'danger')
			if (shippingFormState.postalCode === '')
				return alertUser('Shipping address postal code is required', 'danger')
			if (shippingFormState.postalCode.length > 5)
				return alertUser('Shipping Address Postal Code is Invalid', 'danger')
		}
		if (checkoutRole === 'guest') {
			if (billingFormState.email === '')
				return alertUser('Billing address email is required', 'danger')
			if (!validator.isEmail(billingFormState.email))
				return alertUser('Billing address email is invalid', 'danger')
			if (mode === 'no' && shippingFormState.email === '')
				return alertUser('Shipping address email is required', 'danger')
			if (mode === 'no' && !validator.isEmail(billingFormState.email))
				return alertUser('Billing address email is invalid', 'danger')
			const name = `${billingFormState.fName} ${billingFormState.mName.length > 0 ? billingFormState.mName : ''}${
				billingFormState.mName ? ' ' : ''
			}${billingFormState.lName}`
			await storeGuestDetails({
				name,
				email: billingFormState.email
			})
		}
		cacheAddress(
			{
				...billingFormState,
				faxNumber: parseInt(billingFormState.faxNumber),
				phNumber: parseInt(billingFormState.phNumber),
				postalCode: parseInt(billingFormState.postalCode)
			},
			mode === 'yes'
				? {
						...billingFormState,
						faxNumber: parseInt(billingFormState.faxNumber),
						phNumber: parseInt(billingFormState.phNumber),
						postalCode: parseInt(billingFormState.postalCode)
				  }
				: {
						...shippingFormState,
						faxNumber: parseInt(shippingFormState.faxNumber),
						phNumber: parseInt(shippingFormState.phNumber),
						postalCode: parseInt(shippingFormState.postalCode)
				  }
		)
		history.push('/checkout/review')
	}

	return (
		<div style={{ position: 'relative' }} className="BillingPhase">
			{loading ? (
				<Spinner />
			) : (
				<Fragment>
					<h2 style={{ marginBottom: '2rem' }} className="BillingPhase__title">
						Billing Address
					</h2>
					<AlertMessage />
					<CredentialsForm
						formState={billingFormState}
						onChange={handleBillingChange}
						isUser={user ? true : false}
					/>
					<div
						className="BillingPhase__radio-btns"
						style={{ fontSize: '1.2rem' }}
					>
						<CustomRadioButton
							mode="yes"
							onClick={() => setMode('yes')}
							text="Ship to same address"
							selected={mode === 'yes'}
						/>
						<CustomRadioButton
							mode="no"
							onClick={() => setMode('no')}
							text="Ship to different address"
							selected={mode === 'no'}
						/>
					</div>
					{/* If the mode is selected as no means this form should appear and the POST request should contain both forms */}
					{mode === 'no' && (
						<>
							<h2
								style={{ marginBottom: '2rem' }}
								className="BillingPhase__title"
							>
								Shipping Address
							</h2>
							<AlertMessage />
							<CredentialsForm
								onChange={handleShippingChange}
								formState={shippingFormState}
								isUser={user ? true : false}
							/>
						</>
					)}
					<CustomButton onClick={handleClick} fontSize="1.8rem">
						Continue
					</CustomButton>
				</Fragment>
			)}
		</div>
	)
}

const mapStateToProps = createStructuredSelector({
	user: selectAuthUser,
	checkoutRole: selectAuthCheckoutRole,
	loading: selectProfileLoading,
})

export default connect(
	mapStateToProps,
	{
		setStepProgress,
		fetchUserAddresses,
		cacheAddress,
		storeGuestDetails,
		alertUser,
		setCheckoutRole
	}
)(BillingPhase)
