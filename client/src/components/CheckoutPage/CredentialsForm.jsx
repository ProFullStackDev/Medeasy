import React from 'react'
import CustomFormElement from '../CustomFormElement'
import PhoneFormElement from '../PhoneFormElement'

const CredentialsForm = ({ formState, isUser, onChange }) => {
	return (
		<form
			style={{ marginTop: '3.5rem', width: '60%' }}
			className="BillingPhase__billing-form"
		>
			<div className="BillingPhase__form-names BillingPhase__form-half">
				<CustomFormElement
					required
					labelName="First Name *"
					type="text"
					value={formState.fName}
					onChange={onChange}
					name="fName"
				/>
				<CustomFormElement
					labelName="Middle Name"
					type="text"
					value={formState.mName}
					onChange={onChange}
					name="mName"
				/>
			</div>
			<CustomFormElement
				required
				labelName="Last Name *"
				type="text"
				value={formState.lName}
				onChange={onChange}
				name="lName"
			/>
			{!isUser ? (
				<CustomFormElement
					required
					labelName="Email *"
					type="email"
					value={formState.email}
					onChange={onChange}
					name="email"
				/>
			) : null}
			<CustomFormElement
				required
				labelName="Address 1 *"
				type="text"
				value={formState.address1}
				onChange={onChange}
				name="address1"
			/>
			<CustomFormElement
				labelName="Address 2"
				type="text"
				value={formState.address2}
				onChange={onChange}
				name="address2"
			/>
			<div className="BillingPhase__form-half">
				<CustomFormElement
					required
					labelName="City *"
					type="text"
					value={formState.city}
					onChange={onChange}
					name="city"
				/>
				<CustomFormElement
					required
					labelName="State / Province *"
					value={formState.state}
					onChange={onChange}
					name="state"
				/>
			</div>
			<div className="BillingPhase__form-half">
				<CustomFormElement
					required
					labelName="Zip / Postal Code *"
					type="number"
					value={formState.postalCode}
					onChange={onChange}
					name="postalCode"
				/>
				<CustomFormElement
					extraStyle={{ pointerEvents: 'none' }}
					disabled
					labelName="Country"
					readOnly
					value="United States Of America"
					onChange={onChange}
					name="country"
				/>
			</div>
			<div className="BillingPhase__form-half">
				<PhoneFormElement
					required
					value={formState.phNumber}
					onChange={onChange}
				/>
				<CustomFormElement
					labelName="Fax"
					value={formState.faxNumber}
					type="number"
					onChange={onChange}
					name="faxNumber"
				/>
			</div>
		</form>
	)
}

export default CredentialsForm
