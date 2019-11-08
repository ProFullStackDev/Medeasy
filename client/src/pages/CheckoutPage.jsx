import React, { useState } from 'react'
import { Route } from 'react-router-dom'
// Components
import UpdateModal from '../components/UpdateModal'
import CheckoutProgress from '../components/CheckoutPage/CheckoutProgress'
import OrderSummary from '../components/CheckoutPage/OrderSummary'
// 4 Phases components
import AccountPhase from '../components/CheckoutPage/AccountPhase'
import BillingPhase from '../components/CheckoutPage/BillingPhase'
import PaymentPhase from '../components/CheckoutPage/PaymentPhase'
import ReviewPhase from '../components/CheckoutPage/ReviewPhase'
// Redux
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import {
	selectCartProducts,
	selectCartStepProgress
} from '../redux/selectors/cartSelectors'

import '../styles/pages/CheckoutPage.scss'

const CheckoutPage = ({
	changeOverlayState,
	stepProgress,
	cartProducts,
	match: { url }
}) => {
	// Update Modal Values
	const [updateValues, setUpdateValues] = useState([])
	// Current Modal Value
	const [currentVal, setCurrentVal] = useState('')
	// Item Id
	const [itemId, setItemId] = useState('')
	// edit btn toggle state
	const [isModalClicked, setIsModalClicked] = useState(false)
	// Type of modal
	const [modalType, setModalType] = useState('')

	// Toggling the UpdateModal Component
	const updateModalState = (boolVal, values, itemId, currentVal, type) => {
		setIsModalClicked(boolVal)
		changeOverlayState(boolVal)
		setUpdateValues(values)
		setCurrentVal(currentVal)
		setItemId(itemId)
		setModalType(type)
	}

	// Toggling the overlay
	const disableOverlay = () => {
		setIsModalClicked(false)
		changeOverlayState(false)
	}

	return (
		<section className="CheckoutPage">
			{isModalClicked && (
				<UpdateModal
					prevVal={currentVal}
					disableOverlay={disableOverlay}
					title={`Update ${modalType === 'quantity' ? 'Quantity' : 'Dosage'}`}
					values={updateValues}
					itemId={itemId}
					type={modalType}
				/>
			)}
			<div className="CheckoutPage__left">
				<CheckoutProgress stepNumber={stepProgress} />
				<Route exact path={`${url}/account`} component={AccountPhase} />
				<Route exact path={`${url}/address`} component={BillingPhase} />
				<Route exact path={`${url}/review`} render={routeProps => <ReviewPhase {...routeProps} cartProducts={cartProducts} updateModalState={updateModalState} />} />
				<Route exact path={`${url}/payment`} component={PaymentPhase} />
			</div>
			{ stepProgress < 3 ? <div className="CheckoutPage__right">
				<OrderSummary
					cartProducts={cartProducts}
					updateModalState={updateModalState}
				/>
			</div> : null }
		</section>
	)
}

const mapStateToProps = createStructuredSelector({
	cartProducts: selectCartProducts,
	stepProgress: selectCartStepProgress
})

export default connect(mapStateToProps)(CheckoutPage)
