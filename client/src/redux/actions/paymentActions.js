import actionTypes from '../actionTypes'
import { alertUser } from './alertActions'
import Axios from 'axios'
import history from '../createHistory'

const {
	SET_ORDER_ID,
	SET_PAYPAL_ORDER_ID,
	SET_COINBASE_ORDER_ID,
	SET_RAZORPAY_ORDER_ID,
	CLEAR_ORDER,
	SET_INVENTORY_LOADING
} = actionTypes

export const createOrder = (billingAddress, shippingAddress) => async (
	dispatch,
	getState
) => {
  delete billingAddress.mode
  delete shippingAddress.mode
	if (getState().payment.orderId) return
	try {
		dispatch({ type: SET_INVENTORY_LOADING, payload: true })
		const cartId = getState().cart.cartId
		const mode = getState().auth.checkoutRole
		const userId =
      mode === 'user' ? getState().auth.user._id : getState().auth.guest._id
    console.log(cartId, mode, userId, billingAddress, shippingAddress)
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
    history.push('/checkout/payment')
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
