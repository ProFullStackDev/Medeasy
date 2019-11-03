import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import {
	selectProfileAddress,
	selectProfileLoading
} from '../../../redux/selectors/profileSelectors'
import {
	addUserAddress,
	editAddress,
	fetchAddressById
} from '../../../redux/actions/profileActions'
import { Link } from 'react-router-dom'

import PhoneFormElement from '../../PhoneFormElement'
import CustomFormElement from '../../CustomFormElement'
import CustomBadge from '../../CustomBadge'
import CustomButton from '../../CustomButton'
import AlertMessage from '../../AlertMessage'
import Spinner from '../../Spinner'

import '../../../styles/components/AddressChangeEdit.scss'

const AddressChangeEdit = ({
	addUserAddress,
	fetchAddressById,
	editAddress,
	loading,
	match: {
		path,
		params: { addressId }
	}
}) => {
	useEffect(() => {
		if (path === '/profile/address/edit/:addressId') {
			fetchAddressById(addressId).then(
				({
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
				}) =>
					setFormState({
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
			)
		}
	}, [addressId, path, fetchAddressById])

	const [formState, setFormState] = useState({
		fName: '',
		lName: '',
		mName: '',
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

	const {
		fName,
		lName,
		mName,
		mode,
		address1: addressLine1,
		address2: addressLine2,
		city,
		state,
		postalCode,
		country,
		phNumber,
		faxNumber
	} = formState

	const handleChange = event =>
		setFormState({ ...formState, [event.target.name]: event.target.value })

	const handleSubmit = event => {
		event.preventDefault()
		const name = `${fName} ${mName.length > 0 ? mName : ''}${
			mName ? ' ' : ''
		}${lName}`
		const profileObj = {
			name,
			mode,
			addressLine1,
			addressLine2,
			city,
			state,
			postalCode: parseInt(postalCode),
			country,
			phNumber: parseInt(phNumber),
			faxNumber: parseInt(faxNumber)
		}
		if (path === '/profile/address/edit/:addressId')
			editAddress(addressId, profileObj)
		else addUserAddress(profileObj)
	}

	return loading ? (
		<Spinner />
	) : (
		<div className="AddressChangeEdit">
			<h2
				style={{ marginBottom: '2rem' }}
				className="ProfilePageDisplay__phase-title"
			>
				{ path === '/profile/address/edit/:addressId' ? 'Edit Address' : 'Add Address' }
			</h2>
			<AlertMessage />
			{mode.length === 0 && (
				<h4
					style={{ marginBottom: '1.5rem', marginLeft: '5rem', width: '80%' }}
				>
					*Please select your address mode*
				</h4>
			)}
			<div className="AddressChangeEdit__badges">
				<CustomBadge
					onClick={() => setFormState({ ...formState, mode: 'Home' })}
					selected={mode === 'Home'}
					badgeValue="Home"
				/>
				<CustomBadge
					onClick={() => setFormState({ ...formState, mode: 'Work' })}
					selected={mode === 'Work'}
					badgeValue="Work"
				/>
				<CustomBadge
					onClick={() => setFormState({ ...formState, mode: 'Other' })}
					selected={mode === 'Other'}
					badgeValue="Other"
				/>
			</div>
			<form className="AddressChangeEdit__form" onSubmit={handleSubmit}>
				<div className="AddressChangeEdit__form-half">
					<CustomFormElement
						onChange={handleChange}
						required
						labelName="First Name *"
						type="text"
						name="fName"
						value={fName}
					/>
					<CustomFormElement
						onChange={handleChange}
						labelName="Middle Name"
						type="text"
						name="mName"
						value={mName}
					/>
				</div>
				<CustomFormElement
					onChange={handleChange}
					required
					labelName="Last Name *"
					type="text"
					name="lName"
					value={lName}
				/>
				<CustomFormElement
					onChange={handleChange}
					required
					labelName="Address Line 1 *"
					type="text"
					name="address1"
					value={formState.address1}
				/>
				<CustomFormElement
					onChange={handleChange}
					labelName="Address Line 2"
					type="text"
					name="address2"
					value={formState.address2}
				/>
				<div className="AddressChangeEdit__form-half">
					<CustomFormElement
						onChange={handleChange}
						required
						labelName="City *"
						type="text"
						name="city"
						value={city}
					/>
					<CustomFormElement
						onChange={handleChange}
						required
						labelName="State / Province *"
						type="text"
						name="state"
						value={state}
					/>
				</div>
				<div className="AddressChangeEdit__form-half">
					<CustomFormElement
						onChange={handleChange}
						required
						labelName="Zip / Postal Code *"
						type="number"
						name="postalCode"
						value={postalCode}
					/>
					<CustomFormElement
						extraStyle={{ pointerEvents: 'none' }}
						disabled
						labelName="Country"
						type="text"
						readOnly
						value="United States Of America"
					/>
				</div>
				<div className="AddressChangeEdit__form-half">
					<PhoneFormElement required onChange={handleChange} value={phNumber} />
					<CustomFormElement
						onChange={handleChange}
						labelName="Fax"
						type="number"
						name="faxNumber"
						value={faxNumber}
					/>
				</div>
				<div className="AddressChangeEdit__form-buttons">
					<Link to="/profile/address">
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
					</Link>
					<CustomButton type="submit">Save Address</CustomButton>
				</div>
			</form>
		</div>
	)
}

const mapStateToProps = createStructuredSelector({
	loading: selectProfileLoading,
	address: selectProfileAddress
})

export default connect(
	mapStateToProps,
	{ addUserAddress, editAddress, fetchAddressById }
)(AddressChangeEdit)
