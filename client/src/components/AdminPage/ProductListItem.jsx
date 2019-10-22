import React from 'react'
import AdminSlider from './AdminSlider'
import CustomButton from '../../components/CustomButton'
import { connect } from 'react-redux'
import { alertModal } from '../../redux/actions/alertActions'

const ProductListItem = ({
	onClick,
	alertModal,
	product: { _id, name, dosages, quantities, stockAvailable },
	index
}) => {

	const handleClick = () => {
		const modalObj = { title: 'CONFIRM DELETION', subTitle: 'Are you sure that you want to delete this product', extraInfo: { id: _id } }
		alertModal(modalObj)
		onClick(true)
	}

	return (
		<tr>
			<td>{index + 1}</td>
			<td>{name}</td>
			<td>{dosages.join(', ')}</td>
			<td>{quantities.join(', ')}</td>
			<td className="checkmark">
				<AdminSlider productId={_id} checked={stockAvailable} />
			</td>
			<td>
				<CustomButton
					extraStyle={{ padding: '.5rem 2rem' }}
					specialBgColor="#F8931A"
				>
					Edit
				</CustomButton>
				<CustomButton
          onClick={handleClick}
					extraStyle={{ padding: '.5rem 2rem', marginLeft: '1.5rem' }}
					specialBgColor="#D44A4A"
				>
					Delete
				</CustomButton>
			</td>
		</tr>
	)
}

export default connect(null, { alertModal })(ProductListItem)
