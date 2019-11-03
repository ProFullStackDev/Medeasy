import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { fetchUserCreditCards } from '../../../redux/actions/profileActions'
import {
	selectProfileCards,
	selectProfileLoading
} from '../../../redux/selectors/profileSelectors'

import CustomButton from '../../CustomButton'
import CreditCardItem from './CreditCardItem'
import Spinner from '../../Spinner'

import '../../../styles/components/CreditCardMain.scss'
import { ReactComponent as PlusIcon } from '../../../images/plus.svg'

const CreditCardMain = ({
	loading,
	cards,
	fetchUserCreditCards,
	match: { url }
}) => {
	useEffect(() => {
		fetchUserCreditCards()
	}, [fetchUserCreditCards])

	const handleClick = () => {}
	return loading ? (
		<Spinner />
	) : (
		<div className="CreditCardMain">
			<div className="CreditCardMain__intro">
				<h2 className="ProfilePageDisplay__phase-title">Manage Cards</h2>
				<Link to={`${url}/create`}>
					<CustomButton
						onClick={handleClick}
						fontSize="1.8rem"
						specialBgColor="#f8931a"
					>
						<PlusIcon />
						<span style={{ marginLeft: '1rem' }}>Add New Card</span>
					</CustomButton>
				</Link>
			</div>
			{cards.length > 0 ? (
				<div className="CreditCardMain__allcards" style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', columnGap: '1.50rem', rowGap: '1.5rem' }}>
					{cards.map(card => (
						<CreditCardItem key={card._id} card={card} />
					))}
				</div>
			) : (
				/* Else just show the no address block */
				<div className="AddressChangeMain__noaddress">
					<p className="AddressChangeMain__noaddress-text">
						You don’t have any saved cards.
						<br />
						Add one to speed up your checkout process.
					</p>
				</div>
			)}
		</div>
	)
}

const mapStateToProps = createStructuredSelector({
	cards: selectProfileCards,
	loading: selectProfileLoading
})

export default connect(
	mapStateToProps,
	{ fetchUserCreditCards }
)(CreditCardMain)
