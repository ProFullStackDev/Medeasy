import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import {
	fetchCardById,
	addUserCard,
	editCard
} from '../../../redux/actions/profileActions'
import { alertUser } from '../../../redux/actions/alertActions'
import {
	selectProfileLoading
} from '../../../redux/selectors/profileSelectors'

import CustomFormElement from '../../CustomFormElement'
import Spinner from '../../Spinner'
import AlertMessage from '../../AlertMessage'
import CustomButton from '../../CustomButton'
import '../../../styles/components/CreditCardEdit.scss'

const CreditCardEdit = ({
	alertUser,
	fetchCardById,
	addUserCard,
	editCard,
	loading,
	match: {
		path,
		params: { cardId }
	}
}) => {
	useEffect(() => {
		if (path === '/profile/card/edit/:cardId')
			fetchCardById(cardId).then(
				({ cardName, cardExpiryMonth, cardExpiryYear, cardNumber }) => {
					setFormState({
						name: cardName,
						number: cardNumber,
						expMonth: String(cardExpiryMonth),
						expYear: String(cardExpiryYear + 2000)
					})
				}
			)
	}, [fetchCardById, path, cardId])

	const [formState, setFormState] = useState({
		name: '',
		number: '',
		expMonth: '',
		expYear: ''
	})

	const { name, number, expMonth, expYear } = formState

	const handleSubmit = event => {
		event.preventDefault()
		if (parseInt(expMonth) > 12) return alertUser('Invalid Month', 'danger')
		if (parseInt(expYear) < new Date().getFullYear())
			return alertUser('Invalid Year', 'danger')
		if (parseInt(expYear) === new Date().getFullYear() && parseInt(expMonth) < new Date().getMonth() + 1)
			return alertUser('Card expired', 'danger')
		const cardObj = {
			name,
			number: parseInt(number),
			expMonth: parseInt(expMonth),
			expYear: parseInt(expYear)
		}
		if (path === '/profile/card/edit/:cardId') return editCard(cardId, cardObj)
		else return addUserCard(cardObj)
	}

	return loading ? <Spinner /> : (
		<div className="CreditCardEdit">
			<h2
				style={{ marginBottom: '2rem' }}
				className="ProfilePageDisplay__phase-title"
			>
				{path === '/profile/card/edit/:cardId' ? 'Edit Card' : 'Add Card'}
			</h2>
			<AlertMessage />
			<form
				style={{ width: '59%', marginLeft: '7rem', marginTop: '5.2rem' }}
				className="CreditCardEdit__form"
				onSubmit={handleSubmit}
			>
				<CustomFormElement
					name="name"
					value={name}
					onChange={e =>
						setFormState({ ...formState, name: e.target.value.toUpperCase() })
					}
					labelName="Name on Card"
					type="text"
				/>
				<CustomFormElement
					required
					labelName="Card Number"
					name="number"
					type="number"
					max="19"
					value={number}
					onChange={event =>
						setFormState({
							...formState,
							number:
								event.target.value.length > 16
									? number + ''
									: event.target.value
						})
					}
				/>
				<div
					className="CreditCardEdit__form-third"
					style={{ display: 'flex', justifyContent: 'space-between' }}
				>
					<CustomFormElement
						required
						name="expMonth"
						labelName="Exp. Month"
						type="number"
						value={expMonth}
						onChange={event =>
							setFormState({
								...formState,
								expMonth:
									event.target.value.length > 2
										? expMonth + ''
										: event.target.value
							})
						}
					/>
					<CustomFormElement
						required
						name="expYear"
						labelName="Exp. Year"
						type="number"
						value={expYear}
						onChange={event =>
							setFormState({
								...formState,
								expYear:
									event.target.value.length > 4
										? expYear + ''
										: event.target.value
							})
						}
					/>
				</div>
				<div
					style={{
						marginTop: '4rem',
						display: 'flex',
						justifyContent: 'flex-end'
					}}
				>
					<Link to="/profile/card">
						<CustomButton
							type='button'
							extraStyle={{
								border: '1px solid #DDD7D7',
								background: 'transparent',
								color: '#4A4A4A'
							}}
							fontSize="1.8rem"
						>
							Cancel
						</CustomButton>
					</Link>
					<CustomButton
						extraStyle={{ marginLeft: '2rem' }}
						fontSize="1.8rem"
						type="submit"
					>
						{ path === '/profile/card/edit/:cardId' ? 'Edit Credit Card' : 'Add Credit Card' }
					</CustomButton>
				</div>
			</form>
		</div>
	)
}

const mapStateToProps = createStructuredSelector({
	loading: selectProfileLoading
})

export default connect(
	mapStateToProps,
	{ fetchCardById, addUserCard, editCard, alertUser }
)(CreditCardEdit)
