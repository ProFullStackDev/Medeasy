import React, { Component } from 'react'
import CustomRadioButton from '../CustomRadioButton'
import CustomButton from '../CustomButton'
import CredentialsForm from './CredentialsForm'

import '../../styles/components/BillingPhase.scss'

class BillingPhase extends Component {
  constructor (props) {
    super(props)
    this.state = {
      // Delivery address mode (defaulted to ship to same address)
      mode: 'yes',
      // These state might be in redux .. Just keepin it temporarily
      shippingAddress: {},
      billingAddress: {}
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.changeMode = this.changeMode.bind(this)
    // Actions related to these also might be in seperate reducer
  }

  // Redux state must flow to the backend
  // Both billing reducer and shipping reducer
  handleClick (event) {
    // Save these details to the database (if the user is logged in these values must be prefilled)
    this.props.onClick(this.props.step)
  }

  handleChange (event) { this.setState({ [event.target.name]: event.target.value })}
  changeMode (mode) { this.setState({ mode }) }
  saveShippingAddress (addressObj) { }
  saveBillingAddress (addressObj) { }

  render () {
    return (
      <div className='BillingPhase'>
        <h2 className='BillingPhase__title'>Billing Address</h2>
        <CredentialsForm />
        <div className='BillingPhase__radio-btns' style={{ fontSize: '1.2rem' }}>
          <CustomRadioButton mode='yes' onClick={ this.changeMode } text='Ship to same address' selected={ this.state.mode === 'yes' }/>
          <CustomRadioButton mode='no' onClick={ this.changeMode } text='Ship to different address' selected={ this.state.mode === 'no' }/>
        </div>
        { /* If the mode is selected as no means this form should appear and the POST request should contain both forms */ }
        { this.state.mode === 'no' && <>
          <h2 className='BillingPhase__title'>Shipping Address</h2>
          <CredentialsForm />
        </> }
        <CustomButton onClick={this.handleClick} fontSize='1.8rem'>Continue</CustomButton>
      </div>
    )
  }
}

export default BillingPhase