import React, { useState } from 'react'
import { ReactComponent as NoAddressIcon } from '../../../images/noAddress.svg'
import CustomButton from '../../CustomButton';
import { ReactComponent as PlusIcon } from '../../../images/plus'

// Dummy data (Should be in Redux first)
const addresses = {
  home: {
    address1: '#403, Lincoln Boulevard',
    address2: 'Brook Avenue',
    city: 'Los Angeles',
    state: 'California',
    postalCode: 90001,
    country: 'United States',
    phNumber: '+1 431-09-123',
    faxNumber: '',
  },
  work: {
    address1: 'Price Waterhouse Cooper',
    address2: 'ABS Towers',
    city: 'Los Angeles',
    state: 'California',
    postalCode: 90002,
    country: 'United States',
    phNumber: '+1 555-091-316',
    faxNumber: '',
  },
  other: {
    address1: '#461, Parker Lane',
    address2: 'Ives County',
    city: 'Los Angeles',
    state: 'California',
    postalCode: 90003,
    country: 'United States',
    phNumber: '+1 873-361-461',
    faxNumber: '',
  }
}

const AddressChangeMain = props => {
  return (
    <div className='AddressChangeMain'>
      <div className='AddressChangeMain__intro'>
        <h2 className='ProfilePageDisplay__phase-title'>Manage Address</h2>
        <CustomButton fontSize='1.8rem' specialBgColor='#f8931a'>
          <PlusIcon /><span>Add New Address</span>
        </CustomButton>
      </div>
      {/* If the addresses are present means show them */}
      { /* Else just show the no address block */ }

    </div>
  )
}

export default AddressChangeMain