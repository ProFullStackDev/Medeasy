import actionTypes from '../actionTypes'
const {
	SET_BILLING_ADDRESS,
	SET_SHIPPING_ADDRESS,
	SET_CART_ID,
	SET_CART_PRODUCTS,
	CLEAR_CART,
	SET_STEP_PROGRESS
} = actionTypes

const initialState = {
	cartId: localStorage.getItem('cartId') || null,
	products: JSON.parse(localStorage.getItem('cart')) || [],
	stepProgress: 1,
	shippingAddress:
		JSON.parse(sessionStorage.getItem('shippingAddress')) || null,
	billingAddress: JSON.parse(sessionStorage.getItem('billingAddress')) || null
}

export default (state = initialState, action) => {
	const { type, payload } = action
	switch (type) {
		case SET_CART_ID:
			localStorage.setItem('cartId', payload)
			return { ...state, cartId: payload }
		case SET_CART_PRODUCTS:
			localStorage.setItem('cart', JSON.stringify(payload))
			return { ...state, products: payload }
		case SET_SHIPPING_ADDRESS:
			sessionStorage.setItem('shippingAddress', JSON.stringify(payload))
			return { ...state, shippingAddress: payload }
		case SET_BILLING_ADDRESS:
			sessionStorage.setItem('billingAddress', JSON.stringify(payload))
			return { ...state, billingAddress: payload }
		case CLEAR_CART:
			localStorage.removeItem('cart')
			return { ...state, products: [] }
		case SET_STEP_PROGRESS:
			return { ...state, stepProgress: payload }
		default:
			return state
	}
}
