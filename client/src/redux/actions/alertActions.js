import actionTypes from "../actionTypes"
import uuid from 'uuid/v4'
const { SET_ALERT, REMOVE_ALERT } = actionTypes

export const alertUser = (message, alertType) => dispatch => {
  const id = uuid()
  dispatch({ type: SET_ALERT, payload: { id, message, alertType } })
  setTimeout(() => {
    dispatch({ type: REMOVE_ALERT, payload: id })
  }, 1500)
}