import { createSelector } from 'reselect'

export const selectInventory = state => state.inventory

export const selectInventoryProducts = createSelector([selectInventory], inventory => inventory.products)
export const selectInventoryOrders = createSelector([selectInventory], inventory => inventory.orders)
export const selectInventoryCoupons = createSelector([selectInventory], inventory => inventory.coupons)
