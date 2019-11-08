import React from 'react'
import { ReactComponent as EditBtnIcon } from '../../images/editBtn.svg'
import { ReactComponent as CloseBtnIcon } from '../../images/closeBtn.svg'

import '../../styles/components/SummaryListItem.scss'
const SummaryListItem = ({
	updateModalState,
	deleteItem,
	product: {
		_id: itemId,
		name,
		product: { quantities, dosages },
		attributes: { dosage, quantity },
		price
	}
}) => {
	return (
		<div className="SummaryListItem">
			<div className="SummaryListItem__product">
				<h3
					style={{ fontSize: '1.8rem', color: '#000' }}
					className="SummaryListItem__product-name"
				>
					{name}
				</h3>
				{/* <span style={{ fontSize: '1.2rem' }} className='SummaryListItem__product-distributor'>{ distributor }</span> */}
			</div>
			{
				<span className="SummaryListItem__dosage">
					{`${dosage}`}{' '}
					{dosages.length > 1 ? (
						<span
							onClick={() =>
								updateModalState(
									true,
									dosages.map(q => `${q}mg`, quantity),
									itemId,
									`${dosage}`,
									'dosage'
								)
							}
						>
							<EditBtnIcon alt="editbtn" />
						</span>
					) : null}
				</span>
			}
			<span className="SummaryListItem__quantity">
				{`${quantity} Pills`}{' '}
				<span
					onClick={() =>
						updateModalState(
							true,
							quantities.map(q => `${q} Pills`, quantity),
							itemId,
							`${quantity} Pills`,
							'quantity'
						)
					}
				>
					<EditBtnIcon alt="editbtn" />
				</span>
			</span>
			<div className="SummaryListItem__price">
				{/* Discount is calculated */}
				<p style={{ fontSize: '2rem' }}>${price}</p>
				{/* <p className='SummaryListItem__price-original'>
          <span style={{ fontSize: '1rem', textDecoration: 'line-through' }}>{ originalPrice }</span>
          <span className='SummaryListItem__price-original--discount' style={{ fontSize: '1rem' }}>20% off</span>
        </p> */}
			</div>
			<span onClick={() => deleteItem(itemId)}>
				<CloseBtnIcon style={{ cursor: 'pointer' }} alt="delete-product" />
			</span>
		</div>
	)
}

export default SummaryListItem
