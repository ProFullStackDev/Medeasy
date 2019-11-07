import { createSelector } from 'reselect'

export const selectCart = state => state.cart
export const selectCartId = createSelector([selectCart], cart => cart.cartId)
export const selectCartProducts = createSelector([selectCart], cart => cart.products)