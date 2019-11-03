import React, { useEffect } from 'react'

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { fetchUserAddresses } from '../../../redux/actions/profileActions'
import { selectProfileAddresses, selectProfileLoading } from '../../../redux/selectors/profileSelectors'

import { Link } from 'react-router-dom'

import '../../../styles/components/AddressChangeMain.scss'
import CustomButton from '../../CustomButton'
import Spinner from '../../Spinner'
import AddressListItem from './AddressListItem'

import { ReactComponent as NoAddressIcon } from '../../../images/noAddress.svg'
import { ReactComponent as PlusIcon } from '../../../images/plus.svg'

const AddressChangeMain = ({ fetchUserAddresses, addresses, loading, match: { url } }) => {
  useEffect(() => {
    fetchUserAddresses()
  }, [fetchUserAddresses])

  const handleClick = () => {
  }
  return loading ? <Spinner /> : (
    <div className='AddressChangeMain'>
      <div className='AddressChangeMain__intro'>
        <h2 className='ProfilePageDisplay__phase-title'>Manage Addresses</h2>
        <Link to={`${url}/create`}><CustomButton onClick={ handleClick } fontSize='1.8rem' specialBgColor='#f8931a'>
          <PlusIcon /><span style={{ marginLeft: '1rem' }}>Add New Address</span>
        </CustomButton></Link>
      </div>
      {/* If the addresses are present means show them */}
      { addresses.length > 0 ? 
        <div className='AddressChangeMain__alladdresses'>
          { /* If home is present then put .. Repeat the same for all the address types */ }
          { addresses.find(add => add.mode === 'Home') && <AddressListItem url={url} addressObj={addresses.find(add => add.mode === 'Home')} /> }
          { addresses.find(add => add.mode === 'Work') && <AddressListItem url={url} addressObj={addresses.find(add => add.mode === 'Work')} /> }
          { addresses.find(add => add.mode === 'Other') && <AddressListItem url={url} addressObj={addresses.find(add => add.mode === 'Other')} /> }
        </div> :
        /* Else just show the no address block */
        <div className='AddressChangeMain__noaddress'>
          <NoAddressIcon />
          <p className='AddressChangeMain__noaddress-text'>
          You don’t have any saved addresses.<br/>Add one to speed up your checkout process.
          </p>
        </div>
      }
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  addresses: selectProfileAddresses,
  loading: selectProfileLoading
})

export default connect(mapStateToProps, { fetchUserAddresses })(AddressChangeMain)