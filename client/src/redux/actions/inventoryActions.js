import actionTypes from '../actionTypes'
import axios from 'axios'
import { alertUser } from './alertActions'

const { SET_PRODUCTS, SET_COUPONS, SET_ORDERS, SET_CATEGORIES, CLEAR_PRODUCTS } = actionTypes

export const fetchInventory = () => async dispatch => {
  dispatch(fetchAllOrders())
  dispatch(fetchAllCoupons())
  dispatch(fetchAllProducts())
}

// CATEGORIES RELATED ACTIONS
export const fetchAllCategories = () => async dispatch => {
  try {
    const { data: { categories } } = await axios.get('/api/categories', { headers: { Authorization: axios.defaults.headers.common['Authorization'] }})
    dispatch({ type: SET_CATEGORIES, payload: categories })
  } catch (err) {
    const errorMessage = err.response.data.message
    if (Array.isArray(errorMessage)) errorMessage.forEach(message => dispatch(alertUser(message.msg, 'danger')))
    else dispatch(alertUser(errorMessage, 'danger'))
  }
}

// ORDERS RELATED ACTIONS

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

// COUPONS RELATED ACTIONS

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

// PRODUCTS RELATED ACTIONS

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

export const addProduct = product => async dispatch => {
  
}

export const updateProduct = (product) => async dispatch => {

}

export const deleteProduct = productId => async dispatch => {
  console.log(productId)
  try {
    await axios.delete(`/api/products/${productId}`)
    dispatch({ type: CLEAR_PRODUCTS })
  } catch (err) {
    const errorMessage = err.response.data.message
    dispatch(alertUser(errorMessage, 'danger'))
  }
}