import actionTypes from '../actionTypes'
import axios from 'axios'

const { SET_PRODUCTS, SET_COUPONS, SET_ORDERS } = actionTypes

export const fetchAllProducts = () => dispatch => {
  console.log(axios.defaults.headers)
}

// export const fetchAllOrders = () => 