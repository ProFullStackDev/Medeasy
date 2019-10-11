import axios from 'axios'
import actionTypes from '../actionTypes'
import { alertUser } from './alertActions.js'
const {} = actionTypes

export const signInAdmin = ({
  email,
  password,
  rememberMe
}) => async dispatch => {
  console.log('Fired')
  try {
    const { data } = await axios.get('/api/user/admin', {
      data: { email, password }
    })
    console.log(data, `${rememberMe ? 'localStorage' : 'sessionStorage'}`)
  } catch (err) {
    const errorMessage = err.response.data.message
    console.log(errorMessage)
    if (Array.isArray(errorMessage))
      errorMessage.forEach(message =>
        dispatch(alertUser(message.msg, 'danger'))
      )
    else dispatch(alertUser(errorMessage, 'danger'))
  }
}
