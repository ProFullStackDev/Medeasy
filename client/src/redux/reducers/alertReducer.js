import actionTypes from '../actionTypes'
const { SET_ALERT, REMOVE_ALERT, SET_MODAL_MESSAGE } = actionTypes

const initialState = {
  alerts: [],
  modal: null
}

export default (state = initialState, action) => {
  const { payload, type } = action
  switch (type) {
    case SET_ALERT: return { ...state, alerts: [ ...state.alerts, payload ]}
    case REMOVE_ALERT: return { ...state, alerts: state.alerts.filter(alert => alert.id !== payload) }
    case SET_MODAL_MESSAGE: return { ...state, modal: payload }
    default: return state
  }
}