import actionTypes from '../actionTypes'
import axios from 'axios'
import { alertUser } from './alertActions'

const { SET_PRODUCTS, SET_COUPONS, SET_ORDERS } = actionTypes

export const fetchInventory = () => async dispatch => {
  dispatch(fetchAllOrders())
  dispatch(fetchAllCoupons())
  dispatch(fetchAllProducts())
}

export const fetchAllOrders = () => async dispatch => {
  try {
    const { data: { orders } } = await axios.get('/api/orders', { headers: { Authorization: axios.defaults.headers.common['Authorization'] }})
    dispatch({ type: SET_ORDERS, payload: orders })
  } catch (err) {
    const errorMessage = err.response.data.message
    if (Array.isArray(errorMessage)) errorMessage.forEach(message => dispatch(alertUser(message.msg, 'danger')))
    else dispatch(alertUser(errorMessage, 'danger'))
  }
}

export const fetchAllCoupons = () => async dispatch => {
  try {
    const { data: { coupons } } = await axios.get('/api/coupons', { headers: { Authorization: axios.defaults.headers.common['Authorization'] }})
    dispatch({ type: SET_COUPONS, payload: coupons })
  } catch (err) {
    const errorMessage = err.response.data.message
    if (Array.isArray(errorMessage)) errorMessage.forEach(message => dispatch(alertUser(message.msg, 'danger')))
    else dispatch(alertUser(errorMessage, 'danger'))
  }
}

export const fetchAllProducts = () => async dispatch => {
  try {
    const { data: { products } } = await axios.get('/api/products', { headers: { Authorization: axios.defaults.headers.common['Authorization'] }})
    dispatch({ type: SET_PRODUCTS, payload: products })
  } catch (err) {
    const errorMessage = err.response.data.message
    if (Array.isArray(errorMessage)) errorMessage.forEach(message => dispatch(alertUser(message.msg, 'danger')))
    else dispatch(alertUser(errorMessage, 'danger'))
  }
}

export const changeProductAvailableState = (productId, status) => async dispatch => {
  try {
    await axios.patch(`/api/products/available/${productId}`, { status })
  } catch (err) {
    const errorMessage = err.response.data.message
    dispatch(alertUser(errorMessage, 'danger'))
  }
}
