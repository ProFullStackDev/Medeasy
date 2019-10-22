import actionTypes from '../actionTypes'
const {
	SET_PRODUCTS,
	SET_COUPONS,
	SET_ORDERS,
	SET_CATEGORIES,
	CLEAR_PRODUCTS,
	CLEAR_CATEGORIES,
	CLEAR_ORDERS,
	CLEAR_COUPONS,
	CLEAR_INVENTORY
} = actionTypes

const initialState = {
	products: null,
	orders: null,
	coupons: null,
	categories: null,
	loading: false
}

export default (state = initialState, action) => {
	const { type, payload } = action
	switch (type) {
		case SET_PRODUCTS:
			return { ...state, products: payload }
		case SET_CATEGORIES:
			return { ...state, categories: payload }
		case CLEAR_CATEGORIES:
			return { ...state, categories: null }
		case CLEAR_PRODUCTS:
			return { ...state, products: null }
		case CLEAR_ORDERS:
			return { ...state, orders: null }
		case CLEAR_COUPONS:
			return { ...state, coupons: null }
		case SET_ORDERS:
			return { ...state, orders: payload }
		case SET_COUPONS:
			return { ...state, coupons: payload }
		case CLEAR_INVENTORY:
			return {
				categories: null,
				products: null,
				orders: null,
				coupons: null,
				loading: false
			}
		default:
			return state
	}
}
