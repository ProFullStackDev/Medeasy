import actionTypes from '../actionTypes'
const { SET_PRODUCTS, SET_COUPONS, SET_ORDERS, CLEAR_INVENTORY } = actionTypes

const initialState = {
  products: null,
  orders: null,
  coupons: null,
  loading: false
}

export default (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case SET_PRODUCTS: return { ...state, products: payload }
    case SET_ORDERS: return { ...state, orders: payload }
    case SET_COUPONS: return { ...state, coupons: payload }
    case CLEAR_INVENTORY: return { products: null, orders: null, coupons: null, loading: false }
    default: return state
  }
}