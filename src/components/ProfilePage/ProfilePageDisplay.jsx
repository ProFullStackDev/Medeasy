import React, { Component } from 'react'
import AddressChangeController from './AddressChange/AddressChangeController'
import ChangePasswordController from './ChangePassword/ChangePasswordController'

class ProfilePageDisplay extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  render () {
    return (
      <div className='ProfilePageDisplay' style={ profilePageDisplayStyles }>
        { /* Depends on what the user clicks in the navbar */ }
        {/* <AddressChangeController /> */}
        <ChangePasswordController />
      </div>
    )
  }
}

const profilePageDisplayStyles = {
  position: 'relative',
  flex: 1,
  marginLeft: '4rem',
  minHeight: '65.4rem',
  borderRadius: '1rem',
  padding: '2.5rem',
  boxShadow: '0 0 .5rem 1px rgba(0, 0, 0, .1)'
}

export default ProfilePageDisplay