import actionTypes from '../actionTypes'
const { SET_USER, SET_USER_LOADING, CLEAR_USER, SET_ACCESS_TOKEN } = actionTypes

const initialState = {
  user: JSON.parse(localStorage.getItem('auth')) ? JSON.parse(localStorage.getItem('auth')).user : (JSON.parse(sessionStorage.getItem('auth')) ? JSON.parse(sessionStorage.getItem('auth')).user : null),
  accessToken: JSON.parse(localStorage.getItem('auth')) ? JSON.parse(localStorage.getItem('auth')).accessToken : (JSON.parse(sessionStorage.getItem('auth')) ? JSON.parse(sessionStorage.getItem('auth')).accessToken : null),
  userLoading: false
}

export default (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case SET_USER:
      return { ...state, user: payload }
    case SET_ACCESS_TOKEN:
      return { ...state, accessToken: payload }
    case SET_USER_LOADING:
      return { ...state, userLoading: payload }
    case CLEAR_USER:
      return { user: null, userLoading: false }
    default:
      return state
  }
}
