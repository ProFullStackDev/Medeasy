import React from 'react'
import { ReactComponent as EditBtnIcon } from '../../images/editBtn.svg'
import { ReactComponent as CloseBtnIcon } from '../../images/closeBtn.svg'
import '../../styles/components/CartListItem.scss'

const CartListItem = ({
	decideModalState,
	onDelete,
	cartProduct: {
		_id,
		product: { dosages, quantities },
		image,
		distributor,
		name,
		attributes: { dosage, quantity },
		subTotal
	}
}) => (
	<div className="CartListItem">
		<img style={{ cursor: 'default' }} src={image} alt="tablet" className="CartListItem__tabletimage" />
		<div className="CartListItem__details">
			<p className="CartListItem__details-name" style={{ fontSize: '2.5rem' }}>
				{name}
			</p>
			<span className='CartListItem__details-distributor' style={{ fontSize: '1.4rem' }}>{distributor}</span>
		</div>
		<div className="CartListItem__dosage">
			<span className="CartListItem__dosage-value">{dosage}</span>
			{dosages.length > 1 ? (
				<span
					style={{ cursor: 'pointer' }}
					onClick={() =>
						decideModalState('dosage', dosages.map(d => `${d} mg`), dosage, _id)
					}
				>
					<EditBtnIcon alt="editbtn" />
				</span>
			) : null}
		</div>
		<div className="CartListItem__quantity">
			<span className="CartListItem__quantity-value">{quantity} Pills</span>
			<span
				style={{ cursor: 'pointer' }}
				onClick={() =>
					decideModalState(
						'quantity',
						quantities.map(q => `${q} Pills`),
						quantity,
						_id
					)
				}
			>
				<EditBtnIcon alt="editbtn" />
			</span>
		</div>
		<div className="CartListItem__price">
			<p className="CartListItem__price--final">{subTotal}$</p>
			{/* <div className='CartListItem__price--prev'>
          <span style={{ textDecoration: 'line-through', marginRight: '5px' }}>{ originalPrice }</span>
          // Discount percent is dynamic
          <span className='CartListItem__price--discount'>20% off</span>
        </div> */}
		</div>
		<span onClick={() => onDelete(_id)} style={{ cursor: 'pointer' }}>
			<CloseBtnIcon alt="delete-item" className="CartListItem__delete" />
		</span>
	</div>
)

export default CartListItem
