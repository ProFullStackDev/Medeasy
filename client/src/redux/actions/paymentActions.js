import actionTypes from '../actionTypes'
import { alertUser } from './alertActions'
import Axios from 'axios'
import history from '../createHistory'
import { generateCartId } from './cartActions'

const {
	SET_ORDER_ID,
	SET_PAYPAL_ORDER_ID,
	SET_COINBASE_ORDER_ID,
	SET_RAZORPAY_ORDER_ID,
	SET_CURRENCY_RATE,
	CLEAR_ORDER,
	CLEAR_CART,
	SET_INVENTORY_LOADING
} = actionTypes

export const createOrder = (billingAddress, shippingAddress) => async (
	dispatch,
	getState
) => {
	delete billingAddress.mode
	delete shippingAddress.mode
	if (getState().payment.orderId) return history.push('/checkout/payment/card')
	try {
		dispatch({ type: SET_INVENTORY_LOADING, payload: true })
		const cartId = getState().cart.cartId
		const mode = getState().auth.checkoutRole
		const userId =
			mode === 'user' ? getState().auth.user._id : getState().auth.guest._id
		const {
			data: { orderId }
		} = await Axios.post('/api/orders', {
			cartId,
			mode,
			userId,
			billingAddress,
			shippingAddress
		})
		dispatch({ type: SET_ORDER_ID, payload: orderId })
		history.push('/checkout/payment/card')
	} catch (err) {
		console.log(err)
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

export const fetchCoinbaseOrderId = (orderId, amount, currency = 'USD') => async (dispatch, getState) => {
	try {
		if (getState().payment.coinbaseOrderId) return 
		dispatch({ type: SET_INVENTORY_LOADING, payload: true })
		const { data: { chargeCode } } = await Axios.post('/api/payments/coinbase/order', { orderId, currency, amount })
		dispatch({ type: SET_COINBASE_ORDER_ID, payload: chargeCode })
	} catch (err) {
		console.log(err)
		const errorMessage = err.response.data.message
		console.log(errorMessage)
	} finally {
		dispatch({ type: SET_INVENTORY_LOADING, payload: false })
	}
}

export const fetchRazorpayOrderId = (orderId, amount, currency = 'USD') => async (dispatch, getState) => {
	try {
		if (getState().payment.razorPayOrderId) return
		dispatch({ type: SET_INVENTORY_LOADING, payload: true })
		const { data: { rzpOrderId, currencyRate } } = await Axios.post('/api/payments/razorpay/order', { orderId, currency, amount })
		dispatch({ type: SET_RAZORPAY_ORDER_ID, payload: rzpOrderId })
		dispatch({ type: SET_CURRENCY_RATE, payload: currencyRate })
	} catch (err) {
		console.log(err)
		const errorMessage = err.response.data.message
		console.log(errorMessage)
	} finally { dispatch({ type: SET_INVENTORY_LOADING, payload: false }) }
} 

export const fetchPaypalOrderId = (orderId, amount, currency = 'USD') => async (dispatch, getState) => {
	try {
		if (getState().payment.paypalOrderId) return 
		dispatch({ type: SET_INVENTORY_LOADING, payload: true })
		const { data: { ppOrderId } } = await Axios.post('/api/payments/paypal/order', { orderId, currency, amount })
		dispatch({ type: SET_PAYPAL_ORDER_ID, payload: ppOrderId })
	} catch (err) {
		console.log(err)
		const errorMessage = err.response.data.message
		console.log(errorMessage)
	} finally {
		dispatch({ type: SET_INVENTORY_LOADING, payload: false })
	}
}

export const chargeCard = (orderId, razorpayOrderId, razorpayPaymentId, razorpaySignature, amount) => async dispatch => {
	try {
		dispatch({ type: SET_INVENTORY_LOADING, payload: true })
		const { data: { order } } = await Axios.post('/api/payments/razorpay/charge', { paymentId: razorpayPaymentId, orderId: razorpayOrderId, medEasyOrderId: orderId, signature: razorpaySignature, amount })
		console.log(order)
		dispatch({ type: CLEAR_CART })
		dispatch({ type: CLEAR_ORDER })
		sessionStorage.removeItem('guest')
		dispatch(generateCartId())
		history.push('/payment/success')
	} catch (err) {
		const errorMessage = err.response.data.message
		console.log(errorMessage)
	} finally { dispatch({ type: SET_INVENTORY_LOADING, payload: false }) }
}
