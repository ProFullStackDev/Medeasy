import actionTypes from '../actionTypes'
import { alertUser } from './alertActions'
import Axios from 'axios'
import history from '../createHistory'
import { generateCartId } from './cartActions'

const {
  SET_ORDER_ID,
  SET_PAYPAL_ORDER_ID,
  SET_COINBASE_ORDER_ID,
  SET_COINBASE_HOSTED_URL,
  SET_RAZORPAY_ORDER_ID,
  SET_CURRENCY_RATE,
  CLEAR_ORDER,
  CLEAR_CART,
  SET_INVENTORY_LOADING,
  SET_PROFILE_LOADING
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
    history.push('/checkout/payment/paypal')
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

export const fetchCoinbaseOrderId = (
  orderId,
  amount,
  currency = 'USD'
) => async dispatch => {
  try {
    dispatch({ type: SET_PROFILE_LOADING, payload: true })
    const {
      data: {
        charge: { code, hosted_url }
      }
    } = await Axios.post('/api/payments/coinbase/order', {
      orderId,
      currency,
      amount
    })
    dispatch({ type: SET_COINBASE_ORDER_ID, payload: code })
    dispatch({ type: SET_COINBASE_HOSTED_URL, payload: hosted_url })
  } catch (err) {
  } finally {
    dispatch({ type: SET_PROFILE_LOADING, payload: false })
  }
}

export const fetchRazorpayOrderId = (
  orderId,
  amount,
  currency = 'USD'
) => async (dispatch, getState) => {
  try {
    if (getState().payment.razorPayOrderId) return
    dispatch({ type: SET_INVENTORY_LOADING, payload: true })
    const {
      data: { rzpOrderId, currencyRate }
    } = await Axios.post('/api/payments/razorpay/order', {
      orderId,
      currency,
      amount
    })
    dispatch({ type: SET_RAZORPAY_ORDER_ID, payload: rzpOrderId })
    dispatch({ type: SET_CURRENCY_RATE, payload: currencyRate })
  } catch (err) {
  } finally {
    dispatch({ type: SET_INVENTORY_LOADING, payload: false })
  }
}

export const fetchPaypalOrderId = (
  orderId,
  amount,
  currency = 'INR'
) => async dispatch => {
  try {
    const {
      data: { ppOrderId, currencyRate }
    } = await Axios.post('/api/payments/paypal/order', {
      orderId,
      currency,
      amount
    })
    dispatch({ type: SET_PAYPAL_ORDER_ID, payload: ppOrderId })
    dispatch({ type: SET_CURRENCY_RATE, payload: currencyRate })
    return ppOrderId
  } catch (err) {
    const errorMessage = err.response.data.message
    console.log(errorMessage)
  }
}

export const acceptWesternUnion = orderId => async dispatch => {
  try {
    dispatch({ type: SET_PROFILE_LOADING, payload: true })
    await Axios.patch(`/api/orders/western/${orderId}`)
    dispatch({ type: CLEAR_CART })
    dispatch({ type: CLEAR_ORDER })
    localStorage.removeItem('guest')
    dispatch(generateCartId())
    history.push('/payment/confirmed')
  } catch (err) {
    const errorMessage = err.response.data.message
    dispatch(alertUser(errorMessage, 'danger'))
  } finally {
    dispatch({ type: SET_PROFILE_LOADING, payload: false })
  }
}

export const chargeCard = (
  orderId,
  razorpayOrderId,
  razorpayPaymentId,
  razorpaySignature,
  amount
) => async dispatch => {
  try {
    dispatch({ type: SET_INVENTORY_LOADING, payload: true })
    await Axios.post('/api/payments/razorpay/charge', {
      paymentId: razorpayPaymentId,
      orderId: razorpayOrderId,
      medEasyOrderId: orderId,
      signature: razorpaySignature,
      amount
    })
    dispatch({ type: CLEAR_CART })
    dispatch({ type: CLEAR_ORDER })
    localStorage.removeItem('guest')
    dispatch(generateCartId())
    history.push('/payment/success')
  } catch (err) {
    const errorMessage = err.response.data.message
    console.log(errorMessage)
  } finally {
    dispatch({ type: SET_INVENTORY_LOADING, payload: false })
  }
}

export const chargePaypal = (orderId, ppOrderId) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: SET_INVENTORY_LOADING, payload: true })
    await Axios.post('/api/payments/paypal/charge', {
      orderId,
      paypalOrderId: ppOrderId,
      currencyRate: getState().payment.currencyRate
    })
    dispatch({ type: CLEAR_CART })
    dispatch({ type: CLEAR_ORDER })
    localStorage.removeItem('guest')
    dispatch(generateCartId())
    history.push('/payment/success')
  } catch (err) {
    const errorMessage = err.response.data.message
    dispatch(alertUser(errorMessage, 'danger'))
  } finally {
    dispatch({ type: SET_INVENTORY_LOADING, payload: false })
  }
}

export const chargeBitcoin = chargeCode => async (dispatch, getState) => {
  try {
    dispatch({ type: SET_PROFILE_LOADING, payload: true })
    let userId = null
    if (getState().auth.checkoutRole === 'user')
      userId = getState().auth.user._id
    else userId = getState().auth.guest._id
    await Axios.post('/api/payments/coinbase/charge', { userId, chargeCode })
    dispatch({ type: CLEAR_CART })
    dispatch({ type: CLEAR_ORDER })
    localStorage.removeItem('guest')
    dispatch(generateCartId())
    history.push('/payment/success')
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

export const chargeWesternUnion = (
  orderId,
  { senderName, receiptNumber, isMoneyReceived }
) => async dispatch => {
  try {
    dispatch({ type: SET_INVENTORY_LOADING, payload: true })
    await Axios.post('/api/payments/western/charge', {
      orderId,
      senderName,
      paymentNumber: receiptNumber,
      moneyReceived: isMoneyReceived
    })
    history.push('/admin/dashboard/orders')
    dispatch(alertUser('Order processed successfully', 'success'))
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
