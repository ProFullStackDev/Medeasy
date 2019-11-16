import actionTypes from '../actionTypes'
const {
  SET_ORDER_ID,
  SET_PAYPAL_ORDER_ID,
  SET_COINBASE_ORDER_ID,
  SET_COINBASE_HOSTED_URL,
  SET_RAZORPAY_ORDER_ID,
  SET_CURRENCY_RATE,
  CLEAR_ORDER
} = actionTypes

const initialState = {
  orderId: localStorage.getItem('orderId') || null,
  currencyRate: parseFloat(sessionStorage.getItem('currencyRate')) || null,
  paypalOrderId: sessionStorage.getItem('paypalOrderId') || null,
  coinbaseChargeCode: null,
  coinbaseHostedUrl: null,
  razorPayOrderId: sessionStorage.getItem('razorpayOrderId') || null
}

export default (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case SET_ORDER_ID:
      localStorage.setItem('orderId', payload)
      return { ...state, orderId: payload }
    case SET_PAYPAL_ORDER_ID:
      sessionStorage.setItem('paypalOrderId', payload)
      return { ...state, paypalOrderId: payload }
    case SET_COINBASE_ORDER_ID:
      return { ...state, coinbaseChargeCode: payload }
    case SET_COINBASE_HOSTED_URL:
      return { ...state, coinbaseHostedUrl: payload }
    case SET_RAZORPAY_ORDER_ID:
      sessionStorage.setItem('razorpayOrderId', payload)
      return { ...state, razorPayOrderId: payload }
    case SET_CURRENCY_RATE:
      sessionStorage.setItem('currencyRate', String(payload))
      return { ...state, currencyRate: payload }
    case CLEAR_ORDER:
      sessionStorage.removeItem('razorpayOrderId')
      sessionStorage.removeItem('coinbaseOrderId')
      sessionStorage.removeItem('coinbaseHostedUrl')
      sessionStorage.removeItem('paypalOrderId')
      sessionStorage.removeItem('currencyRate')
      localStorage.removeItem('orderId')
      return {
        orderId: null,
        paypalOrderId: null,
        razorPayOrderId: null,
        coinbaseChargeCode: null,
        coinbaseHostedUrl: null,
        currencyRate: null
      }
    default:
      return state
  }
}
