import actionTypes from '../actionTypes'
const { SET_ALERT, REMOVE_ALERT } = actionTypes

const initialState = {
  alerts: []
}

export default (state = initialState, action) => {
  const { payload, type } = action
  switch (type) {
    case SET_ALERT: return { ...state, alerts: [ ...state.alerts, payload ]}
    case REMOVE_ALERT: return { ...state, alerts: state.alerts.filter(alert => alert.id !== payload) }
    default: return state
  }
}