import React, { useState } from 'react'
import '../../../styles/components/AddressChangeMain.scss'
import CustomButton from '../../CustomButton'
import AddressListItem from './AddressListItem'
import { ReactComponent as NoAddressIcon } from '../../../images/noAddress.svg'
import { ReactComponent as PlusIcon } from '../../../images/plus.svg'

// Dummy data (Should be in Redux first)
const addresses = {
  home: {
    addressType: 'Home',
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
    addressType: 'Work',
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
    addressType: 'Other',
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
        <h2 className='ProfilePageDisplay__phase-title'>Manage Addresses</h2>
        <CustomButton fontSize='1.8rem' specialBgColor='#f8931a'>
          <PlusIcon /><span style={{ marginLeft: '1rem' }}>Add New Address</span>
        </CustomButton>
      </div>
      {/* If the addresses are present means show them */}
      
      <div className='AddressChangeMain__alladdresses'>
        { /* If home is present then put .. Repeat the same for all the address types */ }
        { Object.keys(addresses.home).length > 0 && <AddressListItem addressObj={addresses.home} /> }
        { Object.keys(addresses.work).length > 0 && <AddressListItem addressObj={addresses.work} /> }
        { Object.keys(addresses.other).length > 0 && <AddressListItem addressObj={addresses.other} /> }
      </div>

      { /* Else just show the no address block */ }
      
      {/* <div className='AddressChangeMain__noaddress'>
        <NoAddressIcon />
        <p className='AddressChangeMain__noaddress-text'>
        You don’t have any saved addresses.<br/>Add one to speed up your checkout process.
        </p>
      </div> */}
    </div>
  )
}

export default AddressChangeMain