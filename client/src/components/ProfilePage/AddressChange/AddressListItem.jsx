import React from 'react'

import { Link } from 'react-router-dom'

import { connect } from 'react-redux'
import { deleteAddress } from '../../../redux/actions/profileActions'

import '../../../styles/components/AddressListItem.scss'
import { ReactComponent as EditBtnSmallIcon } from '../../../images/editBtnSmall.svg'
import { ReactComponent as TrashIcon } from '../../../images/trash.svg'

const AddressListItem = ({ addressObj, deleteAddress, url }) => {
  const { _id, mode, phNumber, addressLine1, addressLine2, city, state, postalCode } = addressObj
  
  const handleAddressDelete = () => {
    if (window.confirm('Confirm deleting this address ?'))
      deleteAddress(_id)
  }

  return (
    <div className='AddressListItem'>
      <div className='AddressListItem__intro'>
        <h2 className='AddressListItem__intro-name'>{ mode }</h2>
        <div className='AddressListItem__intro-icons'>
          <Link to={`${url}/edit/${_id}`}><span><EditBtnSmallIcon /></span></Link>
          <span onClick={handleAddressDelete}><TrashIcon /></span>
        </div>
      </div>
      <p className='AddressListItem__phone'>{phNumber}</p>
      <p className='AddressListItem__address1'>{addressLine1}</p>
      <p className='AddressListItem__address2'>{addressLine2}</p>
      <p className='AddressListItem__city-state'>{city}, {state}</p>
      <p className='AddressListItem__postalcode'>{postalCode}</p>
    </div>
  )
}

export default connect(null, { deleteAddress })(AddressListItem)