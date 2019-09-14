import React from 'react'
import '../../../styles/components/AddressListItem.scss'
import { ReactComponent as EditBtnSmallIcon } from '../../../images/editBtnSmall.svg'
import { ReactComponent as TrashIcon } from '../../../images/trash.svg'

const AddressListItem = addressObj => {
  const { addressType, phNumber, address1, address2, city, state, postalCode } = addressObj.addressObj
  return (
    <div className='AddressListItem'>
      <div className='AddressListItem__intro'>
        <h2 className='AddressListItem__intro-name'>{ addressType }</h2>
        <div className='AddressListItem__intro-icons'>
          <span><EditBtnSmallIcon /></span>
          <span><TrashIcon /></span>
        </div>
      </div>
      <p className='AddressListItem__phone'>{phNumber}</p>
      <p className='AddressListItem__address1'>{address1}</p>
      <p className='AddressListItem__address2'>{address2}</p>
      <p className='AddressListItem__city-state'>{city}, {state}</p>
      <p className='AddressListItem__postalcode'>{postalCode}</p>
    </div>
  )
}

export default AddressListItem