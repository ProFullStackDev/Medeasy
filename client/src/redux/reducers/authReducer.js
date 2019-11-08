import actionTypes from '../actionTypes'
const {
	SET_USER,
	SET_GUEST,
	SET_USER_LOADING,
	SET_CHECKOUT_ROLE,
	CLEAR_USER,
	SET_ACCESS_TOKEN
} = actionTypes

const initialState = {
	user: JSON.parse(localStorage.getItem('auth'))
		? JSON.parse(localStorage.getItem('auth')).user
		: JSON.parse(sessionStorage.getItem('auth'))
		? JSON.parse(sessionStorage.getItem('auth')).user
		: null,
	accessToken: JSON.parse(localStorage.getItem('auth'))
		? JSON.parse(localStorage.getItem('auth')).accessToken
		: JSON.parse(sessionStorage.getItem('auth'))
		? JSON.parse(sessionStorage.getItem('auth')).accessToken
		: null,
	userLoading: false,
	checkoutRole: sessionStorage.getItem('checkoutRole') || null,
	guest: sessionStorage.getItem('guest') || null
}

export default (state = initialState, action) => {
	const { type, payload } = action
	switch (type) {
		case SET_USER:
			return { ...state, user: payload }
		case SET_GUEST:
			sessionStorage.setItem('guest', JSON.stringify(payload))
			return { ...state, guest: payload }
		case SET_CHECKOUT_ROLE:
			sessionStorage.setItem('checkoutRole', payload)
			return { ...state, checkoutRole: payload }
		case CLEAR_USER:
			return { user: null, accessToken: null, userLoading: false, userMode: '', checkoutRole: null, guest: null }
		case SET_ACCESS_TOKEN:
			return { ...state, accessToken: payload }
		case SET_USER_LOADING:
			return { ...state, userLoading: payload }
		default:
			return state
	}
}
