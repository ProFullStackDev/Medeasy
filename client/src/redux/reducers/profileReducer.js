import actionTypes from '../actionTypes'
const { SET_USER_ORDERS, SET_USER_ADDRESSES, SET_USER_CARDS, SET_USER_LOADING, CLEAR_PROFILE } = actionTypes

const initialState = {
  loading: false,
  addresses: [],
  orders: [],
  cards: []
}

export default (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case SET_USER_LOADING: return { ...state, loading: payload }
    case SET_USER_ADDRESSES: return { ...state, addresses: [...payload] }
    case SET_USER_ORDERS: return { ...state, orders: [...payload] }
    case SET_USER_CARDS: return { ...state, cards: [...payload] }
    case CLEAR_PROFILE: return { addresses: [], orders: [], cards: [], loading: false }
    default: return state
  }
} 

