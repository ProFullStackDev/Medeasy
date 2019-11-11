import actionTypes from '../actionTypes'
const {
	SET_PRODUCTS,
	SET_REVIEWS,
	SET_PRODUCT,
	SET_COUPONS,
	SET_COUPON,
	SET_ORDERS,
	SET_CATEGORIES,
	SET_CATEGORY,
	CLEAR_PRODUCTS,
	CLEAR_PRODUCT,
	CLEAR_CATEGORIES,
	CLEAR_ORDERS,
	CLEAR_COUPONS,
	CLEAR_INVENTORY,
	SET_INVENTORY_LOADING
} = actionTypes

const initialState = {
	products: JSON.parse(sessionStorage.getItem('products')) || null,
	reviews: null,
	product: null,
	orders: null,
	coupons: null,
	coupon: null,
	categories: JSON.parse(sessionStorage.getItem('categories')) || null,
	category: null,
	loading: false
}

export default (state = initialState, action) => {
	const { type, payload } = action
	switch (type) {
		case SET_PRODUCTS:
			sessionStorage.setItem('products', JSON.stringify(payload))
			return { ...state, products: payload }
		case SET_REVIEWS:
			return { ...state, reviews: payload }
		case SET_PRODUCT:
			return { ...state, product: payload }
		case SET_CATEGORIES:
			sessionStorage.setItem('categories', JSON.stringify(payload))
			return { ...state, categories: payload }
		case SET_CATEGORY:
			return { ...state, category: payload }
		case CLEAR_CATEGORIES:
			sessionStorage.removeItem('categories')
			return { ...state, categories: null }
		case CLEAR_PRODUCTS:
			sessionStorage.removeItem('products')
			return { ...state, products: null }
		case CLEAR_PRODUCT:
			return { ...state, product: null }
		case CLEAR_ORDERS:
			return { ...state, orders: null }
		case CLEAR_COUPONS:
			return { ...state, coupons: null }
		case SET_ORDERS:
			return { ...state, orders: payload }
		case SET_COUPONS:
			return { ...state, coupons: payload }
		case SET_COUPON:
			return { ...state, coupon: payload }
		case SET_INVENTORY_LOADING:
			return { ...state, loading: payload }
		case CLEAR_INVENTORY:
			return {
				categories: null,
				reviews: null,
				products: null,
				product: null,
				orders: null,
				coupons: null,
				coupon: null,
				loading: false
			}
		default:
			return state
	}
}
