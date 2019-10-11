import actionTypes from '../actionTypes'
const { SET_USER, SET_USER_LOADING, CLEAR_USER } = actionTypes

const initiaState = {
  user: null,
  userLoading: false
}

export default (state = initiaState, action) => {
  const { type, payload } = action
  switch (type) {
    case SET_USER:
      return { ...state, user: payload }
    case SET_USER_LOADING:
      return { ...state, userLoading: payload }
    case CLEAR_USER:
      return { user: null, userLoading: false }
    default:
      return state
  }
}
