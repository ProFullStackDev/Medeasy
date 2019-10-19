import React, { useState } from 'react'
import PropTypes from 'prop-types'

import CustomFormElement from '../CustomFormElement'
import CustomButton from '../CustomButton'
import CustomCheckBox from '../CustomCheckbox'

import { connect } from 'react-redux'
import { signInAdmin } from '../../redux/actions/authActions'

const LoginModalForm = ({ isAdmin, signInAdmin, history }) => {

  const [formState, setFormState] = useState({
    email: '',
    password: '',
    // Remember me means, Save it for cookies
    rememberMe: false
  })

  const { email, password, rememberMe } = formState

  const handleChange = event => setFormState({ ...formState, [event.target.name]: event.target.value })
  
  // Login
  const handleSubmit = event => {
    event.preventDefault()
    // If the isAdmin prop is true means, sign in admin
    if (isAdmin) signInAdmin(formState, history)
    // Else do normal signin
  }
  
  const changeRememberMeState = () => setFormState({ ...formState, rememberMe: !rememberMe })
  
  return (
    <form onSubmit={handleSubmit} className='LoginRegisterModal__right-loginform'>
      <CustomFormElement name='email' type='email' labelName='Email ID' onChange={handleChange} value={email} />
      <CustomFormElement name='password' type='password' labelName='Password' onChange={handleChange} value={password} />
      <div className='LoginRegisterModal__right-loginform--split'>
        <CustomCheckBox value={rememberMe} onClick={ changeRememberMeState }/>
        <span style={{ fontSize: '1.2rem', cursor: 'pointer' }}>Forgot Password?</span>
      </div>
      <CustomButton fontSize='1.8rem' type='submit'>LOGIN</CustomButton>
    </form>
  )

}

LoginModalForm.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
  signInAdmin: PropTypes.func.isRequired
}

export default connect(null, { signInAdmin })(LoginModalForm)