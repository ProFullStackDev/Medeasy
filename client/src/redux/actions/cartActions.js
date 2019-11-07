import actionTypes from '../actionTypes'
import Axios from 'axios'
import { alertUser } from './alertActions'
const { SET_CART_ID, SET_CART_PRODUCTS, SET_INVENTORY_LOADING } = actionTypes

export const generateCartId = () => async (dispatch, getState) => {
	try {
		let id = getState().cart.cartId
		if (!id) {
			const {
				data: { cartId }
			} = await Axios.get('/api/cart/generateId')
			id = cartId
		}
		dispatch({ type: SET_CART_ID, payload: id })
		return id
	} catch (err) {
		const errorMessage = err.response.data.message
		dispatch(alertUser(errorMessage, 'danger'))
	}
}

export const fetchItemsFromCart = cartId => async (dispatch, getState) => {
	try {
		let cartProducts = getState().cart.products
		if (!cartProducts.length) {
			const {
				data: { cart }
			} = await Axios.get(`/api/cart/${cartId}`)
			cartProducts = [...cart]
		}
		dispatch({ type: SET_CART_PRODUCTS, payload: cartProducts })
	} catch (err) {
		const errorMessage = err.response.data.message
		dispatch(alertUser(errorMessage, 'danger'))
	}
}

export const clearCart = () => async (dispatch, getState) => {
	const cartId = getState().cart.cartId
	try {
		dispatch({ type: SET_INVENTORY_LOADING, payload: true })
		const {
			data: { cart }
		} = await Axios.delete(`/api/cart/empty/${cartId}`)
		dispatch({ type: SET_CART_PRODUCTS, payload: cart })
	} catch (err) {
		console.log(err)
	} finally {
		dispatch({ type: SET_INVENTORY_LOADING, payload: false })
	}
}

export const addProductToCart = cartObj => async (dispatch, getState) => {
	cartObj.quantity = 1
	cartObj.cartId = getState().cart.cartId
	try {
		dispatch({ type: SET_INVENTORY_LOADING, payload: true })
		const {
			data: { cart }
		} = await Axios.post('/api/cart/add', cartObj)
		console.log(cart)
    dispatch({ type: SET_CART_PRODUCTS, payload: cart })
    return cart
	} catch (err) {
		const errorMessage = err.response.data.message
		if (Array.isArray(errorMessage))
			errorMessage.forEach(message =>
				dispatch(alertUser(message.msg, 'danger'))
			)
		else dispatch(errorMessage, 'danger')
	} finally {
		dispatch({ type: SET_INVENTORY_LOADING, payload: false })
	}
}

export const updateCartItem = (itemId, mode, value) => async (dispatch, getState) => {
	try {
    dispatch({ type: SET_INVENTORY_LOADING, payload: true })
    const { data: { cart } } = await Axios.patch(`/api/cart/${getState().cart.cartId}`, { itemId, mode, value })
    dispatch({ type: SET_CART_PRODUCTS, payload: cart })
	} catch (err) {
    const errorMessage = err.response.data.message
		if (Array.isArray(errorMessage))
			errorMessage.forEach(message =>
				dispatch(alertUser(message.msg, 'danger'))
			)
		else dispatch(alertUser(errorMessage, 'danger'))
	} finally {
		dispatch({ type: SET_INVENTORY_LOADING, payload: false })
	}
}

export const deleteCartItem = itemId => async (dispatch, getState) => {
  try {
    dispatch({ type: SET_INVENTORY_LOADING, payload: true })
    const { data: { cart } } = await Axios.delete(`/api/cart/${getState().cart.cartId}/${itemId}`)
    dispatch({ type: SET_CART_PRODUCTS, payload: cart })
  } catch (err) {
    const errorMessage = err.response.data.message
		if (Array.isArray(errorMessage))
			errorMessage.forEach(message =>
				dispatch(alertUser(message.msg, 'danger'))
			)
		else dispatch(alertUser(errorMessage, 'danger'))
	} finally {
		dispatch({ type: SET_INVENTORY_LOADING, payload: false })
	}
}
