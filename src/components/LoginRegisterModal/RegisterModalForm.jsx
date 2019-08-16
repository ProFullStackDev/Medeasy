import React, { Component } from 'react'
import CustomFormElement from '../CustomFormElement'
import CustomButton from '../CustomButton'

class RegisterModalForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      middleName: '',
      email: '',
      password: '',
      cPassword: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit (event) {}
  handleChange (event) { this.setState({ [event.target.name]: event.target.value })}

  render() { 
    return (
      <form onSubmit={this.handleSubmit} className='LoginRegisterModal__right-registerform'>
        <div className='LoginRegisterModal__right-registerform--half'>
          <CustomFormElement name='firstName' value={this.state.firstName} onChange={this.handleChange} labelName='First Name' />
          <CustomFormElement name='middleName' value={this.state.middleName} onChange={this.handleChange} labelName='Middle Name' />
        </div>
        <CustomFormElement name='lastName' value={this.state.lastName} onChange={this.handleChange} labelName='Last Name' />
        <CustomFormElement name='email' value={this.state.email} onChange={this.handleChange} labelName='Email ID' />
        <CustomFormElement name='password' value={this.state.password} onChange={this.handleChange} labelName='Choose a Password' />
        <CustomFormElement name='cPassword' value={this.state.cPassword} onChange={this.handleChange} labelName='Confirm Password' />
        <CustomButton type='submit'>REGISTER</CustomButton>
      </form>
    )
  }
}
 
export default RegisterModalForm