import React, { Component } from 'react'
import CustomFormElement from '../CustomFormElement'
import PhoneFormElement from '../PhoneFormElement'

class CredentialsForm extends Component {
  constructor (props) {
    super(props)
    // These might be filled by guest
    // Or if the user is already logged in means,
    // It must get prefilled
    // IMPORTATNT THIS STATE WOULD BE IN REDUX
    this.state = {
      // Billing address
      firstName: '',
      middleName: '',
      lastName: '',
      emailId: '',
      company: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
      phNumber: '',
      faxNumber: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (event) { this.setState({ [event.target.name]: event.target.value })}
  handleSubmit (event) {
    event.preventDefault()
    console.log(this.state)
  }

  render () {
    return (
      <form data-type={this.props.type} onSubmit={this.handleSubmit} style={{ marginTop: '3.5rem', width: '50%' }} className='BillingPhase__billing-form'>
        <div className='BillingPhase__form-names BillingPhase__form-half'>
          <CustomFormElement required labelName='First Name' type='text' value={this.state.firstName} onChange={this.handleChange} name='firstName' />
          <CustomFormElement labelName='Middle Name' type='text' value={this.state.middleName} onChange={this.handleChange} name='middleName' />
        </div>
        <CustomFormElement required labelName='Last Name' type='text' value={this.state.lastName} onChange={this.handleChange} name='lastName' />
        <CustomFormElement required labelName='Email ID' type='email' value={this.state.emailId} onChange={this.handleChange} name='emailId' />
        <CustomFormElement labelName='Company' type='text' value={this.state.company} onChange={this.handleChange} name='company' />
        <CustomFormElement required labelName='Address 1' type='text' value={this.state.address1} onChange={this.handleChange} name='address1' />
        <CustomFormElement labelName='Address 2' type='text' value={this.state.address2} onChange={this.handleChange} name='address2' />
        <div className='BillingPhase__form-half'>
          <CustomFormElement required labelName='City' type='text' value={this.state.city} onChange={this.handleChange} name='city' />
          <CustomFormElement required labelName='State / Province' value={this.state.state} onChange={this.handleChange} name='state' />
        </div>
        <div className='BillingPhase__form-half'>
          <CustomFormElement required labelName='Zip / Postal Code' type='number' value={this.state.phNumber} onChange={this.handleChange} name='phNumber' />
          <CustomFormElement required labelName='Country' type='text' value={this.state.country} onChange={this.handleChange} name='country' />
        </div>
        <div className='BillingPhase__form-half'>
          <PhoneFormElement required value={this.state.phNumber} onChange={this.handleChange} />
          <CustomFormElement labelName='Fax' value={this.state.faxNumber} type='number' onChange={this.handleChange} name='faxNumber' />
        </div>
      </form>
    )
  }
}

export default CredentialsForm