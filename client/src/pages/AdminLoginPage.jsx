import React from 'react'
import { Helmet } from 'react-helmet'
import LoginModalForm from './LoginRegisterModal/LoginModalForm'
import medeasyAuth from '../images/medeasy-auth.svg'
import formGraphic from '../images/form-graphic.svg'
import AlertMessage from '../components/AlertMessage'

// Redux
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectAuthUser } from '../redux/selectors/authSelectors'

import { Redirect } from 'react-router-dom'

const AdminLogin = ({ user, history, match }) => {
  return user ? (
    <Redirect to='/admin/dashboard' />
  ) : (
    <div className='LoginRegisterModal-wrapper'>
      <Helmet>
        <title>Medeasy - Admin Login</title>
        <meta name='description' content='Admin Login' />
      </Helmet>
      <div className='LoginRegisterModal'>
        <div className='LoginRegisterModal__left'>
          <div className='LoginRegisterModal__left-title'>
            <h2 className='LoginRegisterModal__left-title--content'>
              <img
                style={{ marginLeft: '1rem' }}
                src={medeasyAuth}
                alt='medeasy-logo'
              />
              &nbsp;Admin
            </h2>
            <div className='LoginRegisterModal__left-title--bar'></div>
          </div>
          <img
            alt='form-graphic'
            src={formGraphic}
            className='LoginRegisterModal__left-image'
          />
        </div>
        <div className='LoginRegisterModal__right'>
          <AlertMessage />
          <LoginModalForm isAdmin history={history} match={match} />
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  user: selectAuthUser
})

export default connect(mapStateToProps)(AdminLogin)
