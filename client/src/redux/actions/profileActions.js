import Axios from 'axios'
import history from '../createHistory'
import actionTypes from '../actionTypes'
import { alertUser } from './alertActions'

const {
	SET_USER_ORDERS,
	SET_USER_ADDRESSES,
	SET_USER_ADDRESS,
	SET_USER_CARD,
	SET_USER_CARDS,
	SET_PROFILE_LOADING
} = actionTypes

export const fetchUserAddresses = () => async dispatch => {
	try {
		dispatch({ type: SET_PROFILE_LOADING, payload: true })
		setTimeout(async () => {
			const {
				data: { addresses }
			} = await Axios.get('/api/profile/address')
			dispatch({ type: SET_USER_ADDRESSES, payload: addresses })
			dispatch({ type: SET_PROFILE_LOADING, payload: false })
			return addresses
		}, 10)
	} catch (err) {
		const errorMessage = err.response.data.message
		if (Array.isArray(errorMessage))
			errorMessage.forEach(message =>
				dispatch(alertUser(message.msg, 'danger'))
			)
		else dispatch(alertUser(errorMessage, 'danger'))
	}
}

export const addUserAddress = address => async dispatch => {
	try {
		dispatch({ type: SET_PROFILE_LOADING, payload: true })
		await Axios.post('/api/profile/address', address)
		history.push('/profile/address')
	} catch (err) {
		const errorMessage = err.response.data.message
		if (Array.isArray(errorMessage))
			errorMessage.forEach(message =>
				dispatch(alertUser(message.msg, 'danger'))
			)
		else dispatch(alertUser(errorMessage, 'danger'))
	} finally {
		dispatch({ type: SET_PROFILE_LOADING, payload: false })
	}
}

export const editAddress = (addressId, address) => async dispatch => {
	try {
		dispatch({ type: SET_PROFILE_LOADING, payload: true })
		await Axios.put(`/api/profile/address/${addressId}`, address)
		history.push('/profile/address')
	} catch (err) {
		const errorMessage = err.response.data.message
		if (Array.isArray(errorMessage))
			errorMessage.forEach(message =>
				dispatch(alertUser(message.msg, 'danger'))
			)
		else dispatch(alertUser(errorMessage, 'danger'))
	} finally {
		dispatch({ type: SET_PROFILE_LOADING, payload: false })
	}
}

export const fetchAddressById = addressId => async dispatch => {
	try {
		dispatch({ type: SET_USER_ADDRESS, payload: null })
		dispatch({ type: SET_PROFILE_LOADING, payload: true })
		const {
			data: { address }
		} = await Axios.get(`/api/profile/address/${addressId}`)
		dispatch({ type: SET_USER_ADDRESS, payload: address })
		return address
	} catch (err) {
		const errorMessage = err.response.data.message
		if (Array.isArray(errorMessage))
			errorMessage.forEach(message =>
				dispatch(alertUser(message.msg, 'danger'))
			)
		else dispatch(alertUser(errorMessage, 'danger'))
	} finally {
		dispatch({ type: SET_PROFILE_LOADING, payload: false })
	}
}

export const deleteAddress = addressId => async dispatch => {
	try {
		await Axios.delete(`/api/profile/address/${addressId}`)
		dispatch(fetchUserAddresses())
	} catch (err) {
		const errorMessage = err.response.data.message
		dispatch(alertUser(errorMessage, 'danger'))
	}
}

export const fetchUserCreditCards = () => async dispatch => {
	try {
		dispatch({ type: SET_PROFILE_LOADING, payload: true })
		const { data: { cards } } = await Axios.get('/api/profile/card')
		dispatch({ type: SET_USER_CARDS, payload: cards })
	} catch (err) {
		const errorMessage = err.response.data.message
		if (Array.isArray(errorMessage))
			errorMessage.forEach(message =>
				dispatch(alertUser(message.msg, 'danger'))
			)
		else dispatch(alertUser(errorMessage, 'danger'))
	} finally { dispatch({ type: SET_PROFILE_LOADING, payload: false }) }
}

export const addUserCard = card => async dispatch => {
	try {
		dispatch({ type: SET_PROFILE_LOADING, payload: true })
		await Axios.post('/api/profile/card', card)
		history.push('/profile/card')
	} catch (err) {
		const errorMessage = err.response.data.message
		if (Array.isArray(errorMessage))
			errorMessage.forEach(message =>
				dispatch(alertUser(message.msg, 'danger'))
			)
		else dispatch(alertUser(errorMessage, 'danger'))
	} finally {
		dispatch({ type: SET_PROFILE_LOADING, payload: false })
	}
}

export const editCard = (cardId, card) => async dispatch => {
	try {
		dispatch({ type: SET_PROFILE_LOADING, payload: true })
		await Axios.put(`/api/profile/card/${cardId}`, card)
		history.push('/profile/card')
	} catch (err) {
		const errorMessage = err.response.data.message
		if (Array.isArray(errorMessage))
			errorMessage.forEach(message =>
				dispatch(alertUser(message.msg, 'danger'))
			)
		else dispatch(alertUser(errorMessage, 'danger'))
	} finally {
		dispatch({ type: SET_PROFILE_LOADING, payload: false })
	}
}

export const fetchCardById = cardId => async dispatch => {
	try {
		dispatch({ type: SET_USER_CARD, payload: null })
		dispatch({ type: SET_PROFILE_LOADING, payload: true })
		const {
			data: { card }
		} = await Axios.get(`/api/profile/card/${cardId}`)
		dispatch({ type: SET_USER_CARD, payload: card })
		return card
	} catch (err) {
		const errorMessage = err.response.data.message
		if (Array.isArray(errorMessage))
			errorMessage.forEach(message =>
				dispatch(alertUser(message.msg, 'danger'))
			)
		else dispatch(alertUser(errorMessage, 'danger'))
	} finally {
		dispatch({ type: SET_PROFILE_LOADING, payload: false })
	}
}

export const deleteCard = cardId => async dispatch => {
	try {
		await Axios.delete(`/api/profile/card/${cardId}`)
		dispatch(fetchUserCreditCards())
	} catch (err) {
		const errorMessage = err.response.data.message
		dispatch(alertUser(errorMessage, 'danger'))
	}
}

export const addUserCreditCard = card => async dispatch => {
	try {
	} catch (err) {
		const errorMessage = err.response.data.message
		if (Array.isArray(errorMessage))
			errorMessage.forEach(message =>
				dispatch(alertUser(message.msg, 'danger'))
			)
		else dispatch(alertUser(errorMessage, 'danger'))
	}
}

export const fetchUserOrders = () => async dispatch => {
	try {
		dispatch({ type: SET_PROFILE_LOADING, payload: true })
		const {
			data: { orders }
		} = await Axios.get('/api/orders/user')
		dispatch({ type: SET_USER_ORDERS, payload: orders })
	} catch (err) {
		const errorMessage = err.response.data.message
		if (Array.isArray(errorMessage))
			errorMessage.forEach(message =>
				dispatch(alertUser(message.msg, 'danger'))
			)
		else dispatch(alertUser(errorMessage, 'danger'))
	} finally {
		dispatch({ type: SET_PROFILE_LOADING, payload: false })
	}
}
