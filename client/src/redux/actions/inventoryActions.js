import actionTypes from '../actionTypes'
import axios from 'axios'
import { alertUser } from './alertActions'

const {
  SET_PRODUCTS,
  SET_PRODUCT,
	SET_COUPONS,
	SET_ORDERS,
	SET_CATEGORIES,
	CLEAR_PRODUCTS,
	CLEAR_CATEGORIES,
	CLEAR_COUPONS,
  SET_INVENTORY_LOADING
} = actionTypes

export const fetchInventory = () => async dispatch => {
	setTimeout(() => {
		dispatch(fetchAllOrders())
		dispatch(fetchAllCoupons())
		dispatch(fetchAllProducts())
	}, 10)
}

// CATEGORIES RELATED ACTIONS
export const fetchAllCategories = () => async dispatch => {
	try {
		const {
			data: { categories }
		} = await axios.get('/api/categories', {
			headers: { Authorization: axios.defaults.headers.common['Authorization'] }
		})
		dispatch({ type: SET_CATEGORIES, payload: categories })
	} catch (err) {
		const errorMessage = err.response.data.message
		if (Array.isArray(errorMessage))
			errorMessage.forEach(message =>
				dispatch(alertUser(message.msg, 'danger'))
			)
		else dispatch(alertUser(errorMessage, 'danger'))
	}
}

export const deleteCategory = categoryId => async dispatch => {
	try {
		await axios.delete(`/api/categories/${categoryId}`)
		dispatch({ type: CLEAR_CATEGORIES })
	} catch (err) {
		const errorMessage = err.response.data.message
		dispatch(alertUser(errorMessage, 'danger'))
	}
}

// ORDERS RELATED ACTIONS

export const fetchAllOrders = () => async dispatch => {
	try {
		const {
			data: { orders }
		} = await axios.get('/api/orders', {
			headers: { Authorization: axios.defaults.headers.common['Authorization'] }
		})
		dispatch({ type: SET_ORDERS, payload: orders })
	} catch (err) {
		const errorMessage = err.response.data.message
		if (Array.isArray(errorMessage))
			errorMessage.forEach(message =>
				dispatch(alertUser(message.msg, 'danger'))
			)
		else dispatch(alertUser(errorMessage, 'danger'))
	}
}

// COUPONS RELATED ACTIONS

export const fetchAllCoupons = () => async dispatch => {
	try {
		const {
			data: { coupons }
		} = await axios.get('/api/coupons', {
			headers: { Authorization: axios.defaults.headers.common['Authorization'] }
		})
		dispatch({ type: SET_COUPONS, payload: coupons })
	} catch (err) {
		const errorMessage = err.response.data.message
		if (Array.isArray(errorMessage))
			errorMessage.forEach(message =>
				dispatch(alertUser(message.msg, 'danger'))
			)
		else dispatch(alertUser(errorMessage, 'danger'))
	}
}

export const deleteCoupon = couponId => async dispatch => {
	try {
		await axios.delete(`/api/coupons/${couponId}`)
		dispatch({ type: CLEAR_COUPONS })
	} catch (err) {
		const errorMessage = err.response.data.message
		dispatch(alertUser(errorMessage, 'danger'))
	}
}

// PRODUCTS RELATED ACTIONS

export const fetchAllProducts = () => async dispatch => {
	try {
		const {
			data: { products }
		} = await axios.get('/api/products', {
			headers: { Authorization: axios.defaults.headers.common['Authorization'] }
		})
		dispatch({ type: SET_PRODUCTS, payload: products })
	} catch (err) {
		const errorMessage = err.response.data.message
		if (Array.isArray(errorMessage))
			errorMessage.forEach(message =>
				dispatch(alertUser(message.msg, 'danger'))
			)
		else dispatch(alertUser(errorMessage, 'danger'))
	}
}

export const fetchProductById = productId => async dispatch => {
  try {
    const { data: { product } } = await axios.get(`/api/products/${productId}`)
    dispatch({ type: SET_PRODUCT, payload: product })
    return product
  } catch (err) {
    const errorMessage = err.response.data.message
    dispatch(alertUser(errorMessage, 'danger'))
  }
}

export const changeProductAvailableState = (
	productId,
	status
) => async dispatch => {
	try {
		await axios.patch(`/api/products/available/${productId}`, { status })
	} catch (err) {
		const errorMessage = err.response.data.message
		dispatch(alertUser(errorMessage, 'danger'))
	}
}

export const addProduct = (formData, categoryId, history) => async dispatch => {
	try {
    dispatch({ type: SET_INVENTORY_LOADING, payload: true })
		await axios.post(`/api/products/${categoryId}`, formData)
		dispatch({ type: CLEAR_PRODUCTS })
    history.push('/admin/dashboard/products')
    dispatch(alertUser('Product created successfully', 'success'))
	} catch (err) {
		const errorMessage = err.response.data.message
		if (Array.isArray(errorMessage))
			errorMessage.forEach(message =>
				dispatch(alertUser(message.msg, 'danger'))
			)
		else dispatch(alertUser(errorMessage, 'danger'))
	} finally { dispatch({ type: SET_INVENTORY_LOADING, payload: false }) }
}

export const updateProduct = (formData, productId, history) => async dispatch => {
	console.log(Array.from(formData))
	try {
    dispatch({ type: SET_INVENTORY_LOADING, payload: true })
		await axios.put(`/api/products/${productId}`, formData)
		dispatch({ type: CLEAR_PRODUCTS })
    history.push('/admin/dashboard/products')
    dispatch(alertUser('Product updated successfully', 'success'))
    
	} catch (err) {
		const errorMessage = err.response.data.message
		if (Array.isArray(errorMessage))
			errorMessage.forEach(message =>
				dispatch(alertUser(message.msg, 'danger'))
			)
		else dispatch(alertUser(errorMessage, 'danger'))
	} finally { dispatch({ type: SET_INVENTORY_LOADING, payload: false }) }
}

export const deleteProduct = productId => async dispatch => {
	try {
		await axios.delete(`/api/products/${productId}`)
		dispatch({ type: CLEAR_PRODUCTS })
	} catch (err) {
		const errorMessage = err.response.data.message
		dispatch(alertUser(errorMessage, 'danger'))
	}
}
