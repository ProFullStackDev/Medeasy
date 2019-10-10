import React from 'react'
import LoginModalForm from '../../components/LoginRegisterModal/LoginModalForm'
import medeasyAuth from '../../images/medeasy-auth.svg'
import formGraphic from '../../images/form-graphic.svg'
import AlertMessage from '../../components/AlertMessage'

const AdminLogin = () => {
  return (
    <div className='LoginRegisterModal-wrapper'>
      <div className='LoginRegisterModal'>
        <div className='LoginRegisterModal__left'>
          <div className='LoginRegisterModal__left-title'>
            <h2 className='LoginRegisterModal__left-title--content'>
              <img style={{ marginLeft: '1rem' }} src={medeasyAuth} alt='medeasy-logo' />
              &nbsp;Admin
            </h2>
            <div className='LoginRegisterModal__left-title--bar'></div>
          </div>
          <img alt='form-graphic' src={formGraphic} className='LoginRegisterModal__left-image' />
        </div>
        <div className='LoginRegisterModal__right'>
          <AlertMessage message='Alert message' alertType='danger'/>
          <LoginModalForm />
        </div>
      </div>
    </div>
  )
}

export default AdminLogin
