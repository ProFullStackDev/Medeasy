import axios from 'axios'
import { alertUser } from './alertActions'
import actionTypes from '../actionTypes'
const { SET_PROFILE_LOADING } = actionTypes

export const addQuery = (formState) => async dispatch => {
	try {
		dispatch({ type: SET_PROFILE_LOADING, payload: true })
    await axios.post('/api/queries', formState)
    return true
	} catch (err) {
    const errorMessage = err.response.data.message
		if (Array.isArray(errorMessage))
			errorMessage.forEach(message =>
				dispatch(alertUser(message.msg, 'danger'))
			)
    else dispatch(alertUser(errorMessage, 'danger'))
    return false
	} finally {
		dispatch({ type: SET_PROFILE_LOADING, payload: false })
	}
}
