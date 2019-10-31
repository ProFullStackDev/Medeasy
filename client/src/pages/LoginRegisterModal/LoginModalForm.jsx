import React, { useState } from 'react'
import PropTypes from 'prop-types'

import CustomFormElement from '../../components/CustomFormElement'
import CustomButton from '../../components/CustomButton'
import CustomCheckBox from '../../components/CustomCheckbox'

import { connect } from 'react-redux'
import { signIn, sendResetPasswordEmail } from '../../redux/actions/authActions'

const LoginModalForm = ({ isAdmin, signIn, sendResetPasswordEmail, match: { url } }) => {

  const [forgotPasswordState, setForgotPasswordState] = useState(false)

  const [loginFormState, setloginFormState] = useState({
    email: '',
    password: '',
    // Remember me means, Save it for cookies
    rememberMe: false
  })

  const [changePasswordFormState, setChangePasswordFormState] = useState({
    email: '',
  })

  const { email, password, rememberMe } = loginFormState
  const { email : cEmail } = changePasswordFormState

  const handleChange = event => setloginFormState({ ...loginFormState, [event.target.name]: event.target.value })
  const handleChangePassword = event => setChangePasswordFormState({ ...changePasswordFormState, [event.target.name]: event.target.value })
  
  // Login
  const handleSubmit = event => {
    event.preventDefault() 
    signIn(loginFormState, isAdmin)
  }

  // Change password
  const changePassword = event => {
    event.preventDefault()
    sendResetPasswordEmail(cEmail, url)
  }
  
  const changeRememberMeState = () => setloginFormState({ ...loginFormState, rememberMe: !rememberMe })
  
  return !forgotPasswordState ? (
    <form onSubmit={handleSubmit} className='LoginRegisterModal__right-loginform'>
      <CustomFormElement name='email' type='email' labelName='Email ID' onChange={handleChange} value={email} />
      <CustomFormElement name='password' type='password' labelName='Password' onChange={handleChange} value={password} />
      <div className='LoginRegisterModal__right-loginform--split'>
        <CustomCheckBox value={rememberMe} onClick={ changeRememberMeState }/>
        <span onClick={() => setForgotPasswordState(true)} style={{ fontSize: '1.2rem', cursor: 'pointer' }}>Forgot Password?</span>
      </div>
      <CustomButton fontSize='1.8rem' type='submit'>LOGIN</CustomButton>
    </form>
  ) : (
    <form onSubmit={changePassword} className='LoginRegisterModal__right-loginform'>
      <CustomFormElement required name='email' type='email' labelName='Email ID' onChange={handleChangePassword} value={cEmail} />
      <div className='LoginRegisterModal__right-loginform--split' style={{ float: 'right' }}>
        <span onClick={() => setForgotPasswordState(false)} style={{ fontSize: '1.2rem', cursor: 'pointer' }}>Login !</span>
      </div>
      <CustomButton fontSize='1.8rem' type='submit'>SEND PASSWORD RESET EMAIL</CustomButton>
    </form>
  )

}

LoginModalForm.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
  signIn: PropTypes.func.isRequired
}

export default connect(null, { signIn, sendResetPasswordEmail })(LoginModalForm)