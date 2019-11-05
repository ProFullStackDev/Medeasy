import React from 'react'

import { Link } from 'react-router-dom'

import { connect } from 'react-redux'
import { deleteCard } from '../../../redux/actions/profileActions'

import '../../../styles/components/CreditCardItem.scss'
import { ReactComponent as CardChip } from '../../../images/chip.svg'
import { ReactComponent as Visa } from '../../../images/visa.svg'
import { ReactComponent as MasterCard } from '../../../images/mastercard.svg'
import { ReactComponent as Discover } from  '../../../images/discover.svg'
import { ReactComponent as Amex } from '../../../images/amex.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'

const CreditCardItem = ({ deleteCard, card: { _id, cardSystem, cardName, cardNumber, cardExpiryMonth, cardExpiryYear } }) => {
  let cardType = null
  
  const handleCardDelete = () => {
    if (window.confirm('Confirm deleting this card ?'))
      deleteCard(_id)
  }

	switch (cardSystem) {
		case 'Visa':
			cardType = (
				<Visa
					style={{
						position: 'absolute',
						top: '20px',
						right: '25px',
						width: '63px',
						height: '20px'
					}}
				/>
			)
			break
		case 'MasterCard':
			cardType = (
				<MasterCard
					style={{
						position: 'absolute',
						top: '20px',
						right: '20px',
						width: '61px',
						height: '39px'
					}}
				/>
			)
			break
		case 'American Express / Diners Club':
			cardType = (
				<Amex
					style={{
						position: 'absolute',
						top: '15px',
						right: '20px',
						width: '61px',
						height: '44px'
					}}
				/>
			)
			break
		case 'Discover': cardType = <Discover style={{ position: 'absolute', top: '15px', right: '20px', width: '60px', height: '45px' }} />; break
		default:
			break
	}

	return (
		<div className="CreditCardItem">
			<div className="CreditCardItem__overlay">
				<Link to={`/profile/card/edit/${_id}`}>
					<div className="CreditCardItem__overlay-edit">
						<FontAwesomeIcon icon={faEdit} />
					</div>
				</Link>
				<div onClick={handleCardDelete} className="CreditCardItem__overlay-delete">
					<FontAwesomeIcon icon={faTrash} />
				</div>
			</div>
			{cardType}
			<CardChip
				style={{ position: 'absolute', top: '5.5rem', left: '2.5rem' }}
			/>
			<div className="CreditCardItem__details">
				<p
					style={{ fontSize: '1.8rem' }}
					className="CreditCardItem__details--number"
				>
					{cardNumber}
				</p>
				<div className="CreditCardItem__details--expDate">
					<p style={{ width: '2rem', fontSize: '8px', fontWeight: 'normal' }}>
						VALID TILL
					</p>
					<p style={{ marginLeft: '1.5rem' }}>{cardExpiryMonth < 10 ? `0${cardExpiryMonth}` : cardExpiryMonth } / {cardExpiryYear}</p>
				</div>
				<p style={{ marginTop: '.5rem' }} className="CreditCardItem__details--name">{ cardName }</p>
			</div>
		</div>
	)
}

export default connect(null, { deleteCard })(CreditCardItem)
