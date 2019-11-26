import actionTypes from '../actionTypes'
import axios from 'axios'
import { alertUser } from './alertActions'
import history from '../createHistory'

const {
  SET_PRODUCTS,
  SET_REVIEWS,
  SET_PRODUCT,
  SET_COUPONS,
  SET_COUPON,
  SET_ORDERS,
  SET_ORDER,
  SET_CATEGORIES,
  SET_CATEGORY,
  CLEAR_PRODUCTS,
  CLEAR_PRODUCT,
  CLEAR_ADMIN_ORDER,
  CLEAR_CATEGORIES,
  CLEAR_COUPONS,
	SET_INVENTORY_LOADING
} = actionTypes

export const fetchInventory = () => async dispatch => {
  setTimeout(() => {
    dispatch(fetchAllOrders())
    dispatch(fetchAllProducts())
  }, 1)
}

export const loadHomePage = () => async dispatch => {
  dispatch(fetchAllProducts())
  dispatch(fetchAllCategories())
}

// CATEGORIES RELATED ACTIONS

export const fetchAllCategories = () => async (dispatch, getState) => {
  if (getState().inventory.categories) return
  try {
    const {
      data: { categories }
    } = await axios.get('/api/categories')
    dispatch({ type: SET_CATEGORIES, payload: categories })
  } catch (err) {
    console.log(err)
    const errorMessage = err.response.data.message
    if (Array.isArray(errorMessage))
      errorMessage.forEach(message =>
        dispatch(alertUser(message.msg, 'danger'))
      )
    else dispatch(alertUser(errorMessage, 'danger'))
  }
}

export const fetchCategoryById = categoryId => async dispatch => {
  try {
    dispatch({ type: SET_CATEGORY, payload: null })
    const {
      data: { category }
    } = await axios.get(`/api/categories/${categoryId}`)
    dispatch({ type: SET_CATEGORY, payload: category })
    return category
  } catch (err) {
    const errorMessage = err.response.data.message
    dispatch(alertUser(errorMessage, 'danger'))
  }
}

export const addCategory = formState => async dispatch => {
  try {
    dispatch({ type: SET_INVENTORY_LOADING, payload: true })
    await axios.post('/api/categories', formState)
    dispatch({ type: CLEAR_CATEGORIES })
    history.push('/admin/dashboard/categories')
    dispatch(alertUser('Condition Created Successfully', 'success'))
  } catch (err) {
    const errorMessage = err.response.data.message
    dispatch(alertUser(errorMessage, 'danger'))
  } finally {
    dispatch({ type: SET_INVENTORY_LOADING, payload: false })
  }
}

export const updateCategory = (formState, categoryId) => async dispatch => {
  try {
    dispatch({ type: SET_INVENTORY_LOADING, payload: true })
    await axios.put(`/api/categories/${categoryId}`, formState)
    dispatch({ type: CLEAR_CATEGORIES })
    history.push('/admin/dashboard/categories')
    dispatch(alertUser('Condition Updated Successfully', 'success'))
  } catch (err) {
    console.log(err.response.data)
    const errorMessage = err.response.data.message
    dispatch(alertUser(errorMessage, 'danger'))
  } finally {
    dispatch({ type: SET_INVENTORY_LOADING, payload: false })
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

export const fetchAllOrders = () => async (dispatch, getState) => {
  if (getState().inventory.orders) return
  try {
    const {
      data: { orders }
    } = await axios.get('/api/orders')
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

export const fetchOrderById = orderId => async dispatch => {
  try {
    dispatch({ type: SET_INVENTORY_LOADING, payload: true })
    dispatch({ type: CLEAR_ADMIN_ORDER })
    const {
      data: { order }
    } = await axios.get(`/api/orders/single/${orderId}`)
    dispatch({ type: SET_ORDER, payload: order })
  } catch (err) {
    const errorMessage = err.response.data.message
    dispatch(alertUser(errorMessage, 'danger'))
  } finally {
    dispatch({ type: SET_INVENTORY_LOADING, payload: false })
  }
}

export const fetchOrderByUserId = (orderId, userId) => async dispatch => {
  try {
    const {
      data: { order }
    } = await axios.post('/api/orders/user/single', { orderId, userId })
    dispatch({ type: SET_ORDER, payload: order })
  } catch (err) {
    const errorMessage = err.response.data.message
    if (Array.isArray(errorMessage))
      errorMessage.forEach(message =>
        dispatch(alertUser(message.msg, 'danger'))
      )
    else dispatch(alertUser(errorMessage, 'danger'))
  }
}

export const addTrackingId = (trackingId, orderId) => async dispatch => {
  try {
    await axios.patch(`/api/orders/track/${orderId}`, { trackingId })
    history.push('/admin/dashboard/orders')
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
    dispatch({ type: CLEAR_COUPONS })
    const {
      data: { coupons }
    } = await axios.get('/api/coupons')
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

export const fetchCouponById = couponId => async dispatch => {
  try {
    dispatch({ type: SET_COUPON, payload: null })
    const {
      data: { coupon }
    } = await axios.get(`/api/coupons/${couponId}`)
    dispatch({ type: SET_COUPON, payload: coupon })
    return coupon
  } catch (err) {
    const errorMessage = err.response.data.message
    dispatch(alertUser(errorMessage, 'danger'))
  }
}

export const addCoupon = formState => async dispatch => {
  try {
    dispatch({ type: SET_INVENTORY_LOADING, payload: true })
    await axios.post('/api/coupons', {
      ...formState,
      name: formState.name.toUpperCase(),
      minimumOrderAmount: parseInt(formState.minimumOrderAmount)
    })
    dispatch({ type: CLEAR_COUPONS })
    history.push('/admin/dashboard/coupons')
    dispatch(alertUser('Coupon Created Successfully', 'success'))
  } catch (err) {
    const errorMessage = err.response.data.message
    dispatch(alertUser(errorMessage, 'danger'))
  } finally {
    dispatch({ type: SET_INVENTORY_LOADING, payload: false })
  }
}

export const updateCoupon = (formState, couponId) => async dispatch => {
  try {
    dispatch({ type: SET_INVENTORY_LOADING, payload: true })
    await axios.put(`/api/coupons/${couponId}`, {
      ...formState,
      name: formState.name.toUpperCase(),
      minimumOrderAmount: parseInt(formState.minimumOrderAmount)
    })
    dispatch({ type: CLEAR_COUPONS })
    history.push('/admin/dashboard/coupons')
    dispatch(alertUser('Coupon Updated Successfully', 'success'))
  } catch (err) {
    const errorMessage = err.response.data.message
    dispatch(alertUser(errorMessage, 'danger'))
  } finally {
    dispatch({ type: SET_INVENTORY_LOADING, payload: false })
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

export const fetchAllProducts = () => async (dispatch, getState) => {
  if (getState().inventory.products) return
  try {
    const {
      data: { products }
    } = await axios.get('/api/products')
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
    dispatch({ type: CLEAR_PRODUCT })
    const {
      data: { product }
    } = await axios.get(`/api/products/${productId}`)
    dispatch({ type: SET_PRODUCT, payload: product })
    return product
  } catch (err) {
    console.log(err)
    history.push('/')
    const errorMessage = err.response.data.message
    dispatch(alertUser(errorMessage, 'danger'))
  }
}

export const changeProductAvailableState = (
  productId,
  status
) => async dispatch => {
  try {
    const {
      data: { product }
    } = await axios.patch(`/api/products/available/${productId}`, { status })
    const products = JSON.parse(sessionStorage.getItem('products'))
    const productIndex = products.findIndex(
      p => p._id.toString() === product._id
    )
    products[productIndex] = product
    dispatch({ type: SET_PRODUCTS, payload: products })
  } catch (err) {
    const errorMessage = err.response.data.message
    dispatch(alertUser(errorMessage, 'danger'))
  }
}

export const addProduct = (formData, categoryId) => async dispatch => {
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
  } finally {
    dispatch({ type: SET_INVENTORY_LOADING, payload: false })
  }
}

export const updateProduct = (formData, productId) => async dispatch => {
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
  } finally {
    dispatch({ type: SET_INVENTORY_LOADING, payload: false })
  }
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

export const saveProductsAsFavourites = productIds => async dispatch => {
  try {
    dispatch({ type: SET_INVENTORY_LOADING, payload: true })
    await axios.patch('/api/products/featured', { productIds })
    dispatch(alertUser('Request accepted successfuly !', 'success'))
    return true
  } catch (err) {
    const errorMessage = err.response.data.message
    if (Array.isArray(errorMessage))
      errorMessage.forEach(message =>
        dispatch(alertUser(message.msg, 'danger'))
      )
    else dispatch(alertUser(errorMessage, 'danger'))
    return false
  } finally {
    dispatch({ type: SET_INVENTORY_LOADING, payload: false })
  }
}

// REVIEWS RELATED ACTIONS

export const fetchReviewsByProductId = productId => async dispatch => {
  try {
    const {
      data: { reviews }
    } = await axios.get(`/api/reviews/${productId}`)
    dispatch({ type: SET_REVIEWS, payload: reviews })
    return reviews
  } catch (err) {
    console.log(err)
    history.push('/')
    const errorMessage = err.response.data.message
    dispatch(alertUser(errorMessage, 'danger'))
  }
}

export const addReview = (productId, review) => async dispatch => {
  try {
    await axios.post(`/api/reviews/${productId}`, review)
  } catch (err) {
    const errorMessage = err.response.data.message
    dispatch(alertUser(errorMessage, 'danger'))
  }
}
