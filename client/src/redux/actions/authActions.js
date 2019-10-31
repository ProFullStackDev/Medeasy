import axios from 'axios'
import actionTypes from '../actionTypes'
import { alertUser } from './alertActions.js'
import history from '../createHistory'

const { SET_USER, SET_ACCESS_TOKEN, CLEAR_INVENTORY, CLEAR_USER } = actionTypes

export const signIn = ({
  email,
  password,
  rememberMe
}, isAdmin = false) => async dispatch => {
  try {
    // Sign in
    const { data: { user, accessToken } } = await axios.post(isAdmin ? '/api/user/admin' : '/api/user', { email, password })
    // Store the user
    dispatch({ type: SET_USER, payload: user })
    dispatch({ type: SET_ACCESS_TOKEN, payload: accessToken })
    // If user selects remember me means, store in localStorage, else in sessionStorage
    if (rememberMe)
    localStorage.setItem('auth', JSON.stringify({ user, accessToken }))
    else 
    sessionStorage.setItem('auth', JSON.stringify({ user, accessToken }))
    // Push to Dashboard
    setTimeout(() => history.push(isAdmin ? '/admin/dashboard' : '/'), 100)
  } catch (err) {
    const errorMessage = err.response.data.message
    if (Array.isArray(errorMessage))
      errorMessage.forEach(message =>
        dispatch(alertUser(message.msg, 'danger'))
      )
    else dispatch(alertUser(errorMessage, 'danger'))
  }
}

export const sendResetPasswordEmail = email => async dispatch => {
  try {
    await axios.post('/api/user/password/link', { email })
    dispatch(alertUser('Password reset link is sent to your mail.', 'success'))
  } catch (err) {
    const errorMessage = err.response.data.message
    if (Array.isArray(errorMessage))
      errorMessage.forEach(message =>
        dispatch(alertUser(message.msg, 'danger'))
      )
    else dispatch(alertUser(errorMessage, 'danger'))
  } 
}

export const verifyPasswordToken = (passwordResetToken) => async dispatch => {
  try {
    const { data: { email } } = await axios.post('/api/user/password/verify', { passwordResetToken })
    return email
  } catch (err) {
    const errorMessage = err.response.data.message
    if (Array.isArray(errorMessage))
      errorMessage.forEach(message =>
        dispatch(alertUser(message.msg, 'danger'))
      )
    else dispatch(alertUser(errorMessage, 'danger'))
    return null
  }
}

export const resetPassword = (email, newPassword) => async dispatch => {
  try {
    await axios.patch('/api/user/password/reset', { email, newPassword })
    history.push('/login')
    dispatch(alertUser('Password reset successfully', 'success'))
  } catch (err) {
    const errorMessage = err.response.data.message
    if (Array.isArray(errorMessage))
      errorMessage.forEach(message =>
        dispatch(alertUser(message.msg, 'danger'))
      )
    else dispatch(alertUser(errorMessage, 'danger'))
    return null
  }
}

export const logout = (isAdmin = false, message = 'Logged out successfully !') => async (dispatch, state) => {
  try {
    axios.put('/api/user/password', { accessToken: state().auth.accessToken })
    dispatch({ type: CLEAR_INVENTORY })
    dispatch({ type: CLEAR_USER })
    localStorage.removeItem('auth')
    sessionStorage.removeItem('auth')
    history.push(isAdmin ? '/admin' : '/')
    dispatch(alertUser(message, 'danger'))
  } catch (err) {
    const errorMessage = err.response.data.message
    dispatch(alertUser(errorMessage, 'danger'))
  }
}
