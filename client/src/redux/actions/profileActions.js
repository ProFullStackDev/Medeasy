import Axios from 'axios'
import history from '../createHistory'
import actionTypes from '../actionTypes'
import { alertUser } from './alertActions'

const { SET_USER_ORDERS, SET_USER_ADDRESSES, SET_USER_CARDS, CLEAR_PROFILE, SET_USER_LOADING } = actionTypes

export const fetchUserAddresses = () => async dispatch => {
  try {
    dispatch({ type: SET_USER_LOADING, payload: true })
    const { data: { addresses } } = await Axios.get('/api/profile/address')
    dispatch({ type: SET_USER_ADDRESSES, payload: addresses })
  } catch (err) {
    console.log(err)
    const errorMessage = err.response.data.message
    if (Array.isArray(errorMessage)) errorMessage.forEach(message => dispatch(alertUser(message.msg, 'danger')))
    else dispatch(alertUser(errorMessage, 'danger'))
  } finally { dispatch({ type: SET_USER_LOADING, payload: false }) }
}

export const addUserAddress = address => async dispatch => {
  console.log(address)
  try {
    dispatch({ type: SET_USER_LOADING, payload: true })
    const { data: { profile } } = await Axios.post('/api/profile/address', address)
    history.push('/profile/address')
  } catch (err) {
    const errorMessage = err.response.data.message
    if (Array.isArray(errorMessage)) errorMessage.forEach(message => dispatch(alertUser(message.msg, 'danger')))
    else dispatch(alertUser(errorMessage, 'danger'))
  } finally { dispatch({ type: SET_USER_LOADING, payload: false }) }
}

export const fetchUserCreditCards = () => async dispatch => {
  try {
    
  } catch (err) {
    const errorMessage = err.response.data.message
    if (Array.isArray(errorMessage)) errorMessage.forEach(message => dispatch(alertUser(message.msg, 'danger')))
    else dispatch(alertUser(errorMessage, 'danger'))
  }
}

export const addUserCreditCard = () => async dispatch => {
  try {
  } catch (err) {
    const errorMessage = err.response.data.message
    if (Array.isArray(errorMessage)) errorMessage.forEach(message => dispatch(alertUser(message.msg, 'danger')))
    else dispatch(alertUser(errorMessage, 'danger'))
  }
}

export const fetchUserOrders = () => async dispatch => {
  try {

  } catch (err) {
    const errorMessage = err.response.data.message
    if (Array.isArray(errorMessage)) errorMessage.forEach(message => dispatch(alertUser(message.msg, 'danger')))
    else dispatch(alertUser(errorMessage, 'danger'))
  }
}