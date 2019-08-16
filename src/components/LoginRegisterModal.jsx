import React, { Component } from 'react'
// Components
import CustomFormElement from '../components/CustomFormElement'
import CustomButton from '../components/CustomButton'
// Scss
import '../styles/components/LoginRegisterModal.scss'
// Images
import medeasyAuth from '../images/medeasy-auth.svg'
import formGraphic from '../images/form-graphic.svg'


class LoginRegisterModal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      mode: 'login',
      email: '',
      password: ''
    }
  }

  handleChange (event) { this.setState({ [event.target.name]: event.target.value })}

  render () {
    return (
      <div className='LoginRegisterModal'>
        <div className='LoginRegisterModal__left'>
          <div className='LoginRegisterModal__left-title'>
            <h2 className='LoginRegisterModal__left-title--content'>
              { this.state.mode === 'login' ? 'Login to' : 'Register with' }
              <img style={{ marginLeft: '1rem' }} src={medeasyAuth} alt='medeasy-logo' />
            </h2>
            <div className='LoginRegisterModal__left-title--bar'></div>
          </div>
          <img alt='form-graphic' src={formGraphic} className='LoginRegisterModal__left-image' />
        </div>
        <div className='LoginRegisterModal__right'>
          { this.state.mode === 'login' ? 
            <form className='LoginRegisterModal__right-loginform'>
              <CustomFormElement name='email' type='email' labelName='Email ID' onChange={this.handleChange} value={this.state.email} />
              <CustomFormElement name='password' type='password' labelName='Password' onChange={this.handleChange} value={this.state.password} />
              
            </form>:
            <form className='LoginRegisterModel__right-registerform'>

            </form>
          }
        </div>
      </div>
    )
  }
}

export default LoginRegisterModal