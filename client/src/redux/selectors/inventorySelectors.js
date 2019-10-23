import { createSelector } from 'reselect'

export const selectInventory = state => state.inventory

export const selectInventoryProducts = createSelector(
	[selectInventory],
	inventory => inventory.products
)

export const selectInventoryProduct = createSelector(
	[selectInventory],
	inventory => inventory.product
)

export const selectInventoryOrders = createSelector(
	[selectInventory],
	inventory => inventory.orders
)

export const selectInventoryCoupons = createSelector(
	[selectInventory],
	inventory => inventory.coupons
)

export const selectInventoryCategories = createSelector(
	[selectInventory],
	inventory => inventory.categories
)

export const selectInventoryLoading = createSelector(
	[selectInventory],
	inventory => inventory.loading
)
