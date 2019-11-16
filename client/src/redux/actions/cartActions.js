import actionTypes from '../actionTypes'
import Axios from 'axios'
import { alertUser } from './alertActions'
const {
	SET_GUEST,
	SET_USER,
	SET_ACCESS_TOKEN,
	SET_CART_ID,
	SET_CART_PRODUCTS,
	SET_CART_COUPON,
	SET_CART_COUPON_ERROR,
	SET_INVENTORY_LOADING,
	SET_PROFILE_LOADING,
	SET_STEP_PROGRESS,
	SET_BILLING_ADDRESS,
	SET_SHIPPING_ADDRESS
} = actionTypes

export const setCouponError = message => dispatch => dispatch({ type: SET_CART_COUPON_ERROR, payload: message })

export const applyCoupon = (subTotal, couponName) => async (dispatch, getState) => {
	try {
		dispatch(setCouponError(null))
		dispatch({ type: SET_INVENTORY_LOADING, payload: true })
		const {
			data: { coupon }
		} = await Axios.patch('/api/cart/coupon/redeem', {
			name: couponName,
			subTotal: parseInt(subTotal),
			cartId: getState().cart.cartId
		})
		dispatch({ type: SET_CART_COUPON, payload: coupon })
	} catch (err) {
		dispatch(setCouponError(err.response.data.message))
	} finally {
		dispatch({ type: SET_INVENTORY_LOADING, payload: false })
	}
}

export const removeCoupon = () => async (dispatch, getState) => {
	try {
		dispatch({ type: SET_INVENTORY_LOADING, payload: true })
		const {
			data: { coupon }
		} = await Axios.patch('/api/cart/coupon/remove', {
			cartId: getState().cart.cartId
		})
		dispatch({ type: SET_CART_COUPON, payload: coupon })
	} catch (err) {
		console.log(err.response.data.message)
	} finally {
		dispatch({ type: SET_INVENTORY_LOADING, payload: false })
	}
}

export const cacheAddress = (billingAddress, shippingAddress) => dispatch => {
	billingAddress.name = `${billingAddress.fName} ${
		billingAddress.mName.length > 0 ? billingAddress.mName : ''
	}${billingAddress.mName ? ' ' : ''}${billingAddress.lName}`
	shippingAddress.name = `${shippingAddress.fName} ${
		shippingAddress.mName.length > 0 ? shippingAddress.mName : ''
	}${shippingAddress.mName ? ' ' : ''}${shippingAddress.lName}`
	delete billingAddress.fName
	delete billingAddress.mName
	delete billingAddress.lName
	delete shippingAddress.lName
	delete shippingAddress.mName
	delete shippingAddress.fName
	dispatch({ type: SET_BILLING_ADDRESS, payload: billingAddress })
	dispatch({ type: SET_SHIPPING_ADDRESS, payload: shippingAddress })
}

export const storeGuestDetails = ({ name, email }) => async dispatch => {
	console.log(name, email)
	try {
		dispatch({ type: SET_PROFILE_LOADING, payload: true })
		const {
			data: { guest }
		} = await Axios.post('/api/user/guest', { name, email })
		dispatch({ type: SET_GUEST, payload: guest })
		dispatch({ type: SET_USER, payload: null })
		dispatch({ type: SET_ACCESS_TOKEN, payload: null })
		return
	} catch (err) {
		const errorMessage = err.response.data.message
		if (Array.isArray(errorMessage))
			errorMessage.forEach(message =>
				dispatch(alertUser(message.msg, 'danger'))
			)
		else dispatch(errorMessage, 'danger')
		dispatch(alertUser(errorMessage, 'danger'))
	} finally {
		dispatch({ type: SET_PROFILE_LOADING, payload: false })
	}
}

export const setStepProgress = number => dispatch =>
	dispatch({ type: SET_STEP_PROGRESS, payload: number })

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

export const fetchItemsFromCart = cartId => async dispatch => {
	try {
		const {
			data: { cart }
		} = await Axios.get(`/api/cart/${cartId}`)
		dispatch({ type: SET_CART_PRODUCTS, payload: cart.products })
		if (cart.coupon) dispatch({ type: SET_CART_COUPON, payload: cart.coupon })
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

export const updateCartItem = (itemId, mode, value) => async (
	dispatch,
	getState
) => {
	try {
		dispatch({ type: SET_INVENTORY_LOADING, payload: true })
		const {
			data: { cart }
		} = await Axios.patch(`/api/cart/${getState().cart.cartId}`, {
			itemId,
			mode,
			value
		})
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
		const {
			data: { cart }
		} = await Axios.delete(`/api/cart/${getState().cart.cartId}/${itemId}`)
		dispatch({ type: SET_CART_PRODUCTS, payload: cart.products })
		dispatch({ type: SET_CART_COUPON, payload: cart.coupon || {} })
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
