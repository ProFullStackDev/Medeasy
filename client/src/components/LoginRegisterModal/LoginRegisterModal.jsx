import React, { useState } from 'react'
// Components
import LoginModalForm from './LoginModalForm'
import RegisterModalForm from './RegisterModalForm'
// Scss
import '../../styles/components/LoginRegisterModal.scss'
// Images
import medeasyAuth from '../../images/medeasy-auth.svg'
import formGraphic from '../../images/form-graphic.svg'
import { ReactComponent as CloseBtnGrey } from '../../images/closeBtnGrey.svg'


const LoginRegisterModal = ({ onClick, authModalMode }) => {
  // This depends on what the user clicks in navbar
  const [mode, setMode] = useState(authModalMode)
  // Change the authMode from Login to Register and vice versa
  const changeAuthMode = event => { setMode(event.target.dataset.authmode) }
  // Close the modal
  const closeModal = () => onClick(false)
  return (
    <div className='LoginRegisterModal'>
      <div className='LoginRegisterModal__left'>
        <div className='LoginRegisterModal__left-title'>
          <h2 className='LoginRegisterModal__left-title--content'>
            { mode === 'login' ? 'Login to' : 'Register with' }
            <img style={{ marginLeft: '1rem' }} src={medeasyAuth} alt='medeasy-logo' />
          </h2>
          <div className='LoginRegisterModal__left-title--bar'></div>
        </div>
        <img alt='form-graphic' src={formGraphic} className='LoginRegisterModal__left-image' />
      </div>
      <div className='LoginRegisterModal__right'>
        <CloseBtnGrey alt='close-btn-grey' onClick={closeModal}/>
        { /* Show the forms based on the mode */ }
        { mode === 'login' ? <LoginModalForm /> : <RegisterModalForm /> }
        {mode === 'login' ? 
          <span style={{ fontSize: '1.2rem', marginTop: '2.5rem' }}>New to Medeasy ? <span data-authmode='register' onClick={ changeAuthMode } style={{ color: '#7AC7B8', cursor: 'pointer' }}>Register</span> now</span>:
          <span style={{ fontSize: '1.2rem', marginTop: '2.5rem' }}>Already Registered ? <span data-authmode='login' onClick={ changeAuthMode } style={{ color: '#7AC7B8', cursor: 'pointer' }}>Login</span> now</span>}
      </div>
    </div>
  )
}

export default LoginRegisterModal