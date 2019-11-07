import actionTypes from '../actionTypes'
const { SET_CART_ID, SET_CART_PRODUCTS, CLEAR_CART } = actionTypes

const initialState = {
	cartId: localStorage.getItem('cartId') || null,
	products: JSON.parse(localStorage.getItem('cart')) || []
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
    case CLEAR_CART:
      localStorage.removeItem('cart')
      return { ...state, products: [] }
		default:
			return state
	}
}
