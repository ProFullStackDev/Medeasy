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
    }
    this.handleChange = this.handleChange.bind(this)
    this.changeMode = this.changeMode.bind(this)
  }

  handleChange (event) { this.setState({ [event.target.name]: event.target.value })}
  changeMode (mode) { this.setState({ mode }) }

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
      </div>
    )
  }
}

export default BillingPhase