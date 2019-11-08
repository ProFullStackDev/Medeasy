import { createSelector } from 'reselect'

export const selectCart = state => state.cart
export const selectCartId = createSelector(
	[selectCart],
	cart => cart.cartId
)
export const selectCartProducts = createSelector(
	[selectCart],
	cart => cart.products
)
export const selectCartStepProgress = createSelector(
	[selectCart],
	cart => cart.stepProgress
)
export const selectCartBillingAddress = createSelector(
	[selectCart],
	cart => cart.billingAddress
)
export const selectCartShippingAddress = createSelector(
	[selectCart],
	cart => cart.shippingAddress
)
