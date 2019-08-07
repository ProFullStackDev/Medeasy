import React, { Component } from 'react'
import CustomRadioButton from '../CustomRadioButton'
import CustomFormElement from '../CustomFormElement'
import CustomButton from '../CustomButton'

import '../../styles/components/AccountPhase.scss'

class AccountPhase extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      fName: '',
      lName: '',
      mName: '',
      rEmail: '',
      rPassword: '',
      cPassword: '',
      mode: 'guest',
      authMode: 'login'
    }
    this.handleChange = this.handleChange.bind(this)
    this.changeMode = this.changeMode.bind(this)
    this.changeAuthMode = this.changeAuthMode.bind(this)
    this.swapToUser = this.swapToUser.bind(this)
  }

  handleChange (event) {
     this.setState({ [event.target.name]: event.target.value })
  }

  swapToUser (event) { this.setState({ mode: 'user', authMode: event.target.dataset.authmode })}
  changeMode (mode) { this.setState({ mode }) }
  changeAuthMode (event) { this.setState({ authMode: event.target.dataset.authmode })}

  render () {
    const { authMode, mode, email, password, cPassword, rEmail, rPassword, fName, mName, lName, } = this.state
    return (
      <div className='AccountPhase'>
        <h2 className='AccountPhase__title' style={{ fontSize: '2.2rem' }}>Account</h2>
        <div className='AccountPhase__radio-btns'>
          <CustomRadioButton mode='user' onClick={ this.changeMode } text='Login / Register' selected={ mode === 'user' }/>
          <CustomRadioButton mode='guest' onClick={ this.changeMode } text='Checkout as Guest' selected={ mode === 'guest' }/>
        </div>
        { mode === 'user' && <div className='AccountPhase__user'>
          { authMode === 'login' &&
            <form className='AccountPhase__user-signinform'>
              <CustomFormElement labelName='Email ID' name='email' type='email' value={email} onChange={this.handleChange} />
              <CustomFormElement labelName='Password' name='password' type='password' value={password} onChange={this.handleChange} />
              <div className='AccountPhase__user-signinform--cta'>
                <CustomButton type='submit' fontSize='1.8rem'>Login</CustomButton>
                <span style={{ fontSize: '1.2rem', marginLeft: '1.5rem' }}>New to Medeasy ? <span data-authmode='register' onClick={ this.changeAuthMode } style={{ color: '#7AC7B8', cursor: 'pointer' }}>Register</span> now</span>
              </div>
            </form>
          }
          { authMode === 'register' &&
            <form className='AccountPhase__user-registerform'>
              <div className='AccountPhase__user-registerform--names'>
                <CustomFormElement labelName='First Name' name='fName' type='text' value={fName} onChange={this.handleChange} />
                <CustomFormElement labelName='Middle Name' name='mName' type='text' value={mName} onChange={this.handleChange} />
              </div>
              <CustomFormElement labelName='Last Name' name='lName' type='text' value={lName} onChange={this.handleChange} />
              <CustomFormElement labelName='Email ID' name='rEmail' type='email' value={rEmail} onChange={this.handleChange} />
              {/* Check for both passwords matching */}
              <CustomFormElement labelName='Choose a Password' name='rPassword' type='password' value={rPassword} onChange={this.handleChange} />
              <CustomFormElement labelName='Confirm Password' name='cPassword' type='text' value={cPassword} onChange={this.handleChange} />
              <div className='AccountPhase__user-registerform--cta'>
                <CustomButton type='submit' fontSize='1.8rem'>Register</CustomButton>
                <span style={{ fontSize: '1.2rem', marginLeft: '1.5rem' }}>Already Registered ? <span data-authmode='login' onClick={ this.changeAuthMode } style={{ color: '#7AC7B8', cursor: 'pointer' }}>Login</span> now</span>
              </div>
            </form>
          }
        </div> }
        { mode === 'guest' && <div className='AccountPhase__guest'>
          <p className='AccountPhase__guest--info'><span data-authmode='login' onClick={this.swapToUser} style={{ color: '#7AC7B8', cursor: 'pointer' }}>Login</span> or <span data-authmode='register' onClick={this.swapToUser} style={{ color: '#7AC7B8', cursor: 'pointer' }}>Register</span> with us for convenience</p>
          <ul className='AccountPhase__guest--featlist'>
            <li><span className='AccountPhase__guest--featlist-dot'></span><span>Fast and easy check out</span></li>
            <li><span className='AccountPhase__guest--featlist-dot'></span><span>Easy access to your order history and status</span></li>
          </ul>
          <CustomButton>Continue as Guest</CustomButton>
        </div> }
      </div>
    )
  }
}

export default AccountPhase