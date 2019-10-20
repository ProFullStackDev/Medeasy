import axios from 'axios'
import actionTypes from '../actionTypes'
import { alertUser } from './alertActions.js'
const { SET_USER, SET_ACCESS_TOKEN } = actionTypes

export const signInAdmin = ({
  email,
  password,
  rememberMe
}, history) => async dispatch => {
  try {
    // Sign in
    const { data: { user, accessToken } } = await axios.post('/api/user/admin', { email, password })
    // Store the user
    dispatch({ type: SET_USER, payload: user })
    dispatch({ type: SET_ACCESS_TOKEN, payload: accessToken })
    // Set axios header here
    axios.defaults.headers.common['Authorization'] = accessToken
    // If user selects remember me means, store in localStorage, else in sessionStorage
    if (rememberMe)
      localStorage.setItem('auth', JSON.stringify({ user, accessToken }))
    else 
      sessionStorage.setItem('auth', JSON.stringify({ user, accessToken }))
    // Push to Dashboard
    history.push('/admin/dashboard')
  } catch (err) {
    console.log(err)
    const errorMessage = err.response.data.message
    if (Array.isArray(errorMessage))
      errorMessage.forEach(message =>
        dispatch(alertUser(message.msg, 'danger'))
      )
    else dispatch(alertUser(errorMessage, 'danger'))
  }
}
