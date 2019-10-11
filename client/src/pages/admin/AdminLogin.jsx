import React from 'react'
import LoginModalForm from '../../components/LoginRegisterModal/LoginModalForm'
import medeasyAuth from '../../images/medeasy-auth.svg'
import formGraphic from '../../images/form-graphic.svg'
import AlertMessage from '../../components/AlertMessage'

// Redux
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectAuthUser } from '../../redux/selectors/authSelectors'


const AdminLogin = ({ user }) => {
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
          <LoginModalForm isAdmin />
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  user: selectAuthUser
})

export default connect(mapStateToProps)(AdminLogin)
