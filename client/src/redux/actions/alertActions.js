import actionTypes from "../actionTypes"
import uuid from 'uuid/v4'
const { SET_ALERT, REMOVE_ALERT, SET_MODAL_MESSAGE } = actionTypes

export const alertUser = (message, alertType) => dispatch => {
  const id = uuid()
  dispatch({ type: SET_ALERT, payload: { id, message, alertType } })
  setTimeout(() => {
    dispatch({ type: REMOVE_ALERT, payload: id })
  }, 1500)
}

export const alertModal = ({ title, subTitle, extraInfo }) => dispatch => {
  dispatch({ type: SET_MODAL_MESSAGE, payload: { title, subTitle, extraInfo }})
}

export const removeModal = () => dispatch => dispatch({ type: SET_MODAL_MESSAGE, payload: null })