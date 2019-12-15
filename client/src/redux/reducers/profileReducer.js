import actionTypes from '../actionTypes'
const {
  SET_USER_ORDERS,
  SET_USER_ADDRESSES,
  SET_USER_CARDS,
  SET_PROFILE_LOADING,
  CLEAR_PROFILE,
  SET_USER_ADDRESS,
  SET_USER_CARD
} = actionTypes

const initialState = {
  loading: false,
  addresses: [],
  address: null,
  card: null,
  orders: [],
  cards: []
}

export default (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case SET_PROFILE_LOADING:
      return { ...state, loading: payload }
    case SET_USER_ADDRESSES:
      return { ...state, addresses: [...payload] }
    case SET_USER_ORDERS:
      return { ...state, orders: [...payload] }
    case SET_USER_ADDRESS:
      return { ...state, address: payload }
    case SET_USER_CARD:
      return { ...state, card: payload }
    case SET_USER_CARDS:
      return { ...state, cards: [...payload] }
    case CLEAR_PROFILE:
      return {
        addresses: [],
        orders: [],
        cards: [],
        loading: false,
        card: null,
        address: null
      }
    default:
      return state
  }
}
