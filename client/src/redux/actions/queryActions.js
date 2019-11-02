import { alertUser } from './alertActions'
import axios from 'axios'

export const addQuery = (formState) => async dispatch => {
	try {
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
	}
}
