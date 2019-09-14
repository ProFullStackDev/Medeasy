import React, { Component } from 'react'
import CustomFormElement from '../CustomFormElement'
import CustomButton from '../CustomButton'
import CustomCheckBox from '../CustomCheckbox'

class LoginModalForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      // Remember me means, Save it for cookies
      rememberMe: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.changeRememberMeState = this.changeRememberMeState.bind(this)
  }
  handleChange (event) { this.setState({ [event.target.name]: event.target.value })}
  // Login
  handleSubmit (event) {}
  changeRememberMeState () {
    this.setState(({ rememberMe }) => ({ rememberMe: !rememberMe }))
  }

  render() { 
    return (
      <form onSubmit={this.handleSubmit} className='LoginRegisterModal__right-loginform'>
        <CustomFormElement name='email' type='email' labelName='Email ID' onChange={this.handleChange} value={this.state.email} />
        <CustomFormElement name='password' type='password' labelName='Password' onChange={this.handleChange} value={this.state.password} />
        <div className='LoginRegisterModal__right-loginform--split'>
          <CustomCheckBox value={this.state.rememberMe} onClick={ this.changeRememberMeState }/>
          <span style={{ fontSize: '1.2rem', cursor: 'pointer' }}>Forgot Password?</span>
        </div>
        <CustomButton fontSize='1.8rem' type='submit'>LOGIN</CustomButton>
      </form>
    )
  }
}
 
export default LoginModalForm;