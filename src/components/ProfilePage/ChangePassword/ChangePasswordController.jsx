import React, { Component } from 'react'
import CustomFormElement from '../../CustomFormElement'
import CustomButton from '../../CustomButton'

import '../../../styles/components/ChangePasswordController.scss'

class ChangePasswordController extends Component {
  constructor (props) {
    super(props)
    this.state = {
      oldPassword: '',
      newPassword: '',
      cNewPassword: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (event) { this.setState({ [event.target.name]: event.target.value }) }

  handleSubmit (event) {
    event.preventDefault()
    // Change the password
    console.log('Changing the password')
  }

  render () {
    return (
      <div className='ChangePasswordController' style={{ color: 'red' }}>
        <h2 className='ProfilePageDisplay__phase-title'>Change Password</h2>
        <form onSubmit={this.handleSubmit} className='ChangePasswordController__form'>
          <CustomFormElement labelName='Old Password' onChange={ this.handleChange } type='password' name='oldPassword' value={this.state.oldPassword} />
          <CustomFormElement labelName='New Password' onChange={ this.handleChange } type='password' name='newPassword' value={this.state.newPassword} />
          <CustomFormElement labelName='Confirm Password' onChange={ this.handleChange } type='password' name='cNewPassword' value={this.state.cNewPassword} />
          <div className='ChangePasswordController__form-buttons'>
            <CustomButton extraStyle={{ minWidth: '15rem', background: 'transparent', border: '1px solid #DDD7D7', color: '#4a4a4a' }} >Cancel</CustomButton>
            <CustomButton type='submit'>Change Password</CustomButton>
          </div>
        </form>
      </div>
    )
  }
}

export default ChangePasswordController