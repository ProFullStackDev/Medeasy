import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'

// Components
import CustomFormElement from '../CustomFormElement'
import CustomButton from '../CustomButton'
import AlertMessage from '../AlertMessage'

// Redux
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectAuthUser } from '../../redux/selectors/authSelectors'
import { selectPaymentOrderId } from '../../redux/selectors/paymentSelectors'
import {
  signIn,
  signUp,
  setCheckoutRole
} from '../../redux/actions/authActions'
import { alertUser } from '../../redux/actions/alertActions'
import { setStepProgress } from '../../redux/actions/cartActions'

import '../../styles/components/AccountPhase.scss'

const AccountPhase = ({
  signIn,
  signUp,
  alertUser,
  setCheckoutRole,
  setStepProgress,
  user,
  history,
  orderId
}) => {
  useEffect(() => {
    setStepProgress(1)
  }, [setStepProgress])

  const [formState, setFormState] = useState({
    email: '',
    password: '',
    fName: '',
    lName: '',
    mName: '',
    cPassword: ''
  })

  const [isUser, setIsUser] = useState(true)
  const [authMode, setAuthMode] = useState('login')

  if (orderId) return <Redirect to='/checkout/payment/card' />
  if (user) return <Redirect to='/checkout/address' />
  const { email, password, cPassword, fName, mName, lName } = formState

  const handleChange = event =>
    setFormState({ ...formState, [event.target.name]: event.target.value })

  const signInUser = event => {
    event.preventDefault()
    const userObj = { email, password, rememberMe: false }
    signIn(userObj, false, 'passon')
  }

  const registerUser = event => {
    event.preventDefault()
    if (password !== cPassword) alertUser('Passwords do not match', 'danger')
    else if (password.length < 8)
      alertUser('Password length must be atleast 8 characters', 'danger')
    else
      signUp(
        {
          name: `${fName} ${mName.length > 0 ? mName : ''}${
            mName ? ' ' : ''
          }${lName}`,
          email,
          password
        },
        'passon'
      )
  }

  return (
    <div style={{ position: 'relative' }} className='AccountPhase'>
      <h2 className='AccountPhase__title' style={{ marginBottom: '1rem' }}>
        Account
      </h2>
      <AlertMessage />
      {isUser ? (
        <div className='AccountPhase__user'>
          {authMode === 'login' && (
            <form
              className='AccountPhase__user-signinform'
              onSubmit={signInUser}>
              <CustomFormElement
                required
                labelName='Email ID'
                name='email'
                type='email'
                value={email}
                onChange={handleChange}
              />
              <CustomFormElement
                required
                labelName='Password'
                name='password'
                type='password'
                value={password}
                onChange={handleChange}
              />
              <div className='AccountPhase__user-signinform--cta'>
                <CustomButton type='submit' fontSize='1.8rem'>
                  Login
                </CustomButton>
                <span style={{ fontSize: '1.4rem', marginLeft: '1.5rem' }}>
                  New to Medeasy ?{' '}
                  <span
                    onClick={() => {
                      setAuthMode('register')
                      setFormState({ ...formState, email: '', password: '' })
                    }}
                    style={{ color: '#7AC7B8', cursor: 'pointer' }}>
                    Register
                  </span>{' '}
                  now
                </span>
              </div>
            </form>
          )}
          {authMode === 'register' && (
            <form
              className='AccountPhase__user-registerform'
              onSubmit={registerUser}>
              <div className='AccountPhase__user-registerform--names'>
                <CustomFormElement
                  required
                  labelName='First Name'
                  name='fName'
                  type='text'
                  value={fName}
                  onChange={handleChange}
                />
                <CustomFormElement
                  labelName='Middle Name'
                  name='mName'
                  type='text'
                  value={mName}
                  onChange={handleChange}
                />
              </div>
              <CustomFormElement
                required
                labelName='Last Name'
                name='lName'
                type='text'
                value={lName}
                onChange={handleChange}
              />
              <CustomFormElement
                required
                labelName='Email ID'
                name='email'
                type='email'
                value={email}
                onChange={handleChange}
              />
              {/* Check for both passwords matching */}
              <CustomFormElement
                required
                labelName='Choose a Password'
                name='password'
                type='password'
                value={password}
                onChange={handleChange}
              />
              <CustomFormElement
                required
                labelName='Confirm Password'
                name='cPassword'
                type='password'
                value={cPassword}
                onChange={handleChange}
              />
              <div className='AccountPhase__user-registerform--cta'>
                <CustomButton type='submit' fontSize='1.8rem'>
                  Register
                </CustomButton>
                <span style={{ fontSize: '1.4rem', marginLeft: '1.5rem' }}>
                  Already Registered ?{' '}
                  <span
                    onClick={() => {
                      setAuthMode('login')
                      setFormState({ ...formState, email: '', password: '' })
                    }}
                    style={{ color: '#7AC7B8', cursor: 'pointer' }}>
                    Login
                  </span>{' '}
                  now
                </span>
              </div>
            </form>
          )}
        </div>
      ) : (
        <div className='AccountPhase__guest'>
          <p className='AccountPhase__guest--info'>
            <span
              onClick={() => {
                setAuthMode('login')
                setIsUser(true)
              }}
              style={{ color: '#7AC7B8', cursor: 'pointer' }}>
              Login
            </span>{' '}
            or{' '}
            <span
              onClick={() => {
                setAuthMode('register')
                setIsUser(true)
              }}
              style={{ color: '#7AC7B8', cursor: 'pointer' }}>
              Register
            </span>{' '}
            with us for convenience
          </p>
          <ul className='AccountPhase__guest--featlist'>
            <li>
              <span className='AccountPhase__guest--featlist-dot'></span>
              <span>Fast and easy check out</span>
            </li>
            <li>
              <span className='AccountPhase__guest--featlist-dot'></span>
              <span>Easy access to your order history and status</span>
            </li>
          </ul>
          <CustomButton
            onClick={() => {
              setCheckoutRole('guest')
              history.push('/checkout/address')
            }}>
            Checkout as Guest
          </CustomButton>
        </div>
      )}
      {isUser && (
        <CustomButton
          extraStyle={{ marginTop: '1.5rem' }}
          onClick={() => setIsUser(!isUser)}>
          Continue as Guest
        </CustomButton>
      )}
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  user: selectAuthUser,
  orderId: selectPaymentOrderId
})

export default connect(mapStateToProps, {
  setStepProgress,
  signIn,
  signUp,
  alertUser,
  setCheckoutRole
})(AccountPhase)
